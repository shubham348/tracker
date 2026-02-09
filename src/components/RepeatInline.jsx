import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useTrackerStore } from "../store/useTrackerStore";
import { useEffect, useRef } from "react";

function RepeatInline() {
  const repeatDraft = useTrackerStore((s) => s.repeatDraft);
  const setRepeatDraft = useTrackerStore((s) => s.setRepeatDraft);

  const { type, interval, weekDays, monthDates } = repeatDraft;

  const scrollRef = useRef(null);

  // 🔒 Remember interval per type (LOCAL, SAFE)
  const lastIntervalsRef = useRef({
    daily: interval,
    weekly: interval,
    monthly: interval,
  });

  // Keep current interval in sync
  useEffect(() => {
    lastIntervalsRef.current[type] = interval;
  }, [interval, type]);

  // Center selected interval
  useEffect(() => {
    if (!scrollRef.current) return;

    const itemHeight = 44;
    const containerHeight = 140;

    scrollRef.current.scrollTo({
      top:
        (interval - 1) * itemHeight -
        containerHeight / 2 +
        itemHeight / 2,
      behavior: "smooth",
    });
  }, [interval]);

  // ✅ TYPE SWITCH WITH PER-TYPE INTERVAL RESTORE
  const handleTypeChange = (_, newType) => {
    if (!newType || newType === type) return;

    const restoredInterval =
      lastIntervalsRef.current[newType] || 1;

    if (newType === "daily") {
      setRepeatDraft({
        type: "daily",
        interval: restoredInterval,
        weekDays: [],
        monthDates: [],
      });
    }

    if (newType === "weekly") {
      setRepeatDraft({
        type: "weekly",
        interval: restoredInterval,
        weekDays: [],
        monthDates: [],
      });
    }

    if (newType === "monthly") {
      setRepeatDraft({
        type: "monthly",
        interval: restoredInterval,
        weekDays: [],
        monthDates: [],
      });
    }
  };

  const toggleWeekDay = (day) => {
    setRepeatDraft({
      weekDays: weekDays.includes(day)
        ? weekDays.filter((d) => d !== day)
        : [...weekDays, day],
    });
  };

  const toggleMonthDate = (day) => {
    setRepeatDraft({
      monthDates: monthDates.includes(day)
        ? monthDates.filter((d) => d !== day)
        : [...monthDates, day],
    });
  };

  return (
    <Box mt={4}>
      <Typography fontWeight={600} mb={1}>
        Repeat
      </Typography>

      {/* TYPE */}
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleTypeChange}
        fullWidth
      >
        <ToggleButton value="daily">Daily</ToggleButton>
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
      </ToggleButtonGroup>

      {/* WEEKLY */}
      {type === "weekly" && (
        <Box mt={3}>
          <Typography mb={1}>Repeat on</Typography>
          <Box display="flex" justifyContent="space-between">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <Box
                key={i}
                onClick={() => toggleWeekDay(i)}
                sx={{
                  width: 42,
                  height: 42,
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
                {d}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* MONTHLY */}
      {type === "monthly" && (
        <Box mt={3}>
          <Typography mb={1}>Select dates</Typography>
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              return (
                <Box
                  key={day}
                  onClick={() => toggleMonthDate(day)}
                  sx={{
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    bgcolor: monthDates.includes(day)
                      ? "#7C3AED"
                      : "#F3F4F6",
                    color: monthDates.includes(day) ? "#fff" : "#000",
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
      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Typography>Every</Typography>

        <Box
          ref={scrollRef}
          sx={{
            height: 140,
            overflowY: "auto",
            scrollSnapType: "y mandatory",
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => {
            const value = i + 1;
            const selected = value === interval;

            return (
              <Box
                key={value}
                onClick={() => setRepeatDraft({ interval: value })}
                sx={{
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scrollSnapAlign: "center",
                  fontSize: selected ? 20 : 16,
                  fontWeight: selected ? 700 : 400,
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
  );
}

export default RepeatInline;
