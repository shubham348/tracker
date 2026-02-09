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

  const task = tasks.find((t) => t.id === id);

  // 🔁 PRELOAD DRAFTS ONCE
  useEffect(() => {
    if (!task) return;

    // preload title + emoji
    setCreateDraft({
      title: task.title,
      emoji: task.emoji || "🙂",
    });

    // preload repeat
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
      repeat: task.repeat ? task.repeat : null,
    });

    navigate("/");
  };

  return (
    <TaskForm
      submitLabel="Save"
      onSubmit={handleUpdate}
    />
  );
}

export default EditTask;
