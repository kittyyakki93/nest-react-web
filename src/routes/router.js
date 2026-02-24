import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Join01 from "../pages/join/Join01";
import MyPage from "../pages/mypage/MyPage";
import AuthLayout from "../pages/layout/AuthLayout";

const router = createBrowserRouter([
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
    element: <AuthLayout />,
    children:
    [
      {
        path: "/my-page",
        element: <MyPage />
      }
    ]
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/my-page",
    element: <MyPage />,
  },
]);

export default router;
