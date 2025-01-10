from pydantic import BaseModel
from datetime import date
from typing import Optional

class TaskBase(BaseModel):
    description: str
    status: int
    date: date

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
