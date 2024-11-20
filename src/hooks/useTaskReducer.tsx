import { useReducer } from "react";
import { Task } from "./useSocket";

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] };

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "SET_TASKS":
      return action.payload;
    default:
      return state;
  }
};

export const useTaskReducer = (initialTasks: Task[] = []) => {
  return useReducer(taskReducer, initialTasks);
};
