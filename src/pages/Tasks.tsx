
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import { useState } from "react";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col gap-8 px-8 py-6 max-w-3xl w-full mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Button onClick={() => setShowModal(true)}>+ New Task</Button>
        </div>
        <TaskList />
        {showModal && <TaskForm onClose={() => setShowModal(false)} />}
      </main>
    </div>
  );
};

export default Tasks;
