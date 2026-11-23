from typing import List
from datetime import datetime
from app.core.supabase_client import get_supabase
from app.schemas.student import SavedTutorResponse


def _get_sb():
    return get_supabase()


async def list_saved_tutors(student_id: str) -> List[SavedTutorResponse]:
    """Get all saved tutors for a student."""
    supabase = _get_sb()
    
    resp = supabase.table("saved_tutors").select(
        "tutor_id, created_at, tutors(full_name, subjects, hourly_rate, rating, is_verified, avatar_url, address)"
    ).eq("student_id", student_id).execute()
    
    saved = []
    for item in resp.data or []:
        tutor = item.get("tutors", {})
        subjects = tutor.get("subjects") or []
        specialty = subjects[0] if subjects else "General"
        
        saved.append(SavedTutorResponse(
            tutor_id=item["tutor_id"],
            saved_at=item["created_at"],
            tutor_name=tutor.get("full_name", ""),
            tutor_specialty=specialty,
            tutor_rating=float(tutor.get("rating") or 0),
            tutor_price=tutor.get("hourly_rate") or 0,
            tutor_verified=tutor.get("is_verified", False),
            tutor_image=tutor.get("avatar_url"),
            tutor_district=_extract_district(tutor.get("address", "")),
        ))
    
    return saved


async def save_tutor(student_id: str, tutor_id: str) -> SavedTutorResponse:
    """Save a tutor for a student."""
    supabase = _get_sb()
    
    # Check if already saved
    existing = supabase.table("saved_tutors").select("id").eq("student_id", student_id).eq("tutor_id", tutor_id).execute()
    if existing.data:
        raise ValueError("Tutor already saved")
    
    # Verify tutor exists
    tutor_resp = supabase.table("tutors").select("*").eq("id", tutor_id).execute()
    if not tutor_resp.data:
        raise ValueError("Tutor not found")
    
    resp = supabase.table("saved_tutors").insert({
        "student_id": student_id,
        "tutor_id": tutor_id,
    }).execute()
    
    if not resp.data:
        raise ValueError("Failed to save tutor")
    
    tutor = tutor_resp.data[0]
    subjects = tutor.get("subjects") or []
    specialty = subjects[0] if subjects else "General"
    
    return SavedTutorResponse(
        tutor_id=tutor_id,
        saved_at=resp.data[0]["created_at"],
        tutor_name=tutor.get("full_name", ""),
        tutor_specialty=specialty,
        tutor_rating=float(tutor.get("rating") or 0),
        tutor_price=tutor.get("hourly_rate") or 0,
        tutor_verified=tutor.get("is_verified", False),
        tutor_image=tutor.get("avatar_url"),
        tutor_district=_extract_district(tutor.get("address", "")),
    )


async def unsave_tutor(student_id: str, tutor_id: str) -> bool:
    """Remove a saved tutor."""
    supabase = _get_sb()
    
    resp = supabase.table("saved_tutors").delete().eq("student_id", student_id).eq("tutor_id", tutor_id).execute()
    
    return len(resp.data or []) > 0


def _extract_district(address: str) -> str:
    """Extract district from address (simplified)."""
    districts = ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Matara", "Anuradhapura", "Batticaloa", "Trincomalee", "Kurunegala"]
    for d in districts:
        if d.lower() in address.lower():
            return d
    return "Colombo"