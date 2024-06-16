import BaseURL from "@/services/ApiEndPoint";
import { profileFetchData } from "@/types/types";

export const fetchMyProfile = async (token: string) => {
  const response: Response = await fetch(`${BaseURL}/user/me`, {
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
  return result as profileFetchData;
};
