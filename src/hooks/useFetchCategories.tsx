import {useQuery} from "@tanstack/react-query";
import { fetchCategories } from "@/api";

const useFetchCategories = () => useQuery({queryKey:["category"], queryFn: fetchCategories });

export default useFetchCategories;
