"use client";

import { liff } from "@line/liff";
import { useEffect, useState } from "react";

interface UseLiffReturn {
  isInitialized: boolean;
  isLoggedIn: boolean;
  error: string | null;
  login: (redirectUri?: string) => void;
  logout: () => void;
}

export const useLiff = (liffId: string): UseLiffReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    return !liffId ? "LIFF ID is required" : null;
  });

  useEffect(() => {
    if (!liffId) {
      return;
    }

    liff
      .init({
        liffId: liffId,
      })
      .then(() => {
        console.log("LIFF init success");
        setIsInitialized(true);
        setIsLoggedIn(liff.isLoggedIn());
        setError(null);
      })
      .catch((error) => {
        console.error("LIFF init error:", error);
        setError(error.message || "LIFF initialization failed");
        setIsInitialized(false);
      });
  }, [liffId]);

  const login = (redirectUri?: string) => {
    if (!isInitialized) {
      console.warn("LIFF is not initialized yet");
      return;
    }

    liff.login({
      redirectUri: redirectUri,
    });
  };

  const logout = () => {
    if (!isInitialized) {
      console.warn("LIFF is not initialized yet");
      return;
    }

    liff.logout();
    setIsLoggedIn(false);
  };

  return {
    isInitialized,
    isLoggedIn,
    error,
    login,
    logout,
  };
};
