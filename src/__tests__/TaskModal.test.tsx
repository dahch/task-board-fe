import { render, screen } from "@testing-library/react";
import TaskModal from "../components/TaskModal";
import { TaskProvider } from "../context/TaskContext";

describe("TaskModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create task form when no initial task is provided", () => {
    render(
      <TaskProvider>
        <TaskModal isOpen={true} onClose={mockOnClose} />
      </TaskProvider>
    );

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter task title...")
    ).toBeInTheDocument();
  });

  it("renders edit task form with task data when initial task is provided", () => {
    const mockTask = {
      id: "1",
      title: "Test Task",
      column: "To Do",
    };

    render(
      <TaskProvider>
        <TaskModal isOpen={true} onClose={mockOnClose} initialTask={mockTask} />
      </TaskProvider>
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
  });

  it("validates empty title submission", () => {
    render(
      <TaskProvider>
        <TaskModal isOpen={true} onClose={mockOnClose} />
      </TaskProvider>
    );

    const submitButton = screen.getByText("Create Task");
    expect(submitButton).toBeDisabled();
  });
});
