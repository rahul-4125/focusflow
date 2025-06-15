
import { useMoodStore } from "@/store/mood";
import { useState } from "react";

const MOODS = [
  { icon: "😃", value: 10 },
  { icon: "🙂", value: 7 },
  { icon: "😐", value: 5 },
  { icon: "🙁", value: 3 },
  { icon: "😢", value: 1 },
];

export default function MoodPicker() {
  const { addMood, todayMood } = useMoodStore();
  const [selected, setSelected] = useState<number | null>(todayMood);

  const handleSelect = (value: number) => {
    setSelected(value);
    addMood(value);
  };

  return (
    <section className="flex flex-col gap-8 items-center">
      <h2 className="text-xl font-bold">How was your mood today?</h2>
      <div className="flex gap-5 items-center">
        {MOODS.map((m) => (
          <button
            key={m.value}
            className={`text-4xl transition hover:scale-125 focus:outline-none ${
              selected === m.value ? "ring-4 ring-primary bg-accent rounded-full" : ""
            }`}
            onClick={() => handleSelect(m.value)}
            aria-selected={selected === m.value}
            aria-label={`Mood ${m.icon}`}
          >
            {m.icon}
          </button>
        ))}
      </div>
      <span className="text-muted-foreground text-base">
        {selected !== null
          ? `Saved mood: ${MOODS.find((m) => m.value === selected)?.icon || ""}`
          : "Select an emoji that matches your mood."}
      </span>
      <div className="mt-8 text-lg">Or use the mood slider:</div>
      <input
        type="range"
        min={1}
        max={10}
        value={selected ?? 5}
        onChange={(e) => handleSelect(Number(e.target.value))}
        className="w-64 h-3 bg-muted/40 rounded accent-primary accent-2"
        aria-label="Mood slider"
      />
    </section>
  );
}
