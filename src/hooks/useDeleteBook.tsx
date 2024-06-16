
import { hardDeleteBook, softDeleteBook } from "@/api/deleteBookApi";
import { useMutation } from "@tanstack/react-query";

export const useSoftDeleteBook = () => 
    useMutation ({
        mutationFn: (bookId: string) => softDeleteBook(bookId)
    })

export const useHardDeleteBook = () => 
    useMutation ({
        mutationFn: (bookId: string) => hardDeleteBook(bookId)
    })

