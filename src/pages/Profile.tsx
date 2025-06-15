
import { useAuthSession } from "@/hooks/useAuthSession";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ProfilePage() {
  const { profile, user } = useAuthSession();
  const [username, setUsername] = useState(profile?.username || "");
  const [loading, setLoading] = useState(false);
  const [appTheme, setAppTheme] = useState("default"); // stub

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user?.id);
    setLoading(false);
    if (error) {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Profile updated!" });
    }
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center">
      <div className="mt-12 max-w-lg w-full bg-card rounded-xl shadow-xl p-8 flex flex-col gap-7">
        <h2 className="text-2xl font-bold text-center">Profile & Preferences</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <Input
              id="username"
              value={username}
              required
              disabled={loading}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">App Theme</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={appTheme}
              disabled
              onChange={e => setAppTheme(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="dark" disabled>
                Dark&nbsp;(coming soon)
              </option>
              <option value="light" disabled>
                Light&nbsp;(coming soon)
              </option>
            </select>
          </div>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
