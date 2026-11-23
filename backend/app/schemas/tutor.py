from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import date


class TutorFilters(BaseModel):
    subject: Optional[str] = None
    district: Optional[str] = None
    level: Optional[str] = None
    max_price: Optional[int] = None
    search: Optional[str] = None
    verified_only: bool = False
    top_rated: bool = False
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)


class TutorListItem(BaseModel):
    id: str
    name: str
    badge: Optional[str] = None
    price: int
    specialty: str
    education: str
    rating: float
    reviews: int
    sessions: str
    tags: List[str] = []
    image: Optional[str] = None
    verified: bool
    district: str
    is_online: bool


class TutorListResponse(BaseModel):
    tutors: List[TutorListItem]
    total: int
    page: int
    has_more: bool


class TutorDetail(BaseModel):
    id: str
    name: str
    badge: Optional[str] = None
    price: int
    specialty: str
    education: str
    rating: float
    reviews: int
    sessions: str
    tags: List[str] = []
    image: Optional[str] = None
    verified: bool
    district: str
    is_online: bool
    bio: Optional[str] = None
    subjects: List[str] = []
    hourly_rate: Optional[int] = None


class AvailabilitySlot(BaseModel):
    date: str  # YYYY-MM-DD
    times: List[str]  # e.g., ["09:00", "10:00", "14:00"]
    mode: str  # "online" | "physical" | "both"


class TutorAvailabilityResponse(BaseModel):
    tutor_id: str
    slots: List[AvailabilitySlot]