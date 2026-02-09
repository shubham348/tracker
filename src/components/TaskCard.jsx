import {
  Box,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";

function TaskCard({ task, completed, dateKey, disableToggle }) {
  const navigate = useNavigate();
  const toggleTask = useTrackerStore((s) => s.toggleTask);
  const deleteTask = useTrackerStore((s) => s.deleteTask);

  return (
    <Box
      p={2}
      mb={2}
      borderRadius={2}
      bgcolor="#E0F2FE"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        opacity: completed ? 0.5 : 1,
        filter: completed ? "blur(0.5px)" : "none",
      }}
    >
      {/* LEFT: COMPLETE / UNCOMPLETE */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{ cursor: disableToggle ? "default" : "pointer" }}
        onClick={() => {
          if (!disableToggle) {
            toggleTask(dateKey, task.id);
          }
        }}
      >
        <Checkbox checked={!!completed} disabled={disableToggle} />
        <Typography fontSize={22}>{task.emoji || "🙂"}</Typography>
        <Typography>{task.title}</Typography>
      </Box>

      {/* RIGHT: ACTIONS */}
      <Box>
        <IconButton
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => deleteTask(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TaskCard;
