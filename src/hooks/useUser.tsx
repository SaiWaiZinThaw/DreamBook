import { fetchMyProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMyProfile(),
  });
