import json
import time
from typing import Dict

import httpx
from jose import jwt, JWTError
from fastapi import HTTPException, Depends, Header

from app.core.config import get_settings

settings = get_settings()

# JWKS cache with 1-hour TTL
_jwks_cache = {"data": None, "expires": 0}


def get_jwks() -> Dict:
    """Fetch and cache Supabase JWKS with 1-hour TTL."""
    global _jwks_cache
    now = time.time()
    if _jwks_cache["data"] and now < _jwks_cache["expires"]:
        return _jwks_cache["data"]
    
    url = f"{settings.supabase_url}/auth/v1/.well-known/jwks.json"
    resp = httpx.get(url, timeout=10)
    resp.raise_for_status()
    _jwks_cache = {"data": resp.json(), "expires": now + 3600}  # 1 hour
    return _jwks_cache["data"]


def get_signing_key(kid: str):
    """Find RSA key by key ID."""
    jwks = get_jwks()
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))
    return None


async def verify_supabase_token(authorization: str = Header(...)) -> dict:
    """
    Validate Supabase access token.
    Returns payload with: sub (user_id), email, role, etc.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Invalid authorization header")
    
    token = authorization[7:]  # Remove "Bearer "
    
    try:
        unverified_header = jwt.get_unverified_header(token)
    except JWTError:
        raise HTTPException(401, "Invalid token header")
    
    key = get_signing_key(unverified_header["kid"])
    if not key:
        raise HTTPException(401, "Invalid token key")
    
    try:
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience="authenticated",
            issuer=f"{settings.supabase_url}/auth/v1",
        )
    except JWTError as e:
        raise HTTPException(401, f"Token validation failed: {str(e)}")
    
    return payload


async def get_current_user_id(payload: dict = Depends(verify_supabase_token)) -> str:
    """Extract user ID (sub) from validated token."""
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(401, "Token missing subject")
    return user_id


async def get_current_user_profile(
    user_id: str = Depends(get_current_user_id)
) -> dict:
    """Get profile (student or tutor) for current user via Supabase."""
    from app.core.supabase_client import get_supabase
    
    supabase = get_supabase()
    
    # Check students first
    student_resp = supabase.table("students").select("*").eq("auth_user_id", user_id).execute()
    if student_resp.data:
        student = student_resp.data[0]
        return {
            "id": student["id"],
            "role": "student",
            "full_name": student["full_name"],
            "username": student["username"],
            "email": student["email"],
            "date_of_birth": student["date_of_birth"],
            "gender": student["gender"],
            "address": student["address"],
            "avatar_url": student.get("avatar_url"),
        }
    
    # Check tutors
    tutor_resp = supabase.table("tutors").select("*").eq("auth_user_id", user_id).execute()
    if tutor_resp.data:
        tutor = tutor_resp.data[0]
        return {
            "id": tutor["id"],
            "role": "tutor",
            "full_name": tutor["full_name"],
            "username": tutor["username"],
            "email": tutor["email"],
            "date_of_birth": tutor["date_of_birth"],
            "gender": tutor["gender"],
            "address": tutor["address"],
            "avatar_url": tutor.get("avatar_url"),
        }
    
    raise HTTPException(404, "No student/tutor profile found")