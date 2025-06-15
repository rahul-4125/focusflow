
import { create } from "zustand";
import { format } from "date-fns";
export interface Task {
  id: string;
  title: string;
  category: "Work" | "Study" | "Personal";
  dueTime: string;
  completed: boolean;
  userId: string;
  createdAt: string; // ISO date
}
interface State {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;

  completedToday: number;
  weekStats: Record<string, number>;
}

function getToday() {
  return format(new Date(), "yyyy-MM-dd");
}

export const useTasksStore = create<State>((set, get) => ({
  tasks: [],
  addTask: (t) =>
    set((state) => {
      const createdAt = new Date().toISOString();
      const id = Math.random().toString(36).slice(2, 9);
      return {
        tasks: [
          ...state.tasks,
          {
            ...t,
            id,
            completed: false,
            createdAt,
          },
        ],
      };
    }),
  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    })),
  get completedToday() {
    return get()
      .tasks.filter(
        (t) => t.completed && t.createdAt.startsWith(getToday())
      ).length;
  },
  get weekStats() {
    const stats: Record<string, number> = {};
    for (const t of get().tasks) {
      const d = t.createdAt.slice(0, 10);
      if (t.completed) stats[d] = (stats[d] || 0) + 1;
    }
    return stats;
  },
}));
