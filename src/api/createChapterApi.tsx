import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
const token = getToken();

export const createChapterApi = async ({
  data,
}: {
  data: {
    title: string;
    content: string;
    status: string;
    priority: number;
    bookId: number;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/chapters`, {
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
