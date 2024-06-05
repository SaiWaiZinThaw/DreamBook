import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

export const fetchCategories = async () => {
  const response: Response = await fetch(`${BaseURL}/categories`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as any[];
};

export const createInterestedCategories = async (data: { data: string[] }) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/interested-categories`, {
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
