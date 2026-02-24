import React, { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

const Main = () => {
  // 최초 한 번 프로필 요청
  const { setMember, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch("http://localhost:10000/auth/me", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Access Token expired");
        const { data } = await response.json();
        setMember(data);
        setIsAuthenticated(true);

        console.log("실행", data);
      } catch (err) {
        // Access Token 만료 -> Refresh Token으로 Access Token의 재발급 시도
        try {
          const refreshResponse = await fetch(
            "http://localhost:10000/auth/refresh",
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (!refreshResponse.ok) throw new Error("Refresh Token expired");

          // 재발급 성공 -> 다시 내 정보를 요청
          const response = await fetch("http://localhost:10000/auth/me", {
            credentials: "include",
          });

          if (!response.ok) throw new Error("me failed");
          const { data } = await response.json();
          setMember(data);
          setIsAuthenticated(true);
        } catch (err) {
          // fresh 실패 -> 완전 로그아웃
          setMember(null);
          setIsAuthenticated(false);
        }
      }
    };

    initializeAuth();
  }, []);

  return <div>메인페이지😎</div>;
};

export default Main;
