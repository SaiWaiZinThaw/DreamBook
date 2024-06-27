import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { useParams } from "react-router-dom";
import { useGetComments } from "@/hooks/useComment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
const CommentSection = () => {
  const token = getToken();
  const { data, isLoading } = useGetMe(token!);
  const { bookSlug } = useParams();
  const {
    data: comments,
    isLoading: commentIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetComments(bookSlug!);
  return (
    <div className="flex flex-col gap-5 px-20 pb-8">
      <span className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Reader's Review</h1>
        {comments ? (
          <span className="flex items-center justify-center px-2 py-1 text-sm font-bold bg-blue-200 rounded-full text-primary min-w-8 min-h-6">
            {comments.pages[0].meta.totalItems}
          </span>
        ) : (
          <span className="flex items-center justify-center px-2 py-1 text-sm font-bold bg-blue-200 rounded-full text-primary min-w-8 min-h-6">
            0
          </span>
        )}
      </span>
      {!commentIsLoading &&
        comments?.pages.map((pages) =>
          pages.items.map((comment) => (
            <div
              className="flex items-start gap-4 p-2 border-b border-b-border"
              key={comment.commentId}
            >
              <img
                src={comment.user.profilePicture}
                alt={comment.user.name}
                className="w-[45px] h-[45px] rounded-full"
              />
              <div className="flex flex-col justify-center w-full gap-1">
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-medium">
                    {comment.user.name}
                  </h3>
                  <span className="text-[11px] text-secondary-foreground">
                    {format(parseISO(comment.cratedAt), "eeee do MMM, yyyy")}
                  </span>
                </div>
                <p>{comment.comment}</p>
                <div className="flex self-end gap-3">
                  <Button className="w-10  rounded-[4px] px-8 !text-[12px] !bg-red-500 h-8 hidden">
                    Delete
                  </Button>
                  {!isLoading && data?.userId === comment.user.userId && (
                    <Button className="w-10  rounded-[4px] px-8 !text-[12px] !bg-primary h-8 ">
                      Edit
                    </Button>
                  )}
                  <Button className="w-10  !text-[12px] rounded-[4px] px-8 !bg-primary h-8 ">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      {hasNextPage && !isFetching ? (
        <Button
          className="self-center rounded-[6px] w-24 bg-primary"
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      ) : (
        isFetching && (
          <Button disabled className="self-center rounded-[8px] w-24">
            <Loader2 className="text-white animate-spin" />
          </Button>
        )
      )}
    </div>
  );
};

export default CommentSection;
