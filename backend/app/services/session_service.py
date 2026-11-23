from typing import Optional, List
from datetime import date, time, datetime
from app.core.supabase_client import get_supabase
from app.schemas.session import SessionCreate, SessionUpdate, SessionResponse, SessionListResponse, SessionFilters, SessionStatus, SessionMode


def _get_sb():
    return get_supabase()


async def create_session(student_id: str, session_data: SessionCreate) -> SessionResponse:
    """Create a new session booking."""
    supabase = _get_sb()
    
    # Get tutor details for price
    tutor_resp = supabase.table("tutors").select("id, full_name, hourly_rate").eq("id", session_data.tutor_id).execute()
    if not tutor_resp.data:
        raise ValueError("Tutor not found")
    
    tutor = tutor_resp.data[0]
    price = tutor.get("hourly_rate") or 0
    tutor_name = tutor.get("full_name", "")
    
    # Get student name
    student_resp = supabase.table("students").select("full_name").eq("id", student_id).execute()
    student_name = student_resp.data[0]["full_name"] if student_resp.data else ""
    
    session_payload = {
        "student_id": student_id,
        "tutor_id": session_data.tutor_id,
        "subject": session_data.subject,
        "session_date": session_data.session_date.isoformat(),
        "start_time": session_data.start_time.isoformat(),
        "end_time": session_data.end_time.isoformat(),
        "mode": session_data.mode.value,
        "status": "pending",
        "price": price,
        "notes": session_data.notes,
    }
    
    resp = supabase.table("sessions").insert(session_payload).execute()
    if not resp.data:
        raise ValueError("Failed to create session")
    
    s = resp.data[0]
    return _session_to_response(s, tutor_name, student_name)


async def list_sessions(filters: SessionFilters) -> SessionListResponse:
    """List sessions with filters and pagination."""
    supabase = _get_sb()
    
    query = supabase.table("sessions").select("*, tutors(full_name), students(full_name)", count="exact")
    
    if filters.student_id:
        query = query.eq("student_id", filters.student_id)
    if filters.tutor_id:
        query = query.eq("tutor_id", filters.tutor_id)
    if filters.status:
        query = query.eq("status", filters.status.value)
    
    # Upcoming only: session_date >= today
    if filters.upcoming_only:
        today = date.today().isoformat()
        query = query.gte("session_date", today)
    
    # Apply pagination
    offset = (filters.page - 1) * filters.limit
    query = query.range(offset, offset + filters.limit - 1)
    
    # Order by session_date, then start_time
    query = query.order("session_date", desc=False).order("start_time", desc=False)
    
    resp = query.execute()
    
    sessions_data = resp.data or []
    total = resp.count or 0
    
    sessions = []
    for s in sessions_data:
        tutor_name = s.get("tutors", {}).get("full_name") if s.get("tutors") else ""
        student_name = s.get("students", {}).get("full_name") if s.get("students") else ""
        sessions.append(_session_to_response(s, tutor_name, student_name))
    
    return SessionListResponse(
        sessions=sessions,
        total=total,
        page=filters.page,
        has_more=(offset + filters.limit) < total,
    )


async def update_session_status(session_id: str, user_id: str, new_status: SessionStatus, user_role: str) -> SessionResponse:
    """Update session status. Only tutor can confirm/complete/cancel."""
    supabase = _get_sb()
    
    # Get session to verify ownership
    resp = supabase.table("sessions").select("*").eq("id", session_id).execute()
    if not resp.data:
        raise ValueError("Session not found")
    
    session = resp.data[0]
    
    # Verify tutor owns this session
    if user_role == "tutor" and session["tutor_id"] != user_id:
        raise ValueError("Not authorized to update this session")
    # Student can only cancel their own sessions
    if user_role == "student" and session["student_id"] != user_id:
        raise ValueError("Not authorized to update this session")
    # Student can only cancel, not confirm/complete
    if user_role == "student" and new_status in [SessionStatus.confirmed, SessionStatus.completed]:
        raise ValueError("Students can only cancel sessions")
    
    # Update status
    update_resp = supabase.table("sessions").update({"status": new_status.value}).eq("id", session_id).execute()
    if not update_resp.data:
        raise ValueError("Failed to update session")
    
    updated = update_resp.data[0]
    
    # Get names for response
    tutor_resp = supabase.table("tutors").select("full_name").eq("id", updated["tutor_id"]).execute()
    student_resp = supabase.table("students").select("full_name").eq("id", updated["student_id"]).execute()
    tutor_name = tutor_resp.data[0]["full_name"] if tutor_resp.data else ""
    student_name = student_resp.data[0]["full_name"] if student_resp.data else ""
    
    return _session_to_response(updated, tutor_name, student_name)


def _session_to_response(s: dict, tutor_name: str = "", student_name: str = "") -> SessionResponse:
    """Convert session dict to SessionResponse."""
    return SessionResponse(
        id=s["id"],
        student_id=s["student_id"],
        tutor_id=s["tutor_id"],
        subject=s["subject"],
        session_date=s["session_date"],
        start_time=s["start_time"][:5] if "T" in s["start_time"] else s["start_time"],
        end_time=s["end_time"][:5] if "T" in s["end_time"] else s["end_time"],
        mode=s["mode"],
        status=s["status"],
        price=s.get("price") or 0,
        notes=s.get("notes"),
        tutor_name=tutor_name,
        student_name=student_name,
        created_at=s.get("created_at", ""),
        updated_at=s.get("updated_at", ""),
    )