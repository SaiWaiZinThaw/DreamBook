import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

// export const profileSetupApi = async ({ data }: { data: ProfileSetupData }) => {
//   const token = getToken();

//   const formData = new FormData();

//   formData.append("name", data.name);
//   if (data.profilePicture) {
//     formData.append("profilePicture", data.profilePicture);
//   }
//   formData.append("phoneNumber", data.phoneNumber || "");
//   if (data.bio) {
//     formData.append("bio", data.bio);
//   }
//   formData.append("gender", data.gender);

//   const response: Response = await fetch(`${BaseURL}/user`, {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     mode: "cors",
//     method: "PATCH",
//     redirect: "follow",
//     body: formData,
//   });

//   return response;
// };


export const CreateBookApi = async ({
  data,
}: {
  data: {
    title: string;
    coverImage: File | string;
    description: string;
    keywords: string[];
    categoryId: string;    
  }
  
}) =>  {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("coverImage", data.coverImage);
  formData.append("description", data.description);
  data.keywords.forEach((keyword) => formData.append("keywords[]", keyword));
  formData.append("categoryId", data.categoryId);


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
