import { fetchAllBook, fetchBook, fetchPopularBooks } from "@/api/bookApi";
import { useQuery } from "@tanstack/react-query";

interface FetchAllBookParams {
  deBounceSearch?: string;
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

export const useFetchPopularBooks = () =>
  useQuery({
    queryKey: ["popular Books"],
    queryFn: () => fetchPopularBooks(),
  });
