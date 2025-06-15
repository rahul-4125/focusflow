
import { useState } from "react";
import { Smile, LogOut, User2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/useAuthSession";

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const { profile } = useAuthSession();
  const [editing, setEditing] = useState(false);
  const [usernameInput, setUsernameInput] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    setOpen(false);
    window.location.href = "/auth";
  }

  async function handleSaveUsername() {
    if (!usernameInput.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username: usernameInput.trim() })
      .eq("id", profile?.id);
    setSaving(false);
    if (!error) {
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 1200);
      // Quick way to force a profile refresh on UI
      window.location.reload();
    }
  }

  return (
    <div className="relative">
      <button
        aria-label="Open user menu"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-muted bg-muted p-1 w-8 h-8 flex items-center justify-center transition hover:shadow hover:scale-110 focus:outline-none focus:ring-2 ring-primary"
      >
        <Smile className="w-6 h-6 text-primary" />
      </button>
      {open && (
        <div
          className="absolute z-50 right-0 mt-2 w-56 rounded-xl bg-popover shadow-lg ring-1 ring-border animate-fade-in"
          tabIndex={-1}
          onBlur={() => setOpen(false)}
        >
          <div className="flex flex-col p-4 border-b gap-2">
            <div className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-primary" />
              <span className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                {profile?.username ? (
                  <>
                    Hi, {profile.username}! <Sparkles className="inline-block w-4 h-4 text-accent ml-1" />
                  </>
                ) : (
                  <>
                    Welcome!{" "}
                  </>
                )}
              </span>
            </div>
            {!profile?.username && !editing && (
              <button
                className="text-sm mt-1 bg-accent/40 rounded px-2 py-1 font-medium hover:bg-accent/70 transition"
                onClick={() => setEditing(true)}
              >
                Set your name
              </button>
            )}
            {editing && (
              <form
                className="flex flex-row items-center gap-2 mt-1"
                onSubmit={e => {
                  e.preventDefault();
                  handleSaveUsername();
                }}
              >
                <input
                  autoFocus
                  type="text"
                  className="border px-2 py-1 rounded w-full text-sm"
                  placeholder="Your name"
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                  disabled={saving}
                  maxLength={30}
                />
                <button
                  type="submit"
                  className="bg-primary px-2 py-1 rounded text-white text-xs font-semibold"
                  disabled={!usernameInput.trim() || saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="ml-1 text-muted-foreground text-xs"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </form>
            )}
            {success && (
              <div className="text-green-600 text-xs mt-1">Name saved!</div>
            )}
          </div>
          <button
            className="w-full text-left px-4 py-2 hover:bg-accent rounded transition flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-1 opacity-70" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
