import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { useParams } from "react-router-dom";
import {
  useCreateReplyComment,
  useDeleteComment,
  useDeleteReplyComment,
  useGetComments,
  useUpdateComment,
  useUpdateReplyComment,
} from "@/hooks/useComment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";

const CommentSection = () => {
  const token = getToken() || "";
  const createReplyComment = useCreateReplyComment();
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

  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({});
  const [editCommentText, setEditCommentText] = useState<{
    [key: number]: string;
  }>({});
  const [editReplyCommentText, setEditReplyCommentText] = useState<{
    [key: number]: string;
  }>({});
  const [isReplying, setIsReplying] = useState<{ [key: number]: boolean }>({});

  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const updateReply = useUpdateReplyComment();
  const deleteReplyComment = useDeleteReplyComment();

  const handleReplyChange = (commentId: number, text: string) => {
    setReplyText((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleEditToggle = (commentId: number, currentText: string) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    if (!isEditing[commentId]) {
      setEditCommentText((prev) => ({ ...prev, [commentId]: currentText }));
    }
  };

  const handleEditReplyToggle = (commentId: number, currentText: string) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    if (!isEditing[commentId]) {
      setEditReplyCommentText((prev) => ({
        ...prev,
        [commentId]: currentText,
      }));
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

  const handleSaveReplyComment = (replyId: number) => {
    console.log(replyId);
    if (editReplyCommentText[replyId]) {
      updateReply.mutate({
        commentId: replyId,
        data: { comment: editReplyCommentText[replyId] },
      });
    }
    setIsEditing((prev) => ({ ...prev, [replyId]: false }));
  };

  const handleReplyToggle = (commentId: number) => {
    setIsReplying((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplyComment = (commentId: number) => {
    if (replyText[commentId]) {
      createReplyComment.mutate({
        replyTo: commentId,
        comment: replyText[commentId],
      });
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    }
    setIsReplying((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleDeleteReply = (replyId: number) => {
    deleteReplyComment.mutate(replyId);
  };

  useEffect(() => {
    if (
      deleteComment.isSuccess ||
      updateComment.isSuccess ||
      createReplyComment.isSuccess ||
      deleteReplyComment.isSuccess ||
      updateReply.isSuccess
    ) {
      refetch();
    }
  }, [
    deleteComment.isSuccess,
    updateComment.isSuccess,
    createReplyComment.isSuccess,
    deleteReplyComment.isSuccess,
    updateReply.isSuccess,
    refetch,
  ]);

  return (
    <div className="flex flex-col gap-5 px-5 md:px-20 md:pb-8">
      <span className="flex items-center gap-2">
        <h1 className="font-semibold md:text-lg">Reader's Review</h1>
        {comments ? (
          <span className="flex justify-center items-center bg-blue-200 md:px-2 md:py-1 p-1 rounded-full min-w-8 min-h-6 font-bold text-primary text-sm">
            {comments.pages[0].meta.totalItems}
          </span>
        ) : (
          <span className="flex justify-center items-center bg-blue-200 md:px-2 md:py-1 p-1 rounded-full min-w-8 min-h-6 font-bold text-primary text-sm">
            0
          </span>
        )}
      </span>
      {!commentIsLoading &&
        comments?.pages.map((page) =>
          page.items.map((comment) => (
            <div
              className="flex flex-col border-b border-b-border"
              key={comment.commentId}
            >
              <div className="flex items-start gap-4 p-2">
                <img
                  src={comment.user.profilePicture}
                  alt={comment.user.name}
                  className="rounded-full w-[30px] md:w-[45px] h-[30px] md:h-[45px]"
                />
                <div className="flex flex-col justify-center gap-1 w-full">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[15px] md:text-[18px]">
                      {comment.user.name}
                    </h3>
                    <span className="text-[9px] text-secondary-foreground md:text-[11px]">
                      {format(parseISO(comment.createdAt), "eeee do MMM, yyyy")}
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
                      className="md:m-2 p-2 border border-border rounded-[5px] w-full resize-none"
                    />
                  ) : (
                    <p className="text-[14px] md:text-[16px]">
                      {comment.comment}
                    </p>
                  )}
                  <div className="flex gap-3 self-end">
                    {!userIsLoading &&
                      userData?.userId === comment.user.userId && (
                        <Button
                          className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
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
                          className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                        >
                          Save
                        </Button>
                        {deleteComment.isPending ? (
                          <Button className="!bg-red-500 rounded-[4px] w-16 h-8 self-center">
                            <Loader2 className="text-white animate-spin" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              deleteComment.mutate(comment.commentId)
                            }
                            className="!bg-red-500 px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                        onClick={() => handleReplyToggle(comment.commentId)}
                      >
                        {isReplying[comment.commentId] ? "Cancel" : "Reply"}
                      </Button>
                    )}
                  </div>
                  {isReplying[comment.commentId] && (
                    <div className="flex gap-2 h-[100px]">
                      <img
                        src={userData?.profilePicture}
                        alt={userData?.name}
                        className="rounded-full w-[30px] md:w-[40px] h-[30px] md:h-[40px]"
                      />
                      <textarea
                        placeholder="Reply here"
                        value={replyText[comment.commentId] || ""}
                        onChange={(e) =>
                          handleReplyChange(comment.commentId, e.target.value)
                        }
                        className="p-2 border border-border rounded-[5px] w-[400px] h-[18] text-sm resize-none self-start"
                      ></textarea>
                      <Button
                        className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px] self-end"
                        onClick={() => handleReplyComment(comment.commentId)}
                      >
                        Done
                      </Button>
                      <Button
                        onClick={() =>
                          setIsReplying((prev) => ({
                            ...prev,
                            [comment.commentId]: false,
                          }))
                        }
                        className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px] self-end"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  <div className="border-gray-300 ml-8 pl-4 border-l-2">
                    {comment.replies.map((reply) => (
                      <div
                        className="flex gap-2 md:min-h-[100px]"
                        key={reply.id}
                      >
                        <img
                          src={reply.user.profilePicture}
                          alt={reply.user.name}
                          className="rounded-full w-[30px] md:w-[40px] h-[30px] md:h-[40px]"
                        />
                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex flex-col">
                            <h3 className="font-medium text-[10px] md:text-[13px]">
                              {reply.user.name}
                            </h3>
                            <span className="text-[8px] text-secondary-foreground md:text-[9px]">
                              {format(
                                parseISO(reply.createdAt),
                                "eeee do MMM, yyyy"
                              )}
                            </span>
                          </div>

                          {isEditing[reply.id] ? (
                            <textarea
                              value={editReplyCommentText[reply.id]}
                              onChange={(e) =>
                                setEditReplyCommentText((prev) => ({
                                  ...prev,
                                  [reply.id]: e.target.value,
                                }))
                              }
                              className="m-2 p-2 border border-border rounded-[5px] text-[10px] md:text-[13px] resize-none"
                            />
                          ) : (
                            <p className="text-[13px] md:text-[16px]">
                              {reply.comment}
                            </p>
                          )}
                          <div className="flex gap-3 self-end">
                            {!userIsLoading &&
                              userData?.userId === reply.user.userId && (
                                <Button
                                  className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                                  onClick={() =>
                                    handleEditReplyToggle(
                                      reply.id,
                                      reply.comment
                                    )
                                  }
                                >
                                  {isEditing[reply.id] ? "Cancel" : "Edit"}
                                </Button>
                              )}
                            {isEditing[reply.id] ? (
                              <div className="flex items-center gap-3">
                                <Button
                                  onClick={() =>
                                    handleSaveReplyComment(reply.id)
                                  }
                                  className="!bg-primary px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                                >
                                  Save
                                </Button>
                                {deleteReplyComment.isPending ? (
                                  <Button className="!bg-red-500 rounded-[4px] w-16 h-8 self-center">
                                    <Loader2 className="text-white animate-spin" />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleDeleteReply(reply.id)}
                                    className="!bg-red-500 px-8 rounded-[4px] w-8 md:w-10 h-6 md:h-8 text-[10px] !md:text-[12px]"
                                  >
                                    Delete
                                  </Button>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
          <Button disabled className="rounded-[8px] w-24 self-center">
            <Loader2 className="text-white animate-spin" />
          </Button>
        )
      )}
    </div>
  );
};

export default CommentSection;
