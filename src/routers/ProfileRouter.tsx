import ProfileLayout from "@/Layouts/ProfileLayout";
import { RouteObject } from "react-router-dom";

const ProfileRouter: RouteObject[] = [
  {
    path: "/me",
    element: <ProfileLayout />,
  },
];

export default ProfileRouter;
