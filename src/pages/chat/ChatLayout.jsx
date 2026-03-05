import React, { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import ChatWindow from './ChatWindow';
import S from './style';
import ChatRoomList from './ChatRoomList';

const ChatLayout = () => {
  const { member } = useAuthStore()
  const myId = member?.id;
  const [selectedPartner, setSelectedPartner] = useState(null); //객체



  return (
    <S.LayoutWrapper>
      <S.SideBar>
        <ChatRoomList
          selectedRoomId={selectedPartner?.id}
          onSelectRoom={(data) => setSelectedPartner(data)}
          onDeleteRoom={(id) => {
            if (String(selectedPartner?.id) === String(id)) {
              setSelectedPartner(null);
            }
          }}
        />
      </S.SideBar>
      <S.MainContent>
        {selectedPartner ? (
          <ChatWindow
            myStringId={myId}
            partner={selectedPartner}
            onLeaveRoom={() => {
              setSelectedPartner(null);
            }}
          />
        ) : (
          <S.EmptyState>
            <h3>채팅방을 선택해 주세요.</h3>
          </S.EmptyState>
        )}
      </S.MainContent>
    </S.LayoutWrapper>
  );
};

export default ChatLayout;