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
  const { bookSlug } = useParams();

  return (
    <div className="flex md:flex-row flex-col mx-0 px-0 w-full h-screen">
      <div className="flex flex-col bg-primary bg-opacity-90 w-full md:w-[296px] h-screen overflow-y-auto">
        <img
          src={FooterImg}
          alt=""
          className="border-slate-300 mx-auto py-4 border-b w-[223px]"
        />

        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/book-details`}
          >
            <img
              src={LightMenuBook}
              alt=""
              className="mr-2 w-6 h-8"
            />
            <h1 className="font-semibold text-lg text-slate-100">
              Book Details
            </h1>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/chapters`}
          >
            <img
              src={ChapterOutline}
              alt=""
              className="mr-2 w-6 h-6"
            />
            <h1 className="font-semibold text-lg text-slate-100">Chapters</h1>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/comments`}
          >
            <img
              src={LightCommentOutline}
              alt=""
              className="mr-2 w-6 h-6"
            />
            <h1 className="font-semibold text-lg text-slate-100">Comments</h1>
          </NavLink>
        </div>

        <div
          className="flex border-slate-300 mt-auto pt-4 pl-4 border-t h-16 text-white cursor-pointer"
          onClick={() => navigate(`/me/books`)}
        >
          <FaArrowLeft className="mt-1 mr-2 w-5 h-5" />
          <h1 className="font-medium text-lg">Exit to Booklists</h1>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default BookDashBoardLayout;

