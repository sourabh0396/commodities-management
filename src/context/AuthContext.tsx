"use client";

import { createContext, useContext, useState } from "react";
import { users, User } from "../data/users";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => {
    success: boolean;
    error?: string;
    role?: string;
  };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const login = (email: string, password: string) => {
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      return { success: false, error: "User not found" };
    }

    if (foundUser.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));

    return { success: true, role: foundUser.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const Context = useContext(AuthContext);
  if (!Context) throw new Error("useAuth error");
  return Context;
};
