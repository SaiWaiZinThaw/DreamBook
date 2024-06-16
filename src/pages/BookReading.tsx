import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@/services/authService";
import { useFetchABookAuthor } from "@/hooks/useFetchABookAuthor";
import { NavBar } from "@/components";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useCreateComment } from "@/hooks/useComment";

const BookReading: React.FC = () => {
  const { bookID } = useParams<{ bookID: string }>();
  const [comment, setComment] = useState({
    comment: "",
    bookId: 0,
  });
  const token = getToken() || "";
  const createComment = useCreateComment();

  const { data: fetchABookAuthor, isLoading } = useFetchABookAuthor(
    token,
    parseInt(bookID!)
  );

  const createCommentHandler = () => {
    createComment.mutate(comment);
  };

  return (
    <div>
      <NavBar />
      <div className="flex px-20 w-full min-h-screen">
        <div className="flex-col px-10 pt-20 border-r border-border w-10/12 h-full">
          {/* <button className="text-primary">
        <HiArrowNarrowLeft /> Back
      </button> */}
          {fetchABookAuthor && !isLoading && (
            <div className="flex flex-col gap-[20px] w-full h-full">
              <div className="flex gap-[100px] px-20 pb-20 w-full">
                <div className="flex justify-center items-center bg-blue-200 rounded-full w-[280px] h-[280px]">
                  <img
                    src={fetchABookAuthor.coverImage}
                    alt={fetchABookAuthor.title}
                    className="shadow-lg shadow-secondary-foreground w-[210px]"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 w-[400px]">
                  <h1 className="font-extrabold text-3xl">
                    {fetchABookAuthor.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={fetchABookAuthor.user.profilePicture}
                      alt={fetchABookAuthor.user.name}
                      className="rounded-full w-[30px] h-[30px]"
                    />
                    <span className="text-[15px]">
                      By {fetchABookAuthor.user.name}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="font-bold text-lg">Category:</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={fetchABookAuthor.category.icon}
                        alt={fetchABookAuthor.category.title}
                        className="rounded-full w-[25px] h-[25px]"
                      />
                      <span className="text-sm">
                        {fetchABookAuthor.category.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold text-lg">Keywords:</span>
                    <div className="flex items-center gap-1">
                      {fetchABookAuthor.keywords.map((keyword, index) => (
                        <span key={index} className="text-sm">
                          {keyword}
                          {index < fetchABookAuthor.keywords.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-5"></div>

                  <Button size={"full"}> Start Reading</Button>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-20 border-b border-border min-h-[200px]">
                <h1 className="font-bold text-2xl">Book Overview</h1>
                <div className="text-lg">
                  {parse(fetchABookAuthor.description)}
                </div>
              </div>
              <div className="flex flex-col gap-5 px-20 pt-5 pb-8">
                <h1>Leave a comment</h1>
                <textarea
                  value={comment.comment}
                  onChange={(event) => {
                    setComment({
                      comment: event.target.value,
                      bookId: parseInt(bookID!),
                    });
                  }}
                  className="px-4 py-2 border border-border rounded-[12px] w-full h-20 text-sm"
                ></textarea>
                <Button
                  onClick={createCommentHandler}
                  className="rounded-[8px]"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReading;
