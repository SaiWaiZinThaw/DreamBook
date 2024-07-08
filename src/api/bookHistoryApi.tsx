import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { fetchFavoriteBookData } from "@/types/types";

interface FetchAllFavBookHistoryParams {
  pageCount?: number;
}
const token = getToken();

export const createBookHistory = async (bookSlug: string) => {
  const response: Response = await fetch(`${BaseURL}/history`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({ bookSlug }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const getAllBookHistory = async (
  params: FetchAllFavBookHistoryParams
) => {
  const { pageCount } = params;

  const queryParams = new URLSearchParams();
  if (pageCount) {
    queryParams.append("page", pageCount.toString());
  }
  const response: Response = await fetch(
    `${BaseURL}/history?${queryParams.toString()}`,
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
    throw new Error(result.message);
  }
  return result as fetchFavoriteBookData;
};

export const deleteHistory = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/history?slug=${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "DELETE",
      redirect: "follow",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete the book");
  }

  return response.status;
};
