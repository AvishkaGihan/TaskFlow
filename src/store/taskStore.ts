import { create } from "zustand";
import { Task, FilterType, TaskStatus } from "../types/task.types";
import { generateId, calculateStats } from "../utils/helpers";

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  stats: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
  actions: {
    addTask: (
      title: string,
      description?: string,
      priority?: Task["priority"],
      dueDate?: Date
    ) => void;
    updateTaskStatus: (id: string, status: TaskStatus) => void;
    deleteTask: (id: string) => void;
    setFilter: (filter: FilterType) => void;
    getFilteredTasks: () => Task[];
  };
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: "all",
  stats: { total: 0, completed: 0, pending: 0, inProgress: 0 },

  actions: {
    addTask: (title, description, priority = "medium", dueDate) => {
      const newTask: Task = {
        id: generateId(),
        title,
        description,
        priority,
        status: "pending",
        createdAt: new Date(),
        dueDate,
      };

      set((state) => {
        const tasks = [...state.tasks, newTask];
        return {
          tasks,
          stats: calculateStats(tasks),
        };
      });
    },

    updateTaskStatus: (id, status) => {
      set((state) => {
        const tasks = state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                status,
                completedAt: status === "completed" ? new Date() : undefined,
              }
            : task
        );

        return {
          tasks,
          stats: calculateStats(tasks),
        };
      });
    },

    deleteTask: (id) => {
      set((state) => {
        const tasks = state.tasks.filter((task) => task.id !== id);
        return {
          tasks,
          stats: calculateStats(tasks),
        };
      });
    },

    setFilter: (filter) => {
      set({ filter });
    },

    getFilteredTasks: () => {
      const { tasks, filter } = get();
      if (filter === "all") return tasks;
      return tasks.filter((task) => task.status === filter);
    },
  },
}));
