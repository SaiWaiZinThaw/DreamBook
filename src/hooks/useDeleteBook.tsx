
import { hardDeleteBook, softDeleteBook } from "@/api/deleteBookApi";
import { useMutation } from "@tanstack/react-query";

export const useSoftDeleteBook = () => 
    useMutation ({
        mutationFn: (bookId :number) => softDeleteBook(bookId)
    })

export const useHardDeleteBook = () => 
    useMutation ({
        mutationFn: (bookId :number) => hardDeleteBook(bookId)
    })