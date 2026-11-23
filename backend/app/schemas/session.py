from typing import Optional, List
from datetime import date, time
from pydantic import BaseModel, Field
from enum import Enum


class SessionMode(str, Enum):
    online = "online"
    physical = "physical"


class SessionStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


class SessionCreate(BaseModel):
    tutor_id: str
    subject: str
    session_date: date
    start_time: time
    end_time: time
    mode: SessionMode
    notes: Optional[str] = None


class SessionUpdate(BaseModel):
    status: SessionStatus


class SessionResponse(BaseModel):
    id: str
    student_id: str
    tutor_id: str
    subject: str
    session_date: str  # YYYY-MM-DD
    start_time: str    # HH:MM
    end_time: str      # HH:MM
    mode: str
    status: str
    price: int
    notes: Optional[str] = None
    tutor_name: Optional[str] = None
    student_name: Optional[str] = None
    created_at: str
    updated_at: str


class SessionListResponse(BaseModel):
    sessions: List[SessionResponse]
    total: int
    page: int
    has_more: bool


class SessionFilters(BaseModel):
    student_id: Optional[str] = None
    tutor_id: Optional[str] = None
    status: Optional[SessionStatus] = None
    upcoming_only: bool = False
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)