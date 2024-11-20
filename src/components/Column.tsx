import React, { memo, useMemo } from "react";
import Task from "./Task";
import { useTaskContext } from "../context/TaskContext";
import { useDrop } from "react-dnd";
import type { Task as TaskType } from "../hooks/useSocket";

type ColumnTitle = "To Do" | "In Progress" | "Done";

type ColumnProps = {
  tasks: TaskType[];
  title: ColumnTitle;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (id: string) => void;
};

const Column: React.FC<ColumnProps> = memo(
  ({ title, tasks, onEditTask, onDeleteTask }) => {
    const { updateTask } = useTaskContext();

    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: "TASK",
        drop: (item: TaskType) => {
          if (item.column !== title) {
            updateTask({ ...item, column: title });
          }
        },
        collect: (monitor) => ({
          isOver: Boolean(monitor.isOver()),
        }),
      }),
      [title, updateTask]
    );

    const filteredTasks = useMemo(
      () => tasks.filter((task) => task.column === title),
      [tasks, title]
    );

    const getColumnStyles = () => {
      const baseStyles = "shadow-md rounded-lg p-4 flex-1 flex flex-col";
      const colorStyles = {
        "To Do":
          "bg-gradient-to-br from-green-50 to-white border-t-4 border-green-500",
        "In Progress":
          "bg-gradient-to-br from-yellow-50 to-white border-t-4 border-yellow-500",
        Done: "bg-gradient-to-br from-blue-50 to-white border-t-4 border-blue-500",
      };
      return `${baseStyles} ${colorStyles[title]} ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`;
    };

    const columnStyles = useMemo(() => getColumnStyles(), [title, isOver]);

    return (
      <div ref={drop} className={columnStyles}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {title}
            <span className="text-sm font-normal text-gray-500">
              ({filteredTasks.length})
            </span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 min-h-[200px]">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              Drop tasks here
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Column;
