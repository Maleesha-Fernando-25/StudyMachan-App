from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class SignupRequest(BaseModel):
    user_id: str
    email: EmailStr
    role: str = Field(pattern="^(student|tutor)$")
    full_name: str = Field(min_length=1, max_length=255)
    username: str = Field(min_length=3, max_length=100)
    date_of_birth: date
    gender: str = Field(pattern="^(Male|Female)$")
    address: str = Field(min_length=5)

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower().strip()

    @field_validator("username")
    @classmethod
    def lowercase_username(cls, v: str) -> str:
        return v.lower().strip()


class SignupResponse(BaseModel):
    message: str
    user_id: str
    email: str
    needs_email_confirmation: bool


class UserProfile(BaseModel):
    id: str
    role: str
    full_name: str
    username: str
    email: str
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    avatar_url: Optional[str] = None


class SocialLoginRequest(BaseModel):
    provider: str
    access_token: str


class ErrorResponse(BaseModel):
    code: str
    message: str