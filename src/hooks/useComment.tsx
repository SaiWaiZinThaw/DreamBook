import { createComment, getComments } from "@/api/commentApi";
import { commentData } from "@/types/types";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export const useCreateComment = () =>
  useMutation({ mutationFn: (data: commentData) => createComment({ data }) });

export const useGetComments = (bookSlug: string) =>
  useInfiniteQuery({
    queryKey: ["comment", bookSlug],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      getComments(queryKey[1], pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === lastPage.meta.totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
