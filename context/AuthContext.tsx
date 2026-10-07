"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { users, type User } from "@/data/users";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (
    firstName: string,
    lastname: string,
    email: string,
    password: string,
  ) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const exists = users.some(
      (u) => u.email === email && u.password === password,
    );

    if (exists) return false;

    const newUser: User = {
      id: `u${users.length + 1}`,
      firstName,
      lastName,
      email,
      password,
    };

    users.push(newUser);
    setUser(newUser);

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
