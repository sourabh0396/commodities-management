"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed right-4 top-1/2 -translate-y-1/2 z-50
        px-4 py-2 rounded-full shadow-lg
        bg-gray-200 dark:bg-gray-700
        text-black dark:text-white
        transition
      "
      aria-label="Toggle theme"
    >
      {dark ? (
        <div className="flex items-center">
          <FaSun />
          <span>Light Mode</span>
        </div>
      ) : (
        <div className="flex items-center">
          <FaMoon />
          <span>Dark Mode</span>
        </div>
      )}
    </button>
  );
}
