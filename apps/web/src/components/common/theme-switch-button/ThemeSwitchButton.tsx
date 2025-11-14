"use client";

import React, { useState, useEffect } from "react";

const ThemeSwitchButton: React.FC = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme || "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 dark:bg-gray-700"
      >
        <span className="sr-only">Toggle Theme</span>
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            theme === "dark" ? "translate-x-6" : "translate-x-1"
          }`}
        ></span>
      </button>
    </div>
  );
};

export default ThemeSwitchButton;
