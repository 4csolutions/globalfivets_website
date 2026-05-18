from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
import uuid
from datetime import datetime
from auth import get_current_user
from models import Project, ProjectCreate, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["projects"])


def _strip(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


@router.get("", response_model=List[Project])
async def list_published_projects(
    category: Optional[str] = Query(None),
    limit: Optional[int] = Query(None, ge=1, le=100),
):
    from server import db
    q = {"is_published": True}
    if category and category.lower() != "all":
        q["category"] = category
    cursor = db.projects.find(q).sort([("order", 1), ("created_at", -1)])
    if limit:
        cursor = cursor.limit(limit)
    docs = await cursor.to_list(500)
    return [Project(**_strip(d)) for d in docs]


@router.get("/all", response_model=List[Project])
async def list_all_projects(_=Depends(get_current_user)):
    from server import db
    docs = await db.projects.find({}).sort([("order", 1), ("created_at", -1)]).to_list(1000)
    return [Project(**_strip(d)) for d in docs]


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    from server import db
    doc = await db.projects.find_one({"id": project_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**_strip(doc))


@router.post("", response_model=Project)
async def create_project(payload: ProjectCreate, _=Depends(get_current_user)):
    from server import db
    doc = {
        "id": str(uuid.uuid4()),
        **payload.dict(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    await db.projects.insert_one(doc)
    return Project(**_strip(doc))


@router.patch("/{project_id}", response_model=Project)
async def update_project(project_id: str, payload: ProjectUpdate, _=Depends(get_current_user)):
    from server import db
    existing = await db.projects.find_one({"id": project_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    if updates:
        updates["updated_at"] = datetime.utcnow()
        await db.projects.update_one({"id": project_id}, {"$set": updates})
    updated = await db.projects.find_one({"id": project_id})
    return Project(**_strip(updated))


@router.delete("/{project_id}")
async def delete_project(project_id: str, _=Depends(get_current_user)):
    from server import db
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"ok": True}
