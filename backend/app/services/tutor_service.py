from typing import Optional, List
from datetime import date, timedelta
from app.core.supabase_client import get_supabase
from app.schemas.tutor import TutorFilters, TutorListResponse, TutorListItem, TutorDetail, TutorAvailabilityResponse, AvailabilitySlot


def _get_sb():
    return get_supabase()


def _build_tutor_query(filters: TutorFilters):
    """Build Supabase query with all filters applied."""
    supabase = _get_sb()
    query = supabase.table("tutors").select("*", count="exact")
    
    # Text search on name/specialty
    if filters.search:
        search_term = f"%{filters.search}%"
        query = query.or_(f"full_name.ilike.{search_term},bio.ilike.{search_term}")
    
    # Subject filter (array contains)
    if filters.subject:
        query = query.contains("subjects", [filters.subject])
    
    # District filter
    if filters.district:
        query = query.ilike("address", f"%{filters.district}%")
    
    # Level filter (could be in bio or subjects)
    if filters.level:
        query = query.ilike("bio", f"%{filters.level}%")
    
    # Price filter
    if filters.max_price:
        query = query.lte("hourly_rate", filters.max_price)
    
    # Verified only
    if filters.verified_only:
        query = query.eq("is_verified", True)
    
    # Top rated (rating >= 4.8)
    if filters.top_rated:
        query = query.gte("rating", 4.8)
    
    return query


async def list_tutors(filters: TutorFilters) -> TutorListResponse:
    """List tutors with filters and pagination."""
    query = _build_tutor_query(filters)
    
    # Apply pagination
    offset = (filters.page - 1) * filters.limit
    query = query.range(offset, offset + filters.limit - 1)
    
    # Order by rating desc, then review count
    query = query.order("rating", desc=True).order("review_count", desc=True)
    
    resp = query.execute()
    
    tutors_data = resp.data or []
    total = resp.count or 0
    
    tutors = []
    for t in tutors_data:
        # Parse subjects array
        subjects = t.get("subjects") or []
        specialty = subjects[0] if subjects else "General"
        
        # Build tags
        tags = []
        if t.get("is_online"):
            tags.append("Online")
        if not t.get("is_online"):
            tags.append("Physical")
        if t.get("is_verified"):
            tags.append("Verified")
        
        tutors.append(TutorListItem(
            id=t["id"],
            name=t["full_name"],
            badge="FEATURED TOP TUTOR" if t.get("rating", 0) >= 4.8 else None,
            price=t.get("hourly_rate") or 0,
            specialty=specialty,
            education=t.get("education") or "Not specified",
            rating=float(t.get("rating") or 0),
            reviews=t.get("review_count") or 0,
            sessions=f"{t.get('review_count', 0)}+",
            tags=tags,
            image=t.get("avatar_url"),
            verified=t.get("is_verified", False),
            district=_extract_district(t.get("address", "")),
            is_online=t.get("is_online", False),
        ))
    
    return TutorListResponse(
        tutors=tutors,
        total=total,
        page=filters.page,
        has_more=(offset + filters.limit) < total,
    )


def _extract_district(address: str) -> str:
    """Extract district from address (simplified)."""
    # In real app, you'd have a proper district field
    # For now, extract from address or return default
    districts = ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Matara", "Anuradhapura", "Batticaloa", "Trincomalee", "Kurunegala"]
    for d in districts:
        if d.lower() in address.lower():
            return d
    return "Colombo"


async def get_tutor_by_id(tutor_id: str) -> Optional[TutorDetail]:
    """Get detailed tutor profile by ID."""
    supabase = _get_sb()
    resp = supabase.table("tutors").select("*").eq("id", tutor_id).execute()
    
    if not resp.data:
        return None
    
    t = resp.data[0]
    subjects = t.get("subjects") or []
    specialty = subjects[0] if subjects else "General"
    
    tags = []
    if t.get("is_online"):
        tags.append("Online")
    if not t.get("is_online"):
        tags.append("Physical")
    if t.get("is_verified"):
        tags.append("Verified")
    
    return TutorDetail(
        id=t["id"],
        name=t["full_name"],
        badge="FEATURED TOP TUTOR" if t.get("rating", 0) >= 4.8 else None,
        price=t.get("hourly_rate") or 0,
        specialty=specialty,
        education=t.get("education") or "Not specified",
        rating=float(t.get("rating") or 0),
        reviews=t.get("review_count") or 0,
        sessions=f"{t.get('review_count', 0)}+",
        tags=tags,
        image=t.get("avatar_url"),
        verified=t.get("is_verified", False),
        district=_extract_district(t.get("address", "")),
        is_online=t.get("is_online", False),
        bio=t.get("bio"),
        subjects=subjects,
        hourly_rate=t.get("hourly_rate"),
    )


async def get_tutor_availability(tutor_id: str) -> TutorAvailabilityResponse:
    """Get available dates/times for a tutor.
    
    Shortcut: Returns mock data for next 14 days.
    Ceiling: Should be replaced with real availability table when implemented.
    """
    # Check tutor exists
    supabase = _get_sb()
    tutor_resp = supabase.table("tutors").select("id, is_online").eq("id", tutor_id).execute()
    if not tutor_resp.data:
        raise ValueError("Tutor not found")
    
    is_online = tutor_resp.data[0].get("is_online", False)
    
    slots = []
    for i in range(14):  # Next 2 weeks
        d = date.today() + timedelta(days=i)
        date_str = d.isoformat()
        
        # Morning and afternoon slots
        times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
        mode = "online" if is_online else "physical"
        
        slots.append(AvailabilitySlot(
            date=date_str,
            times=times,
            mode=mode,
        ))
    
    return TutorAvailabilityResponse(tutor_id=tutor_id, slots=slots)