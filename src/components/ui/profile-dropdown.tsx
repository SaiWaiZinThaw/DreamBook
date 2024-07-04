import { useState } from "react";
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const logoutHandler = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    navigate("/");
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="relative flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <img
            src={data.profilePicture}
            alt={data.name}
            className="rounded-full w-10 h-10"
          />
          <FaAngleDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <img
                src={data.profilePicture}
                alt={data.name}
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <p className="font-bold text-black text-lg">{data.name}</p>
                <p className="opacity-50 text-sm">{data.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="!border-none">
            <h3 className="px-2 font-bold text-[18px] text-black">Account</h3>
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
            <h3 className="px-2 font-bold text-[18px] text-black">Theme</h3>
          </DropdownMenuLabel>

          <div className="flex flex-col gap-2 pb-2 text-sm">
            <div className="flex items-center gap-2 mx-4 px-2">
              <Input
                className="rounded-none w-3 h-3"
                type="radio"
                name="theme"
                id="light"
              />
              <label className="flex items-center gap-1" htmlFor="light">
                Light Mode <CiLight className="text-xl" />
              </label>
            </div>

            <div className="flex items-center gap-2 mx-4 px-2">
              <Input
                className="rounded-none w-3 h-3"
                type="radio"
                name="theme"
                id="dark"
              />
              <label className="flex items-center gap-1" htmlFor="dark">
                Dark Mode <MdDarkMode />
              </label>
            </div>

            <div className="flex items-center gap-2 mx-4 px-2 pb-2 border-b border-border">
              <Input
                className="rounded-none w-3 h-3"
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
              <CiLogout className="font-bold text-lg" />
              Log Out
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {showLogoutDialog && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="font-semibold text-lg">Are you sure you want to log out?</h2>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelLogout}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;