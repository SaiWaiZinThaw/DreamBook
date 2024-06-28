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
        <h1 className="font-semibold text-lg">Reader's Review</h1>
        {comments ? (
          <span className="flex justify-center items-center bg-blue-200 px-2 py-1 rounded-full min-w-8 min-h-6 font-bold text-primary text-sm">
            {comments.pages[0].meta.totalItems}
          </span>
        ) : (
          <span className="flex justify-center items-center bg-blue-200 px-2 py-1 rounded-full min-w-8 min-h-6 font-bold text-primary text-sm">
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
                className="rounded-full w-[45px] h-[45px]"
              />
              <div className="flex flex-col justify-center gap-1 w-full">
                <div className="flex flex-col">
                  <h3 className="font-medium text-[18px]">
                    {comment.user.name}
                  </h3>
                  <span className="text-[11px] text-secondary-foreground">
                    {format(parseISO(comment.cratedAt), "eeee do MMM, yyyy")}
                  </span>
                </div>
                <p>{comment.comment}</p>
                <div className="flex gap-3 self-end">
                  <Button className="hidden !bg-red-500 px-8 rounded-[4px] w-10 h-8 !text-[12px]">
                    Delete
                  </Button>
                  {!isLoading && data?.userId === comment.user.userId && (
                    <Button className="!bg-primary px-8 rounded-[4px] w-10 h-8 !text-[12px]">
                      Edit
                    </Button>
                  )}
                  <Button className="!bg-primary px-8 rounded-[4px] w-10 h-8 !text-[12px]">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      {hasNextPage && !isFetching ? (
        <Button
          className="bg-primary rounded-[6px] w-24 self-center"
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      ) : (
        isFetching && (
          <Button disabled className="rounded-[8px] w-24 self-center">
            <Loader2 className="text-white animate-spin" />
          </Button>
        )
      )}
    </div>
  );
};

export default CommentSection;