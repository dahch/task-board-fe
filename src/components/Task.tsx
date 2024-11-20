import React, { memo } from "react";
import { useDrag } from "react-dnd";
import { useTaskContext } from "../context/TaskContext";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export type TaskProps = {
  id: string;
  title: string;
  column: string;
  onEdit: (task: Omit<TaskProps, "onEdit" | "onDelete">) => void;
  onDelete: (id: string) => void;
  activeUser?: {
    id: string;
    action: "moving" | "editing";
  };
};

const Task: React.FC<TaskProps> = memo(
  ({ id, title, column, onEdit, onDelete, activeUser }) => {
    const { currentUser, emitTaskInteraction } = useTaskContext();

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "TASK",
        item: () => {
          emitTaskInteraction(id, "moving");
          return { id, title, column };
        },
        end: () => {
          emitTaskInteraction(id, null);
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [id, title, column, emitTaskInteraction]
    );

    const handleEdit = () => {
      emitTaskInteraction(id, "editing");
      onEdit({ id, title, column });
    };

    const getActivityStyles = () => {
      if (isDragging) return "bg-blue-200 scale-105";
      if (activeUser?.action === "moving") {
        return "border-yellow-500 shadow-lg bg-yellow-50 animate-pulse";
      }
      if (activeUser?.action === "editing") {
        return "border-purple-500 shadow-lg bg-purple-50";
      }
      return "bg-blue-100 hover:bg-blue-50 hover:scale-[1.02]";
    };

    return (
      <div
        ref={drag}
        className={`
          p-3 rounded-md shadow-sm
          border-l-4 border-blue-500
          transition-all duration-200 ease-in-out
          cursor-grab active:cursor-grabbing
          ${getActivityStyles()}
        `}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-800">{title}</p>
            {activeUser && (
              <p
                className={`
                text-xs mt-1 
                ${
                  activeUser.action === "moving"
                    ? "text-yellow-600"
                    : "text-purple-600"
                }
                animate-fade-in
              `}
              >
                {activeUser.id === currentUser?.id
                  ? "You are"
                  : `User ${activeUser.id.slice(0, 4)} is`}{" "}
                {activeUser.action}...
              </p>
            )}
          </div>
          <div className="flex gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-blue-50"
              aria-label={`Edit task ${title}`}
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-gray-600 hover:text-red-600 transform hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-red-50"
              aria-label={`Delete task ${title}`}
            >
              <RiDeleteBinLine size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Task;
