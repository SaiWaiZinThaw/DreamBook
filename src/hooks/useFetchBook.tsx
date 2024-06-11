import { fetchAllBook, fetchBook } from "@/api/bookApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchABook = (token: string) =>
  useQuery({ queryKey: ["book"], queryFn: () => fetchBook(token) });

export const useFetchAllBooks = (page: number) =>
  useQuery({ queryKey: ["allBooks"], queryFn: () => fetchAllBook(page) });
