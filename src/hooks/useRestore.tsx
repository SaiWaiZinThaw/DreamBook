import { useMutation } from "@tanstack/react-query";
import restoreBook from "@/api/restoreApi";

export const useRestoreBook = () => 
    useMutation({
        mutationFn: (bookId: string) => restoreBook(bookId),
    });

    