import { LogoBlue } from "@/assets";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
const Menu = () => {
  const { showMenu, setShowMenu } = useAuth();
  return (
    <div
      className={`absolute w-full h-full flex flex-col items-center duration-300  bg-white lg:hidden transform p-6 ${
        showMenu ? "translate-x-0" : "-translate-x-full "
      }`}
    >
      <button className="self-end" onClick={() => setShowMenu(false)}>
        <RxCross1 />
      </button>
      <div className="flex flex-col items-center w-[200px] mt-5">
        <NavLink to={"/"}>
          <div className="lg:w-[70px] w-full">
            <img src={LogoBlue} alt="Logo" className="w-full" />
          </div>
        </NavLink>
        <nav className="flex flex-col items-center gap-3 p-5">
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
      </div>
    </div>
  );
};

export default Menu;
