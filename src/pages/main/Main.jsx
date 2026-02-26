import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const MyPage = () => {
  const { member, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch(`http://localhost:10000/auth/logout`, {
      method: "POST",
      // ※인증이 필요한 모든 요청에는 Cookie의 토큰을 같이 보내야한다.※,
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout Error");
    return await response.json();
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      console.log("로그아웃 성공");
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLogoutOnClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div>
      마이페이지😎
      <p>{member?.memberName}님 환영합니다</p>
      <button onClick={handleLogoutOnClick}>로그아웃</button>
    </div>
  );
};

export default MyPage;
