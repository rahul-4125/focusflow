
import { useTasksStore, Task } from "@/store/tasks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthSession } from "@/hooks/useAuthSession";

interface Props {
  editTask?: Task;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(2, "Title required"),
  category: z.enum(["Work", "Study", "Personal"]),
  due_time: z.string().min(1, "Due time required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function TaskForm({ editTask, onClose }: Props) {
  const { addTask, updateTask } = useTasksStore();
  const { profile } = useAuthSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: editTask
      ? {
          title: editTask.title,
          category: editTask.category,
          due_time: editTask.due_time ?? "",
        }
      : { title: "", category: "Work", due_time: "" },
  });

  const onSubmit = (data: FormValues) => {
    if (editTask) {
      updateTask(editTask.id, data);
    } else if (profile?.id) {
      addTask(
        {
          title: data.title,
          category: data.category,
          due_time: data.due_time,
          completed: false,
          user_id: profile.id, // for types, actual set in store
        },
        profile.id
      );
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" tabIndex={-1} onClick={onClose}>
      <form
        className="bg-card rounded-xl shadow-xl w-[96vw] max-w-md p-8 flex flex-col gap-5 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        tabIndex={0}
        aria-modal="true"
      >
        <h3 className="font-bold text-xl">{editTask ? "Edit Task" : "New Task"}</h3>
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title")}
            className="w-full border rounded px-3 py-2"
            aria-invalid={!!errors.title}
          />
          {errors.title && <span className="text-red-700 text-xs">{errors.title.message}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="category">Category</label>
          <select id="category" {...register("category")} className="w-full border rounded px-3 py-2" aria-invalid={!!errors.category}>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="due_time">Due Time</label>
          <input
            id="due_time"
            {...register("due_time")}
            type="time"
            className="w-full border rounded px-3 py-2"
            aria-invalid={!!errors.due_time}
          />
          {errors.due_time && <span className="text-red-700 text-xs">{errors.due_time.message}</span>}
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" className="text-muted-foreground px-4 py-2 rounded hover:bg-muted" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 focus:outline-none">
            {editTask ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
