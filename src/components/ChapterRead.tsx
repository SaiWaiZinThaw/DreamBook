
import { useState, useEffect } from 'react';
import { useFetchAChapter, useFetchAllChapters } from '@/hooks/useFetchChapter';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useCreateChapterProgress, useFetchCurrentChapter, useUpdateChapterProgress } from '@/hooks/useChapterProgress';


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
  const { data: getChapterProgress} = useFetchCurrentChapter(bookSlug!)
  const updateProgress = useUpdateChapterProgress(bookSlug!);

  useEffect(() => {
    if(getChapterProgress?.chapterId) {
      setParsedChapterId(getChapterProgress.chapterId);
      console.log(getChapterProgress.progressId)
      // navigate(`/book/${bookSlug}/chapters/${lastReadChapter}`);
    } else if (chapterId) {
      setParsedChapterId(parseInt(chapterId, 10))
    }
  }, [getChapterProgress])

  const handleChapterSelect = (id: number) => {
    navigate(`/book/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
    setActiveChapterId(id);

    const existingProgress = getChapterProgress?.chapterId === id;
    console.log(existingProgress)
    if(existingProgress) {
      updateProgress.mutate({ chapterId: id });
      // console.log(updateProgress.data.progressId);
    } else {
      createChapterProgress.mutate({ slug: bookSlug!, chapterId: id });
      // console.log(createChapterProgress.data.progressId);
    }
  };

  useEffect(() => {
    if (updateProgress.isSuccess) {
      console.log("Update Progress Success:", updateProgress.data);
    }
    if (updateProgress.isError) {
      console.error("Update Progress Error:", updateProgress.error);
    }
  }, [updateProgress]);


  const currentChapterIndex = getChapters?.findIndex((chapter:any) => chapter.chapterId === parsedChapterId) + 1;
  const totalChapters = getChapters?.length;

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
          <button 
            onClick={()=> {
              if(currentChapterIndex > 1) {
                handleChapterSelect(getChapters[currentChapterIndex -2].chapterId);
              }
            }} 
            disabled={currentChapterIndex <= 1}
            className="flex justify-center items-center border-slate-300 my-[15.5px] border rounded-[8px] w-[113px] h-[42px]">
              <SlArrowLeft className='mt-[2px] mr-2'/>
              Previous
          </button>

          <div className="flex items-center">{currentChapterIndex} / {totalChapters}</div>
          <button
            onClick={() => {
              if(currentChapterIndex < totalChapters) {
                handleChapterSelect(getChapters[currentChapterIndex].chapterId);
              }
            }}
            disabled={currentChapterIndex >= totalChapters}
            className="flex justify-center items-center bg-primary my-[15.5px] border rounded-[8px] w-[113px] h-[42px] text-slate-50">
              Next 
              <SlArrowRight className='mt-[2px] ml-2'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterRead;
