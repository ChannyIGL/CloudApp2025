"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // check saved theme or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "1px solid #333",
        background: "transparent",
        fontSize: "14px",
        color: theme === "light" ? "#000" : "#000" ,
        transition: "color 0.3s ease",
      }}
    >
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
