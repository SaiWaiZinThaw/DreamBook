import { Logo } from "../assets/index";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <div className="fixed flex justify-between items-center shadow-slate-300 shadow-sm px-40 py-6 w-full font-Inter">
      <div className="w-[70px]">
        <img src={Logo} alt={Logo} className="w-full" />
      </div>
      <nav className="flex items-center gap-5">
        <Button variant={"ghost"}>Home</Button>
        <Button variant={"ghost"}>Library</Button>
        <Button variant={"ghost"}>Book Crafting</Button>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant={"ghost"} className="flex items-center gap-2">
          <HiMiniUserCircle className="text-2xl" /> Login
        </Button>
        <Button size={"lg"}>Register</Button>
      </div>
    </div>
  );
};

export default NavBar;
