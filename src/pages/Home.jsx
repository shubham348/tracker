import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerStore } from "../store/useTrackerStore";
import { toDateKey, shouldShowTask } from "../utils/date";
import DayScroller from "../components/DayScroller";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

function Home() {
  const navigate = useNavigate();

  const tasks = useTrackerStore((s) => s.tasks);

  // ✅ Selected date (Date object only)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedKey = toDateKey(selectedDate);

  const todayKey = toDateKey(new Date());
  const disableToggle = selectedKey > todayKey;

  const visibleTasks = tasks.filter((task) =>
    shouldShowTask(task, selectedKey)
  );


  return (

    <Box sx={{
      flex: 1,                // 🔑 THIS IS THE FIX
      display: "flex",
      flexDirection: "column",
      px: 2,
      pt: 2,
      overflow: "hidden",     // prevents double scroll
    }}>
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
        <Box mb={2}>
          <Typography fontWeight={700}>
            Today’s tasks
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Stay consistent, one habit at a time
          </Typography>
        </Box>


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
      <Box
        sx={{
          height: "calc(70vh - 120px)",
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        {visibleTasks.length === 0 ? (
          <EmptyState onAdd={() => navigate("/create")} />
        ) : (
          visibleTasks.map((task) => {
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
          })
        )}

      </Box>
    </Box>
  );
}

export default Home;
