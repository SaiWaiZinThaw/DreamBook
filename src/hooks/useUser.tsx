import { fetchMyProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = (token: string) =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMyProfile(token),
  });
