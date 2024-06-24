import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useCreateComment } from "@/hooks/useComment";
import { useFetchABook } from "@/hooks/useFetchBook";

const BookReading: React.FC = () => {
  const { bookSlug } = useParams();
  const [comment, setComment] = useState({
    comment: "",
    slug: "",
  });
  const createComment = useCreateComment();

  const { data: fetchABook, isLoading } = useFetchABook(bookSlug!);

  const createCommentHandler = () => {
    createComment.mutate(comment);
  };

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

                <div className="w-full h-5"></div>

                <Button size={"full"}> Start Reading</Button>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-20 border-b border-border min-h-[200px]">
              <h1 className="text-2xl font-bold">Book Overview</h1>
              <div className="text-lg">
                {parse(fetchABook.description || "")}
              </div>
            </div>
            <div className="flex flex-col gap-5 px-20 pt-5 pb-8">
              <h1>Leave a comment</h1>
              <textarea
                value={comment.comment}
                onChange={(event) => {
                  setComment({
                    comment: event.target.value,
                    slug: bookSlug!,
                  });
                }}
                className="px-4 py-2 border border-border rounded-[12px] w-full h-20 text-sm"
              ></textarea>
              <Button onClick={createCommentHandler} className="rounded-[8px]">
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReading;