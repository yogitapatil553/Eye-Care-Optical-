import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem("eyecare_language");
      return saved === "mr" ? "mr" : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === "mr" ? "mr" : "en";
    setLanguageState(validLang);
    try {
      localStorage.setItem("eyecare_language", validLang);
      document.documentElement.lang = validLang === "mr" ? "mr" : "en";
    } catch (e) {
      console.warn("Could not save language preference:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "mr" : "en");
  };

  const t = (key) => {
    const langObj = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langObj && langObj[key] !== undefined) {
      return langObj[key];
    }
    return TRANSLATIONS.en[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language === "mr" ? "mr" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
