import { Logo } from "@/assets";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";


const NavBar = () => {

  return (
    <div className="flex justify-between items-center shadow-slate-300 shadow-sm px-40 py-6 w-full h-[70px] font-Inter">
      <div className="w-[70px]">
        <NavLink to="/">
          <img src={Logo} alt={Logo} className="w-full" />
        </NavLink>
        
      </div>
      <nav className="flex items-center gap-5">
        <NavLink to={"/"}>
          <Button variant={"ghost"}>Home</Button>
        </NavLink> 
        <NavLink to={"/library"}>
          <Button variant={"ghost"}>Library</Button>
        </NavLink> 
        <NavLink to={""}>
          <Button variant={"ghost"}>Book Crafting</Button>
        </NavLink> 
        
        
        
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
