from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime
from auth import require_super_admin, hash_password
from models import UserCreate, UserUpdate, UserPublic

router = APIRouter(prefix="/users", tags=["users"])


def _user_to_public(doc: dict) -> UserPublic:
    return UserPublic(
        id=doc["id"],
        email=doc["email"],
        name=doc["name"],
        role=doc["role"],
        is_active=doc.get("is_active", True),
        created_at=doc.get("created_at", datetime.utcnow()),
    )


@router.get("", response_model=List[UserPublic])
async def list_users(_=Depends(require_super_admin)):
    from server import db
    docs = await db.users.find({}, {"password_hash": 0, "_id": 0}).sort("created_at", -1).to_list(500)
    return [_user_to_public(d) for d in docs]


@router.post("", response_model=UserPublic)
async def create_user(payload: UserCreate, _=Depends(require_super_admin)):
    from server import db
    if payload.role not in ("super_admin", "editor"):
        raise HTTPException(status_code=400, detail="Invalid role")
    email = payload.email.lower()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": payload.name,
        "role": payload.role,
        "password_hash": hash_password(payload.password),
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    await db.users.insert_one(doc)
    return _user_to_public(doc)


@router.patch("/{user_id}", response_model=UserPublic)
async def update_user(user_id: str, payload: UserUpdate, current=Depends(require_super_admin)):
    from server import db
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updates = {}
    if payload.name is not None:
        updates["name"] = payload.name
    if payload.role is not None:
        if payload.role not in ("super_admin", "editor"):
            raise HTTPException(status_code=400, detail="Invalid role")
        updates["role"] = payload.role
    if payload.is_active is not None:
        # Prevent deactivating self
        if user_id == current["id"] and not payload.is_active:
            raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
        updates["is_active"] = payload.is_active
    if payload.password:
        updates["password_hash"] = hash_password(payload.password)
    if updates:
        await db.users.update_one({"id": user_id}, {"$set": updates})
    updated = await db.users.find_one({"id": user_id}, {"password_hash": 0, "_id": 0})
    return _user_to_public(updated)


@router.delete("/{user_id}")
async def delete_user(user_id: str, current=Depends(require_super_admin)):
    from server import db
    if user_id == current["id"]:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    result = await db.users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"ok": True}
