from datetime import datetime
import uuid
from auth import hash_password

DEFAULT_ADMIN = {
    "email": "admin@globalfivets.com",
    "name": "Super Admin",
    "password": "Admin@12345",
    "role": "super_admin",
}

SEED_PROJECTS = [
    {
        "title": "Jabrin–Ibri Transmission & Distribution Line Relocation",
        "category": "Water",
        "client": "Galfar Engineering",
        "location": "Jabrin – Ibri, Oman",
        "year": 2024,
        "summary": "Relocation of critical transmission and distribution pipelines to support regional infrastructure development.",
        "description": "Comprehensive relocation works of high-capacity water transmission and distribution pipelines along the Jabrin–Ibri corridor to enable regional infrastructure upgrades. Scope included civil works, pipeline installation, valve chambers, pressure testing and recommissioning with zero downtime to existing supply.",
        "image_url": "https://images.unsplash.com/photo-1533077162801-86490c593afb?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "End User House Connections – Quriyat",
        "category": "Water",
        "client": "PAEW",
        "location": "Quriyat, Muscat Governorate",
        "year": 2023,
        "summary": "Installation of secure water connections for residential end-users in the Quriyat region.",
        "description": "Turnkey installation of secure, metered household water connections across the Quriyat catchment area, including service pipes, meter chambers, pressure regulation and final commissioning for PAEW.",
        "image_url": "https://images.unsplash.com/photo-1542274368-443d694d79aa?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "Sur Al Kamil Network Relocation",
        "category": "Water",
        "client": "Strabag LLC",
        "location": "Sur Al Kamil, Ash Sharqiyah",
        "year": 2023,
        "summary": "Complex relocation of existing water network to accommodate new road construction.",
        "description": "Coordinated diversion and reinstallation of the Sur Al Kamil potable water network to clear corridors for new road alignments. Works covered HDPE/DI mains, valve chambers, hydrostatic testing and disinfection before reconnection.",
        "image_url": "https://images.unsplash.com/photo-1714901423336-1884cd3fb50f?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "Waterline Protection Works – Qurm",
        "category": "Water",
        "client": "Al Tasnim Enterprises LLC",
        "location": "Qurm, Muscat",
        "year": 2024,
        "summary": "Execution of protection measures for critical waterlines against environmental and construction impacts.",
        "description": "Protection of high-pressure transmission mains in Qurm using reinforced concrete encasement, steel sleeving and traffic-load distribution slabs, ensuring long-term integrity in proximity to active construction.",
        "image_url": "https://images.unsplash.com/photo-1620203853151-496c7228306c?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "FOC Network Installation – 108 KM Sohar–Buraimi",
        "category": "Telecom",
        "client": "Ministry of Defense",
        "location": "Sohar – Buraimi, Oman",
        "year": 2024,
        "summary": "Laying of 108 kilometers of fiber optic cable network for secure defense communications.",
        "description": "End-to-end deployment of a 108 KM secure fiber optic backbone between Sohar and Buraimi, including HDD trenching, duct installation, OFC blowing, splicing, OTDR testing and ODF termination for the Ministry of Defense.",
        "image_url": "https://images.unsplash.com/photo-1643155193188-38eb08e2b54f?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "FOC Network Relocation – 65 KM Izki–Nizwa",
        "category": "Telecom",
        "client": "OHI Telecommunications",
        "location": "Izki – Nizwa, Ad Dakhiliyah",
        "year": 2023,
        "summary": "Relocation and splicing of 65KM FOC network ensuring zero downtime during transition.",
        "description": "Carefully sequenced relocation of 65 KM of live FOC network between Izki and Nizwa with rolling cut-overs, jointing and full OTDR validation to maintain operator SLAs throughout the works.",
        "image_url": "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "FOC Network Installation – 48 KM Thalib",
        "category": "Telecom",
        "client": "Ministry of Defense",
        "location": "Thalib, Oman",
        "year": 2024,
        "summary": "Installation and testing of 48KM high-speed fiber optic infrastructure.",
        "description": "Greenfield 48 KM fiber optic backbone including civil works, duct laying, OFC pulling/blowing, splicing and end-to-end testing handed over to the Ministry of Defense.",
        "image_url": "https://images.unsplash.com/photo-1557174360-3f4f7c724501?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "FOC & Copper Network Relocation – Sur LNG",
        "category": "Telecom",
        "client": "AZ Engineers",
        "location": "Sur LNG, Ash Sharqiyah",
        "year": 2023,
        "summary": "Relocation of combined fiber optic and copper networks for the Sur LNG facilities.",
        "description": "Combined FOC and copper network diversion within the Sur LNG plant boundaries, executed under strict permit-to-work and HSE controls in a live process environment.",
        "image_url": "https://images.unsplash.com/photo-1547895749-888a559fc2a7?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "Sewage Network Installation – Azaiba",
        "category": "Wastewater",
        "client": "Arab Contractors LLC",
        "location": "Azaiba, Muscat",
        "year": 2024,
        "summary": "Construction of modern gravity sewers and pumping connections for the Azaiba district.",
        "description": "District-wide gravity sewer network with manholes, pumping station connections and house drainage tie-ins covering the Azaiba catchment, designed to current Nama Water Services specifications.",
        "image_url": "https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "Sewage Network Installation – Al Ansab",
        "category": "Wastewater",
        "client": "Target LLC",
        "location": "Al Ansab, Muscat",
        "year": 2023,
        "summary": "Comprehensive sewage pipeline installation to enhance urban sanitation.",
        "description": "Comprehensive sewage pipeline package including gravity mains, deep manholes, leak testing and connection of catchments to the central Al Ansab treatment system.",
        "image_url": "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "title": "Sewage Network Installation – Al Khoud",
        "category": "Wastewater",
        "client": "Arab Contractors LLC",
        "location": "Al Khoud, Muscat",
        "year": 2024,
        "summary": "Deployment of extensive wastewater infrastructure using advanced trenchless methods.",
        "description": "Large-scale Al Khoud sewage network utilising trenchless HDD and micro-tunnelling to minimise surface disruption, with full leak and CCTV inspection prior to handover.",
        "image_url": "https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
]


async def run_seed(db):
    # Seed default super admin if no users exist
    existing_users = await db.users.count_documents({})
    if existing_users == 0:
        user_doc = {
            "id": str(uuid.uuid4()),
            "email": DEFAULT_ADMIN["email"],
            "name": DEFAULT_ADMIN["name"],
            "role": DEFAULT_ADMIN["role"],
            "password_hash": hash_password(DEFAULT_ADMIN["password"]),
            "is_active": True,
            "created_at": datetime.utcnow(),
        }
        await db.users.insert_one(user_doc)
        print(f"[seed] Created default super admin: {DEFAULT_ADMIN['email']}")

    # Seed projects if none exist
    existing_projects = await db.projects.count_documents({})
    if existing_projects == 0:
        for idx, p in enumerate(SEED_PROJECTS):
            doc = {
                "id": str(uuid.uuid4()),
                "gallery": [],
                "is_published": True,
                "order": idx,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                **p,
            }
            await db.projects.insert_one(doc)
        print(f"[seed] Seeded {len(SEED_PROJECTS)} projects")
