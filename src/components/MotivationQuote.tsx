
import React from "react";
import { format } from "date-fns";
import { Quote, Sparkles } from "lucide-react";

const quotes = [
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "It’s not always that we need to do more but rather that we need to focus on less.",
    author: "Nathan W. Morris",
  },
  {
    text: "Energy and persistence conquer all things.",
    author: "Benjamin Franklin",
  },
  {
    text: "Your mindset determines your success.",
    author: "Anonymous",
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
  },
];

function getTodayQuote() {
  // Change quote daily, cycle through array using day number
  const today = format(new Date(), "yyyy-MM-dd");
  const dayNum = Number(today.replace(/-/g, ""));
  return quotes[dayNum % quotes.length];
}

export default function MotivationQuote() {
  const quote = getTodayQuote();
  return (
    <div className="relative overflow-hidden px-6 py-5 bg-gradient-to-tr from-accent/30 via-background/90 to-primary/10 border rounded-2xl shadow flex gap-3 items-center group transition hover:shadow-lg">
      <Sparkles className="w-8 h-8 text-primary/80 mr-2 animate-pulse drop-shadow inline-block" />
      <div>
        <div className="text-lg md:text-xl font-semibold italic text-muted-foreground">
          "{quote.text}"
        </div>
        <div className="flex items-center mt-1 text-sm text-foreground/70 font-mono gap-1">
          <Quote className="w-4 h-4 inline mr-1 opacity-70" />
          <span>- {quote.author}</span>
        </div>
      </div>
      <div className="absolute -top-8 -right-8 bg-primary/10 blur-2xl h-24 w-24 rounded-full pointer-events-none opacity-60 group-hover:opacity-80 transition" />
    </div>
  );
}
