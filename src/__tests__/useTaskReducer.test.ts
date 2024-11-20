import { renderHook, act } from "@testing-library/react";
import { useTaskReducer } from "../hooks/useTaskReducer";

describe("useTaskReducer", () => {
  it("adds a task correctly", () => {
    const { result } = renderHook(() => useTaskReducer());
    const newTask = { id: "1", title: "Test Task", column: "To Do" };

    act(() => {
      result.current[1]({ type: "ADD_TASK", payload: newTask });
    });

    expect(result.current[0]).toContainEqual(newTask);
  });

  it("updates a task correctly", () => {
    const initialTask = { id: "1", title: "Test Task", column: "To Do" };
    const { result } = renderHook(() => useTaskReducer([initialTask]));
    const updatedTask = { ...initialTask, title: "Updated Task" };

    act(() => {
      result.current[1]({ type: "UPDATE_TASK", payload: updatedTask });
    });

    expect(result.current[0][0].title).toBe("Updated Task");
  });

  it("deletes a task correctly", () => {
    const initialTask = { id: "1", title: "Test Task", column: "To Do" };
    const { result } = renderHook(() => useTaskReducer([initialTask]));

    act(() => {
      result.current[1]({ type: "DELETE_TASK", payload: "1" });
    });

    expect(result.current[0]).toHaveLength(0);
  });
});
