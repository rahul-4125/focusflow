import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import ChartWrapper from "@/components/ChartWrapper";
import MotivationQuote from "@/components/MotivationQuote";
import { useAuthSession } from "@/hooks/useAuthSession";

/**
 * THIS PAGE SHOWS ONLY PLACEHOLDER VALUES for demo/troubleshooting.
 * All values below are hardcoded for visual feedback when the DB isn't returning data.
 */

export default function Index() {
  // Static placeholders for dashboard cards
  const completedToday = 4;
  const pomodorosToday = 5;
  const todayMood = 8;

  // Static progress (simulate tasks done / total)
  const totalTasksToday = 6;
  const progress = Math.round((completedToday / totalTasksToday) * 100);

  const { profile } = useAuthSession();

  // Placeholder static data for cards/charts
  const placeholderTaskStats = {
    "2025-06-09": 2,
    "2025-06-10": 1,
    "2025-06-11": 3,
    "2025-06-12": 0,
    "2025-06-13": 2,
    "2025-06-14": 4,
    "2025-06-15": 4,
  };
  const placeholderPomodoroStats = {
    "2025-06-09": 3,
    "2025-06-10": 4,
    "2025-06-11": 2,
    "2025-06-12": 1,
    "2025-06-13": 5,
    "2025-06-14": 6,
    "2025-06-15": 5,
  };
  const placeholderMoodStats = {
    "2025-06-09": 6,
    "2025-06-10": 7,
    "2025-06-11": 8,
    "2025-06-12": 7,
    "2025-06-13": 6,
    "2025-06-14": 8,
    "2025-06-15": 8,
  };

  // Overriding ChartWrapper to show static placeholder stats
  function StaticChart({ type }: { type: "tasks" | "pomodoros" | "mood" }) {
    // Use same structure as ChartWrapper, but with placeholder data
    // (copy from ChartWrapper.tsx, but use the placeholder objects here)
    // Only chart code changed; all styles/cards remain the same.
    // The visuals will match the existing dashboard.

    // Placeholders for BarChart/LineChart
    const { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } = require("recharts");
    const { format, subDays } = require("date-fns");
    const today = new Date();
    const colors = {
      tasks: "#2563eb",
      pomodoros: "#10b981",
      mood: "#eab308",
    };

    if (type === "tasks") {
      const weekStats = placeholderTaskStats;
      const data = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(today, 6 - i);
        return {
          day: format(d, "EEE"),
          count: weekStats[format(d, "yyyy-MM-dd")] || 0,
        };
      });
      return (
        <div className="bg-card rounded-xl p-4 shadow flex flex-col">
          <div className="font-semibold mb-2 text-sm">Tasks Completed (Last 7d)</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="2 8" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={colors.tasks} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (type === "pomodoros") {
      const pomoStats = placeholderPomodoroStats;
      const data = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(today, 6 - i);
        return {
          day: format(d, "EEE"),
          sessions: pomoStats[format(d, "yyyy-MM-dd")] || 0,
        };
      });
      return (
        <div className="bg-card rounded-xl p-4 shadow flex flex-col">
          <div className="font-semibold mb-2 text-sm">Pomodoro Sessions (Last 7d)</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="2 8" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sessions" fill={colors.pomodoros} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (type === "mood") {
      const moodStats = placeholderMoodStats;
      const data = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(today, 6 - i);
        return {
          day: format(d, "EEE"),
          mood: moodStats[format(d, "yyyy-MM-dd")] ?? null,
        };
      });
      return (
        <div className="bg-card rounded-xl p-4 shadow flex flex-col">
          <div className="font-semibold mb-2 text-sm">Mood Trend (Last 7d)</div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="2 8" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis domain={[1, 10]} ticks={[1, 3, 5, 7, 9]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="mood"
                stroke={colors.mood}
                strokeWidth={3}
                dot={{ r: 5 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col gap-8 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full animate-fade-in">
        {profile?.username && (
          <div className="max-w-2xl mx-auto mt-2 mb-2 text-lg font-mono text-primary/90 text-center">
            Welcome, {profile.username}!
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary/20 pointer-events-none -z-10"></div>
        <section className="max-w-2xl w-full mx-auto mt-4 mb-2">
          <MotivationQuote />
        </section>
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
          <div className="max-w-md w-full mx-auto mt-2">
            {/* Simulate progress */}
            <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full duration-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-center">
              Tasks Progress: {progress}%
            </div>
          </div>
        </section>
        <div className="relative text-sm flex items-center mx-auto w/full max-w-2xl py-2">
          <span className="flex-grow h-px bg-gradient-to-r from-accent/40 via-border/60 to-accent/20 rounded" />
          <span className="px-4 uppercase tracking-widest text-muted-foreground/80 font-semibold font-mono">Statistics</span>
          <span className="flex-grow h-px bg-gradient-to-l from-accent/40 via-border/60 to-accent/20 rounded" />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {/* Show static charts */}
          <StaticChart type="tasks" />
          <StaticChart type="pomodoros" />
          <StaticChart type="mood" />
        </section>
      </main>
    </div>
  );
}
