import { useNavigate } from "react-router-dom";
import { Calendar, Bell, Dot } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { AvatarDropdown } from "./UserMenu";
import DarkModeToggle from "./DarkModeToggle";
import { useAuthSession } from "@/hooks/useAuthSession";

export default function Header() {
  const navigate = useNavigate();
  const [date] = useState(() => format(new Date(), "PPP"));
  const { profile } = useAuthSession();

  // Dummy state for notification badge demo
  const [hasNotification] = useState(true);

  return (
    <header className="w-full border-b flex items-center px-0 py-0 bg-gradient-to-br from-card/90 via-background/90 to-card/70 backdrop-blur-lg justify-between gap-2 z-20 shadow-xl relative">
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
          {profile?.username && (
            <span className="font-semibold">{profile.username}</span>
          )}
          <Calendar className="w-4 h-4" /> {date}
        </span>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4 pr-8">
        <a
          href="/"
          className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition relative group"
        >
          Dashboard
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-bottom-right rounded" />
        </a>
        <a
          href="/tasks"
          className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition relative group"
        >
          Tasks
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/80 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-bottom-right rounded" />
        </a>
        <a
          href="/pomodoro"
          className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition relative group"
        >
          Pomodoro
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/60 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-bottom-right rounded" />
        </a>
        <a
          href="/mood"
          className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition relative group"
        >
          Mood
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-bottom-right rounded" />
        </a>
        <a
          href="/profile"
          className="story-link px-3 py-2 rounded font-medium hover:bg-accent transition relative group"
        >
          Profile
        </a>
        {/* Notification bell */}
        <button
          className="relative p-2 focus:outline-none rounded-full transition hover:bg-accent group"
          aria-label="Notifications"
          tabIndex={0}
        >
          <Bell className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
          {hasNotification && (
            <span className="absolute top-1 right-1 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive border-2 border-card animate-ping absolute opacity-75"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-destructive border-2 border-card relative"></span>
            </span>
          )}
        </button>
        <DarkModeToggle />
        <AvatarDropdown />
      </nav>
      <div className="absolute left-0 right-0 h-[6px] bg-gradient-to-r from-accent via-primary/25 to-accent/60 blur-sm opacity-80 bottom-0 pointer-events-none z-0" />
    </header>
  );
}
