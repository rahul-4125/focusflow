
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-muted-foreground">{label}</span>
          <span className="text-xs text-primary">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
        <div
          className={cn(
            "h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-sm transition-all duration-500"
          )}
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-card/20 pointer-events-none"
          aria-hidden
        />
      </div>
    </div>
  );
}
