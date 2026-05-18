from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


# ---------- Users ----------
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "editor"  # super_admin | editor


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None


class UserPublic(UserBase):
    id: str
    is_active: bool = True
    created_at: datetime


# ---------- Auth ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


# ---------- Projects ----------
class ProjectBase(BaseModel):
    title: str
    category: str  # Water | Telecom | Wastewater | Mechanical | Electrical
    client: Optional[str] = ""
    location: Optional[str] = ""
    year: Optional[int] = None
    summary: Optional[str] = ""
    description: Optional[str] = ""
    image_url: Optional[str] = ""
    gallery: List[str] = Field(default_factory=list)
    is_published: bool = True
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    client: Optional[str] = None
    location: Optional[str] = None
    year: Optional[int] = None
    summary: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    gallery: Optional[List[str]] = None
    is_published: Optional[bool] = None
    order: Optional[int] = None


class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
