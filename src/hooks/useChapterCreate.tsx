import { createChapterApi } from "@/api/createChapterApi";
import { createChapterData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const useChapterCreate = () =>
    useMutation({
      mutationFn: (data: createChapterData) => createChapterApi({data}),
    });
  
export default useChapterCreate;
