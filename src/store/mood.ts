
import { create } from "zustand";
import { format } from "date-fns";

interface MoodEntry {
  date: string; // yyyy-MM-dd
  rating: number;
  userId: string;
}

interface State {
  moods: MoodEntry[];
  addMood: (rating: number) => void;
  todayMood: number | null;
  weekStats: Record<string, number>;
}
function today() {
  return format(new Date(), "yyyy-MM-dd");
}

export const useMoodStore = create<State>((set, get) => ({
  moods: [],
  addMood: (rating) =>
    set((state) => {
      const d = today();
      // one per day
      if (state.moods.some((m) => m.date === d)) {
        return {
          moods: state.moods.map((m) =>
            m.date === d ? { ...m, rating } : m
          ),
        };
      }
      return {
        moods: [...state.moods, { date: d, rating, userId: "" }],
      };
    }),
  get todayMood() {
    const found = get().moods.find((m) => m.date === today());
    return found ? found.rating : null;
  },
  get weekStats() {
    const stats: Record<string, number> = {};
    for (const m of get().moods) {
      stats[m.date] = m.rating;
    }
    return stats;
  },
}));
