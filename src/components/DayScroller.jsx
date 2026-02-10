import { Box, Typography, Chip } from "@mui/material";
import { toDateKey } from "../utils/date";
import { useMemo, useRef, useEffect, useState } from "react";

/* ---------- helpers ---------- */

const formatFullDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const isSameDay = (a, b) =>
  toDateKey(a) === toDateKey(b);

const startOfWeek = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

const getWeeks = (anchorDate, range = 6) => {
  const base = startOfWeek(anchorDate);

  return Array.from({ length: range * 2 + 1 }, (_, i) => {
    const weekStart = new Date(base);
    weekStart.setDate(base.getDate() + (i - range) * 7);

    return Array.from({ length: 7 }, (_, d) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + d);
      return day;
    });
  });
};

function DayScroller({ selectedDate, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [anchorDate] = useState(today);
  const weeks = useMemo(() => getWeeks(anchorDate, 6), [anchorDate]);

  const containerRef = useRef(null);
  const weekRefs = useRef([]);

  const centerIndex = Math.floor(weeks.length / 2);
  const [activeWeekIndex, setActiveWeekIndex] = useState(centerIndex);

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const el = weekRefs.current[centerIndex];
    if (containerRef.current && el) {
      containerRef.current.scrollLeft =
        el.offsetLeft -
        containerRef.current.offsetWidth / 2 +
        el.offsetWidth / 2;
    }
    onChange(today);
  }, []);

  /* ---------- SCROLL HANDLER ---------- */
  const handleScroll = () => {
    if (!containerRef.current) return;

    const center =
      containerRef.current.scrollLeft +
      containerRef.current.offsetWidth / 2;

    let closest = activeWeekIndex;
    let minDist = Infinity;

    weekRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    if (closest !== activeWeekIndex) {
      setActiveWeekIndex(closest);
    }
  };

  /* ---------- HEADER DATE ---------- */
  const headerDate = (() => {
    const week = weeks[activeWeekIndex];
    return week.some((d) => isSameDay(d, selectedDate))
      ? selectedDate
      : week[0];
  })();

  const isViewingTodayWeek = weeks[activeWeekIndex].some((d) =>
    isSameDay(d, today)
  );

  const jumpToToday = () => {
    const todayKey = toDateKey(today);

    const weekIndex = weeks.findIndex((week) =>
      week.some((d) => toDateKey(d) === todayKey)
    );

    if (weekIndex === -1) return;

    const el = weekRefs.current[weekIndex];
    if (containerRef.current && el) {
      containerRef.current.scrollTo({
        left:
          el.offsetLeft -
          containerRef.current.offsetWidth / 2 +
          el.offsetWidth / 2,
        behavior: "smooth",
      });
    }

    setActiveWeekIndex(weekIndex);
    onChange(today);
  };

  return (
    <>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography fontWeight={600} fontSize={15}>
          {isSameDay(headerDate, today)
            ? `Today · ${formatFullDate(headerDate)}`
            : formatFullDate(headerDate)}
        </Typography>

        {!isViewingTodayWeek && (
          <Chip
            label="Today"
            size="small"
            color="primary"
            onClick={jumpToToday}
          />
        )}
      </Box>

      {/* WEEK STRIP */}
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        display="flex"
        overflow="auto"
        gap={1}
        pb={0.5}
        sx={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {weeks.map((week, wi) => (
          <Box
            key={wi}
            ref={(el) => (weekRefs.current[wi] = el)}
            minWidth="100%"
            display="flex"
            justifyContent="space-between"
            gap={1}
            px={0.5}
            py={0.75}
            sx={{ scrollSnapAlign: "center" }}
          >
            {week.map((d) => {
              const active = isSameDay(d, selectedDate);

              return (
                <Box
                  key={toDateKey(d)}
                  onClick={() => onChange(d)}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: { xs: 0.9, sm: 0.7 },
                    borderRadius: {
                      xs: "999px", // mobile: soft round
                      sm: 14,      // desktop: pill, not bubble
                    },
                    cursor: "pointer",
                    bgcolor: active ? "#7C3AED" : "#EEF2F7",
                    color: active ? "#fff" : "#374151",
                    transition: "all 0.2s ease",
                  }}

                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      mb: 0.25,
                      opacity: active ? 1 : 0.8,
                    }}
                  >
                    {d.toLocaleDateString("en", {
                      weekday: "short",
                    }).slice(0, 2)}
                  </Typography>

                  <Typography
                    fontWeight={700}
                    fontSize={14}
                  >
                    {d.getDate()}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default DayScroller;
