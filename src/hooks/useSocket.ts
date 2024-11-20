import { useEffect, useCallback, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useTaskReducer } from "./useTaskReducer";

export type Task = {
  id: string;
  title: string;
  column: string;
  activeUser?: {
    id: string;
    action: "moving" | "editing";
  };
};

export type User = {
  id: string;
  name?: string;
};

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
  const [tasks, dispatch] = useTaskReducer([]);
  const socketRef = useRef<Socket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "SET_TASKS", payload: JSON.parse(storedTasks) });
    }

    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = newSocket;

    const handleConnect = () => {
      const user = { id: newSocket.id } as User;
      setCurrentUser(user);
    };

    const handleUsersUpdate = (users: User[]) => {
      setConnectedUsers(users);
    };

    const handleTasksUpdate = (updatedTasks: Task[]) => {
      dispatch({ type: "SET_TASKS", payload: updatedTasks });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleTaskInteraction = ({
      taskId,
      userId,
      action,
    }: {
      taskId: string;
      userId: string;
      action: "moving" | "editing" | null;
    }) => {
      const taskToUpdate = tasksRef.current.find((task) => task.id === taskId);
      if (taskToUpdate) {
        dispatch({
          type: "UPDATE_TASK",
          payload: {
            ...taskToUpdate,
            activeUser: action ? { id: userId, action } : undefined,
          },
        });
      }
    };

    newSocket.on("connect", handleConnect);
    newSocket.on("users:update", handleUsersUpdate);
    newSocket.on("tasks:update", handleTasksUpdate);
    newSocket.on("task:interaction", handleTaskInteraction);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("users:update", handleUsersUpdate);
      newSocket.off("tasks:update", handleTasksUpdate);
      newSocket.off("task:interaction", handleTaskInteraction);
      newSocket.close();
    };
  }, []);

  const emitTaskInteraction = useCallback(
    (taskId: string, action: "moving" | "editing" | null) => {
      if (socketRef.current && currentUser) {
        socketRef.current.emit("task:interaction", {
          taskId,
          userId: currentUser.id,
          action,
        });
      }
    },
    [currentUser]
  );

  const emitTasks = useCallback((updatedTasks: Task[]) => {
    socketRef.current?.emit("tasks:update", updatedTasks);
  }, []);

  const addTask = useCallback(
    (task: Task) => {
      dispatch({ type: "ADD_TASK", payload: task });
      emitTasks([...tasks, task]);
    },
    [tasks]
  );

  const updateTask = useCallback(
    (updatedTask?: Task) => {
      if (!updatedTask) return;
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      const newTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      emitTasks(newTasks);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_TASK", payload: id });
      const newTasks = tasks.filter((task) => task.id !== id);
      emitTasks(newTasks);
    },
    [tasks]
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    connectedUsers,
    currentUser,
    emitTaskInteraction,
  };
};
