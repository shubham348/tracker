import { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import { useTrackerStore } from "../store/useTrackerStore";
import { useNavigate } from "react-router-dom";
import { toDateKey } from "../utils/date";

function CreateTask() {
  const navigate = useNavigate();

  const addTask = useTrackerStore((s) => s.addTask);
  const repeatDraft = useTrackerStore((s) => s.repeatDraft);
  const clearCreateDraft = useTrackerStore((s) => s.clearCreateDraft);
  const clearRepeatDraft = useTrackerStore((s) => s.clearRepeatDraft);

  // ✅ RESET DRAFTS WHEN CREATE SCREEN OPENS
  useEffect(() => {
    clearCreateDraft();
    clearRepeatDraft();
  }, []);

  const handleCreate = ({ title, emoji, color }) => {
    if (!title.trim()) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      emoji,
      color, // ✅ SAVE COLOR
      createdAt: toDateKey(),
      repeatEnabled: true,
      repeat: repeatDraft,
      completed: {},
    });

    clearCreateDraft();
    clearRepeatDraft();
    navigate("/");
  };


  return <TaskForm submitLabel="Create" onSubmit={handleCreate} />;
}

export default CreateTask;
