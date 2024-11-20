import React, { useCallback, useState } from "react";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import { useTaskContext } from "./context/TaskContext";
import type { Task } from "./hooks/useSocket";
import ConnectedUsers from "./components/ConnectedUsers";

const App: React.FC = () => {
  const { tasks, deleteTask, connectedUsers, currentUser } = useTaskContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<{
    id: string;
    title: string;
    column: string;
  } | null>(null);

  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback(
    (id: string) => {
      if (window.confirm("Are you sure you want to eliminate this task?")) {
        deleteTask(id);
      }
    },
    [deleteTask]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="mb-6 flex justify-between w-full max-w-5xl sticky top-0 bg-gray-50 z-40 pt-2">
        <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          + New Task
        </button>
      </header>
      <ConnectedUsers
        users={connectedUsers}
        currentUser={currentUser}
        tasks={tasks}
      />
      <main className="flex space-x-4 w-full max-w-5xl">
        <Column
          title="To Do"
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <Column
          title="In Progress"
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <Column
          title="Done"
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setTaskToEdit(null);
        }}
        initialTask={taskToEdit}
      />
    </div>
  );
};

export default App;
