import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import { profileFetchData } from "@/types/types";

const token = getToken();

export const fetchMyProfile = async () => {
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
