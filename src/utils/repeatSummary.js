export const getRepeatSummary = (repeat) => {
  if (!repeat) return "Off";

  const { type, interval, weekDays, monthDates } = repeat;

  const every = interval === 1 ? "Every" : `Every ${interval}`;

  if (type === "daily") {
    return interval === 1 ? "Every day" : `${every} days`;
  }

  if (type === "weekly") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const selected =
      weekDays?.length > 0
        ? weekDays.map((d) => days[d]).join(", ")
        : "No days";

    return `${every} week${interval > 1 ? "s" : ""} on ${selected}`;
  }

  if (type === "monthly") {
    const dates =
      monthDates?.length > 0 ? monthDates.join(", ") : "No dates";

    return `${every} month${interval > 1 ? "s" : ""} on ${dates}`;
  }

  return "Custom";
};
