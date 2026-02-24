import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const MyPage = () => {
  const { setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
      {
        method: "POST",
        // 인증이 필요한 모든 요청에는 cookies의 토큰을 같이 보내야 한다.
        credential: "include",
      }
    );

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
    onError: (err) => {},
  });

  const handleLogoutOnClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div>
      마이페이지
      <button onClick={handleLogoutOnClick}>로그아웃</button>
    </div>
  );
};

export default MyPage;
