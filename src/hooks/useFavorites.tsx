import { addFavorite } from "@/api/favorites";
import { favoriteData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useAddFavorite = () =>
  useMutation({
    mutationFn: (data: favoriteData) => addFavorite({ data }),
  });
