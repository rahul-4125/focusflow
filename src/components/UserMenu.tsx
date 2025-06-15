
import { useState } from "react";
import { Smile } from "lucide-react";

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);

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
          className="absolute z-50 right-0 mt-2 w-48 rounded-xl bg-popover shadow-lg ring-1 ring-border animate-fade-in"
          tabIndex={-1}
          onBlur={() => setOpen(false)}
        >
          <div className="px-4 py-2 border-b">User Name</div>
          <button
            className="w-full text-left px-4 py-2 hover:bg-accent rounded transition"
            onClick={() => {
              setOpen(false);
              // add logout logic here
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
