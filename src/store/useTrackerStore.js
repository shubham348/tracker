import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTrackerStore = create(
  persist(
    (set, get) => ({
      // =====================
      // TASKS
      // =====================
      tasks: [],
      // in useTrackerStore.js
      water: {},

      addWater: (dateKey, amount) =>
        set((state) => {
          const day = state.water[dateKey] || { goal: 3035, entries: [] };

          return {
            water: {
              ...state.water,
              [dateKey]: {
                ...day,
                entries: [...day.entries, amount],
              },
            },
          };
        }),

      resetWaterDay: (dateKey) =>
        set((state) => {
          const copy = { ...state.water };
          delete copy[dateKey];
          return { water: copy };
        }),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      updateTask: (updated) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      // ✅ THIS WAS MISSING
      toggleTask: (dateKey, taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== taskId) return task;

            const completed = task.completed || {};

            return {
              ...task,
              completed: {
                ...completed,
                [dateKey]: !completed[dateKey],
              },
            };
          }),
        })),

      // =====================
      // CREATE DRAFT
      // =====================
      createDraft: {
        title: "",
        emoji: "🙂",
        color: "#DBEAFE",
      },

      setCreateDraft: (data) =>
        set((state) => ({
          createDraft: { ...state.createDraft, ...data },
        })),

      clearCreateDraft: () =>
        set({
          createDraft: { title: "", emoji: "🙂", color: "#DBEAFE", },
        }),

      // =====================
      // REPEAT DRAFT
      // =====================
      repeatDraft: {
        type: "daily",
        interval: 1,
        weekDays: [],
        monthDates: [],
      },

      setRepeatDraft: (data) =>
        set((state) => ({
          repeatDraft: { ...state.repeatDraft, ...data },
        })),

      clearRepeatDraft: () =>
        set({
          repeatDraft: {
            type: "daily",
            interval: 1,
            weekDays: [],
            monthDates: [],
          },
        }),
    }),
    { name: "tracker-store" }
  )
);
