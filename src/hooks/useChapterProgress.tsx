
import { createChapaterProgressApi, getCurrentChapter } from "@/api/chapterProgressApi";
import { ChapterProgressData } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateChapterProgress = () =>
    useMutation({ mutationFn: (data: ChapterProgressData) => createChapaterProgressApi({ data }) });

export const useFetchCurrentChapter = () => 
    useQuery({queryKey: ["current-chapter"], queryFn: () => getCurrentChapter()});