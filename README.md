# Task Board - Collaborative Kanban Application

A real-time collaborative Kanban board application built with React, TypeScript, and Socket.IO. It allows multiple users to manage tasks simultaneously with real-time updates.

**Note:**[Backend(Websockets)](https://github.com/dahch/task-board-sockets)

## 🚀 Features

- Kanban board with three columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Real-time collaboration between users
- Visual indicators of other users' activity
- Task editing and deletion
- Collapsible list of connected users
- Responsive and modern interface
- Local data persistence

## 🛠️ Technologies Used

- **Frontend:**

  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - React DnD (Drag and Drop)
  - Socket.IO Client
  - React Icons

- **Backend:**
  - Node.js
  - Express
  - Socket.IO

## 📦 Installation

1. Clone the repository:

```bash
git clone git@github.com:dahch/task-board-fe.git
cd task-board-fe
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Create a .env file in the root of the project
- Add the backend URL:

```bash
VITE_SOCKET_URL=ws://localhost:4000
```

## 🚀 Start

1. Start the development server:

```bash
npm run dev
```

2. Open http://localhost:5173 in your browser

## 🏗️ Project Structure

```bash
src/
├── components/         # React Components
│   ├── Column.tsx     # Kanban board column
│   ├── Task.tsx       # Individual task component
│   ├── TaskModal.tsx  # Modal for creating/editing tasks
│   └── ConnectedUsers.tsx  # List of connected users
├── context/
│   └── TaskContext.tsx    # Global task context
├── hooks/
│   ├── useSocket.ts      # Socket.IO connection logic
│   └── useTaskReducer.ts # Task state management
└── App.tsx              # Main component
```

## 🔧 Architecture and Technical Decisions

**Global State**

- Use of Context API for global state management
- Reducer pattern for task actions
- References with useRef for real-time data

**Performance Optimization**

- Memoization of components with React.memo
- useCallback for stable functions
- useMemo for expensive calculations

**Real-Time**

- Socket.IO for bidirectional communication
- Custom events for synchronization

**UI/UX**

- TailwindCSS for consistent styles
- Smooth animations for visual feedback
- Responsive and accessible design

## 🧪 Testing

Run the tests:

```bash
npm run test
```
