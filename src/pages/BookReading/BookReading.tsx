import React, { useState } from "react";
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

const BookReading: React.FC = () => {
  const { bookSlug } = useParams();
  const [comment, setComment] = useState({
    comment: "",
    slug: "",
  });
  const createComment = useCreateComment();
  const { refetch } = useGetComments(bookSlug!);
  const { data: fetchABook, isLoading } = useFetchABook(bookSlug!);
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const { data: getChapterProgress } = useFetchCurrentChapter(bookSlug!);

  const createCommentHandler = () => {
    setComment({ comment: "", slug: bookSlug! });
    createComment.mutate(comment);
    refetch();
  };

  const totalChapters = getChapters?.length || 1;
  const currentChapterIndex = getChapterProgress?.chapterId ? getChapters.findIndex((chapter:any) => chapter.chapterId === getChapterProgress.chapterId) + 1 : 0;
  const progressPercentage = (currentChapterIndex / totalChapters) * 100;

  return (
    <div className="flex px-20 w-full min-h-screen">
      <div className="flex-col px-10 pt-20 border-r border-border w-10/12 h-full">
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
                <h1 className="font-extrabold text-3xl">{fetchABook.title}</h1>
                <div className="flex items-center gap-2">
                  <img
                    src={fetchABook.user.profilePicture}
                    alt={fetchABook.user.name}
                    className="rounded-full w-[30px] h-[30px]"
                  />
                  <span className="text-[15px]">By {fetchABook.user.name}</span>
                </div>
                <div className="flex gap-3 mt-[20px]">
                  <span className="font-bold text-lg">Category:</span>
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
                  <span className="font-bold text-lg">Keywords:</span>
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
                  <Progress value={progressPercentage} max={100} className="relative bg-gray-200 rounded-full w-full h-2 overflow-hidden">
                    <div style={{ width: `${progressPercentage}%` }} className="bg-blue-600 h-full" />
                  </Progress>
                  <div className="mt-2 text-sm">{`Chapter ${currentChapterIndex} of ${totalChapters}`}</div>
                </div>

                <div className="w-full h-5"></div>
                <NavLink to={"chapter/:chapterId"}>
                  <Button size={"full"}> Start Reading</Button>
                </NavLink>
                
              </div>
            </div>
            <div className="flex flex-col gap-5 px-20 border-b border-border min-h-[200px]">
              <h1 className="font-bold text-2xl">Book Overview</h1>
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
