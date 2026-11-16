import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem("eyecare_theme");
      if (saved === "dark" || saved === "light") return saved;
      return "light";
    } catch {
      return "light";
    }
  });

  const [ambientAnimation, setAmbientAnimation] = useState(true);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (mode) => {
    if (mode === "dark" || mode === "light") {
      setThemeState(mode);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("eyecare_theme", theme);
    } catch (e) {
      console.warn("Could not save theme preference:", e);
    }

    const root = document.documentElement;
    const body = document.body;

    // Apply class to body
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");

    if (ambientAnimation) {
      body.classList.add("ambient-light-dark-active");
    } else {
      body.classList.remove("ambient-light-dark-active");
    }

    root.setAttribute("data-bs-theme", theme === "dark" ? "dark" : "light");
  }, [theme, ambientAnimation]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === "dark",
        ambientAnimation,
        setAmbientAnimation
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
