import { LoginBackground, LogoWhite } from "@/assets";
import SignUp from "./SignUp";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
SignUp;
const LoginLayout = () => {
  return (
    <div
      className="flex justify-center items-center bg-cover min-h-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="flex flex-col items-center gap-3 mt-0 p-5 w-full">
        <NavLink to={"/"}>
          <img src={LogoWhite} alt="LogoWhite" className="p-5 w-[250px]" />
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
