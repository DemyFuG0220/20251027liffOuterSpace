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
  liffId: string;
}

export const LiffProvider = ({ children, liffId }: LiffProviderProps) => {
  const liffData = useLiff(liffId);

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
