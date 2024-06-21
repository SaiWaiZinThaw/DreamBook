import { fetchAllBook, fetchBook } from "@/api/bookApi";
import { useQuery } from "@tanstack/react-query";

interface FetchAllBookParams {
  search?: string;
  selectedCategories?: string[];
  sortBy?: string;
  pageCount?: number;
}

export const useFetchABook = (bookSlug: string) =>
  useQuery({ queryKey: ["book"], queryFn: () => fetchBook(bookSlug) });

export const useFetchAllBooks = (params: FetchAllBookParams) =>
  useQuery({
    queryKey: ["allBooks", params],
    queryFn: () => fetchAllBook(params),
  });
