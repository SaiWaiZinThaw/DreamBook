import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { useParams } from "react-router-dom";
import {
  useDeleteComment,
  useGetComments,
  useUpdateComment,
} from "@/hooks/useComment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";

const CommentSection = () => {
  const token = getToken() || "";
  const { data: userData, isLoading: userIsLoading } = useGetMe(token!);
  const { bookSlug } = useParams();
  const {
    data: comments,
    isLoading: commentIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useGetComments(bookSlug!);

  // const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({});
  const [editCommentText, setEditCommentText] = useState<{
    [key: number]: string;
  }>({});

  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  // const handleReplyChange = (commentId: number, text: string) => {
  //   setReplyText((prev) => ({ ...prev, [commentId]: text }));
  // };

  const handleEditToggle = (commentId: number, currentText: string) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    if (!isEditing[commentId]) {
      setEditCommentText((prev) => ({ ...prev, [commentId]: currentText }));
    }
  };

  const handleSaveComment = (commentId: number) => {
    if (editCommentText[commentId]) {
      updateComment.mutate({
        commentId,
        data: { comment: editCommentText[commentId] },
      });
    }
    setIsEditing((prev) => ({ ...prev, [commentId]: false }));
  };

  useEffect(() => {
    if (deleteComment.isSuccess) {
      refetch();
    }
    if (updateComment.isSuccess) {
      refetch();
    }
  }, [deleteComment.isSuccess, updateComment.isSuccess, refetch]);

  return (
    <div className="flex flex-col gap-5 px-20 pb-8">
      <span className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Reader's Review</h1>
        {comments ? (
          <span className="flex items-center justify-center px-2 py-1 text-sm font-bold bg-blue-200 rounded-full min-w-8 min-h-6 text-primary">
            {comments.pages[0].meta.totalItems}
          </span>
        ) : (
          <span className="flex items-center justify-center px-2 py-1 text-sm font-bold bg-blue-200 rounded-full min-w-8 min-h-6 text-primary">
            0
          </span>
        )}
      </span>
      {!commentIsLoading &&
        comments?.pages.map((page) =>
          page.items.map((comment) => (
            <div
              className="flex items-start gap-4 p-2 border-b border-b-border"
              key={comment.commentId}
            >
              <img
                src={comment.user.profilePicture}
                alt={comment.user.name}
                className="rounded-full w-[45px] h-[45px]"
              />
              <div className="flex flex-col justify-center w-full gap-1">
                <div className="flex flex-col">
                  <h3 className="font-medium text-[18px]">
                    {comment.user.name}
                  </h3>
                  <span className="text-[11px] text-secondary-foreground">
                    {format(parseISO(comment.cratedAt), "eeee do MMM, yyyy")}
                  </span>
                </div>

                {isEditing[comment.commentId] ? (
                  <textarea
                    value={editCommentText[comment.commentId]}
                    onChange={(e) =>
                      setEditCommentText((prev) => ({
                        ...prev,
                        [comment.commentId]: e.target.value,
                      }))
                    }
                    className="p-2 m-2 border border-border rounded-[5px] resize-none"
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}
                <div className="flex self-end gap-3">
                  {!userIsLoading &&
                    userData?.userId === comment.user.userId && (
                      <Button
                        className="w-10 rounded-[4px] px-8 !text-[12px] !bg-primary h-8"
                        onClick={() =>
                          handleEditToggle(comment.commentId, comment.comment)
                        }
                      >
                        {isEditing[comment.commentId] ? "Cancel" : "Edit"}
                      </Button>
                    )}
                  {isEditing[comment.commentId] ? (
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => handleSaveComment(comment.commentId)}
                        className="w-10 !text-[12px] rounded-[4px] px-8 !bg-primary h-8"
                      >
                        Save
                      </Button>
                      {deleteComment.isPending ? (
                        <Button className="self-center !bg-red-500 h-8 rounded-[4px] w-16">
                          <Loader2 className="text-white animate-spin" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            deleteComment.mutate(comment.commentId)
                          }
                          className="w-10 !text-[12px] rounded-[4px] px-8 !bg-red-500 h-8"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button className="w-10 !text-[12px] rounded-[4px] px-8 !bg-primary h-8">
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      {comments?.pages[0].items.length !== 0 && hasNextPage && !isFetching ? (
        <Button
          className="bg-primary rounded-[6px] w-24 self-center"
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      ) : (
        isFetchingNextPage && (
          <Button disabled className="self-center rounded-[8px] w-24">
            <Loader2 className="text-white animate-spin" />
          </Button>
        )
      )}
    </div>
  );
};

export default CommentSection;
