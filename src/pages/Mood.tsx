
import Header from "@/components/Header";
import MoodPicker from "@/components/MoodPicker";

export default function Mood() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-8 max-w-2xl w-full mx-auto animate-fade-in">
        <MoodPicker />
      </main>
    </div>
  );
}
