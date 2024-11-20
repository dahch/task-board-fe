import { render, screen, fireEvent } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Task from "../components/Task";

const mockTask = {
  id: "1",
  title: "Test Task",
  column: "To Do",
};

jest.mock("../context/TaskContext", () => ({
  useTaskContext: () => ({
    currentUser: { id: "test-user" },
    emitTaskInteraction: jest.fn(),
  }),
  TaskProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const TaskWrapper = ({ children }: { children: React.ReactNode }) => (
  <DndProvider backend={HTML5Backend}>{children}</DndProvider>
);

describe("Task Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders task correctly", () => {
    render(
      <TaskWrapper>
        <Task {...mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
      </TaskWrapper>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <TaskWrapper>
        <Task {...mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
      </TaskWrapper>
    );

    fireEvent.click(screen.getByLabelText(`Edit task ${mockTask.title}`));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TaskWrapper>
        <Task {...mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
      </TaskWrapper>
    );

    fireEvent.click(screen.getByLabelText(`Delete task ${mockTask.title}`));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it("shows activity indicator when task is being edited", () => {
    render(
      <TaskWrapper>
        <Task
          {...mockTask}
          activeUser={{ id: "123", action: "editing" }}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      </TaskWrapper>
    );

    expect(screen.getByText(/is editing/i)).toBeInTheDocument();
  });
});
