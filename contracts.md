# Backend Integration Contracts — Global Five

## Overview
Add dynamic Projects + Admin console with multi-user JWT auth, role-based access (super_admin / editor), and file uploads for project images.

## Tech
- Auth: JWT (HS256), bcrypt password hashing
- Roles: `super_admin` (manage users + projects), `editor` (manage projects only)
- File uploads stored at `/app/backend/uploads/projects/` served as `/api/uploads/...`

## Default Seeded Admin
- email: `admin@globalfivets.com`
- password: `Admin@12345`
- role: `super_admin`

## Data Models

### User
```
{ id, email, name, password_hash, role: 'super_admin'|'editor', is_active, created_at }
```

### Project
```
{ id, title, category, client, location, year, summary, description, image_url, gallery: [url], is_published, order, created_at, updated_at }
```
- category: `Water` | `Telecom` | `Wastewater` | `Mechanical` | `Electrical`

## API Endpoints (all prefixed /api)

### Auth
- POST `/auth/login`  → { email, password } → { access_token, user }
- GET `/auth/me`      (Bearer) → current user

### Users (super_admin only)
- GET    `/users`            → list
- POST   `/users`            → create { email, name, password, role }
- PATCH  `/users/{id}`       → update { name?, role?, is_active?, password? }
- DELETE `/users/{id}`       → delete

### Projects (public read, auth write)
- GET    `/projects`              → public, list all published projects (with optional ?category=)
- GET    `/projects/all`          → auth, list all (incl. unpublished)
- GET    `/projects/{id}`         → single project (public)
- POST   `/projects`              → auth, create
- PATCH  `/projects/{id}`         → auth, update
- DELETE `/projects/{id}`         → auth, delete

### Uploads
- POST `/uploads/image`  (auth, multipart) → { url } — saves to disk, returns served path

## Frontend Integration
- Replace static `projects` from `mock.js` on `/projects` page with `GET /api/projects` (use category filter param if active != All)
- Home page projects preview → `GET /api/projects?limit=3`
- Mock retained for: services, stats, team, certifications, testimonials, etc.

## Admin Console (React)
- Routes:
  - `/admin/login`        — public, email/password form
  - `/admin`              — protected, dashboard with stats
  - `/admin/projects`     — list + create/edit dialog + delete
  - `/admin/users`        — super_admin only, list + create/edit/delete
- Auth state via React Context + localStorage token
- Admin layout has separate sidebar nav (not the public Navbar/Footer)

## Seed Data
On first startup, seed:
- 1 default super_admin user (above)
- 11 real projects pulled from globalfivets.com content (Water x4, Telecom x4, Wastewater x3)
