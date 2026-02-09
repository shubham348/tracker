import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";
import { getRepeatSummary } from "../utils/repeatSummary";
import { useState } from "react";
import TaskActionsModal from "./TaskActionsModal";

function TaskCard({ task, completed, dateKey, disableToggle }) {
  const navigate = useNavigate();
  const toggleTask = useTrackerStore((s) => s.toggleTask);
  const deleteTask = useTrackerStore((s) => s.deleteTask);

  const isDesktop = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = useState(false);

  const handleOpenActions = () => {
    if (!isDesktop) setOpen(true);
  };

  return (
    <>
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
          minWidth={0}
          onClick={handleOpenActions}
          sx={{
            cursor: disableToggle
              ? "default"
              : isDesktop
                ? "default"
                : "pointer",
          }}
        >
          {/* CHECKBOX */}
          <Checkbox
            checked={!!completed}
            disabled={disableToggle}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            onClick={(e) => {
              e.stopPropagation();
              if (!disableToggle) {
                toggleTask(dateKey, task.id);
              }
            }}
          />

          {/* EMOJI */}
          <Typography fontSize={22}>
            {task.emoji || "🙂"}
          </Typography>

          {/* TITLE + REPEAT */}
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
        {!isDesktop && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        )}

        {/* DESKTOP ACTION ICONS */}
        {isDesktop && (
          <Box>
            <IconButton
              size="small"
              onClick={() => navigate(`/edit/${task.id}`)}
              sx={{ color: "#2563EB" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => deleteTask(task.id)}
              sx={{ color: "#2563EB" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* MOBILE ACTION MODAL */}
      <TaskActionsModal
        open={open}
        task={task}
        onClose={() => setOpen(false)}
        onEdit={() => navigate(`/edit/${task.id}`)}
        onDelete={() => {
          deleteTask(task.id);
          setOpen(false);
        }}
      />
    </>
  );
}

export default TaskCard;
