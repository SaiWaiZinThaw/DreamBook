import { createComment, getComments } from "@/api/commentApi";
import { commentData } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateComment = () =>
  useMutation({ mutationFn: (data: commentData) => createComment({ data }) });

export const useGetComments = (bookSlug: string) =>
  useQuery({ queryKey: ["comments"], queryFn: () => getComments(bookSlug) });
