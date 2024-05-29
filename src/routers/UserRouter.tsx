import { RouteObject } from "react-router-dom";

import { CreateNewBook, Home, Library } from "../pages";
import { AuthLayout, Login, SignUp } from "@/pages/auth";


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
    path: '/register',
    element: <SignUp/>,
  },
  {
    path: '/register/create-account',
    element: <AuthLayout/>,
  },

];

export default UserRouter;
