import BaseURL from "../services/ApiEndPoint";

export const CreateBookApi = async ({
  data,
  token,
}: {
  data: {
    title: string;
    coverImage: File;
    description: string;
    keywords: string[];
    status: string;
    categoryId: string;
  };
  token: string;
}) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('coverImage', data.coverImage);
    formData.append('description', data.description);
    data.keywords.forEach((keyword) => formData.append('keywords[]', keyword));
    formData.append('status', data.status);
    formData.append('categoryId', data.categoryId);

  const response: Response = await fetch(`${BaseURL}/books`, {
    headers: {
        'Authorization': `Bearer ${token}`,
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