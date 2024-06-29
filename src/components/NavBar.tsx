import { Logo } from "@/assets";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";
import { FaHeart } from "react-icons/fa";
import ProfileDropdown from "./ui/profile-dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const token = getToken() || "";
  const { setShowMenu } = useAuth();
  const { data, isLoading, isSuccess } = useGetMe(token);
  return (
    <div className=" flex justify-between items-center bg-white shadow-slate-300 shadow-sm lg:px-40 py-2 px-10 lg:py-6 w-full h-[70px] font-Inter">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowMenu(true)}
          className="text-xl font-bold lg:hidden"
        >
          <RxHamburgerMenu />
        </button>
        <NavLink to={"/"}>
          <div className="lg:w-[70px] w-[45px]">
            <img src={Logo} alt="Logo" className="w-full" />
          </div>
        </NavLink>
      </div>
      <nav className="items-center hidden gap-5 lg:flex">
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
          <NavLink className="hidden lg:block" to="/auth/login">
            <Button variant={"ghost"} className="flex items-center gap-2">
              <HiMiniUserCircle className="text-2xl" /> Login
            </Button>
          </NavLink>
          <NavLink to="/auth/signup">
            <Button size={"lg"}>Register</Button>
          </NavLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLink
            className="flex flex-col items-center justify-end"
            to="/me/fav"
          >
            <FaHeart className="text-lg font-bold text-red-600" />
            <span className="text-sm font-semibold">Fav Books</span>
          </NavLink>
          {!isLoading && data && isSuccess && <ProfileDropdown data={data} />}
        </div>
      )}
    </div>
  );
};

export default NavBar;
