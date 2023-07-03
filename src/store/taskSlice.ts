import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface taskListState {
  list: Task[];
  notification: string;
  filter: boolean;
}

const initialState: taskListState = {
  list: [],
  notification: "",
  filter: false,
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    resetStore: (state) => {
      state.list = [];
      state.filter = false;
      state.notification = "";
    },
    addTask: (state, action: PayloadAction<Task["header"]>) => {
      const notDoneTasksCount = state.list.reduce((acc, task) => !task.done ? acc + 1 : acc, 0);
      if (notDoneTasksCount < 10) {
        state.list.push({
          id: crypto.randomUUID(),
          header: action.payload,
          done: false,
        });
      }
    },
    completeTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = true;
      }
    },
    toggleFilter: (state) => {
      state.filter = !state.filter;
    },
    toggleTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);
      if (task) {
        task.done = !task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task["header"]>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = "";
    },
  },
});

export const {
  addTask,
  toggleFilter,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  resetStore
} = taskListSlice.actions;

export default taskListSlice.reducer;

export const tasksSelector = (state: RootState) => state.taskList.list.filter((task) => {
  // Если фильтр включем возвращает только невыполненные задачи  
  return state.taskList.filter ? !task.done : true;
});

export const fullCount = (state: RootState) => state.taskList.list.length;

export const filterSelected = (state: RootState) => state.taskList.filter;

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
  state.taskList.notification