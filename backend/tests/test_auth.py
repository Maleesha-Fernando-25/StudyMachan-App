import pytest

from app.main import app


class TestAuthEndpoints:
    """Tests for auth endpoints."""

    @pytest.mark.asyncio
    async def test_health_check(self, async_client):
        """Test health check endpoint - may be unhealthy if no Supabase."""
        response = await async_client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] in ("healthy", "unhealthy")
        assert "supabase" in data

    @pytest.mark.asyncio
    async def test_version(self, async_client):
        """Test version endpoint."""
        response = await async_client.get("/version")
        assert response.status_code == 200
        assert "version" in response.json()

    @pytest.mark.asyncio
    async def test_signup_validation_error(self, async_client):
        """Test signup with invalid data."""
        response = await async_client.post("/auth/signup", json={
            "email": "invalid",
            "password": "short",
            "role": "student",
            "full_name": "",
            "username": "ab",
            "date_of_birth": "2000-01-01",
            "gender": "Male",
            "address": "123"
        })
        assert response.status_code == 422  # Pydantic validation error


class TestSecurity:
    """Tests for security functions."""

    def test_verify_supabase_token_missing_header(self):
        from app.core.security import verify_supabase_token
        from fastapi import HTTPException
        
        import pytest
        with pytest.raises(HTTPException) as exc:
            import asyncio
            asyncio.run(verify_supabase_token(""))
        assert exc.value.status_code == 401

    def test_get_current_user_id_missing_sub(self):
        from app.core.security import get_current_user_id
        from fastapi import HTTPException
        
        import pytest
        with pytest.raises(HTTPException) as exc:
            import asyncio
            asyncio.run(get_current_user_id({}))
        assert exc.value.status_code == 401