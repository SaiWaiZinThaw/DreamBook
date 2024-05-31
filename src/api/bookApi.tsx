import BaseURL from "../services/ApiEndPoint";

const fetchBook = async (token: string) => {
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
  return result as any[];
};

export default fetchBook;
