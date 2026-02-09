import {
  Box,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";
import { getRepeatSummary } from "../utils/repeatSummary";

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
      {/* LEFT SIDE */}
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        minWidth={0} // 🔑 REQUIRED for ellipsis
        sx={{ cursor: disableToggle ? "default" : "pointer" }}
        onClick={() => {
          if (!disableToggle) {
            toggleTask(dateKey, task.id);
          }
        }}
      >
        {/* ROUND CHECKBOX */}
        <Checkbox
          checked={!!completed}
          disabled={disableToggle}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />

        {/* EMOJI */}
        <Typography fontSize={22}>
          {task.emoji || "🙂"}
        </Typography>

        {/* TITLE + FREQUENCY */}
        <Box minWidth={0}>
          <Typography
            fontWeight={500}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: 160, sm: 260 },
            }}
          >
            {task.title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {getRepeatSummary(task.repeat)}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT ACTIONS */}
      <Box display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => navigate(`/edit/${task.id}`)}
          sx={{ color: "#2563EB" }} // blue
        >
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => deleteTask(task.id)}
          sx={{ color: "#2563EB" }} // blue
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TaskCard;
