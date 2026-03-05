import React, { useEffect, useRef, useState } from 'react';

const ChatWindow = ({ myStringId, partner, onLeaveRoom }) => {
  const [messageList, setMessageList] = useState([])
  const [userInput, setUserInput] = useState("")
  const [partnerDetail, setPartnerDetail] = useState(null)

  const scrollBottomRef = useRef();
  const myId = String(myStringId);
  const partnerId = String(partner?.id)


  // 1. 유저의 상세 정보 가져오기
  useEffect(async() => {
    if (!partnerId) return;
    
    await fetch(`http://localhost:10000/members/${partnerId}`)
      .then(res => res.json())
      .then(({ data }) => {
        setPartnerDetail(data)
      })
      .catch(() => {
        setPartnerDetail(null)
      })
   },[partnerId])

  // 2. 메시지 내역 로드 및 리스너
  useEffect(() => {
    
  },[myId,partnerId])



  return (
    <div>
      채팅방 뷰
    </div>
  );
};

export default ChatWindow;