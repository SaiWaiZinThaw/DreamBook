import { useState, useEffect } from "react";
import { useFetchAChapter, useFetchAllChapters } from "@/hooks/useFetchChapter";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import {
  useCreateChapterProgress,
  useFetchCurrentChapter,
  useUpdateChapterProgress,
} from "@/hooks/useChapterProgress";
import { FiAlignJustify } from "react-icons/fi";
import { LogoBlue } from "@/assets";

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
  const createChapterProgress = useCreateChapterProgress();
  const { data: getChapterProgress, error: progressError } = useFetchCurrentChapter(bookSlug!);
  const updateProgress = useUpdateChapterProgress();
  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    if (getChapterProgress?.chapterId) {
      setParsedChapterId(getChapterProgress.chapterId);
      console.log('Fetched chapter progress:', getChapterProgress.chapterId);
    } else if (chapterId) {
      setParsedChapterId(parseInt(chapterId, 10));
    }
  }, [getChapterProgress, chapterId]);

  useEffect(() => {
    if (progressError && (progressError as any).response?.status === 404 && chapterId) {
      console.log('Creating chapter progress due to 404 error:', { bookSlug, chapterId });
      createChapterProgress.mutate({ slug: bookSlug!, chapterId: parseInt(chapterId, 10) });
    }
  }, [progressError, chapterId, bookSlug, createChapterProgress]);

  const handleChapterSelect = (id: number) => {
    navigate(`/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
    setActiveChapterId(id);

    if (getChapterProgress?.chapterId === id) {
      updateProgress.mutate({ bookSlug: bookSlug!, data: { chapterId: id } });
    } else {
      console.log('Creating new progress:', { bookSlug, chapterId: id });
      createChapterProgress.mutate({ slug: bookSlug!, chapterId: id });
    }
    setShowChapters(false);
  };

  useEffect(() => {
    if (updateProgress.isSuccess) {
      console.log("Update Progress Success:", updateProgress.data);
    }
    if (updateProgress.isError) {
      console.error("Update Progress Error:", updateProgress.error);
    }
  }, [updateProgress]);

  const currentChapterIndex =
    getChapters?.findIndex(
      (chapter: any) => chapter.chapterId === parsedChapterId
    ) + 1;
  const totalChapters = getChapters?.length;

  return (
    <div className="flex md:flex-row flex-col">
      <div className="flex md:flex-row flex-col">
        <div className="flex border-slate-300 md:hidden shadow-md border-b w-screen h-[50px]">
          <FiAlignJustify onClick={() => setShowChapters(!showChapters)} className="mt-3 ml-4 text-2xl cursor-pointer" />
          <img src={LogoBlue} className="ml-4 w-[160px] h-[50px]" />
        </div>
        <div className={`md:pl-[26px] pl-2 md:border md:border-r-slate-300 w-[120px] md:w-[267px] h-screen ${showChapters ? '' : 'hidden md:block'}`}>
          <div
            className="flex my-2 md:my-[12.5px] md:w-[83px] md:h-[28px] text-[14px] text-blue-700 md:text-[16px] text-opacity-60 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mx-2 mt-1" />
            <h2>Back</h2>
          </div>

          <h1 className="mb-2 md:mb-[24px] font-bold md:text-xl">Chapters</h1>
          <ol className="list-decimal list-inside">
            {getChapters &&
              getChapters.map((chapter: any) => (
                <li
                  className={`md:mb-[16px] text-[12px] md:text-[16px] mb-2 cursor-pointer ${chapter.chapterId === activeChapterId ? "text-primary font-semibold" : ""
                    }`}
                  key={chapter.chapterId}
                  onClick={() => handleChapterSelect(chapter.chapterId)}
                >
                  {chapter.title}
                </li>
              ))}
          </ol>
        </div>
      </div>

      <div className="flex flex-col w-screen min-h-screen">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading chapter: {error.message}</p>}
        {getChapter && (
          <div className="md:ml-[108px] p-3 md:p-4">
            <h1 className="md:mt-[28px] font-bold text-[20px] text-primary md:text-[36px]">
              {getChapter.title}
            </h1>
            <div
              className="mt-2 md:mt-[24px] md:ml-0 font-normal text-sm md:text-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getChapter.content),
              }}
            />
          </div>
        )}

        <div className="flex justify-between mt-auto border border-t-slate-300">
          <button
            onClick={() => {
              if (currentChapterIndex > 1) {
                handleChapterSelect(
                  getChapters[currentChapterIndex - 2].chapterId
                );
              }
            }}
            disabled={currentChapterIndex <= 1}
            className="flex justify-center items-center border-slate-300 my-4 md:my-[15.5px] ml-1 md:ml-2 border rounded-[8px] w-[80px] md:w-[113px] h-[40px] md:h-[42px] text-[14px] md:text-[16px]"
          >
            <SlArrowLeft className="mt-[2px] mr-1 md:mr-2 w-2 md:w-[20px]" />
            Previous
          </button>

          <div className="flex items-center text-[14px] md:text-[16px]">
            {currentChapterIndex} / {totalChapters}
          </div>

          <button
            onClick={() => {
              if (currentChapterIndex < totalChapters) {
                handleChapterSelect(getChapters[currentChapterIndex].chapterId);
              }
            }}
            disabled={currentChapterIndex >= totalChapters}
            className="flex justify-center items-center bg-primary my-4 md:my-[15.5px] mr-4 md:mr-2 border rounded-[8px] w-[80px] md:w-[113px] h-[40px] md:h-[42px] text-[14px] text-slate-50 md:text-[16px]"
          >
            Next
            <SlArrowRight className="mt-[2px] ml-1 md:ml-2 w-2 md:w-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterRead;
