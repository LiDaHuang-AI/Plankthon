"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { State, useAppState } from "@/lib/state";

type AppContextType = {
  state: State | null;
  updateState: (updater: (prev: State) => State) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const { state, updateState } = useAppState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state && mounted) {
      if (state.settings.theme === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
      document.documentElement.lang = state.settings.language;
    }
  }, [state?.settings.theme, state?.settings.language, mounted]);

  if (!mounted || !state) return null; // Prevent hydration mismatch

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within ClientProvider");
  return ctx;
}
