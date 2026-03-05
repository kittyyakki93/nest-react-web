import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { socket } from '../../util/socket';
import S from "./style";

const ChatRoomList = ({ selectedRoomId, onSelectRoom, onDeleteRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [inputEmail, setInputEmail] = useState("");

  const { member } = useAuthStore();
  const myId = String(member?.id);
  const myEmail = member?.memberEmail;
  const selectedStringId = String(selectedRoomId);

  //1. 방 목록을 가져오기
  useEffect(async () => {
    //.emit() :  웹 소켓을 이용해서 값을 보내는 메서드
    if (!myEmail || !myId) return;
    socket.emit("joinRoom", myId);

    await fetch(`http://localhost:10000/chat/rooms/${myEmail}`)
      .then((res) => res.json())
      .then((data) => {
        //서버에서 온 데이터 필드명을 보장해서 저장
        if (Array.isArray(data)) {
          const formatted = data.map((room) => ({
            ...room,
            roomId: String(room.roomId),
          }));
        }
      })
      .catch(() => {
        setChatRooms([]);
      });

    //2. 실시간 목록 갱신 리스너
    const updateChatList = (message) => {
      const fromId = String(message.fromId)
      const toId = String(message.toId)
      const partnerId = fromId === myId ? toId : fromId;

      setChatRooms((prev) => {
        const exists = prev.find(room => room.roomId === partnerId)
        if (exists) {
          return prev.map((room) => (
            room.roomId === partnerId ? {...room, lastMessage: message.content, lastUpdated: new Date()} : room
          ))
        } else {
          // 새 채팅방 리스트가 생길 때
          return [{
            roomId: partnerId,
            memberEmail: partnerId === myId ? myEmail : "새 대화",
            lastMessage: message.content,
            lastUpdated: new Date()
          }, ...prev]
        }
      })
    }

    socket.on("privateMessage", updateChatList)
    return () => socket.off("privateMessage", updateChatList)
  }, [myEmail, myId]);

  //3. 새로운 채팅 시작(검색)
  const startNewChat = async () => {
    if (!inputEmail.trim()) { return; }

    const response = await fetch(`http://localhost:10000/members/member-id/${inputEmail}`)
    const target = await response.json()

    // Member모델
    const targetData = {
      id: String(target.id),
      memberEmail: target.memberEmail,
      memberName: target.memberMemberName,
      memberProfile: target.memberProfile,
    }

    // 목록에 없으면 추가
    if (!chatRooms.find((r) => r.roomId === targetData.id)) {
      setChatRooms(prev => [{
        roomId: targetData.id,
        memberEmail: targetData.memberEmail,
        memberName: targetData.memberName,
        memberProfile: targetData.memberProfile,
        lastMessage: "",
        lastUpdated: new Date()
      }, ...prev])
      onSelectRoom(targetData)
      setInputEmail("")
    }

  }
  console.log(chatRooms);

  return(
  <S.Wrapper>
      <S.Title>채팅 목록</S.Title>
      <S.SearchArea>
        <S.SearchInput value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder='이메일 검색' />
        <S.SearchButton onClick={startNewChat}>채팅 시작</S.SearchButton>
      </S.SearchArea>
      <S.ListContainer>
        {
          chatRooms
            .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
            .map((room) => (
              <S.RoomItem
                key={room.roomId}
                onClick={() => onSelectRoom({
                  id: room.roomId,
                  memberEmail: room.member,
                  memberName: room.memberMemberName,
                  memberProfile: room.memberProfile
                })}
                $isSelected= { selectedStringId === room.roomId}
              >
                <S.RoomHeader>
                  <strong>{room.room === myId ? "나와의 채팅" : (room.memberEmail || room.roomId)}</strong>
                  <S.DeleteButton onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRoom(room.roomId)
                  }}>삭제</S.DeleteButton>
                </S.RoomHeader>
                <S.LastMessage>{room.lastMessage || "메세지가 없습니다."}</S.LastMessage>
              </S.RoomItem>
            ))
        }
      </S.ListContainer>
    </S.Wrapper>
  );
};

export default ChatRoomList;