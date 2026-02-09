import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTrackerStore } from "../store/useTrackerStore";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = useTrackerStore((s) => s.tasks);
  const updateTask = useTrackerStore((s) => s.updateTask);
  const loadRepeatFromTask = useTrackerStore((s) => s.loadRepeatFromTask);
  const repeatDraft = useTrackerStore((s) => s.repeatDraft);

  const task = tasks.find((t) => t.id === id);

  // Load repeat config safely
  useEffect(() => {
    if (task) {
      loadRepeatFromTask(
        task.repeat
          ? {
              type: task.repeat.type || "daily",
              interval: task.repeat.interval || 1,
              weekDays: task.repeat.weekDays || [],
              monthDates: task.repeat.monthDates || [],
            }
          : {
              type: "daily",
              interval: 1,
              weekDays: [],
              monthDates: [],
            }
      );
    }
  }, [task]);

  if (!task) return null;

  // ✅ SAFE CHECK (NO UNDEFINED)
  const hasRepeatConfigured =
    repeatDraft &&
    ((repeatDraft.interval ?? 1) !== 1 ||
      (repeatDraft.weekDays?.length ?? 0) > 0 ||
      (repeatDraft.monthDates?.length ?? 0) > 0);

  const handleUpdate = ({ title, emoji }) => {
    updateTask({
      ...task,
      title,
      emoji,
      repeatEnabled: hasRepeatConfigured,
      repeat: hasRepeatConfigured ? repeatDraft : null,
    });

    navigate("/");
  };

  return (
    <TaskForm
      initialTitle={task.title}
      initialEmoji={task.emoji || "🙂"}
      repeatDraft={repeatDraft}
      onSubmit={handleUpdate}
      submitLabel="Save"
    />
  );
}

export default EditTask;
