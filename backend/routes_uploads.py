import os
import uuid
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from auth import get_current_user

router = APIRouter(prefix="/uploads", tags=["uploads"])

UPLOAD_DIR = Path(__file__).parent / "uploads" / "projects"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_BYTES = 5 * 1024 * 1024  # 5 MB


@router.post("/image")
async def upload_image(file: UploadFile = File(...), _=Depends(get_current_user)):
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Allowed: {', '.join(sorted(ALLOWED_EXT))}")

    contents = await file.read()
    if len(contents) > MAX_BYTES:
        raise HTTPException(status_code=400, detail="File too large (max 5 MB)")

    filename = f"{uuid.uuid4().hex}{ext}"
    target = UPLOAD_DIR / filename
    with target.open("wb") as f:
        f.write(contents)

    # Returned URL is served via /api/uploads/projects/<filename>
    return {"url": f"/api/uploads/projects/{filename}", "filename": filename, "size": len(contents)}
