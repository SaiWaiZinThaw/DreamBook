import { BookDashBoardLayout } from "@/Layouts";
import {
  BookDetailsPage,
  ChaptersPage,
  CommentsPage,
} from "@/pages/UserBookDashboard";
import { RouteObject } from "react-router-dom";

const BookRouter: RouteObject[] = [
  {
    path: "/book-dashboard",
    element: <BookDashBoardLayout />,
    children: [
      {
        path: ":bookID/book-details",
        element: <BookDetailsPage />,
      },
      {
        path: ":bookID/chapters",
        element: <ChaptersPage />,
      },
      {
        path: ":bookID/comments",
        element: <CommentsPage />,
      },
    ],
  },
];

export default BookRouter;
