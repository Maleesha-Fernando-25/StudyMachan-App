from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import get_settings
from app.api.v1 import auth, health, tutors, sessions, students

settings = get_settings()

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup - verify Supabase connection
    from app.core.supabase_client import get_supabase
    try:
        supabase = get_supabase()
        supabase.table("students").select("id").limit(1).execute()
        print("Supabase connection verified")
    except Exception as e:
        print(f"Supabase connection failed: {e}")
    yield
    # Shutdown (if needed)


app = FastAPI(
    title="StudyMachan API",
    version=settings.api_version,
    lifespan=lifespan,
)

# Rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS - allow Expo dev client, web, and mobile origins from env
allowed_origins = [origin.strip() for origin in settings.allowed_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(tutors.router)
app.include_router(sessions.router)
app.include_router(students.router)


@app.get("/")
async def root():
    return {"message": "StudyMachan API", "version": settings.api_version}