import { RouteObject } from "react-router-dom";

import { ChapterReading, CreateNewBook, Home, Library } from "../pages";
import { AuthLayout, Login, SignUp } from "@/pages/auth";
import AuthHOC from "./AuthHOC";
import BookReading from "@/pages/BookReading";

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
    path: "/book/:bookSlug",
    element: <BookReading />,
  },
  {
    path: "/book/chapter",
    element: <ChapterReading />,
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
