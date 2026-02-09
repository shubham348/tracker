import { Box, Typography } from "@mui/material";
import { getScrollableDays, toDateKey } from "../utils/date";
import { useEffect, useRef } from "react";

function DayScroller({ selectedDate, onChange }) {
  const days = getScrollableDays();
  const selectedKey = toDateKey(selectedDate);

  const containerRef = useRef(null);
  const activeRef = useRef(null);

  // 🎯 Auto-scroll selected day into center
  useEffect(() => {
    if (!containerRef.current || !activeRef.current) return;

    const container = containerRef.current;
    const active = activeRef.current;

    const containerCenter =
      container.offsetWidth / 2;
    const activeCenter =
      active.offsetLeft + active.offsetWidth / 2;

    container.scrollTo({
      left: activeCenter - containerCenter,
      behavior: "smooth",
    });
  }, [selectedKey]);

  return (
    <Box
      ref={containerRef}
      display="flex"
      gap={2}
      overflow="auto"
      py={2}
      sx={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {days.map((d) => {
        const key = toDateKey(d);
        const active = key === selectedKey;

        return (
          <Box
            key={key}
            ref={active ? activeRef : null}
            onClick={() => onChange(d)} // ✅ PASS DATE OBJECT
            sx={{
              minWidth: 56,
              textAlign: "center",
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: active
                ? "#DDD6FE"
                : "transparent",
            }}
          >
            <Typography variant="caption">
              {d.toLocaleDateString("en", {
                weekday: "short",
              })}
            </Typography>

            <Typography fontWeight="bold">
              {d.getDate()}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default DayScroller;
