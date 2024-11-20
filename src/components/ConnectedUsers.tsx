import React, { useState } from "react";
import { User, Task } from "../hooks/useSocket";
import { HiUsers } from "react-icons/hi";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { TbArrowsRandom } from "react-icons/tb";

type ConnectedUsersProps = {
  users: User[];
  currentUser?: User | null;
  tasks: Task[];
};

const ConnectedUsers: React.FC<ConnectedUsersProps> = ({
  users,
  currentUser,
  tasks,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getUserActivity = (userId: string) => {
    const activeTask = tasks.find((task) => task.activeUser?.id === userId);
    if (!activeTask) return null;

    return {
      taskTitle: activeTask.title,
      action: activeTask.activeUser?.action,
    };
  };

  return (
    <div
      className={`
        fixed right-4 top-20 z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "translate-x-[calc(100%-3rem)]" : "translate-x-0"}
      `}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div
            className={`
              transition-all duration-300 ease-in-out
              overflow-hidden whitespace-nowrap
              ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}
            `}
          >
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <HiUsers className="text-blue-500" size={18} />
              Connected Users ({users.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              p-1.5 hover:bg-gray-100 rounded-full transition-colors
              text-gray-600 hover:text-blue-600 flex-shrink-0
              ${isCollapsed ? "w-full flex justify-center" : ""}
            `}
          >
            {isCollapsed ? (
              <IoChevronForwardOutline size={20} />
            ) : (
              <IoChevronBackOutline size={20} />
            )}
          </button>
        </div>

        <div
          className={`
            transition-all duration-300 ease-in-out
            ${isCollapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-[70vh]"}
          `}
        >
          <div className="max-h-[70vh] overflow-y-auto p-3 space-y-3">
            {users.map((user) => {
              const activity = getUserActivity(user.id);
              const isCurrentUser = user.id === currentUser?.id;

              return (
                <div
                  key={user.id}
                  className={`
                    flex flex-col p-2 rounded-md
                    ${isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"}
                    transition-colors duration-200
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                      w-2 h-2 rounded-full
                      ${activity ? "bg-green-500 animate-pulse" : "bg-gray-400"}
                    `}
                    />
                    <span
                      className={`
                      text-sm font-medium
                      ${isCurrentUser ? "text-blue-600" : "text-gray-700"}
                    `}
                    >
                      {isCurrentUser ? "You" : `User ${user.id.slice(0, 4)}`}
                    </span>
                  </div>

                  {activity && (
                    <div className="ml-4 mt-1 p-2 rounded-md bg-white border border-gray-100 shadow-sm">
                      <p
                        className={`
                          text-xs flex items-center gap-2
                          ${
                            activity.action === "moving"
                              ? "text-yellow-600"
                              : "text-purple-600"
                          }
                        `}
                      >
                        {activity.action === "moving" ? (
                          <TbArrowsRandom className="w-4 h-4" />
                        ) : (
                          <BsPencilSquare className="w-4 h-4" />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {activity.action === "moving"
                              ? "Moving"
                              : "Editing"}
                          </span>
                          <span className="text-gray-600 truncate max-w-[150px]">
                            {activity.taskTitle}
                          </span>
                        </div>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUsers;
