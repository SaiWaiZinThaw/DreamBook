import { Login, SignUp } from "@/pages/auth";
import LoginLayout from "@/pages/auth/AuthLayout";
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
    ],
  },
];

export default AuthRouter;
