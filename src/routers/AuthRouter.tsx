import { Login, SignUp } from "@/pages/auth";
import LoginLayout from "@/pages/auth/AuthLayout";
import ProfileSetup from "@/pages/auth/ProfileSetup";
import { Navigate, RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/profile-setup",
        element: <ProfileSetup />,
      },
    ],
  },
];

export default AuthRouter;
