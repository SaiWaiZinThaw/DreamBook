import { RouteObject } from "react-router-dom";
import { Home, Library } from "../pages";

const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library",
    element: <Library />,
  },
];

export default UserRouter;
