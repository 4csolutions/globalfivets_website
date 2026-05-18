# Deploying Global Five on Coolify

This guide covers three deployment paths on Coolify. Pick **one**.

| Option | Best for | Files used |
|---|---|---|
| **A. Docker Compose (recommended)** | Single-click full stack incl. MongoDB | `docker-compose.yml` |
| **B. Two Nixpacks apps** | If you already have a managed MongoDB | `backend/nixpacks.toml`, `frontend/nixpacks.toml` |
| **C. Two Dockerfile apps** | Maximum control, custom domains per service | `backend/Dockerfile`, `frontend/Dockerfile` |

---

## Prerequisites

- Coolify v4+ instance with a server attached
- A Git repository containing this project
- Two domains (or subdomains) ready: e.g. `globalfivets.com` and `api.globalfivets.com`

---

## Option A — Docker Compose (recommended)

1. In Coolify: **+ New Resource → Docker Compose**.
2. Connect your Git repository, branch `main`.
3. Set the Docker Compose file path to `docker-compose.yml`.
4. Under **Environment Variables**, paste from `.env.coolify.example` and fill in real values:
   ```
   DB_NAME=globalfive
   MONGO_URL=mongodb://mongo:27017
   JWT_SECRET=<long-random-string>
   CORS_ORIGINS=https://globalfivets.com
   REACT_APP_BACKEND_URL=https://api.globalfivets.com
   ```
5. Under **Domains**, assign:
   - `frontend` service → `https://globalfivets.com`
   - `backend` service  → `https://api.globalfivets.com`
6. Persistent storage — the compose file declares two named volumes:
   - `mongo_data` (MongoDB data)
   - `backend_uploads` (uploaded project images)
   Coolify auto-creates them; confirm they're attached.
7. Click **Deploy**.

First boot will:
- Seed default admin: `admin@globalfivets.com` / `Admin@12345`
- Seed 11 initial projects

---

## Option B — Two Nixpacks apps

Use this if you already have a managed MongoDB (Atlas, Coolify-managed Mongo service, etc.).

### B1. Backend
1. **+ New Resource → Application → Public Repository / Git**.
2. **Build Pack: Nixpacks**.
3. **Base Directory:** `/backend`.
4. **Port:** `8001` (Coolify will set `$PORT` automatically; the start command uses it).
5. **Environment Variables:**
   ```
   MONGO_URL=<your mongo connection string>
   DB_NAME=globalfive
   JWT_SECRET=<long-random-string>
   CORS_ORIGINS=https://globalfivets.com
   ```
6. **Persistent Storage:** Mount a volume at `/app/uploads` so uploaded images survive redeploys.
7. **Domain:** `https://api.globalfivets.com`.
8. Deploy.

The included `backend/nixpacks.toml` defines:
- Install: `pip install -r requirements.txt`
- Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### B2. Frontend
1. **+ New Resource → Application → Public Repository / Git**.
2. **Build Pack: Nixpacks**.
3. **Base Directory:** `/frontend`.
4. **Port:** `3000`.
5. **Build-time Environment Variables** (CRA requires these at build time):
   ```
   REACT_APP_BACKEND_URL=https://api.globalfivets.com
   ```
6. **Domain:** `https://globalfivets.com`.
7. Deploy.

The included `frontend/nixpacks.toml` defines:
- Install: `yarn install --frozen-lockfile`
- Build: `yarn build`
- Start: `npx serve -s build -l $PORT`

---

## Option C — Two Dockerfile apps

Identical to Option B but uses the included `Dockerfile`s instead of Nixpacks.

### C1. Backend
- **Build Pack: Dockerfile**
- **Dockerfile Location:** `/backend/Dockerfile`
- **Build Context:** `/backend`
- **Port:** `8001`
- Same env vars and persistent volume as Option B1.

### C2. Frontend
- **Build Pack: Dockerfile**
- **Dockerfile Location:** `/frontend/Dockerfile`
- **Build Context:** `/frontend`
- **Port:** `80` (the image serves via nginx)
- **Build-time Args:** `REACT_APP_BACKEND_URL=https://api.globalfivets.com`

---

## Post-deployment checklist

- [ ] Visit `/admin/login` and sign in with the default admin
- [ ] **Change the default admin password immediately** (Users → edit own user → reset password)
- [ ] Test image uploads (they should persist after a redeploy thanks to the volume)
- [ ] Update `CORS_ORIGINS` to your real public domain (drop the `*`)
- [ ] Rotate `JWT_SECRET` to a long random value
- [ ] (Optional) Set up Coolify backups for the `mongo_data` volume

---

## Required environment variables reference

| Variable | Service | Required | Default | Notes |
|---|---|---|---|---|
| `MONGO_URL` | backend | yes | — | Mongo connection string |
| `DB_NAME` | backend | yes | `globalfive` | Mongo database name |
| `JWT_SECRET` | backend | yes | dev fallback | Long random string |
| `CORS_ORIGINS` | backend | recommended | `*` | Comma-separated list of public origins |
| `PORT` | backend | auto-set by Coolify | `8001` | Listen port |
| `REACT_APP_BACKEND_URL` | frontend | yes (build-time) | — | Public backend URL |

---

## Troubleshooting

- **CORS errors in browser** → set `CORS_ORIGINS` to include your frontend's exact origin (including scheme).
- **Frontend hits `localhost:8001`** → `REACT_APP_BACKEND_URL` was not set at *build* time. Rebuild the frontend after setting it.
- **Uploaded images disappear after redeploy** → the `/app/uploads` volume isn't mounted. Re-check Coolify persistent storage.
- **Login fails with 401 on a fresh deploy** → check backend logs for `[seed] Created default super admin`. If the database already had users, the seed is skipped — use existing credentials or reset via DB.
