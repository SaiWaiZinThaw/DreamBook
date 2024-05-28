import { RouteObject } from "react-router-dom";
import { Home, Library, SignUp } from "../pages";
import { Login } from "@/pages/auth";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
];

export default UserRouter;
