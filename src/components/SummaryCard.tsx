
import { Check, Clock, Smile, Frown, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, JSX.Element> = {
  check: <Check className="w-6 h-6 text-primary" />,
  clock: <Clock className="w-6 h-6 text-primary" />,
  smile: <Smile className="w-6 h-6 text-primary" />,
  frown: <Frown className="w-6 h-6 text-primary" />,
  bar: <BarChart className="w-6 h-6 text-primary" />,
};

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: keyof typeof iconMap;
  description?: string;
}

export default function SummaryCard({ title, value, icon, description }: SummaryCardProps) {
  return (
    <div className="flex flex-col min-w-[180px] bg-card rounded-xl px-6 py-5 shadow group transition hover:shadow-lg hover:scale-[1.02] animate-fade-in">
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-accent/60 p-2">{iconMap[icon]}</span>
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight">{value}</span>
          <span className="text-xs text-muted-foreground">{title}</span>
        </div>
      </div>
      {description && (
        <div className="mt-2 ml-14 text-[11px] text-muted-foreground">{description}</div>
      )}
    </div>
  );
}
