
-- TASKS: Allow users to manage their own tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own tasks"
  ON public.tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON public.tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON public.tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON public.tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- MOODS: Allow users to track their own moods
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own moods"
  ON public.moods
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moods"
  ON public.moods
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moods"
  ON public.moods
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods"
  ON public.moods
  FOR DELETE
  USING (auth.uid() = user_id);

-- POMODOROS: Allow users to track their own sessions
ALTER TABLE public.pomodoros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own pomodoros"
  ON public.pomodoros
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pomodoros"
  ON public.pomodoros
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pomodoros"
  ON public.pomodoros
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pomodoros"
  ON public.pomodoros
  FOR DELETE
  USING (auth.uid() = user_id);
