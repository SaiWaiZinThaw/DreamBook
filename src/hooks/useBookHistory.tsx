import { createBookHistory } from "@/api/bookHistoryApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateBookHistory = () => {
    useMutation({
        mutationFn: (bookSlug: string) => createBookHistory({ bookSlug }),
      });
}