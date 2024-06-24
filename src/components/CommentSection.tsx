import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { CommentDataArray } from "@/types/types";
import { Button } from "@mui/material";

const CommentSection = ({
  comments,
  commentIsLoading,
}: {
  comments: CommentDataArray[];
  commentIsLoading: boolean;
}) => {
  const token = getToken();
  const { data, isLoading } = useGetMe(token!);
  return (
    <div className="flex flex-col gap-5 px-20 pb-8">
      <h1 className="text-lg font-semibold">Reader's Review</h1>

      {!commentIsLoading &&
        comments?.map((comment) => (
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
                <h3 className="text-[18px] font-medium">{comment.user.name}</h3>
                <span className="text-[11px] text-secondary-foreground">
                  May 25, 2024
                </span>
              </div>
              <p>{comment.comment}</p>
              <div className="flex self-end gap-3">
                <Button className="w-10 !text-white !normal-case !text-[12px] !bg-red-500 h-8 !hidden">
                  Delete
                </Button>
                {!isLoading && data?.userId === comment.user.userId && (
                  <Button className="w-10 !text-white !normal-case !text-[12px] !bg-primary h-8 ">
                    Edit
                  </Button>
                )}
                <Button className="w-10 !text-white !normal-case !text-[12px] !bg-primary h-8 ">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentSection;
