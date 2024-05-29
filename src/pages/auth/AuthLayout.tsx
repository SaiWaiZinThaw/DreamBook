import { LoginBackground } from "@/assets";
import SignUp from "./SignUp";
import { Outlet } from "react-router";
SignUp;
const LoginLayout = () => {
  return (
    <div
      className="flex justify-center items-center bg-cover mt-0 w-full min-h-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <Outlet />
    </div>
  );
};

export default LoginLayout;
