from fastapi import APIRouter, HTTPException, Depends
from auth import verify_password, create_access_token, get_current_user
from models import LoginRequest, LoginResponse, UserPublic
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    from server import db
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(subject=user["id"], role=user["role"])
    public = UserPublic(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        role=user["role"],
        is_active=user.get("is_active", True),
        created_at=user.get("created_at", datetime.utcnow()),
    )
    return LoginResponse(access_token=token, user=public)


@router.get("/me", response_model=UserPublic)
async def me(user=Depends(get_current_user)):
    return UserPublic(**user)
