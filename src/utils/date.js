export const getScrollableDays = () => {
  const today = new Date();
  return Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return d;
  });
};

// ✅ SAFE FOR Date OR string
export const toDateKey = (input = new Date()) => {
  if (typeof input === "string") return input;
  if (input instanceof Date)
    return input.toISOString().split("T")[0];
  return new Date(input).toISOString().split("T")[0];
};

export const shouldShowTask = (task, dateKey) => {
  // One-time task
  if (!task.repeatEnabled) {
    return task.createdAt === dateKey;
  }

  const startDate = new Date(task.createdAt);
  const currentDate = new Date(dateKey);

  if (currentDate < startDate) return false;

  const repeat = task.repeat;
  const interval = repeat.interval || 1;

  const diffDays = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );

  // DAILY
  if (repeat.type === "daily") {
    return diffDays % interval === 0;
  }

  // WEEKLY (multi-select)
  if (repeat.type === "weekly") {
    const weeksPassed = Math.floor(diffDays / 7);
    const day = currentDate.getDay();
    return (
      weeksPassed % interval === 0 &&
      repeat.weekDays?.includes(day)
    );
  }

  // MONTHLY (multi-date)
  if (repeat.type === "monthly") {
    const monthsPassed =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());

    return (
      monthsPassed % interval === 0 &&
      repeat.monthDates?.includes(currentDate.getDate())
    );
  }

  return false;
};
