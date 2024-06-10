import { fetchABookAuthor } from "@/api";
import { updateBookApi } from "@/api/updateBook";
import { updateBookType } from "@/types/types";
import {useMutation, useQuery} from "@tanstack/react-query";

export const useFetchABookAuthor = (token: string, bookId: number) =>
    useQuery({ queryKey: ["abookauthor"], queryFn: () => fetchABookAuthor(token, bookId) });
  
export const useUpdateBook = (bookId: number) => 
    useMutation({
        mutationFn: (data: updateBookType) => updateBookApi(bookId, {data}),
    });