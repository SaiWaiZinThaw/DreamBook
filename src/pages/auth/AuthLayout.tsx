import { LoginBackground, AuthLogo } from "@/assets";
import SignUp from "./SignUp";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
SignUp;
const LoginLayout = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover md:h-auto md:min-h-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="flex flex-col items-center w-full gap-3 p-5 mt-0">
        <NavLink to={"/"}>
          <img src={AuthLogo} alt="AuthLogo" className="p-5 w-[400px]" />
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
