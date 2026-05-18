from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Ensure upload dir exists before mount
UPLOAD_DIR = ROOT_DIR / "uploads" / "projects"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Global Five API")

api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Global Five API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


# Routers
from routes_auth import router as auth_router  # noqa: E402
from routes_users import router as users_router  # noqa: E402
from routes_projects import router as projects_router  # noqa: E402
from routes_uploads import router as uploads_router  # noqa: E402

api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(projects_router)
api_router.include_router(uploads_router)

app.include_router(api_router)

# Serve uploaded images at /api/uploads/projects/<file>
app.mount("/api/uploads/projects", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    from seed import run_seed
    try:
        await run_seed(db)
    except Exception as e:
        logger.exception("Seeding failed: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
