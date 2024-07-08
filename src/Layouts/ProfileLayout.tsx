import { NavBar } from "@/components";
import { useGetMe } from "@/hooks/useUser";
import { getToken, logout } from "@/services/authService";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import { IoMdBookmarks } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";

const ProfileLayout = () => {
  const token = getToken() || "";
  const { data, isLoading } = useGetMe(token);
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
    logout();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [!token]);

  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="flex w-full h-full">
        <div className="min-h-screen  flex flex-col md:gap-10 border-2 shadow-sm pt-8 md:p-8 md:pt-16 shoadw-border border-r-border w-[90px] md:w-[480px]">
          {!isLoading && data && (
            <div className="flex flex-col items-center gap-2 py-4 md:gap-4 md:flex-row md:px-5 profile">
              <img
                src={data.profilePicture}
                alt={data.profilePicture}
                className="rounded-full md:w-[65px] h-[40px] w-[40px] md:h-[65px]"
              />
              <span className="font-bold md:text-base text-[10px] text-center">
                {data.name}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center h-full gap-3 md:h-auto md:gap-0">
            <NavLink
              to={"/me/info"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary  md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span className="hidden md:block">Personal Information</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>

            <NavLink
              to={"/me/books"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <ImBooks className="text-xl" />
                <span className="hidden md:block">Book Lists</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>

            <NavLink
              to={"/me/fav"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <GoHeart className="text-xl" />
                <span className="hidden md:block">Favorite Books</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>

            <NavLink
              to={"/me/history"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <IoMdBookmarks className="text-xl" />
                <span className="hidden md:block">History</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>

            <NavLink
              to={"/me/change-password"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span className="hidden md:block">Change Password</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>

            <NavLink
              to={"/me/restore"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary md:w-full w-[50px] !text-primary-foreground p-2 self-center md:p-5 rounded-[8px] flex items-center justify-center md:justify-between"
                  : "text-black flex items-center justify-center md:w-full w-[50px] md:justify-between p-2 self-center md:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaTrashAlt />
                <span className="hidden md:block">Recently Deleated</span>
              </div>
              <FaAngleRight className="hidden md:block" />
            </NavLink>
          </div>

          <button
            onClick={LogOut}
            className="flex items-center justify-center gap-3 px-4 py-10 font-bold border-t border-border text-secondary-foreground"
          >
            <CiLogout className="text-2xl font-bold" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
