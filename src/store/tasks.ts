import { create } from "zustand";
import { format } from "date-fns";
import { fetchTasks, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from "@/utils/api";
// Removed import { useAuthSession } from "@/hooks/useAuthSession";

export interface Task {
  id: string;
  title: string;
  category: "Work" | "Study" | "Personal";
  due_time?: string | null;
  completed: boolean;
  user_id: string;
  created_at: string;
}
interface State {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id" | "created_at">, user_id: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  completedToday: number;
  weekStats: Record<string, number>;
}

function getToday() {
  return format(new Date(), "yyyy-MM-dd");
}

export const useTasksStore = create<State>((set, get) => ({
  tasks: [],
  loading: false,
  fetchTasks: async function () {
    set({ loading: true });
    const data = await fetchTasks();
    set({ 
      tasks: data.map((t) => ({
        ...t,
        category: t.category as "Work" | "Study" | "Personal",
        due_time: t.due_time ?? "",
      })),
      loading: false
    });
  },
  addTask: async function (task, user_id) {
    if (!user_id) return;
    const newTask = {
      ...task,
      user_id,
      due_time: task.due_time ?? "",
      completed: false
    };
    const t = await addTaskAPI(newTask);
    set((state) => ({
      tasks: [{ ...t, category: t.category as "Work" | "Study" | "Personal" }, ...state.tasks],
    }));
  },
  updateTask: async function (id, data) {
    const t = await updateTaskAPI(id, data);
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...t, category: t.category as "Work" | "Study" | "Personal" } : task)),
    }));
  },
  deleteTask: async function (id) {
    await deleteTaskAPI(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },
  toggleComplete: async function (id) {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    await updateTaskAPI(id, { completed: !task.completed });
    set((state) => ({
      tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t),
    }));
    // Refresh tasks to update statistics and chart, so UI always matches DB
    await get().fetchTasks();
  },
  get completedToday() {
    return get()
      .tasks.filter((t) => t.completed && t.created_at.startsWith(getToday())).length;
  },
  get weekStats() {
    const stats: Record<string, number> = {};
    for (const t of get().tasks) {
      const d = t.created_at.slice(0, 10);
      if (t.completed) stats[d] = (stats[d] || 0) + 1;
    }
    return stats;
  },
}));
// On definition above, add this snippet at the end so data is always loaded on page load:
if (typeof window !== "undefined") {
  // Preload tasks on page load
  useTasksStore.getState().fetchTasks();
}
