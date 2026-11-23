from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.services.student_service import list_saved_tutors, save_tutor, unsave_tutor
from app.schemas.student import SavedTutorResponse
from app.core.security import get_current_user_id, get_current_user_profile

router = APIRouter(prefix="/students", tags=["students"])


@router.get(
    "/{student_id}/saved-tutors",
    response_model=List[SavedTutorResponse],
    responses={
        403: {"description": "Not authorized to view this student's saved tutors"},
        500: {"description": "Internal server error"},
    },
)
async def get_saved_tutors(
    student_id: str,
    current_user_id: str = Depends(get_current_user_id),
    current_profile: dict = Depends(get_current_user_profile),
):
    """Get all saved tutors for a student."""
    role = current_profile.get("role")
    # Students can only view their own saved tutors
    if role == "student" and student_id != current_user_id:
        raise HTTPException(403, detail={"code": "forbidden", "message": "Not authorized to view this student's saved tutors"})
    
    try:
        return await list_saved_tutors(student_id)
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.post(
    "/{student_id}/saved-tutors/{tutor_id}",
    response_model=SavedTutorResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"description": "Tutor already saved or not found"},
        403: {"description": "Not authorized"},
        404: {"description": "Tutor not found"},
        500: {"description": "Internal server error"},
    },
)
async def save_tutor_endpoint(
    student_id: str,
    tutor_id: str,
    current_user_id: str = Depends(get_current_user_id),
    current_profile: dict = Depends(get_current_user_profile),
):
    """Save a tutor for a student."""
    role = current_profile.get("role")
    if role == "student" and student_id != current_user_id:
        raise HTTPException(403, detail={"code": "forbidden", "message": "Not authorized to save tutors for this student"})
    
    try:
        return await save_tutor(student_id, tutor_id)
    except ValueError as e:
        if "already saved" in str(e):
            raise HTTPException(400, detail={"code": "already_saved", "message": str(e)})
        if "not found" in str(e):
            raise HTTPException(404, detail={"code": "not_found", "message": str(e)})
        raise HTTPException(400, detail={"code": "validation_error", "message": str(e)})
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})


@router.delete(
    "/{student_id}/saved-tutors/{tutor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        403: {"description": "Not authorized"},
        404: {"description": "Saved tutor not found"},
        500: {"description": "Internal server error"},
    },
)
async def unsave_tutor_endpoint(
    student_id: str,
    tutor_id: str,
    current_user_id: str = Depends(get_current_user_id),
    current_profile: dict = Depends(get_current_user_profile),
):
    """Remove a saved tutor."""
    role = current_profile.get("role")
    if role == "student" and student_id != current_user_id:
        raise HTTPException(403, detail={"code": "forbidden", "message": "Not authorized to unsave tutors for this student"})
    
    try:
        deleted = await unsave_tutor(student_id, tutor_id)
        if not deleted:
            raise HTTPException(404, detail={"code": "not_found", "message": "Saved tutor not found"})
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": str(e)})