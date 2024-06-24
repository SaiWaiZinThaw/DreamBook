import { useFetchAChapter } from "@/hooks/useFetchChapter";
import { useParams } from "react-router-dom";

const Chapter = () => {
  const { id } = useParams();
  const {
    data: getChapter,
    isLoading,
    error,
  } = useFetchAChapter(parseInt(id!));
  return (
    <div className="w-screen p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading chapter: {error.message}</p>}
      {getChapter && (
        <div>
          <h2 className="text-2xl font-bold">{getChapter.title}</h2>
          <p>{getChapter.content}</p>
        </div>
      )}
    </div>
  );
};

export default Chapter;
