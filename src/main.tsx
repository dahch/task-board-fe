import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </TaskProvider>
  </StrictMode>
);
