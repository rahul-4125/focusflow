
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
    <header className="w-full border-b flex items-center px-0 py-0 bg-card/80 backdrop-blur-md justify-between gap-2 z-20 shadow-sm">
      <div className="flex-1 flex items-center gap-4 px-8 py-4">
        {/* Visual Accent */}
        <div className="h-12 w-2 rounded-r-md mr-4 bg-gradient-to-b from-primary to-accent pulse"></div>
        <div className="flex flex-col">
          <span
            className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer select-none font-serif text-primary"
            onClick={() => navigate("/")}
          >
            FocusFlow
          </span>
          <span className="text-xs md:text-sm text-muted-foreground font-mono mt-1 tracking-wide italic">
            Flow into productivity and clarity
          </span>
        </div>
        <span className="hidden md:inline-flex mx-5 h-8 w-[1.5px] bg-border rounded" />
        <span className="flex items-center text-muted-foreground text-sm gap-1 font-mono ml-2">
          <Calendar className="w-4 h-4" /> {date}
        </span>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4 pr-8">
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
