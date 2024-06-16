import { authService } from "@/services";
import React from "react";
import { createContext, useContext } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = authService.getToken() || null;

  const login = (token: string) => {
    authService.login(token);
  };

  const logout = () => {
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};
