import { fetchAllBookAuthor, fetchABookAuthor } from "@/api/GetABookAuthorApi";
import { updateBookApi } from "@/api/updateBook";
import { updateBookType } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchABookAuthor = (token: string, bookSlug: string) =>
  useQuery({
    queryKey: ["abookauthor"],
    queryFn: () => fetchABookAuthor(token, bookSlug),
  });

export const useFetchAllBookAuthor = (token: string) =>
  useQuery({
    queryKey: ["abookauthor"],
    queryFn: () => fetchAllBookAuthor(token),
  });

export const useUpdateBook = (bookSlug: string) =>
  useMutation({
    mutationFn: (data: updateBookType) => updateBookApi(bookSlug, { data }),
  });
