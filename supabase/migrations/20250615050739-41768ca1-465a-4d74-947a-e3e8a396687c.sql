
-- Drop the trigger so we can replace the function safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop and recreate the handle_new_user function with a fixed search path
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Set a fixed search_path to public to prevent function search path confusion
  PERFORM set_config('search_path', 'public', false);
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger to call the new function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();
