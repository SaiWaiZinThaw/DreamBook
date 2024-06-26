import { useState, useEffect } from "react";
import { useFetchAChapter, useFetchAllChapters } from "@/hooks/useFetchChapter";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const ChapterRead = () => {
  const { bookSlug, chapterId } = useParams<{
    bookSlug: string;
    chapterId?: string;
  }>();
  const navigate = useNavigate();
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const [parsedChapterId, setParsedChapterId] = useState<number | null>(null);
  const {
    data: getChapter,
    isLoading,
    error,
  } = useFetchAChapter(parsedChapterId!);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);

  useEffect(() => {
    // Parse chapterId from string to number when it changes
    if (chapterId) {
      const parsedId = parseInt(chapterId, 10);
      if (!isNaN(parsedId)) {
        setParsedChapterId(parsedId);
        setActiveChapterId(parsedId);
      } else {
        console.error("Invalid chapterId:", chapterId);
      }
    } else {
      console.error("chapterId is undefined");
    }
  }, [chapterId]);

  // Handle navigation and selection of chapters
  const handleChapterSelect = (id: number) => {
    navigate(`/book/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
    setActiveChapterId(id);
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
                className={`mb-[16px] cursor-pointer ${
                  chapter.chapterId === activeChapterId
                    ? "text-primary font-semibold"
                    : ""
                }`}
                key={chapter.chapterId}
                onClick={() => handleChapterSelect(chapter.chapterId)}
              >
                {chapter.title}
              </li>
            ))}
        </ol>
      </div>

      <div className="w-screen p-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading chapter: {error.message}</p>}
        {getChapter && (
          <div className="ml-[108px]">
            <h1 className="mt-[28px] font-bold text-[36px] text-primary">
              {getChapter.title}
            </h1>
            <div
              className="mt-[24px] font-normal text-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getChapter.content),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterRead;
