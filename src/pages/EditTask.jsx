import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTrackerStore } from "../store/useTrackerStore";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = useTrackerStore((s) => s.tasks);
  const updateTask = useTrackerStore((s) => s.updateTask);

  const setCreateDraft = useTrackerStore((s) => s.setCreateDraft);
  const setRepeatDraft = useTrackerStore((s) => s.setRepeatDraft);
  const repeatDraft = useTrackerStore((s) => s.repeatDraft);

  const task = tasks.find((t) => t.id === id);

  // 🔁 PRELOAD DRAFTS
  useEffect(() => {
    if (!task) return;

    setCreateDraft({
      title: task.title,
      emoji: task.emoji || "🙂",
    });

    if (task.repeat) {
      setRepeatDraft({
        type: task.repeat.type || "daily",
        interval: task.repeat.interval || 1,
        weekDays: task.repeat.weekDays || [],
        monthDates: task.repeat.monthDates || [],
      });
    }
  }, [task]);

  if (!task) return null;

  const handleUpdate = ({ title, emoji }) => {
    updateTask({
      ...task,
      title,
      emoji,
      repeat: repeatDraft, // ✅ USE UPDATED FREQUENCY
    });

    navigate("/");
  };

  return <TaskForm submitLabel="Save" onSubmit={handleUpdate} />;
}

export default EditTask;
