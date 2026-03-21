"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  dictionaries,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/i18n";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof dictionaries)[Language];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "vi" || saved === "en") {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch {}
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}