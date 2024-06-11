import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Input } from "./input";
import { ImBooks } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import { profileFetchData } from "@/types/types";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { logout } from "@/services/authService";
import { CiLogout } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileDropdown = ({ data }: { data: profileFetchData }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    logout();
  };
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <img
            src={data.profilePicture}
            alt={data.name}
            className="w-10 h-10 rounded-full"
          />
          <FaAngleDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <img
                src={data.profilePicture}
                alt={data.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{data.name}</p>
                <p className="text-sm opacity-50">{data.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="!border-none">
            <h3 className="font-bold text-[18px] px-2">Account</h3>
          </DropdownMenuLabel>
          <NavLink to="/me/info">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <FaUser className="text-[16px]" />
                <p>Profile</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/me/books">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <ImBooks className="text-[16px]" />
                <p>Book Lists</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/me/fav">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <GoHeart className="text-[16px]" />
                <p>Favorite Books</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuLabel className="!border-none">
            <h3 className="font-bold text-[18px] px-2">Theme</h3>
          </DropdownMenuLabel>

          <div className="flex flex-col gap-2 pb-2 text-sm">
            <div className="flex items-center gap-2 px-2 mx-4">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                name="theme"
                id="light"
              />
              <label className="flex items-center gap-1" htmlFor="light">
                Light Mode <CiLight className="text-xl" />
              </label>
            </div>

            <div className="flex items-center gap-2 px-2 mx-4">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                name="theme"
                id="dark"
              />
              <label className="flex items-center gap-1" htmlFor="dark">
                Dark Mode <MdDarkMode />
              </label>
            </div>

            <div className="flex items-center gap-2 px-2 pb-2 mx-4 border-b border-border">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                name="theme"
                id="system"
              />
              <label htmlFor="system">System</label>
            </div>
          </div>
          <DropdownMenuLabel className="flex justify-center !border-none">
            <button
              onClick={logoutHandler}
              className="flex items-center gap-1 font-medium text-primary"
            >
              <CiLogout className="text-lg font-bold" />
              Log Out
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
