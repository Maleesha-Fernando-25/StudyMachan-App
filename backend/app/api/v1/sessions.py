from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Optional

from app.services.session_service import create_session, list_sessions, update_session_status
from app.schemas.session import SessionCreate, SessionUpdate, SessionResponse, SessionListResponse, SessionFilters, SessionStatus
from app.core.security import get_current_user_id, get_current_user_profile

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.post(
    "",
    response_model=SessionResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"description": "Invalid request"},
        404: {"description": "Tutor not found"},
        500: {"description": "Internal server error"},
    },
)
async def create_session_endpoint(
    session_data: SessionCreate,
    student_id: str = Depends(get_current_user_id)
):
    """Book a new session (student only)."""
    try:
        return await create_session(student_id, session_data)
    except ValueError as e:
        raise HTTPException(400, detail={"code": "validation_error", "message": str(e)})
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.get(
    "",
    response_model=SessionListResponse,
    responses={500: {"description": "Internal server error"}},
)
async def get_sessions(
    student_id: Optional[str] = Query(None, description="Filter by student ID"),
    tutor_id: Optional[str] = Query(None, description="Filter by tutor ID"),
    status: Optional[SessionStatus] = Query(None, description="Filter by status"),
    upcoming_only: bool = Query(False, description="Only upcoming sessions"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user_id: str = Depends(get_current_user_id),
    current_profile: dict = Depends(get_current_user_profile),
):
    """
    List sessions with filters.
    - Students see their own sessions
    - Tutors see their own sessions
    - Admins (if any) can see all
    """
    # Determine user's role and restrict access
    role = current_profile.get("role")
    if role == "student":
        student_id = current_user_id
        tutor_id = None
    elif role == "tutor":
        tutor_id = current_user_id
        student_id = None
    else:
        # Allow explicit filters for admins (if implemented)
        pass
    
    filters = SessionFilters(
        student_id=student_id,
        tutor_id=tutor_id,
        status=status,
        upcoming_only=upcoming_only,
        page=page,
        limit=limit,
    )
    
    try:
        return await list_sessions(filters)
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.put(
    "/{session_id}",
    response_model=SessionResponse,
    responses={
        400: {"description": "Invalid status transition or unauthorized"},
        404: {"description": "Session not found"},
        500: {"description": "Internal server error"},
    },
)
async def update_session(
    session_id: str,
    update_data: SessionUpdate,
    current_user_id: str = Depends(get_current_user_id),
    current_profile: dict = Depends(get_current_user_profile),
):
    """
    Update session status.
    - Tutor can confirm, complete, cancel
    - Student can cancel
    """
    role = current_profile.get("role")
    try:
        return await update_session_status(session_id, current_user_id, update_data.status, role)
    except ValueError as e:
        raise HTTPException(400, detail={"code": "validation_error", "message": str(e)})
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})