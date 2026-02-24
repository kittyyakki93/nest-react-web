import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import MyPage from "../pages/mypage/MyPage";
import AuthLayout from "../pages/layout/AuthLayout";
import Join01 from "../pages/join/Join01";
import InitializeAuthLayout from "../pages/layout/InitializeAuthLayout";

const router = createBrowserRouter([
  // {
  //   element: <InitializeAuthLayout />,
  //   children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/join",
        element: <Join01 />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        element: <AuthLayout />, // 로그인이 필요한 페이지
        children: [
          {
            path: "/my-page",
            element: <MyPage />,
          },
        ],
      },
  //   ],
  // },
]);

export default router;
