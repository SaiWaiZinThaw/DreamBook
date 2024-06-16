import { fetchABookAuthor } from "@/api";
import { updateBookApi } from "@/api/updateBook";
import { updateBookType } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchABookAuthor = (token: string, bookSlug: string) =>
  useQuery({
    queryKey: ["abookauthor"],
    queryFn: () => fetchABookAuthor(token, bookSlug),
  });

export const useUpdateBook = (bookSlug: string) =>
  useMutation({
    mutationFn: (data: updateBookType) => updateBookApi(bookSlug, { data }),
  });
