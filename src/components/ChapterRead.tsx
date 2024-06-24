import { useState, useEffect } from 'react';
import { useFetchAChapter, useFetchAllChapters } from '@/hooks/useFetchChapter';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ChapterRead = () => {
  const { bookSlug, chapterId } = useParams<{ bookSlug: string, chapterId?: string }>(); // Make chapterId optional
  const navigate = useNavigate();
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const [parsedChapterId, setParsedChapterId] = useState<number | null>(null)
  const { data: getChapter, isLoading, error } = useFetchAChapter(parsedChapterId !);

  useEffect(() => {
    // Parse chapterId from string to number when it changes
    if (chapterId) {
      const parsedId = parseInt(chapterId, 10);
      if (!isNaN(parsedId)) {
        setParsedChapterId(parsedId);
      } else {
        console.error('Invalid chapterId:', chapterId);
      }
    } else {
      console.error('chapterId is undefined');
    }
  }, [chapterId]);

  // Handle navigation and selection of chapters
  const handleChapterSelect = (id: number) => {
    navigate(`/book/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
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
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter.id)}
              >
                {chapter.title}
              </li>
            ))}
        </ol>
      </div>

      <div className="p-4 w-screen">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading chapter: {error.message}</p>}
        {getChapter && (
          <div>
            <h2 className="font-bold text-2xl">{getChapter.title}</h2>
            <p>{getChapter.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterRead;
