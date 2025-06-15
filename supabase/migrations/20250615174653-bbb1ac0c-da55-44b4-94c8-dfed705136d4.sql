
-- Tasks table
CREATE TABLE public.tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Work', 'Study', 'Personal')),
  due_time text,
  completed boolean NOT NULL DEFAULT FALSE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS and restrict to owners for tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User can read their own tasks"
  ON public.tasks FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "User can insert their own tasks"
  ON public.tasks FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "User can update their own tasks"
  ON public.tasks FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "User can delete their own tasks"
  ON public.tasks FOR DELETE USING (user_id = auth.uid());

-- Moods table (one per user per day)
CREATE TABLE public.moods (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  date date NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 10),
  UNIQUE (user_id, date)
);

-- Enable RLS and restrict to owners for moods
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User can read their own moods"
  ON public.moods FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "User can insert their own moods"
  ON public.moods FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "User can update their own moods"
  ON public.moods FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "User can delete their own moods"
  ON public.moods FOR DELETE USING (user_id = auth.uid());

-- Pomodoro sessions table
CREATE TABLE public.pomodoros (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  session_count int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS and restrict to owners for pomodoros
ALTER TABLE public.pomodoros ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User can read their own pomodoros"
  ON public.pomodoros FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "User can insert their own pomodoros"
  ON public.pomodoros FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "User can update their own pomodoros"
  ON public.pomodoros FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "User can delete their own pomodoros"
  ON public.pomodoros FOR DELETE USING (user_id = auth.uid());
