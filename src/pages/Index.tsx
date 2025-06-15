
import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import ChartWrapper from "@/components/ChartWrapper";
import { useTasksStore } from "@/store/tasks";
import { usePomodoroStore } from "@/store/pomodoro";
import { useMoodStore } from "@/store/mood";
import { format } from "date-fns";
import { ProgressBar } from "./_ProgressBar";
import MotivationQuote from "@/components/MotivationQuote";
import { useMemo } from "react";

export default function Index() {
  const today = format(new Date(), "PPP");
  const { completedToday, tasks } = useTasksStore();
  const { pomodorosToday } = usePomodoroStore();
  const { todayMood } = useMoodStore();

  // Calculate simulated progress for today (fake, for the bar)
  const totalTasksToday = tasks?.filter((t) =>
    t.createdAt?.startsWith?.(new Date().toISOString().slice(0, 10))
  )?.length || 0;
  const progress =
    totalTasksToday > 0
      ? Math.round((completedToday / totalTasksToday) * 100)
      : completedToday > 0
        ? 100
        : 0;

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col gap-8 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full animate-fade-in">
        {/* Gradient background layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary/20 pointer-events-none -z-10"></div>
        
        {/* Motivational Quote section */}
        <section className="max-w-2xl w-full mx-auto mt-4 mb-2">
          <MotivationQuote />
        </section>
        
        {/* Card group for summary & progress */}
        <section className="bg-card/80 border rounded-2xl shadow-xl px-5 py-8 md:py-10 flex flex-col gap-8 transition hover:shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
              title="Tasks Completed"
              value={completedToday}
              icon="check"
              description="Today"
            />
            <SummaryCard
              title="Pomodoros"
              value={pomodorosToday}
              icon="clock"
              description="Today"
            />
            <SummaryCard
              title="Mood"
              value={todayMood !== null ? todayMood : "-"}
              icon={typeof todayMood === "number" ? (todayMood > 7 ? "smile" : "frown") : "smile"}
              description="Today"
            />
          </div>
          {/* Tasks Progress Bar */}
          <div className="max-w-md w-full mx-auto mt-2">
            <ProgressBar progress={progress} label="Tasks Progress" />
          </div>
        </section>

        {/* Divider */}
        <div className="relative text-sm flex items-center mx-auto w-full max-w-2xl py-2">
          <span className="flex-grow h-px bg-gradient-to-r from-accent/40 via-border/60 to-accent/20 rounded" />
          <span className="px-4 uppercase tracking-widest text-muted-foreground/80 font-semibold font-mono">Statistics</span>
          <span className="flex-grow h-px bg-gradient-to-l from-accent/40 via-border/60 to-accent/20 rounded" />
        </div>
        
        {/* Chart + stats section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <ChartWrapper type="tasks" />
          <ChartWrapper type="pomodoros" />
          <ChartWrapper type="mood" />
        </section>
      </main>
    </div>
  );
}
