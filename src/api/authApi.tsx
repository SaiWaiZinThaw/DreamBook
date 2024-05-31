import BaseURL from "../services/ApiEndPoint";

export const SignUpAPi = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/signup`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

export const LoginAPi = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) => {
  const response: Response = await fetch(`${BaseURL}/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
