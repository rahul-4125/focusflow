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
