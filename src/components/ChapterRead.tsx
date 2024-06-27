
import { useState, useEffect } from 'react';
import { useFetchAChapter, useFetchAllChapters } from '@/hooks/useFetchChapter';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useCreateChapterProgress } from '@/hooks/useChapterProgress';


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

  useEffect(() => {
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

  const handleChapterSelect = (id: number) => {
    navigate(`/book/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
    setActiveChapterId(id);
    createChapterProgress.mutate({ slug: bookSlug!, chapterId: id });
    console.log(createChapterProgress.data.progressId);
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


      <div className="flex flex-col w-screen min-h-screen">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading chapter: {error.message}</p>}
        {getChapter && (
          <div className="ml-[108px] p-4">
            <h1 className="mt-[28px] font-bold text-[36px] text-primary">{getChapter.title}</h1>
            <div className="mt-[24px] font-normal text-lg" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getChapter.content) }} />

          </div>
        )}

        <div className="flex justify-between mt-auto border border-t-slate-300">
          <button className="flex justify-center items-center border-slate-300 my-[15.5px] border rounded-[8px] w-[113px] h-[42px]"><SlArrowLeft className='mt-[2px] mr-2'/>Previous</button>
          <button className="flex justify-center items-center bg-primary my-[15.5px] border rounded-[8px] w-[113px] h-[42px] text-slate-50">Next <SlArrowRight className='mt-[2px] ml-2'/></button>
        </div>
      </div>
    </div>
  );
};

export default ChapterRead;
