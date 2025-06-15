
import Header from "@/components/Header";
import ChartWrapper from "@/components/ChartWrapper";

export default function Insights() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex flex-col gap-8 px-8 py-6 max-w-7xl mx-auto w-full animate-fade-in">
        <h2 className="text-2xl font-bold">Insights & Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartWrapper type="tasks" />
          <ChartWrapper type="pomodoros" />
          <ChartWrapper type="mood" />
        </div>
      </main>
    </div>
  );
}
