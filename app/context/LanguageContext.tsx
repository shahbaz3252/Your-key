"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { translations } from "../i18n/translations";

export type Language = "en" | "ar";

type Translation =
  (typeof translations)[Language];

type LanguageContextType = {
  language: Language;
  isArabic: boolean;
  setLanguage: (
    language: Language
  ) => void;
  toggleLanguage: () => void;
  t: Translation;
};

const LanguageContext =
  createContext<
    LanguageContextType | null
  >(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    language,
    setLanguageState,
  ] =
    useState<Language>("en");

  /* ========================================================
     RESTORE SAVED LANGUAGE
  ======================================================== */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "site-language"
      );

    if (
      savedLanguage === "en" ||
      savedLanguage === "ar"
    ) {
      setLanguageState(
        savedLanguage
      );
    }
  }, []);

  /* ========================================================
     UPDATE HTML LANGUAGE / DIRECTION
  ======================================================== */

  useEffect(() => {
    const html =
      document.documentElement;

    html.lang = language;

    html.dir =
      language === "ar"
        ? "rtl"
        : "ltr";

    html.dataset.language =
      language;

    document.body.classList.toggle(
      "site-arabic",
      language === "ar"
    );

    document.body.classList.toggle(
      "site-english",
      language === "en"
    );
  }, [language]);

  /* ========================================================
     SET LANGUAGE
  ======================================================== */

  const setLanguage = (
    newLanguage: Language
  ) => {
    setLanguageState(
      newLanguage
    );

    localStorage.setItem(
      "site-language",
      newLanguage
    );
  };

  /* ========================================================
     TOGGLE
  ======================================================== */

  const toggleLanguage = () => {
    setLanguage(
      language === "en"
        ? "ar"
        : "en"
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isArabic:
          language === "ar",
        setLanguage,
        toggleLanguage,
        t:
          translations[
            language
          ],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}