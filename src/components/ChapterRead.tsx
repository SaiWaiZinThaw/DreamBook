import { useFetchAllChapters } from "@/hooks/useFetchChapter";
import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const ChapterRead = () => {
  const { bookSlug } = useParams();
  const navigate = useNavigate();
  const { data: getChapters } = useFetchAllChapters(bookSlug!);

  const handleChapterSelect = (id: number) => {
    navigate(`/book/${bookSlug}/chapter/${id}`);
  };

  return (
    <div className="flex">
      <div className="pl-[26px] border border-r-slate-300 w-[267px] h-screen">
        <div
          className="flex my-[12.5px] w-[83px] h-[28px] text-blue-700 text-opacity-60 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mx-2 mt-1" />
          <h2>Back</h2>
        </div>

        <h1 className="mb-[24px] font-bold text-xl">Chapters</h1>
        <ol className="list-decimal list-inside">
          {getChapters &&
            getChapters.map((chapter: any) => (
              <li
                className="mb-[16px] cursor-pointer"
                key={chapter.chpaterId}
                onClick={() => handleChapterSelect(chapter.chapterId)}
              >
                {chapter.title}
              </li>
            ))}
        </ol>
      </div>

      <Outlet />
    </div>
  );
};

export default ChapterRead;
