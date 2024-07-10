import { fetchMyProfile } from "@/api";
import { fetchOtherProfile, getUserBook } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = (token: string) =>
  useQuery({
    queryKey: ["me", token],
    queryFn: () => fetchMyProfile(token),
  });

export const useGetOther = (userId: string) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchOtherProfile(userId),
  });

export const useGetUserBook = (userId: string) =>
  useQuery({
    queryKey: ["userBook", userId],
    queryFn: () => getUserBook(userId),
  });
