import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "@/api/commentApi";
import { commentData, updateCommentData } from "@/types/types";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export const useCreateComment = () =>
  useMutation({ mutationFn: (data: commentData) => createComment({ data }) });

export const useGetComments = (bookSlug: string) =>
  useInfiniteQuery({
    queryKey: ["comment", bookSlug],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      getComments(queryKey[1], pageParam),
    initialPageParam: 1,
    retry(failureCount, error) {
      return error.message === "404" && failureCount == 1 ? false : true;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === lastPage.meta.totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

export const useUpdateComment = () =>
  useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: updateCommentData;
    }) => editComment(commentId, { data }),
  });

export const useDeleteComment = () =>
  useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
  });
