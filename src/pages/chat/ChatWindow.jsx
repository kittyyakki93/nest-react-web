import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import { socket } from "../../util/socket";

const ChatWindow = ({ myStringId, partner, onLeaveRoom }) => {
  const [messageList, setMessageList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [partnerDetail, setPartnerDeatil] = useState(null);

  const scrollBottomRef = useRef();
  const myId = String(myStringId);
  const partnerId = String(partner?.id);

  // 1. 유저의 상세 정보 가져오기
  useEffect(async () => {
    if (!partnerId) return;

    await fetch(`http://localhost:10000/members/${partnerId}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setPartnerDeatil(data);
      })
      .catch(() => {
        setPartnerDeatil(null);
      });
  }, [partnerId]);

  // 2. 메시지 내역 로드 및 리스너
  useEffect(async() => {
    if (!partnerId || !myId) return;

    await fetch(`http://localhost:10000/chat/messages/${myId}/${partnerId}`)
      .then((res) => res.json())
      .then((data) => setMessageList(Array.isArray(data) ? data : []))
      .catch(() => setMessageList([]))
    
    const handleRecieve = (message) => {
      if (String(message.fromId) === myId) return;//중복방지
      const isMyChat = (String(message.fromId) === partnerId && String(message.toId) === myId) || (String(message.fromId) === myId && String(message.toId) === partnerId)

      if(isMyChat) setMessageList(prev =>[...prev, message])
    }
    socket.on("privateMessage", handleRecieve)
    return () => socket.off("privateMessage", handleRecieve)
  }, [myId, partnerId]);

  const send = () => {
    if (!userInput.trim()) return;
    const payload = {
      fromId: myId,
      toId: partnerId,
      content: userInput
    }

    socket.emit("privateMessage", payload)
    setMessageList(prev => [...prev, payload])
    setUserInput("")
   };
  
  // 스크롤 처리
  useEffect(() => {
    if (scrollBottomRef.current) scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
  },[messageList])

  return (
    <S.Wrapper>
      <S.Header>
        <S.UserProfile>
          <S.ProfileImg src={partnerDetail?.memberProfile} alt="profile" />
          <S.UserInfo>
            <span className="name">
              {partnerId === myId ? "나와의 채팅" : partnerDetail?.memberName}
            </span>
            <span className="email">{partnerDetail?.memberEmail}</span>
          </S.UserInfo>
        </S.UserProfile>
        <button onClick={onLeaveRoom}>방 나가기</button>
      </S.Header>

      <S.MessageArea ref={scrollBottomRef}>
        {messageList.map((message, i) => (
          <S.MessageRow key={i} $isMe={String(message.fromId) === myId}>
            <S.Bubble $isMe={String(message.fromId) === myId}>
              {message.content}
            </S.Bubble>
          </S.MessageRow>
        ))}
      </S.MessageArea>

      <S.InputArea>
        <S.Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              send()
            }
          }}
          placeholder="메세지를 입력하세요."
        />
        <button onClick={send}>전송</button>
      </S.InputArea>
    </S.Wrapper>
  );
};

export default ChatWindow;
