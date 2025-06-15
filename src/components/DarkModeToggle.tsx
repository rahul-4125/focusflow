
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  // Initialize state from localStorage if available, fall back to system/dark class
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // fallback: system preference or existing class
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return true;
    return document.documentElement.classList.contains("dark");
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  // Ensure correct class and storage on state/first render
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Update DOM on mount for SSR hydration consistency
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []); // Only run on mount

  return (
    <button
      aria-label="Toggle dark mode"
      className="ml-2 text-primary bg-muted rounded-full p-2 transition hover:scale-110 hover:bg-accent focus:outline-none focus:ring ring-primary"
      onClick={() => setIsDark((d) => !d)}
    >
      {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
