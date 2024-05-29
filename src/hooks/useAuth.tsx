import { LoginAPi, SignUpAPi } from "@/api/authApi";
import { AuthData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () =>
  useMutation({
    mutationFn: (data: AuthData) => SignUpAPi({ data }),
  });

export const useLogIn = () =>
  useMutation({
    mutationFn: (data: AuthData) => LoginAPi({ data }),
  });
