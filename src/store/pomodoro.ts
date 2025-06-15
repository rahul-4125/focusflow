
import { create } from "zustand";
import { format } from "date-fns";
import { fetchPomodoros, addPomodoro } from "@/utils/api";
import { useAuthSession } from "@/hooks/useAuthSession";

interface PomodoroSession {
  id: string;
  start_time: string;
  end_time: string | null;
  session_count: number;
  user_id: string;
  created_at: string;
}
interface State {
  sessions: PomodoroSession[];
  loading: boolean;
  timerSeconds: number;
  isRunning: boolean;
  isBreak: boolean;
  currentSession: number;
  fetchPomodoros: () => Promise<void>;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  finishSession: () => void;
  pomodorosToday: number;
  weekStats: Record<string, number>;
}
const POMODORO = 25 * 60;
const BREAK = 5 * 60;

export const usePomodoroStore = create<State>((set, get) => ({
  sessions: [],
  loading: false,
  timerSeconds: POMODORO,
  isRunning: false,
  isBreak: false,
  currentSession: 0,
  fetchPomodoros: async function () {
    set({ loading: true });
    const data = await fetchPomodoros();
    set({ sessions: data, loading: false });
  },
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set({
      timerSeconds: get().isBreak ? BREAK : POMODORO,
      isRunning: false,
    }),
  finishSession: async function () {
    const now = new Date().toISOString();
    let { isBreak, currentSession } = get();
    const { profile } = useAuthSession.getState();
    if (!profile?.id) return;

    if (!isBreak) {
      // Save session to DB as work session
      const added = await addPomodoro({
        start_time: now,
        end_time: null,
        session_count: currentSession + 1,
        user_id: profile.id,
      });
      set((state) => ({
        sessions: [...state.sessions, added],
        isBreak: true,
        timerSeconds: BREAK,
        isRunning: false,
        currentSession: currentSession + 1,
      }));
    } else {
      // End break - just reset in client
      set({
        isBreak: false,
        timerSeconds: POMODORO,
        isRunning: false,
      });
    }
  },
  get pomodorosToday() {
    const today = format(new Date(), "yyyy-MM-dd");
    return get().sessions.filter((s) => s.start_time.startsWith(today)).length;
  },
  get weekStats() {
    const stats: Record<string, number> = {};
    for (const s of get().sessions) {
      const d = s.start_time.slice(0, 10);
      stats[d] = (stats[d] || 0) + 1;
    }
    return stats;
  },
}));
