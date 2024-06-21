import { Book, fetchBookData } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";

interface FetchAllBookParams {
  search?: string;
  selectedCategories?: string | number | (string | number)[];
  sortBy?: string;
  pageCount?: number;
}

export const fetchBook = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/books/public/${bookSlug}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch book data");
  }
  return result as Book;
};

export const fetchAllBook = async (params: FetchAllBookParams = {}) => {
  const { search, sortBy, selectedCategories, pageCount } = params;

  const queryParams = new URLSearchParams();

  if (selectedCategories) {
    const categoryString = Array.isArray(selectedCategories)
      ? selectedCategories.join(",")
      : selectedCategories.toString();
    queryParams.append("category_ids", categoryString);
  }
  if (search) {
    queryParams.append("search", search);
  }
  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }
  if (pageCount) {
    queryParams.append("page", pageCount.toString());
  }

  const response: Response = await fetch(
    `${BaseURL}/books/public?${queryParams.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch books data");
  }
  return result as fetchBookData;
};
