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
        path: ":bookSlug/book-details",
        element: <BookDetailsPage />,
      },
      {
        path: ":bookSlug/chapters",
        element: <ChaptersPage />,
      },
      {
        path: ":bookSlug/comments",
        element: <CommentsPage />,
      },
    ],
  },
];

export default BookRouter;
