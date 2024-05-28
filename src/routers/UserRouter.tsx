import { RouteObject } from "react-router-dom";

import { CreateNewBook, Home, Library, SignUp } from "../pages";
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
    path: "/book-create",
    element: <CreateNewBook/>,
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
