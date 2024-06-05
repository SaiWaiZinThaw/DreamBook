import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

export const CreateBookApi = async ({
  data,
}: {
  data: {
    title: string;
    coverImage: File | string;
    description: string;
    keywords: string[];
    categoryId: string;   
    status: string,
  }
  
}) =>  {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImage", data.coverImage);
  formData.append("description", data.description);
  data.keywords.forEach((keyword) => formData.append("keywords[]", keyword));
  formData.append("categoryId", data.categoryId);
  formData.append("status", data.status);


  const response: Response = await fetch(`${BaseURL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
