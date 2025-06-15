/**
 * API client - stubbed out for local use
 * Replace with calls to /api/tasks, /api/pomodoros, etc. when backend ready.
 * If using Supabase, swap to their JS client here.
 */
export async function login({ email, password }: { email: string; password: string }) {
  // TODO: integrate with backend or Supabase
  return { token: "fake-jwt-token", user: { name: "Demo User", email } };
}
// Add task, get tasks, update task, delete task, etc...

export const api = {
  login,
  // ...other stubs
};

import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, Tables } from "@/integrations/supabase/types";

// --- TASKS ---
export async function fetchTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Tables<"tasks">[];
}

export async function addTask(task: Omit<TablesInsert<"tasks">, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Tables<"tasks">;
}

export async function updateTask(id: string, partial: Partial<TablesInsert<"tasks">>) {
  const { data, error } = await supabase
    .from("tasks")
    .update(partial)
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Tables<"tasks">;
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

// --- MOODS ---
export async function fetchMoods() {
  const { data, error } = await supabase
    .from("moods")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data as Tables<"moods">[];
}

export async function upsertMood(mood: Omit<TablesInsert<"moods">, "id">) {
  // Upsert by user_id + date
  const { data, error } = await supabase
    .from("moods")
    .upsert([mood], { onConflict: ["user_id", "date"] })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Tables<"moods">;
}

// --- POMODOROS ---
export async function fetchPomodoros() {
  const { data, error } = await supabase
    .from("pomodoros")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Tables<"pomodoros">[];
}

export async function addPomodoro(pomo: Omit<TablesInsert<"pomodoros">, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("pomodoros")
    .insert([pomo])
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Tables<"pomodoros">;
}
