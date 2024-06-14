import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import { commentData } from "@/types/types";

const token = getToken();
export const createComment = async ({ data }: { data: commentData }) => {
  const response: Response = await fetch(`${BaseURL}/comments`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const getComments = async (bookId: string) => {
  const response: Response = await fetch(
    `${BaseURL}/comments?book_id=${bookId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
      body: JSON.stringify(bookId),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
