import { deleteChapter, getAuthorChapter } from "@/api/getChapter";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchAuthorAChapter = (bookSlug: string) =>
  useQuery({
    queryKey: ["authorChapter"],
    queryFn: () => getAuthorChapter(bookSlug),
  });

export const useDeleteChapter = () =>
  useMutation({
    mutationFn: (chapterId: string) => deleteChapter(chapterId),
  });
