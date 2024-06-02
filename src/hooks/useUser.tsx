import { fetchMyProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { profileFetchData } from "@/types/types";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMyProfile(),
  });
