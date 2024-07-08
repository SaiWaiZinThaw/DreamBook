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

        <div className="min-h-screen flex flex-col md:gap-10 border-2 shadow-sm pt-8 md:p-8 md:pt-16 shoadw-border border-r-border w-[90px] md:w-[480px]">
          {!isLoading && data && (
            <div className="flex md:flex-row flex-col items-center gap-2 md:gap-4 md:px-5 py-4 profile">
              <img
                src={data.profilePicture}
                alt={data.profilePicture}
                className="rounded-full w-[40px] md:w-[65px] h-[40px] md:h-[65px]"
              />
              <span className="font-bold text-[10px] text-center md:text-base">
                {data.name}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 md:gap-0 h-full md:h-auto">
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
                <span className="md:block hidden">Personal Information</span>
              </div>
              <FaAngleRight className="md:block hidden" />
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
                <span className="md:block hidden">Book Lists</span>
              </div>
              <FaAngleRight className="md:block hidden" />
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
                <span className="md:block hidden">Favorite Books</span>
              </div>
              <FaAngleRight className="md:block hidden" />
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
                <span className="md:block hidden">History</span>
              </div>
              <FaAngleRight className="md:block hidden" />
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
                <span className="md:block hidden">Change Password</span>
              </div>
              <FaAngleRight className="md:block hidden" />
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
                <span className="md:block hidden">Recently Deleated</span>
              </div>
              <FaAngleRight className="md:block hidden" />
            </NavLink>
          </div>

          <button
            onClick={LogOut}
            className="flex justify-center items-center gap-3 px-4 py-10 border-t border-border font-bold text-secondary-foreground"
          >
            <CiLogout className="font-bold text-2xl" />
            <span className="md:block hidden">Sign Out</span>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
