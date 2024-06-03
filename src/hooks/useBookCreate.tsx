import { CreateBookApi } from "@/api";
import { CreateBookData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const useBookCreate = () =>
    useMutation({
      mutationFn: (data: CreateBookData) => CreateBookApi({data, token: ""}),
    });
  
export default useBookCreate;