from fastapi import APIRouter, Depends, HTTPException, status

from app.services.auth_service import create_profile
from app.core.security import get_current_user_profile
from app.schemas.auth import SignupRequest, SignupResponse, UserProfile, SocialLoginRequest, ErrorResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": ErrorResponse},
        409: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def signup(
    signup_data: SignupRequest
):
    """
    Create student/tutor profile after Supabase signup.
    Frontend calls this after Supabase auth.signUp() succeeds.
    """
    try:
        result = await create_profile(
            user_id=signup_data.user_id,
            signup_data=signup_data
        )
        return result
    except ValueError as e:
        if str(e) == "username_taken":
            raise HTTPException(409, detail={"code": "username_taken", "message": "Username already taken"})
        if str(e) == "email_exists":
            raise HTTPException(409, detail={"code": "email_exists", "message": "Email already registered"})
        raise HTTPException(400, detail={"code": "validation_error", "message": str(e)})
    except Exception as e:
        raise HTTPException(500, detail={"code": "server_error", "message": "Internal server error"})


@router.get(
    "/profiles/me",
    response_model=UserProfile,
    responses={
        401: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def get_my_profile(
    profile: dict = Depends(get_current_user_profile)
):
    """
    Get current user's profile (student or tutor).
    Requires valid Supabase access token in Authorization header.
    """
    return profile


@router.post(
    "/social-login",
    response_model=UserProfile,
    status_code=501,
    responses={501: {"model": ErrorResponse}},
)
async def social_login(request: SocialLoginRequest):
    """Sync OAuth users (Google, Apple) - not implemented yet."""
    raise HTTPException(501, detail={"code": "not_implemented", "message": "Social login not implemented yet"})