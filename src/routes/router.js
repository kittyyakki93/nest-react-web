import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Join01 from "../pages/join/Join01";

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
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
