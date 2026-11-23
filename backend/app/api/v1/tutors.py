from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Optional

from app.services.tutor_service import list_tutors, get_tutor_by_id, get_tutor_availability
from app.schemas.tutor import TutorFilters, TutorListResponse, TutorDetail, TutorAvailabilityResponse
from app.core.security import get_current_user_id

router = APIRouter(prefix="/tutors", tags=["tutors"])


@router.get(
    "",
    response_model=TutorListResponse,
    responses={500: {"description": "Internal server error"}},
)
async def get_tutors(
    subject: Optional[str] = Query(None, description="Filter by subject (e.g., Physics, Chemistry)"),
    district: Optional[str] = Query(None, description="Filter by district (e.g., Colombo, Kandy)"),
    level: Optional[str] = Query(None, description="Filter by level (e.g., O/L, A/L, Grade 10)"),
    max_price: Optional[int] = Query(None, description="Maximum price per session (LKR)"),
    search: Optional[str] = Query(None, description="Text search on name/specialty"),
    verified_only: bool = Query(False, description="Only verified tutors"),
    top_rated: bool = Query(False, description="Only top rated (rating >= 4.8)"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
):
    """
    List tutors with filters.
    Supports filtering by subject, district, level, price, search, verified_only, top_rated.
    Returns paginated results with total count.
    """
    filters = TutorFilters(
        subject=subject,
        district=district,
        level=level,
        max_price=max_price,
        search=search,
        verified_only=verified_only,
        top_rated=top_rated,
        page=page,
        limit=limit,
    )
    try:
        return await list_tutors(filters)
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.get(
    "/{tutor_id}",
    response_model=TutorDetail,
    responses={
        404: {"description": "Tutor not found"},
        500: {"description": "Internal server error"},
    },
)
async def get_tutor(tutor_id: str):
    """Get detailed tutor profile by ID."""
    try:
        tutor = await get_tutor_by_id(tutor_id)
        if not tutor:
            raise HTTPException(404, detail={"code": "not_found", "message": "Tutor not found"})
        return tutor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.get(
    "/{tutor_id}/availability",
    response_model=TutorAvailabilityResponse,
    responses={
        404: {"description": "Tutor not found"},
        500: {"description": "Internal server error"},
    },
)
async def get_availability(tutor_id: str):
    """Get available dates/times for a tutor."""
    try:
        return await get_tutor_availability(tutor_id)
    except ValueError as e:
        raise HTTPException(404, detail={"code": "not_found", "message": str(e)})
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})