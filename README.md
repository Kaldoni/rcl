# Rewaj Corporate Limited — Full Stack Website

> **Stack:** Next.js 14 (React, TypeScript) + FastAPI (Python) + SQLite (Local) / PostgreSQL (Prod)

---

## 📁 Project Structure

```
rcl-website/
├── frontend/                  # Next.js 14 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               ← Home page
│   │   │   ├── layout.tsx             ← Root layout
│   │   │   ├── contact/page.tsx       ← Contact page
│   │   │   └── admin/
│   │   │       ├── page.tsx           ← Admin login
│   │   │       └── dashboard/page.tsx ← Admin dashboard
│   │   ├── components/
│   │   │   ├── layout/Navbar.tsx
│   │   │   └── sections/
│   │   │       ├── Hero.tsx
│   │   │       ├── StatsBar.tsx
│   │   │       ├── WhatWeDo.tsx
│   │   │       ├── WhyPartner.tsx
│   │   │       └── CTAAndFooter.tsx
│   │   └── styles/globals.css
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── .env.local.example
│
└── backend/                   # FastAPI + PostgreSQL
    ├── app/
    │   ├── main.py                    ← FastAPI app entry
    │   ├── core/
    │   │   ├── config.py              ← Settings / env vars
    │   │   ├── database.py            ← Async SQLAlchemy
    │   │   └── security.py            ← JWT + password hashing
    │   ├── models/
    │   │   ├── user.py                ← Admin user model
    │   │   └── content.py             ← Contact + Service models
    │   ├── schemas/
    │   │   └── schemas.py             ← Pydantic schemas
    │   └── api/
    │       ├── auth.py                ← Login + seed admin
    │       ├── contact.py             ← Contact form submission
    │       ├── services.py            ← Services CRUD
    │       └── admin.py               ← Admin stats + messages
│   ├── seed_content.py            ← Database seeder (Admin + Blog + Projects)
│   ├── requirements.txt
│   └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+

---

### 1. Database Setup (Local)
Local development uses **SQLite**. The database file (`rewaj.db`) is automatically created when you run the seeding script.

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate      # For Windows (Command Prompt)
# OR
.\venv\Scripts\Activate.ps1 # For Windows (PowerShell)
# OR
source venv/bin/activate    # For Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env      # Windows
# OR
cp .env.example .env        # Linux/macOS
# Edit .env with your credentials

# Start the server
uvicorn app.main:app --reload --port 8000
```

The API will be live at: **http://localhost:8000**
Interactive docs at: **http://localhost:8000/docs**

#### Seed the Database (Admin + Content)
After the backend is running, open a new terminal and run:
```bash
cd backend
python seed_content.py
```
This creates the default admin: `admin@rewajcorporate.com` / `ChangeMe123!`
> ⚠️ **Note for Windows:** Ensure your `DATABASE_URL` in `.env` uses a relative path: `sqlite+aiosqlite:///./rewaj.db` for the best out-of-the-box experience.

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend will be live at: **http://localhost:3000**

---

## 🔐 Admin Panel

Access: **http://localhost:3000/admin**

Features:
- ✅ Dashboard with stats (messages, services counts)
- ✅ View and manage contact form submissions
- ✅ Mark messages as read / delete
- ✅ Reply to inquiries via email link
- ✅ JWT-based secure authentication

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, Stats, Services, Why Partner, CTA, Footer |
| `/contact` | Contact form (submits to backend API) |
| `/services` | Services listing (extend as needed) |
| `/admin` | Admin login |
| `/admin/dashboard` | Admin dashboard (protected) |

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/services` | List active services |
| GET | `/api/services/{slug}` | Get single service |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login → JWT token |
| POST | `/api/auth/seed-admin` | Create default admin (run once) |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/messages` | All contact submissions |
| PATCH | `/api/admin/messages/{id}/read` | Mark message as read |
| DELETE | `/api/admin/messages/{id}` | Delete message |
| POST | `/api/services` | Create service |
| PUT | `/api/services/{id}` | Update service |
| DELETE | `/api/services/{id}` | Delete service |

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `#FB0202` | Primary accent, CTAs |
| `--navy` | `#0F172A` | Background, navbar, footer |
| `--navy-light` | `#1E293B` | Secondary dark surfaces |
| `--slate-500` | `#64748B` | Body text |
| `--bg-light` | `#F8FAFC` | Section backgrounds |
| Font Display | Montserrat | Headings, logo |
| Font Body | Inter | Body text |
| Font UI | Inter | Buttons, labels, nav |

---

## 📦 Deployment

### Frontend → Vercel
```bash
npm install -g vercel
cd frontend && vercel
# Set NEXT_PUBLIC_API_URL to your backend URL in Vercel dashboard
```

### Backend → Railway / Render
1. Push the `backend/` folder to a GitHub repo
2. Connect to Railway or Render
3. Set all environment variables from `.env.example`
4. Deploy — it will auto-run `uvicorn app.main:app --host 0.0.0.0 --port 8000`

### Database → Supabase / Railway Postgres
- Use the connection string in `DATABASE_URL` in `.env`

---

## 🖼️ Adding Images

Place these images in `frontend/public/images/`:
- `hero-offshore.jpg` — Offshore rig / energy industry hero image
- `team-offshore.jpg` — Team photo for "Why Partner" section

---

## 📧 Email Notifications (SendGrid)

To activate email notifications when a contact form is submitted:
1. Sign up at sendgrid.com and get an API key
2. Add `SENDGRID_API_KEY` to `.env`
3. Uncomment the email lines in `backend/app/api/contact.py`

---

Built with ❤️ for Rewaj Corporate Limited
