import { RouteObject } from "react-router-dom";

import { CreateNewBook, Home, Library } from "../pages";
import { AuthLayout, Login, SignUp } from "@/pages/auth";
import AuthHOC from "./AuthHOC";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library/:page",
    element: <Library />,
  },

  {
    path: "/book-create",
    element: (
      <AuthHOC>
        <CreateNewBook />
      </AuthHOC>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/register/create-account",
    element: <AuthLayout />,
  },
];

export default UserRouter;
