import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: { id: string; title: string; column: string } | null;
};

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  initialTask,
}) => {
  const { addTask, updateTask, emitTaskInteraction } = useTaskContext();
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState("To Do");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setColumn(initialTask.column);
    } else {
      setTitle("");
      setColumn("To Do");
    }
  }, [initialTask]);

  const handleClose = () => {
    if (initialTask) {
      emitTaskInteraction(initialTask.id, null);
    }
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (initialTask) {
      updateTask({ id: initialTask.id, title, column });
      emitTaskInteraction(initialTask.id, null);
    } else {
      addTask({ id: Date.now().toString(), title, column });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] backdrop-blur-sm" />
      <div className="fixed inset-0 z-[101] flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {initialTask ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className={`
                px-4 py-2 text-white rounded-md
                ${
                  title.trim()
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }
                transition-colors
              `}
            >
              {initialTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
