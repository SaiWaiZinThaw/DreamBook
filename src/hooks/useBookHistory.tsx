import {
  createBookHistory,
  deleteHistory,
  getAllBookHistory,
} from "@/api/bookHistoryApi";
import { useMutation, useQuery } from "@tanstack/react-query";

interface FetchAllBookHistoryParams {
  pageCount?: number;
}

export const useCreateBookHistory = () =>
  useMutation({
    mutationFn: ({ bookSlug }: { bookSlug: string }) =>
      createBookHistory(bookSlug),
  });

export const useFetchAllHistory = (params: FetchAllBookHistoryParams) =>
  useQuery({
    queryKey: ["history", params],
    queryFn: () => getAllBookHistory(params),
  });

export const useDeleteHistory = () =>
  useMutation({ mutationFn: (bookSlug: string) => deleteHistory(bookSlug) });
