
import { useTasksStore } from "@/store/tasks";
import { Check, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const { tasks, toggleComplete, deleteTask } = useTasksStore();
  const [editId, setEditId] = useState<string | null>(null);

  return (
    <ul className="bg-card/60 rounded-lg divide-y divide-border shadow">
      {tasks.length === 0 && <li className="p-8 text-center text-muted-foreground">No tasks yet.</li>}
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between px-4 py-3 gap-2 group"
        >
          <div className="flex-1 flex items-center gap-3">
            <button
              aria-label={`Mark ${task.title} as completed`}
              className={cn(
                "w-5 h-5 rounded border ring-0 flex items-center justify-center focus:outline-none",
                {
                  "bg-green-300 border-green-700": task.completed,
                  "border-border hover:border-primary": !task.completed,
                }
              )}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed && <Check className="w-4 h-4 text-green-800" />}
            </button>
            <div>
              <div className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                {task.title}
              </div>
              <div className="text-xs text-muted-foreground flex gap-2">
                <span className="px-2 py-0.5 rounded bg-muted">{task.category}</span>
                <span className="ml-2">{task.due_time && `Due: ${task.due_time}`}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
            <button
              aria-label="Edit Task"
              className="p-1 rounded hover:bg-accent transition"
              onClick={() => setEditId(task.id)}
            >
              <Edit className="w-5 h-5 text-primary" />
            </button>
            <button
              aria-label="Delete Task"
              className="p-1 rounded hover:bg-accent transition"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="w-5 h-5 text-destructive" />
            </button>
          </div>
          {editId === task.id && (
            <TaskForm editTask={task} onClose={() => setEditId(null)} />
          )}
        </li>
      ))}
    </ul>
  );
}
