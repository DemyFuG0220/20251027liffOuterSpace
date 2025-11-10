"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLiff } from "../hooks/useLiff";

interface LiffContextType {
  isInitialized: boolean;
  isLoggedIn: boolean;
  error: string | null;
  login: (redirectUri?: string) => void;
  logout: () => void;
}

const LiffContext = createContext<LiffContextType | undefined>(undefined);

interface LiffProviderProps {
  children: ReactNode;
}

export const LiffProvider = ({ children }: LiffProviderProps) => {
  const liffData = useLiff(process.env.NEXT_PUBLIC_LIFF_ID as string);

  return (
    <LiffContext.Provider value={liffData}>{children}</LiffContext.Provider>
  );
};

export const useLiffContext = (): LiffContextType => {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error("useLiffContext must be used within a LiffProvider");
  }
  return context;
};
