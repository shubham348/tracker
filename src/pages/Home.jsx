import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTrackerStore } from "../store/useTrackerStore";
import { toDateKey, shouldShowTask } from "../utils/date";
import DayScroller from "../components/DayScroller";
import TaskCard from "../components/TaskCard";

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

      <Typography variant="h6" mt={3} mb={2}>
        Tasks
      </Typography>

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

      {/* ➕ ADD TASK */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={() => navigate("/create")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Home;
