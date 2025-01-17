import { Logo } from "@/assets";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";


const NavBar = () => {

  return (
    <div className="flex justify-between items-center bg-white shadow-slate-300 shadow-sm px-40 py-6 w-full h-[70px] font-Inter">
     <NavLink to={"/"}>
        <div className="w-[70px]">
          <img src={Logo} alt={Logo} className="w-full" />
        </div>
     </NavLink>
      <nav className="flex items-center gap-5">
        <NavLink className={({isActive}) => isActive ? "bg-blue-300 p-[2px] rounded-md" : ""} to={"/"}>
          <Button variant={"ghost"}>Home</Button>
        </NavLink> 
        <NavLink  className={({isActive}) => isActive ? "bg-blue-300 p-[2px] rounded-md" : ""} to={"/library"}>
          <Button variant={"ghost"}>Library</Button>
        </NavLink> 
        <NavLink  className={({isActive}) => isActive ? "bg-blue-300 p-[2px] rounded-md" : ""} to={"/book-create"}>
          <Button variant={"ghost"}>Book Crafting</Button>
        </NavLink> 
        
        
        
      </nav>

      <div className="flex items-center gap-2">
        <NavLink to='/login'>
          <Button variant={"ghost"} className="flex items-center gap-2">
            <HiMiniUserCircle className="text-2xl" /> Login
          </Button>
        </NavLink>

        <NavLink to='/register'>
          <Button size={"lg"}>Register</Button>
        </NavLink>
        
      </div>
    </div>
  );
};

export default NavBar;
