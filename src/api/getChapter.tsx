import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import { fetchChapterData } from "@/types/types";

const token = getToken();
export const getAuthorChapter = async (bookId: string) => {
  const response: Response = await fetch(
    `${BaseURL}/chapters/author?book_id=${bookId}`,
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
  return result as fetchChapterData;
};

export const deleteChapter = async (chapterId: string) => {
  const response: Response = await fetch(`${BaseURL}/chapters/${chapterId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "DELETE",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};