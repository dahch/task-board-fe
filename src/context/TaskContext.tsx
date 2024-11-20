import React, { createContext, useContext, memo, useMemo } from "react";
import { useSocket } from "../hooks/useSocket";

type TaskContextType = ReturnType<typeof useSocket>;

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => {
    const socketData = useSocket();
    const value = useMemo(() => socketData, [socketData]);

    return (
      <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
  }
);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe ser usado dentro de TaskProvider");
  }
  return context;
};
