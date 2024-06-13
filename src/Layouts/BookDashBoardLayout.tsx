import {
  ChapterOutline,
  FooterImg,
  LightCommentOutline,
  LightMenuBook,
} from "@/assets";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BookDashBoardLayout = () => {
  const navigate = useNavigate();
  const { bookID } = useParams();

  return (
    <div className="flex w-full px-0 mx-0 ">
      <div className="flex">
        <div className="bg-primary bg-opacity-90 w-[296px]">
          <img
            src={FooterImg}
            alt=""
            className="border-slate-300 mx-[33.5px] py-[7.5px] border-b w-[223px]"
          />

          <div className="mt-[54px] flex flex-col gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-300 bg-opacity-50 flex w-[296px] items-center py-[22.5px] pl-[16px] "
                  : "flex items-center py-[22.5px] pl-[16px] "
              }
              to={`/book-dashboard/${bookID}/book-details`}
            >
              <img
                src={LightMenuBook}
                alt=""
                className="mr-[8px] w-[24px] h-[31px]"
              />
              <h1 className="text-lg font-semibold text-slate-100">
                Book Details
              </h1>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-300 bg-opacity-50 flex w-[296px] items-center py-[22.5px] pl-[16px] "
                  : "flex items-center py-[22.5px] pl-[16px] "
              }
              to={`/book-dashboard/${bookID}/chapters`}
            >
              <img
                src={ChapterOutline}
                alt=""
                className="mr-[8px] w-[24px] h-[24px]"
              />
              <h1 className="text-lg font-semibold text-slate-100">Chapters</h1>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-300 bg-opacity-50 flex w-[296px] items-center py-[22.5px] pl-[16px] "
                  : "flex items-center py-[22.5px] pl-[16px] "
              }
              to={`/book-dashboard/${bookID}/comments`}
            >
              <img
                src={LightCommentOutline}
                alt=""
                className="mr-[8px] w-[24px] h-[24px]"
              />
              <h1 className="text-lg font-semibold text-slate-100">Comments</h1>
            </NavLink>
          </div>

          <div
            className="flex border-slate-300 mt-[607px] pt-[23px] pl-[19px] border-t h-[71px] text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft className="mt-[4px] mr-[8px] w-[20px] h-[20px]" />
            <h1 className="text-lg font-medium">Exit to Booklists</h1>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default BookDashBoardLayout;
