import { Box, Typography, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";
import { toDateKey, shouldShowTask } from "../utils/date";
import DayScroller from "../components/DayScroller";
import TaskCard from "../components/TaskCard";
import AppLayout from "../components/AppLayout";

function Home() {
  const navigate = useNavigate();

  const tasks = useTrackerStore((s) => s.tasks);

  // ✅ Selected date (Date object only)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedKey = toDateKey(selectedDate);

  const todayKey = toDateKey(new Date());
  const disableToggle = selectedKey > todayKey;
  return (

    <Box p={3} pb={10}>
      {/* DAY SCROLLER */}
      <DayScroller
        selectedDate={selectedDate}
        onChange={setSelectedDate}
      />

      <Box
        mt={3}
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">
          Tasks
        </Typography>

        {/* ADD BUTTON (SQUARE, INLINE) */}
        <IconButton
          onClick={() => navigate("/create")}
          sx={{
            bgcolor: "#7C3AED",
            color: "#fff",
            borderRadius: 1, // square-ish
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: "#6D28D9",
            },
          }}
        >
          +
        </IconButton>
      </Box>
      <Box sx={{
        flex: 1,
        overflowY: "auto",
        pr: 0.5,
      }}>



        {tasks
          .filter((task) => shouldShowTask(task, selectedKey))
          .map((task) => {
            const completedMap = task.completed || {};
            const completed = Boolean(completedMap[selectedKey]);

            return (
              <TaskCard
                key={task.id}
                task={task}
                completed={completed}
                dateKey={selectedKey}
                disableToggle={disableToggle}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default Home;
