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
      <div className="flex w-full min-h-screen px-20 ">
        <div className="flex-col w-10/12 h-full px-10 pt-20 border-r border-border">
          {/* <button className="text-primary">
        <HiArrowNarrowLeft /> Back
      </button> */}
          {fetchABookAuthor && !isLoading && (
            <div className="flex flex-col w-full  gap-[20px]  h-full ">
              <div className="px-20 flex w-full gap-[100px] pb-20">
                <div className="w-[280px] h-[280px] rounded-full bg-blue-200 flex items-center justify-center">
                  <img
                    src={fetchABookAuthor.coverImage}
                    alt={fetchABookAuthor.title}
                    className="w-[210px] shadow-lg shadow-secondary-foreground"
                  />
                </div>
                <div className="flex flex-col justify-center w-[400px] gap-3">
                  <h1 className="text-3xl font-extrabold">
                    {fetchABookAuthor.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={fetchABookAuthor.user.profilePicture}
                      alt={fetchABookAuthor.user.name}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <span className="text-[15px]">
                      By {fetchABookAuthor.user.name}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-[20px]">
                    <span className="text-lg font-bold">Category:</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={fetchABookAuthor.category.icon}
                        alt={fetchABookAuthor.category.title}
                        className="w-[25px] h-[25px] rounded-full"
                      />
                      <span className="text-sm">
                        {fetchABookAuthor.category.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg font-bold">Keywords:</span>
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
              <div className="flex flex-col gap-5 px-20 min-h-[200px] border-b border-border">
                <h1 className="text-2xl font-bold">Book Overview</h1>
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
                  className="w-full h-20 border px-4 py-2 text-sm border-border rounded-[12px]"
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
