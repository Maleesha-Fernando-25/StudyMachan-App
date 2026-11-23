from functools import lru_cache
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # Supabase
    supabase_url: str = Field(..., alias="SUPABASE_URL")
    supabase_service_role_key: str = Field(..., alias="SUPABASE_SERVICE_ROLE_KEY")
    supabase_jwks_url: str = Field(..., alias="SUPABASE_JWKS_URL")

    # App
    backend_port: int = Field(8000, alias="BACKEND_PORT")
    frontend_url: str = Field("http://localhost:8081", alias="FRONTEND_URL")
    environment: str = Field("development", alias="ENVIRONMENT")
    api_version: str = Field("1.0.0", alias="API_VERSION")

    # CORS - comma-separated list of allowed origins
    allowed_origins: str = Field(
        "http://localhost:8081,http://127.0.0.1:8081,exp://127.0.0.1:8081,exp://10.0.2.2:8081",
        alias="ALLOWED_ORIGINS"
    )

    # Rate limiting
    rate_limit_requests: int = Field(100, alias="RATE_LIMIT_REQUESTS")
    rate_limit_window: int = Field(60, alias="RATE_LIMIT_WINDOW")

    class Config:
        env_file = ".env"
        case_sensitive = False
        populate_by_name = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()