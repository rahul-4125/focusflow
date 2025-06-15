
import { create } from "zustand";
import { format } from "date-fns";

interface PomodoroSession {
  id: string;
  startTime: string;
  endTime: string | null;
  sessionCount: number;
  userId: string;
}
interface State {
  sessions: PomodoroSession[];
  timerSeconds: number;
  isRunning: boolean;
  isBreak: boolean;
  currentSession: number;
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
  timerSeconds: POMODORO,
  isRunning: false,
  isBreak: false,
  currentSession: 0,
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set({
      timerSeconds: get().isBreak ? BREAK : POMODORO,
      isRunning: false,
    }),
  finishSession: () => {
    set((state) => {
      const now = new Date().toISOString();
      let { isBreak, currentSession } = state;
      if (!isBreak) {
        // Finished work, add record
        const sessions = [
          ...state.sessions,
          {
            id: Math.random().toString(36).substring(2, 10),
            startTime: now,
            endTime: null,
            sessionCount: currentSession + 1,
            userId: "", // fill when backend is connected
          },
        ];
        return {
          ...state,
          sessions,
          isBreak: true,
          timerSeconds: BREAK,
          isRunning: false,
          currentSession: currentSession + 1,
        };
      } else {
        // End break
        return {
          ...state,
          isBreak: false,
          timerSeconds: POMODORO,
            isRunning: false,
        };
      }
    });
  },
  get pomodorosToday() {
    const today = format(new Date(), "yyyy-MM-dd");
    return get().sessions.filter((s) => s.startTime.startsWith(today)).length;
  },
  get weekStats() {
    const stats: Record<string, number> = {};
    for (const s of get().sessions) {
      const d = s.startTime.slice(0, 10);
      stats[d] = (stats[d] || 0) + 1;
    }
    return stats;
  },
}));
