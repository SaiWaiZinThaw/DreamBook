import { useDeleteComment, useGetComments } from "@/hooks/useComment"
import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect } from "react";
import { format } from "date-fns";

const Comments = () => {
  const {bookSlug} = useParams();
  const navigate = useNavigate();
  const {data: getComment, refetch} = useGetComments(bookSlug!);
  console.log(getComment);
  const deleteComment = useDeleteComment();

  const replyHandle = () => {
    navigate(`/book/${bookSlug}/comments`)
  }

  useEffect(() => {
    if(deleteComment.isSuccess){
      console.log('Comment deleted successfully, refetching comments...');
      refetch();
    }
  }, [deleteComment.isSuccess, refetch]);
  
  return (
    <div>
        {
          getComment?.pages.map((page) => 
          page.items.map((comment)=> (
            <div className="flex flex-col justify-center shadow-secondary-foreground shadow-sm m-3 p-4 border border-border rounded-[8px]" key={comment.commentId}>
              <div className="flex justify-between items-center">
                    <p key={comment.user.userId} className="flex font-medium text-[14px] md:text-[16px]">
                      <img src={comment.user.profilePicture} className="mt-1 mr-1 rounded-full w-[20px] md:w-[25px] h-[20px] md:h-[25px]" alt="" />
                      <span className="mt-[2px] md:mt-1">{comment.user.name}</span>
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <HiOutlineDotsVertical className="text-xl" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex flex-col justify-center items-center">
                        <DropdownMenuItem onClick={replyHandle} className="border-b border-border text-primary">
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => deleteComment.mutate(comment.commentId)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              <p className="mt-2 font-semibold">{comment.comment}</p>
              <span className="mt-2 font-medium text-[12px] text-slate-400 md:text-[14px]">{format(new Date(comment.createdAt), 'dd MMMM yyyy')}</span>
            </div>
            
          )))
        }
    </div>
  )
}

export default Comments;