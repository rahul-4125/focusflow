
import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import ChartWrapper from "@/components/ChartWrapper";
import { useTasksStore } from "@/store/tasks";
import { usePomodoroStore } from "@/store/pomodoro";
import { useMoodStore } from "@/store/mood";
import { format } from "date-fns";

const Index = () => {
  const today = format(new Date(), "PPP");
  const { completedToday } = useTasksStore();
  const { pomodorosToday } = usePomodoroStore();
  const { todayMood } = useMoodStore();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col gap-8 px-8 py-6 max-w-7xl mx-auto w-full animate-fade-in">
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
            icon={typeof todayMood === "number" ? (todayMood > 7 ? "smile" : todayMood > 4 ? "frown" : "frown") : "smile"}
            description="Today"
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <ChartWrapper type="tasks" />
          <ChartWrapper type="pomodoros" />
          <ChartWrapper type="mood" />
        </section>
      </main>
    </div>
  );
};

export default Index;
