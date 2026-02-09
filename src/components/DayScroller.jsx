import { Box, Typography } from "@mui/material";
import { getScrollableDays, toDateKey } from "../utils/date";

function DayScroller({ selectedDate, onChange }) {
  const days = getScrollableDays();
  const selectedKey = toDateKey(selectedDate);

  return (
    <Box display="flex" gap={2} overflow="auto" py={2}>
      {days.map((d) => {
        const key = toDateKey(d);
        const active = key === selectedKey;

        return (
          <Box
            key={key}
            onClick={() => onChange(d)} // ✅ PASS DATE OBJECT
            sx={{
              minWidth: 56,
              textAlign: "center",
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: active ? "#DDD6FE" : "transparent"
            }}
          >
            <Typography variant="caption">
              {d.toLocaleDateString("en", { weekday: "short" })}
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
