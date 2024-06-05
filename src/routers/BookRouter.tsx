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
  },
  {
    path: "/book-dashboard/book-details",
    element: <BookDetailsPage />,
  },
  {
    path: "/book-dashboard/chapters",
    element: <ChaptersPage />,
  },
  {
    path: "/book-dashboard/comments",
    element: <CommentsPage />,
  },
];

export default BookRouter;
