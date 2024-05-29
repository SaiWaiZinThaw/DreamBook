import { SignUpAPi } from "@/api/authApi";
import { SignUpData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () =>
  useMutation({
    mutationFn: (data: SignUpData) => SignUpAPi({ data }),
  });
