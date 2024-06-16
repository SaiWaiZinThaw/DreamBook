import { Book } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";

const fetchABookAuthor = async (token: string, bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/books/author/${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as Book;
};

export default fetchABookAuthor;
