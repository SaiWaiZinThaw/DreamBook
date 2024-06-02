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

const ProfileDropdown = ({ data }: { data: profileFetchData }) => {
  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="flex items-center">
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
                className="rounded-full w-8 h-8"
              />
              <div className="flex flex-col">
                <p className="font-bold">{data.name}</p>
                <p className="opacity-50 text-xs">{data.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="!border-none">
            <h3 className="font-bold text-[18px]">Account</h3>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="flex items-center gap-3">
              <FaUser />
              <p>Profile</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-3">
              <ImBooks className="text-lg" />
              <p>Book Lists</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-3">
              <GoHeart />
              <p>Favorite Books</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuLabel className="!border-none">
            <h3 className="font-bold text-[18px]">Theme</h3>
          </DropdownMenuLabel>

          <div className="flex flex-col gap-2 pb-2 text-sm">
            <div className="flex items-center gap-2 mx-4">
              <Input className="w-3 h-3" type="checkbox" id="light" />
              <label className="flex items-center gap-1" htmlFor="light">
                Light Mode <CiLight className="text-xl" />
              </label>
            </div>

            <div className="flex items-center gap-2 mx-4">
              <Input className="w-3 h-3" type="checkbox" id="dark" />
              <label className="flex items-center gap-1" htmlFor="dark">
                Dark Mode <MdDarkMode />
              </label>
            </div>

            <div className="flex items-center gap-2 mx-4 pb-2 border-b border-border">
              <Input className="w-3 h-3" type="checkbox" id="system" />
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
    </div>
  );
};

export default ProfileDropdown;
