import { RouteObject } from "react-router-dom";
import { Home, Library } from "../pages";
import { Login, SignUp } from "@/pages/auth";

const UserRouter: RouteObject[] = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/library',
    element: <Library/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <SignUp/>,
      
  },
]

export default UserRouter