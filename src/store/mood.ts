import { create } from "zustand";
import { format } from "date-fns";
import { fetchMoods, upsertMood } from "@/utils/api";
// Removed: import { useAuthSession } from "@/hooks/useAuthSession";

interface MoodEntry {
  id: string;
  date: string; // yyyy-MM-dd
  rating: number;
  user_id: string;
}
interface State {
  moods: MoodEntry[];
  loading: boolean;
  fetchMoods: () => Promise<void>;
  addMood: (rating: number, user_id: string) => Promise<void>;
  todayMood: number | null;
  weekStats: Record<string, number>;
}

function today() {
  return format(new Date(), "yyyy-MM-dd");
}

export const useMoodStore = create<State>((set, get) => ({
  moods: [],
  loading: false,
  fetchMoods: async function () {
    set({ loading: true });
    const data = await fetchMoods();
    set({ moods: data, loading: false });
  },
  addMood: async function (rating, user_id) {
    if (!user_id) return;
    const d = today();
    const added = await upsertMood({ user_id, date: d, rating });
    set((state) => {
      // update or add
      const prevIdx = state.moods.findIndex((m) => m.date === d);
      if (prevIdx !== -1) {
        return {
          moods: state.moods.map((m, i) => (i === prevIdx ? added : m)),
        };
      }
      return {
        moods: [added, ...state.moods],
      };
    });
    // Always refetch moods after adding/updating
    await get().fetchMoods();
  },
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
  }
}));
// On definition above, add this snippet at the end so data is always loaded on page load:
if (typeof window !== "undefined") {
  useMoodStore.getState().fetchMoods();
}
