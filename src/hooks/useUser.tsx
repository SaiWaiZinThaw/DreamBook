import { fetchMyProfile } from "@/api";
import { fetchOtherProfile, getUserBook } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = (token: string) =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMyProfile(token),
  });

export const useGetOther = (userId: string) =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => fetchOtherProfile(userId),
  });

export const useGetUserBook = (userId: string) =>
  useQuery({
    queryKey: ["userBook"],
    queryFn: () => getUserBook(userId),
  });
