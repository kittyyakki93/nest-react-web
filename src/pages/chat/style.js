import styled from "styled-components";

const S = {};

/* --- ChatLayout (전체 구조) --- */
S.LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
  background-color: #f0f2f5;
`;

S.SideBar = styled.div`
  width: 350px;
  border-right: 1px solid #ddd;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

S.MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

S.EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  flex-direction: column;
  gap: 10px;

  h3 {
    margin: 0;
    color: #ccc;
  }
`;

/* --- 공통 Wrapper --- */
S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

/* --- ChatRoomList (좌측 목록) --- */
S.Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

S.SearchArea = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

S.SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
`;

S.SearchButton = styled.button`
  padding: 8px 15px;
  cursor: pointer;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

S.RoomItem = styled.div`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? "#f0f7ff" : "white")};
  border-color: ${(props) => (props.$isSelected ? "#cce5ff" : "#eee")};
  transition: all 0.2s;
  &:hover {
    background-color: #f9f9f9;
  }
`;

S.RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    font-size: 14px;
    color: #333;
  }
`;

/* --- ChatWindow (우측 대화창) --- */
S.Header = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
`;

S.UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .email {
    font-size: 12px;
    color: #888;
  }
`;

S.MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

S.MessageRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  margin: 10px 0;
`;

S.Bubble = styled.span`
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 14px;
  max-width: 70%;
  word-break: break-word;
  background-color: ${(props) => (props.$isMe ? "#007bff" : "#f1f0f0")};
  color: ${(props) => (props.$isMe ? "white" : "black")};
`;

S.InputArea = styled.div`
  display: flex;
  gap: 8px;
  padding: 15px 20px;
  border-top: 1px solid #eee;
`;

S.Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
`;

S.SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

S.DeleteButton = styled.button`
  color: #ff4d4f;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 12px;
`;

S.LastMessage = styled.div`
  font-size: 13px;
  color: #888;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default S;
