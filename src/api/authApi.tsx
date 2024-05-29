import BaseURL from "./ApiEndPoint";

export const SignUpAPi = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
