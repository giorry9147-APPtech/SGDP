"use client";

import { createContext, useContext } from "react";
import type { DemoUser } from "@/lib/auth-data";

const UserContext = createContext<DemoUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: DemoUser;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): DemoUser {
  const u = useContext(UserContext);
  if (!u) {
    throw new Error("useUser() must be used inside a <UserProvider> tree");
  }
  return u;
}
