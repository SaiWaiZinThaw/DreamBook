import { Login, SignUp } from "@/pages/auth";
import LoginLayout from "@/pages/auth/AuthLayout";
import { RouteObject } from "react-router-dom";

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
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
