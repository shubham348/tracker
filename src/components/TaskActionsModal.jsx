import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { getRepeatSummary } from "../utils/repeatSummary";

function TaskActionsModal({
  open,
  onClose,
  task,
  onEdit,
  onDelete,
}) {
  if (!task) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2, // 🔹 LESS ROUNDED
          p: 2.5,
        },
      }}
    >

      {/* CONTENT */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mt={2}
      >
        {/* EMOJI */}
        <Typography fontSize={48}>
          {task.emoji || "🙂"}
        </Typography>

        {/* TITLE */}
        <Typography
          fontWeight={600}
          mt={1}
          sx={{
            whiteSpace: "wrap",
          }}
        >
          {task.title}
        </Typography>

        {/* REPEAT */}
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          {getRepeatSummary(task.repeat)}
        </Typography>

        {/* ACTION ICONS */}
        <Stack
          direction="row"
          spacing={4}
          mt={3}
        >
          <IconButton
            onClick={onEdit}
            sx={{
              bgcolor: "#EEF2FF",
              color: "#2563EB",
              "&:hover": {
                bgcolor: "#E0E7FF",
              },
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={onDelete}
            sx={{
              bgcolor: "#FEE2E2",
              color: "#DC2626",
              "&:hover": {
                bgcolor: "#FECACA",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: "#E5E7EB",
              color: "#374151",
              "&:hover": { bgcolor: "#D1D5DB" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>
    </Dialog>
  );
}

export default TaskActionsModal;
