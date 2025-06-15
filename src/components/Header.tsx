
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { AvatarDropdown } from "./UserMenu";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const navigate = useNavigate();
  const [date] = useState(() => format(new Date(), "PPP"));

  return (
    <header className="w-full border-b flex items-center px-8 py-4 bg-card/70 backdrop-blur-md justify-between gap-2 z-20">
      <div className="flex items-center gap-4">
        <span
          className="text-xl font-bold tracking-tight cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          Daily Productivity Tracker
        </span>
        <span className="text-muted-foreground hidden md:inline-block">·</span>
        <span className="flex items-center text-muted-foreground text-sm gap-1 font-mono">
          <Calendar className="w-4 h-4" /> {date}
        </span>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4">
        <a href="/" className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition">Dashboard</a>
        <a href="/tasks" className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition">Tasks</a>
        <a href="/pomodoro" className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition">Pomodoro</a>
        <a href="/mood" className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition">Mood</a>
        <a href="/insights" className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition hidden md:inline">Insights</a>
        <DarkModeToggle />
        <AvatarDropdown />
      </nav>
    </header>
  );
}
