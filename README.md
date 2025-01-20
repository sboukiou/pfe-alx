# pfe-alx - Task Management Application

This task management application is my final graduation project, developed using modern web technologies such as **Vue.js**, **Pinia**, **Material Bootstrap**, and **Bootstrap** for the frontend. The backend is built with **Express.js** and uses **SQLite** as the database. The app provides features to manage tasks, including adding, deleting, marking as favorites, and fetching tasks. This project is designed to be a complete, interactive task management tool.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Creators](#creators)

---

## Features

- **Task Creation**: Add tasks with descriptions and set their favorite status.
- **Task Deletion**: Delete individual tasks or clear all tasks at once.
- **Task Fetching**: Fetch tasks from the backend upon page load or by clicking a button.
- **Task Counter**: Displays the total number of tasks and the number of favorite tasks.
- **Material UI**: Utilizes Material Icons and Bootstrap for a modern, responsive interface.

---

## Tech Stack

### Frontend:
- **Vue.js** (JavaScript Framework): For building the user interface.
- **Pinia** (State Management): For managing application state.
- **Material Bootstrap** (UI Framework): For modern and responsive UI components.
- **Bootstrap** (CSS Framework): For grid layout and responsive design.

### Backend:
- **Express.js** (Web Framework): For building the API server.
- **SQLite** (Database): For storing tasks in a lightweight, file-based database.
- **Axios** (HTTP Client): For making HTTP requests from the frontend to the backend.

---

## Project Structure

```
pfe-alx/
│
├── backend/
│   ├── server.js         # Express server setup
│   ├── db.js             # SQLite database configuration
│   ├── tasks.db          # SQLite database file
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Vue components for tasks and UI
│   │   ├── stores/       # Pinia stores for state management
│   │   ├── App.vue       # Main Vue component
│   │   └── main.js       # Vue entry point
│   ├── public/           # Public assets (images, etc.)
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

---

## Installation

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/pfe-alx.git
    cd pfe-alx/backend
    ```

2. **Install backend dependencies**:
    ```bash
    npm install
    ```

3. **Start the Express server**:
    ```bash
    node server.js
    ```
    The backend will be available at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Start the Vue development server**:
    ```bash
    npm run serve
    ```
    The frontend will be available at `http://localhost:8080`.

---

## API Endpoints

The backend exposes the following API endpoints for interacting with tasks:

### `GET /tasks`
- **Description**: Fetch all tasks.
- **Response**: A JSON array containing all tasks.

### `POST /tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Task Description",
    "isFav": false,
    "date": "2023-01-01T00:00:00.000Z"
  }
  ```
- **Response**: The created task object.

### `DELETE /tasks/:id`
- **Description**: Delete a specific task by ID.
- **Response**: `204 No Content` on success, or `404 Task Not Found` if the task doesn't exist.

### `DELETE /tasks`
- **Description**: Delete all tasks.
- **Response**: `204 No Content` on success.

---

## Usage

1. **Add a Task**: 
    - Enter the task description in the input field and click the "Add" button to create a new task.
   
2. **Mark a Task as Favorite**:
    - Click the "Heart" icon next to a task to mark it as a favorite.

3. **Delete a Task**:
    - Click the "Delete" icon next to a task to remove it.

4. **Delete All Tasks**:
    - Use the "Delete All" button to delete all tasks at once from the database.

---

## Contributing

Feel free to fork the repository and submit issues or pull requests to improve the project. I welcome contributions from other developers to help enhance the functionality, add new features, or fix bugs.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Creators

- **[Said Boukioud](https://github.com/sboukiou)** - Project creator
- **[Yassine Boussif](https://github.com/yassineedev)** - Collaborator

---

## Acknowledgments

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Pinia**: The new state management solution for Vue.js.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured SQL database engine.
- **Bootstrap**: A popular CSS framework for building responsive websites.
- **Material Bootstrap**: Material design components for Bootstrap.
# For more about the project and it other sides
## Checks this link
    https://docs.google.com/presentation/d/1sDcquIViH10GxWeF8aWQwSptXuw35EPqUrV_0yZt-3A/edit#slide=id.p
