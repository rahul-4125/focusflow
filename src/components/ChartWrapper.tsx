
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTasksStore } from "@/store/tasks";
import { usePomodoroStore } from "@/store/pomodoro";
import { useMoodStore } from "@/store/mood";
import { format, subDays } from "date-fns";

interface Props {
  type: "tasks" | "pomodoros" | "mood";
}

const colors = {
  tasks: "#2563eb",
  pomodoros: "#10b981",
  mood: "#eab308",
};

export default function ChartWrapper({ type }: Props) {
  const { weekStats } = useTasksStore();
  const { weekStats: pomoStats } = usePomodoroStore();
  const { weekStats: moodStats } = useMoodStore();
  const today = new Date();

  if (type === "tasks") {
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
