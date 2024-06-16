import { fetchBookData } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";

export const fetchBook = async (token: string) => {
  const response: Response = await fetch(`${BaseURL}/books/author`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "GET",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as fetchBookData;
};

export const fetchAllBook = async (page: number) => {
  const response: Response = await fetch(
    `${BaseURL}/books/public?page=${page}`,
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
    throw new Error();
  }
  return result as fetchBookData;
};
