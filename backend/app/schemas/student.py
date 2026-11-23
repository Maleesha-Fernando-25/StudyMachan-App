from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class SavedTutorResponse(BaseModel):
    tutor_id: str
    saved_at: datetime
    tutor_name: str
    tutor_specialty: str
    tutor_rating: float
    tutor_price: int
    tutor_verified: bool
    tutor_image: Optional[str] = None
    tutor_district: str