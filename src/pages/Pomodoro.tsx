
import Header from "@/components/Header";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function Pomodoro() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-8 max-w-2xl w-full mx-auto animate-fade-in">
        <PomodoroTimer />
      </main>
    </div>
  );
}
