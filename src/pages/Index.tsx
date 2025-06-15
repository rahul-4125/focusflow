
import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import ChartWrapper from "@/components/ChartWrapper";
import { useTasksStore } from "@/store/tasks";
import { usePomodoroStore } from "@/store/pomodoro";
import { useMoodStore } from "@/store/mood";
import { format } from "date-fns";
import { ProgressBar } from "./_ProgressBar";
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
      <main className="flex-1 flex flex-col gap-8 px-8 py-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/10 pointer-events-none -z-10"></div>
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
        <div className="max-w-md w-full mx-auto">
          <ProgressBar progress={progress} label="Tasks Progress" />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <ChartWrapper type="tasks" />
          <ChartWrapper type="pomodoros" />
          <ChartWrapper type="mood" />
        </section>
      </main>
    </div>
  );
}
