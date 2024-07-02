import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useCreateComment } from "@/hooks/useComment";
import { useFetchABook } from "@/hooks/useFetchBook";
import CommentSection from "@/components/CommentSection";
import { useGetComments } from "@/hooks/useComment";
import { Progress } from "@radix-ui/react-progress";
import { useFetchAllChapters } from "@/hooks/useFetchChapter";
import { useFetchCurrentChapter } from "@/hooks/useChapterProgress";
import { useCreateBookHistory } from "@/hooks/useBookHistory";

const BookReading: React.FC = () => {
  const { bookSlug } = useParams();
  const [comment, setComment] = useState({
    comment: "",
    slug: "",
  });
  const createComment = useCreateComment();
  const createBookHistory = useCreateBookHistory();
  const { refetch } = useGetComments(bookSlug!);
  const { data: fetchABook, isLoading } = useFetchABook(bookSlug!);
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const { data: getChapterProgress } = useFetchCurrentChapter(bookSlug!);

  const createCommentHandler = () => {
    setComment({ comment: "", slug: bookSlug! });
    createComment.mutate(comment);
  };

  const startReadingHandler = () => {
    createBookHistory.mutate({ bookSlug: bookSlug! });
  };

  const totalChapters = getChapters?.length || 1;
  const currentChapterIndex = getChapterProgress?.chapterId
    ? getChapters.findIndex(
        (chapter: any) => chapter.chapterId === getChapterProgress.chapterId
      ) + 1
    : 0;
  const progressPercentage = (currentChapterIndex / totalChapters) * 100;
  const firstChapterId = getChapters?.[0]?.id || "";

  useEffect(() => {
    if (createComment.isSuccess) {
      refetch();
    }
  }, [createComment.isSuccess]);

  return (
    <div className="flex w-full min-h-screen px-20">
      <div className="flex-col w-10/12 h-full px-10 pt-20 border-r border-border">
        {fetchABook && !isLoading && (
          <div className="flex flex-col gap-[20px] w-full h-full">
            <div className="flex gap-[100px] px-20 pb-20 w-full">
              <div className="flex justify-center items-center bg-blue-200 rounded-full w-[280px] h-[280px]">
                <img
                  src={fetchABook.coverImage}
                  alt={fetchABook.title}
                  className="shadow-lg shadow-secondary-foreground w-[210px]"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 w-[400px]">
                <h1 className="text-3xl font-extrabold">{fetchABook.title}</h1>
                <div className="flex items-center gap-2">
                  <img
                    src={fetchABook.user.profilePicture}
                    alt={fetchABook.user.name}
                    className="rounded-full w-[30px] h-[30px]"
                  />
                  <span className="text-[15px]">By {fetchABook.user.name}</span>
                </div>
                <div className="flex gap-3 mt-[20px]">
                  <span className="text-lg font-bold">Category:</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={fetchABook.category.icon}
                      alt={fetchABook.category.title}
                      className="rounded-full w-[25px] h-[25px]"
                    />
                    <span className="text-sm">{fetchABook.category.title}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg font-bold">Keywords:</span>
                  <div className="flex items-center gap-1">
                    {fetchABook.keywords.map((keyword, index) => (
                      <span key={index} className="text-sm">
                        {keyword}
                        {index < fetchABook.keywords.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <Progress
                    value={progressPercentage}
                    max={100}
                    className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full"
                  >
                    <div
                      style={{ width: `${progressPercentage}%` }}
                      className="h-full bg-blue-600"
                    />
                  </Progress>
                  <div className="mt-2 text-sm">{`Chapter ${currentChapterIndex} of ${totalChapters}`}</div>
                </div>

                <div className="w-full h-5"></div>
                <NavLink to={`chapter/${firstChapterId}`}>
                  <Button onClick={startReadingHandler} size={"full"}>
                    {" "}
                    Start Reading
                  </Button>
                </NavLink>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-20 border-b border-border min-h-[200px]">
              <h1 className="text-2xl font-bold">Book Overview</h1>
              <div className="text-lg">
                {parse(fetchABook.description || "")}
              </div>
            </div>
            <div className="flex flex-col gap-5 px-20 pt-5 pb-5">
              <h1 className="text-lg">Leave a comment</h1>
              <textarea
                value={comment.comment}
                onChange={(event) => {
                  setComment({
                    comment: event.target.value,
                    slug: bookSlug!,
                  });
                }}
                placeholder="Type your comment"
                className="flex justify-center items-center px-4 py-6 border border-border rounded-[12px] w-full placeholder:text-secondary-foreground placeholder:text-opacity-50 resize-none"
              ></textarea>
              <Button
                onClick={createCommentHandler}
                className="rounded-[8px] !font-normal text-sm resize-none"
                style={{ resize: "none" }}
              >
                Post Comment
              </Button>
            </div>

            <CommentSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReading;
