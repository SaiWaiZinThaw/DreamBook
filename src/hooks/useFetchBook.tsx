import fetchBook from "@/api/bookApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllBooks = (token: string) =>
  useQuery({ queryKey: ["book"], queryFn: () => fetchBook(token) });
