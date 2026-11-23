from fastapi import APIRouter, Depends

from app.core.supabase_client import get_supabase
from app.core.config import get_settings

settings = get_settings()

router = APIRouter(prefix="", tags=["health"])


@router.get("/health")
async def health_check():
    """Health check endpoint - verifies Supabase connectivity."""
    try:
        supabase = get_supabase()
        # Simple query to verify connection
        resp = supabase.table("students").select("id").limit(1).execute()
        return {"status": "healthy", "supabase": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "supabase": "disconnected", "error": str(e)}


@router.get("/version")
async def version():
    """API version endpoint."""
    return {
        "version": settings.api_version,
        "environment": settings.environment,
    }