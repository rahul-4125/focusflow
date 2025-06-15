
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function setDocumentDarkClass(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Helper to get persisted theme reliably
function getLocalTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  // fallback: system preference
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return true;
  return document.documentElement.classList.contains("dark");
}

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => getLocalTheme());

  // On mount, sync and listen for storage events (other tabs)
  useEffect(() => {
    function syncTheme() {
      const dark = getLocalTheme();
      setIsDark(dark);
      setDocumentDarkClass(dark);
    }
    syncTheme();

    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  // Whenever state changes, update class and localStorage
  useEffect(() => {
    setDocumentDarkClass(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="ml-2 text-primary bg-muted rounded-full p-2 transition hover:scale-110 hover:bg-accent focus:outline-none focus:ring ring-primary"
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
