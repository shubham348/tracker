import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTrackerStore } from "../store/useTrackerStore";

function Repeat() {
  const navigate = useNavigate();

  const repeatDraft = useTrackerStore((s) => s.repeatDraft);
  const setRepeatDraft = useTrackerStore((s) => s.setRepeatDraft);

  // Initialize from store (IMPORTANT)
  const [type, setType] = useState(repeatDraft?.type || "daily");
  const [interval, setInterval] = useState(repeatDraft?.interval || 1);
  const [weekDays, setWeekDays] = useState(repeatDraft?.weekDays || []);
  const [monthDates, setMonthDates] = useState(
    repeatDraft?.monthDates || []
  );

  // Ref for frequency scroll
  const freqRef = useRef(null);

  // Sync local state → store
  useEffect(() => {
    setRepeatDraft({
      type,
      interval,
      weekDays,
      monthDates,
    });
  }, [type, interval, weekDays, monthDates, setRepeatDraft]);

  // Auto-center selected interval
  useEffect(() => {
    if (!freqRef.current) return;

    const container = freqRef.current;
    const itemHeight = 44;
    const containerHeight = container.clientHeight;

    const scrollTop =
      (interval - 1) * itemHeight -
      containerHeight / 2 +
      itemHeight / 2;

    container.scrollTo({
      top: Math.max(scrollTop, 0),
      behavior: "smooth",
    });
  }, [interval]);

  const toggleWeekDay = (day) => {
    setWeekDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const toggleMonthDate = (day) => {
    setMonthDates((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <Box p={3} height="100vh" overflow="auto">
      <Button onClick={() => navigate(-1)}>←</Button>

      <Typography variant="h5" mt={2} mb={3}>
        Repeat
      </Typography>

      {/* TYPE */}
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(e, v) => v && setType(v)}
        fullWidth
      >
        <ToggleButton value="daily">Daily</ToggleButton>
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
      </ToggleButtonGroup>

      {/* WEEKLY */}
      {type === "weekly" && (
        <Box mt={4}>
          <Typography mb={1}>Repeat on</Typography>
          <Box display="flex" justifyContent="space-between">
            {["S", "M", "T", "W", "T", "F", "S"].map((label, i) => (
              <Box
                key={i}
                onClick={() => toggleWeekDay(i)}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: weekDays.includes(i)
                    ? "#7C3AED"
                    : "#E5E7EB",
                  color: weekDays.includes(i) ? "#fff" : "#000",
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* MONTHLY */}
      {type === "monthly" && (
        <Box mt={4}>
          <Typography mb={1}>Select dates</Typography>
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const active = monthDates.includes(day);

              return (
                <Box
                  key={day}
                  onClick={() => toggleMonthDate(day)}
                  sx={{
                    height: 42,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    bgcolor: active ? "#7C3AED" : "#F3F4F6",
                    color: active ? "#fff" : "#000",
                  }}
                >
                  {day}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* FREQUENCY */}
      <Box mt={5}>
        <Typography mb={1}>Frequency</Typography>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Typography>Every</Typography>

          <Box
            ref={freqRef}
            sx={{
              height: 140,
              overflowY: "auto",
              scrollSnapType: "y mandatory",
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => {
              const value = i + 1;
              const selected = interval === value;

              return (
                <Box
                  key={value}
                  onClick={() => setInterval(value)}
                  sx={{
                    height: 44,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    scrollSnapAlign: "center",
                    fontWeight: selected ? "bold" : "normal",
                    fontSize: selected ? 20 : 16,
                    color: selected ? "#7C3AED" : "#6B7280",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </Box>
              );
            })}
          </Box>

          <Typography>
            {type === "daily"
              ? "Day"
              : type === "weekly"
              ? "Week"
              : "Month"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Repeat;
