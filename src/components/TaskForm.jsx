import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";
import RepeatInline from "./RepeatInline";
import TaskColorPicker from "./TaskColorPicker";

const EMOJIS = ["🙂", "🔥", "💪", "🧠", "🥗", "🏃"];

function TaskForm({ onSubmit, submitLabel }) {
  const navigate = useNavigate();

  const { title, emoji, color } = useTrackerStore(
    (s) => s.createDraft
  );
  const setCreateDraft = useTrackerStore(
    (s) => s.setCreateDraft
  );

  return (
    <Box>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* EMOJI */}
      <Box mt={2} display="flex" gap={1} sx={{
        overflowY: "hidden"
      }} >
        {EMOJIS.map((e) => (
          <Box
            key={e}
            onClick={() => setCreateDraft({ emoji: e })}
            sx={{
              fontSize: 26,
              cursor: "pointer",
              opacity: emoji === e ? 1 : 0.4,
              transform:
                emoji === e ? "scale(1.2)" : "scale(1)",
            }}
          >
            {e}
          </Box>
        ))}
      </Box>

      {/* TITLE */}
      <TextField
        fullWidth
        label="Task name"
        value={title}
        onChange={(e) =>
          setCreateDraft({ title: e.target.value })
        }
        sx={{ mt: 3 }}
        inputProps={{ maxLength: 50 }}
        helperText={`${title.length}/50`}
      />

      {/* COLOR PICKER */}
      <TaskColorPicker
        value={color}
        onChange={(c) => setCreateDraft({ color: c })}
      />

      {/* REPEAT */}
      <RepeatInline />

      {/* SUBMIT */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => {
          if (!title.trim()) return;
          onSubmit({ title, emoji, color });
        }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
}

export default TaskForm;
