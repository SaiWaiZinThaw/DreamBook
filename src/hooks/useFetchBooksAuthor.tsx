import getDeleteBooksAth from "@/api/getDeleteBookByAuthor";
import { useQuery } from "@tanstack/react-query";

const useFetchBooksAuthor = () => 
    useQuery({queryKey: ["delete-books-author"], queryFn: () => getDeleteBooksAth()});

export default useFetchBooksAuthor;