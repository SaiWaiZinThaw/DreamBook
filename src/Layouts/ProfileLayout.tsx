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
    <div className="w-full">
      <NavBar />
      <div className="flex w-full">
        <div className="flex flex-col gap-10 border-2 shadow-sm p-8 pt-16 shoadw-border border-r-border w-[480px]">
          {!isLoading && data && (
            <div className="flex items-center gap-4 px-5 profile">
              <img
                src={data.profilePicture}
                alt={data.profilePicture}
                className="rounded-full w-[65px] h-[65px]"
              />
              <span className="text-lg font-bold">{data.name}</span>
            </div>
          )}

          <div className="flex flex-col justify-center gap-0">
            <NavLink
              to={"/me/info"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser /> Personal Information
              </div>
              <FaAngleRight />
            </NavLink>

            <NavLink
              to={"/me/books"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <ImBooks className="text-xl" /> Book Lists
              </div>
              <FaAngleRight />
            </NavLink>

            <NavLink
              to={"/me/fav"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <GoHeart className="text-xl" /> Favorite Books
              </div>
              <FaAngleRight />
            </NavLink>

            <NavLink
              to={"/me/history"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <IoMdBookmarks className="text-xl" /> History
              </div>
              <FaAngleRight />
            </NavLink>

            <NavLink
              to={"/me/change-password"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser /> Change Password
              </div>
              <FaAngleRight />
            </NavLink>

            <NavLink
              to={"/me/restore"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary !text-primary-foreground p-5 rounded-[8px] flex items-center justify-between"
                  : "text-black flex items-center justify-between p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaTrashAlt /> Recently deleted
              </div>
              <FaAngleRight />
            </NavLink>
          </div>

          <button
            onClick={LogOut}
            className="flex items-center justify-center gap-3 p-4 font-bold border-t border-border text-secondary-foreground"
          >
            <CiLogout className="text-2xl font-bold" /> Sign Out
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
