import { RouteObject } from "react-router-dom";

import {CreateNewBook, Home, Library } from "../pages";
import { AuthLayout, Login, SignUp } from "@/pages/auth";
import AuthHOC from "./AuthHOC";
import BookReading from "@/pages/BookReading/BookReading";
import ChapterReading from "@/pages/BookReading/ChapterReading";
import BookReadingLayout from "@/pages/BookReading/BookReadingLayout";
import ChapterReadingOnClick from "@/components/ChapterReadingOnClick";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library/*",
    element: <Library />,
  },
  {
    path: "/book/:bookSlug",
    element: <BookReadingLayout />,
    children: [
      {
        index: true,
        element: <BookReading />,
      },
      {
        path: "chapter/:chapterId",
        element: <ChapterReading />,
      },
    ],
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
