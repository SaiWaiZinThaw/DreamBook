import { Navigate } from "react-router-dom";
import { getToken } from "@/services/authService";
import { ReactNode } from "react";
import { useGetMe } from "@/hooks/useUser";

const AuthHOC = ({ children }: { children: ReactNode }) => {
  const token = getToken() || "";
  const { data } = useGetMe(token);
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  if (data && (!data.profilePicture || !data.name || !data.bio)) {
    alert("Complete all data");
    return <Navigate to="/me" replace />;
  }
  return children;
};

export default AuthHOC;
