import {
  ChapterOutline,
  FooterImg,
  LightCommentOutline,
  LightMenuBook,
} from "@/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BookDashBoardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex px-0 mx-0">
      <div className="flex">
        <div className="bg-primary bg-opacity-90 w-[296px] h-[982px]">
          <img
            src={FooterImg}
            alt=""
            className="border-slate-300 mx-[33.5px] py-[7.5px] border-b w-[223px]"
          />

          <div className="mt-[54px]">
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/book-details"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={LightMenuBook}
                  alt=""
                  className="mr-[8px] w-[24px] h-[31px]"
                />
                <h1 className="text-lg font-semibold text-slate-100">
                  Book Details
                </h1>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/chapters"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={ChapterOutline}
                  alt=""
                  className="mr-[8px] w-[24px] h-[24px]"
                />
                <h1 className="text-lg font-semibold text-slate-100">
                  Chapters
                </h1>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/comments"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={LightCommentOutline}
                  alt=""
                  className="mr-[8px] w-[24px] h-[24px]"
                />
                <h1 className="text-lg font-semibold text-slate-100">
                  Comments
                </h1>
              </div>
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
    </div>
  );
};

export default BookDashBoardLayout;
