import httpx
from postgrest.exceptions import APIError

from app.core.supabase_client import get_supabase
from app.schemas.auth import SignupRequest
from app.core.config import get_settings

settings = get_settings()


async def get_supabase_user_email_confirmed(user_id: str) -> bool:
    """
    Check if user's email is confirmed via Supabase Admin API.
    Fail CLOSED: returns False if we can't reach Supabase or user not found.
    """
    try:
        url = f"{settings.supabase_url}/auth/v1/admin/users/{user_id}"
        headers = {
            "Authorization": f"Bearer {settings.supabase_service_role_key}",
            "apikey": settings.supabase_service_role_key,
        }
        resp = httpx.get(url, headers=headers, timeout=10)
        if resp.status_code == 200:
            user_data = resp.json()
            return user_data.get("email_confirmed_at") is not None
        # Non-200 = treat as unconfirmed
        return False
    except Exception:
        return False  # Fail CLOSED - assume unconfirmed on error


async def create_profile(
    user_id: str,
    signup_data: SignupRequest
) -> dict:
    """
    Create student or tutor profile based on role.
    Returns dict with profile info and needs_email_confirmation.
    Relies on DB unique constraints for username/email (race-safe).
    """
    email = signup_data.email.lower().strip()
    username = signup_data.username.lower().strip()
    
    # Check email confirmation status
    needs_email_confirmation = not await get_supabase_user_email_confirmed(user_id)
    
    profile_data = {
        "auth_user_id": user_id,
        "full_name": signup_data.full_name.strip(),
        "username": username,
        "email": email,
        "date_of_birth": signup_data.date_of_birth.isoformat(),
        "gender": signup_data.gender,
        "address": signup_data.address.strip(),
    }
    
    supabase = get_supabase()
    table_name = "students" if signup_data.role == "student" else "tutors"
    
    try:
        resp = supabase.table(table_name).insert(profile_data).execute()
    except APIError as e:
        # Postgres unique_violation = 23505
        if e.code == "23505":
            if "username" in str(e).lower():
                raise ValueError("username_taken")
            if "email" in str(e).lower():
                raise ValueError("email_exists")
        raise
    
    if not resp.data:
        raise ValueError(f"Failed to create {signup_data.role} profile")
    
    profile_id = resp.data[0]["id"]
    
    return {
        "message": "Account created successfully",
        "user_id": profile_id,
        "email": email,
        "needs_email_confirmation": needs_email_confirmation,
    }