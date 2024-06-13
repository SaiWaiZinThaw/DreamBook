import { deleteChapter, getAuthorChapter } from "@/api/getChapter";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchAuthorAChapter = (bookId: string) =>
  useQuery({
    queryKey: ["authorChapter"],
    queryFn: () => getAuthorChapter(bookId),
  });

export const useDeleteChapter = () =>
  useMutation({
    mutationFn: (chapterId: string) => deleteChapter(chapterId),
  });
