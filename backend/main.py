from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_PATH = "./tasks.db"

def initialize_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            statu INTEGER DEFAULT 0,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

initialize_db()

# Task model
class Task(BaseModel):
    id: int = None
    description: str
    statu: int
    date: str

# Routes
@app.get("/tasks/", response_model=List[Task])
def get_tasks():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, description, statu, date FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    return [Task(id=row[0], description=row[1], statu=row[2], date=row[3]) for row in rows]

@app.post("/tasks/", response_model=Task)
def create_task(task: Task):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (description, statu, date) VALUES (?, ?, ?)",
        (task.description, task.statu, task.date)
    )
    task.id = cursor.lastrowid
    conn.commit()
    conn.close()
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE tasks SET description = ?, statu = ?, date = ? WHERE id = ?",
        (task.description, task.statu, task.date, task_id)
    )
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
