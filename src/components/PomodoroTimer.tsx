
import { usePomodoroStore } from "@/store/pomodoro";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function formatSeconds(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const {
    timerSeconds,
    isRunning,
    isBreak,
    startTimer,
    stopTimer,
    resetTimer,
    finishSession,
    pomodorosToday,
    currentSession,
  } = usePomodoroStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        usePomodoroStore.setState((state) => {
          if (state.timerSeconds > 0) {
            return { timerSeconds: state.timerSeconds - 1 };
          } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setTimeout(finishSession, 500);
            return state;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    // eslint-disable-next-line
  }, [isRunning]);

  // Colors for modes
  const colors = isBreak
    ? "bg-green-100 ring-green-300"
    : "bg-blue-100 ring-primary";
  const ring =
    (isBreak
      ? "stroke-green-500"
      : "stroke-blue-600") + " transition-all duration-500";

  // Progress ring diameter: animate via SVG circle
  const TOTAL_SECONDS = isBreak ? 5 * 60 : 25 * 60;
  const pct = Math.max(0, (timerSeconds / TOTAL_SECONDS) * 100);

  return (
    <section className="flex flex-col items-center gap-8">
      <div className="text-xl font-semibold tracking-tight">
        {isBreak ? "Break" : "Work Session"}
      </div>
      <div
        className={cn(
          "relative w-56 h-56 flex items-center justify-center rounded-full ring-4",
          colors
        )}
      >
        <svg className="absolute inset-0" width={224} height={224}>
          <circle
            cx={112}
            cy={112}
            r={100}
            fill="none"
            stroke="var(--border)"
            strokeWidth="16"
            opacity="0.25"
          />
          <circle
            cx={112}
            cy={112}
            r={100}
            fill="none"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={
              2 * Math.PI * 100 * ((100 - pct) / 100)
            }
            strokeWidth="16"
            className={ring}
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
        </svg>
        <span className="text-4xl font-bold z-10">{formatSeconds(timerSeconds)}</span>
      </div>
      <div className="flex gap-4 items-center">
        {!isRunning && (
          <button
            className="bg-primary text-primary-foreground px-5 py-2 rounded hover:bg-primary/90 font-semibold"
            onClick={startTimer}
            autoFocus
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            className="bg-muted text-foreground px-5 py-2 rounded hover:bg-muted/80 font-semibold"
            onClick={stopTimer}
          >
            Pause
          </button>
        )}
        <button
          className="px-4 py-2 rounded border border-border text-muted-foreground hover:bg-muted font-medium"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="mt-6 flex gap-3 items-center text-lg">
        <Check className="w-5 h-5 text-green-700" />
        <span className="font-bold">{pomodorosToday}</span>
        <span className="text-muted-foreground">sessions done today</span>
      </div>
    </section>
  );
}
