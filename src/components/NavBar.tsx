import { Logo } from "@/assets";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { getToken, logout } from "@/services/authService";

const NavBar = () => {
  const token = getToken();

  const logOutHandler = () => {
    logout();
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-slate-300 shadow-sm px-40 py-6 w-full h-[70px] font-Inter">
      <NavLink to={"/"}>
        <div className="w-[70px]">
          <img src={Logo} alt={Logo} className="w-full" />
        </div>
      </NavLink>
      <nav className="flex items-center gap-5">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black"
          }
          to={"/"}
        >
          <Button variant={"ghost"}>Home</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black"
          }
          to={"/library"}
        >
          <Button variant={"ghost"}>Library</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black"
          }
          to={"/book-create"}
        >
          <Button variant={"ghost"}>Book Crafting</Button>
        </NavLink>
      </nav>

      {!token ? (
        <div className="flex items-center gap-2">
          <NavLink to="/auth/login">
            <Button variant={"ghost"} className="flex items-center gap-2">
              <HiMiniUserCircle className="text-2xl" /> Login
            </Button>
          </NavLink>

          <NavLink to="/auth/signup">
            <Button size={"lg"}>Register</Button>
          </NavLink>
        </div>
      ) : (
        <div>
          <Button
            variant={"ghost"}
            className="flex items-center gap-2"
            onClick={logOutHandler}
          >
            <HiMiniUserCircle className="text-2xl" /> Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
