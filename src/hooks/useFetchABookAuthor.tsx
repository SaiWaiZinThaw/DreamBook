import { fetchABookAuthor } from "@/api";
import {useQuery} from "@tanstack/react-query";
// const useFetchCategories = () => useQuery({queryKey:["category"], queryFn: fetchCategories });

export const useFetchABookAuthor = (token: string, bookId: number) =>
    useQuery({ queryKey: ["abookauthor"], queryFn: () => fetchABookAuthor(token, bookId) });