# StudyMachan Backend Implementation Plan

**Based on:** FRONTEND_API_DOCUMENTATION.md v1.0  
**Target:** FastAPI backend replacing external backend  
**Location:** `StudyMachan-App/backend/`

---

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── auth.py           # POST /auth/signup, GET /profiles/me, POST /auth/social-login
│   │       ├── tutors.py         # GET /tutors, GET /tutors/:id, GET /tutors/:id/availability
│   │       ├── students.py       # GET /students/:id/saved-tutors, POST/DELETE saved tutors
│   │       ├── sessions.py       # POST /sessions, GET /sessions, PUT /sessions/:id
│   │       ├── dashboard.py      # GET /tutors/:id/dashboard, earnings, payouts
│   │       ├── verification.py   # POST /tutors/:id/verification
│   │       ├── bank_accounts.py  # CRUD /tutors/:id/bank-accounts
│   │       └── health.py         # GET /health, GET /version
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py             # Settings from env vars
│   │   ├── security.py           # JWT validation (Supabase JWKS)
│   │   ├── database.py           # SQLAlchemy engine, session
│   │   ├── dependencies.py       # FastAPI dependencies (get_current_user, etc.)
│   │   └── exceptions.py         # Custom exceptions & handlers
│   ├── models/
│   │   ├── __init__.py
│   │   ├── student.py            # Student SQLAlchemy model
│   │   ├── tutor.py              # Tutor SQLAlchemy model
│   │   ├── session.py            # Session model
│   │   ├── bank_account.py       # BankAccount model
│   │   ├── verification_doc.py   # VerificationDocument model
│   │   └── saved_tutor.py        # SavedTutor model (many-to-many)
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py               # SignupRequest, SignupResponse, ProfileResponse
│   │   ├── tutor.py              # TutorListResponse, TutorDetail, TutorFilters
│   │   ├── student.py            # SavedTutorResponse
│   │   ├── session.py            # SessionCreate, SessionResponse, SessionUpdate
│   │   ├── dashboard.py          # DashboardStats, EarningsResponse, PayoutResponse
│   │   ├── verification.py       # VerificationSubmit, VerificationResponse
│   │   ├── bank_account.py       # BankAccountCreate, BankAccountResponse
│   │   └── common.py             # Pagination, ErrorResponse, HealthResponse
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py       # Signup logic, profile creation
│   │   ├── tutor_service.py      # Tutor listing, filtering, availability
│   │   ├── session_service.py    # Session booking, management
│   │   ├── student_service.py    # Saved tutors
│   │   └── tutor_dashboard_service.py  # Dashboard, earnings, payouts
│   └── main.py                   # FastAPI app, CORS, middleware, routers
├── migrations/                   # Alembic migrations
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_tutors.py
│   ├── test_sessions.py
│   └── test_dashboard.py
├── requirements.txt
├── requirements-dev.txt
├── Dockerfile
├── .env.example
├── alembic.ini
└── README.md
```

---

## Phase 1: Core Auth (Blocker for Everything)

### 1.1 Database Models (models/student.py, models/tutor.py)
- **Student** table: id, auth_user_id (unique), full_name, username (unique), email, date_of_birth, gender, address, avatar_url, created_at, updated_at
- **Tutor** table: all student fields + bio, hourly_rate, subjects (ARRAY), education, is_verified, rating, review_count, created_at, updated_at
- Indexes on auth_user_id, username for both tables
- Updated_at triggers

### 1.2 Core Configuration (core/config.py)
- Pydantic Settings with all env vars from documentation
- SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWKS_URL
- DATABASE_URL, BACKEND_PORT, FRONTEND_URL, ENVIRONMENT

### 1.3 JWT Validation (core/security.py)
- `get_jwks()` - cached fetch from Supabase JWKS endpoint
- `verify_supabase_token(token)` - validates RS256, checks issuer, audience, expiry
- Returns payload with `sub` (user_id), email, role
- Raises HTTPException 401 on failure

### 1.4 Dependencies (core/dependencies.py)
- `get_current_user_id()` - extracts and validates JWT, returns user_id (sub)
- `get_current_user_profile()` - uses user_id to fetch profile from DB

### 1.5 Auth Schemas (schemas/auth.py)
- `SignupRequest`: email, password, role, full_name, username, date_of_birth, gender, address
- `SignupResponse`: message, user_id, email, needs_email_confirmation
- `ProfileResponse`: unified UserProfile shape (id, role, full_name, username, email, date_of_birth, gender, address, avatar_url)
- `SocialLoginRequest`: provider, access_token
- `ErrorResponse`: code, message

### 1.6 Auth Service (services/auth_service.py)
- `create_profile(user_id, signup_data)` - creates student OR tutor row based on role
- Checks username uniqueness across BOTH tables
- Normalizes email to lowercase
- Returns needs_email_confirmation (check Supabase Admin API or trust JWT)

### 1.7 Auth Endpoints (api/v1/auth.py)
- `POST /auth/signup` - validates request, calls service, returns 201/400/409/500
- `GET /profiles/me` - uses get_current_user_profile dependency, returns ProfileResponse
- `POST /auth/social-login` - placeholder for future (returns 501)

### 1.8 Alembic Setup
- `alembic init migrations`
- Initial migration with all tables
- `alembic upgrade head`

---

## Phase 2: Student Features

### 2.1 Tutor Models & Schemas
- **TutorListItem** schema matching frontend response (id, name, badge, price, specialty, education, rating, reviews, sessions, tags, image, verified, district, is_online)
- **TutorFilters** schema (subject, district, level, max_price, search, verified_only, top_rated, page, limit)
- **TutorListResponse** with tutors[], total, page, has_more

### 2.2 Tutor Service (services/tutor_service.py)
- `list_tutors(filters)` - builds dynamic query with all filter combinations
  - ILIKE for search on name/specialty
  - Array contains for subjects
  - Rating >= 4.8 for top_rated
  - Pagination with limit/offset
- `get_tutor_by_id(tutor_id)` - detailed tutor profile
- `get_tutor_availability(tutor_id)` - returns dates/times/modes (placeholder for now)

### 2.3 Tutor Endpoints (api/v1/tutors.py)
- `GET /tutors` - query params = TutorFilters, returns TutorListResponse
- `GET /tutors/{tutor_id}` - returns TutorDetail
- `GET /tutors/{tutor_id}/availability` - returns availability slots

### 2.4 Session Models & Schemas
- **Session** table: id, student_id, tutor_id, subject, date, start_time, end_time, mode (online/physical), status (pending/confirmed/completed/cancelled), price, created_at, updated_at
- **SessionCreate**: tutor_id, subject, date, start_time, end_time, mode
- **SessionResponse**: all fields + student_name, tutor_name
- **SessionUpdate**: status (confirm, complete, cancel)

### 2.5 Session Service (services/session_service.py)
- `create_session(student_id, data)` - validates tutor exists, creates pending session
- `get_student_sessions(student_id, upcoming_only)` - with pagination
- `get_tutor_sessions(tutor_id, status_filter)` - with pagination
- `update_session_status(session_id, tutor_id, new_status)` - validates tutor owns session, transition rules

### 2.6 Session Endpoints (api/v1/sessions.py)
- `POST /sessions` - create booking (student)
- `GET /sessions` - query params: student_id, tutor_id, upcoming, status, page, limit
- `PUT /sessions/{session_id}` - update status (tutor)

### 2.7 Saved Tutors (models/saved_tutor.py, services/student_service.py, api/v1/students.py)
- **SavedTutor** table: student_id, tutor_id, created_at (composite PK)
- `GET /students/{student_id}/saved-tutors` - list with tutor details
- `POST /students/{student_id}/saved-tutors/{tutor_id}` - save
- `DELETE /students/{student_id}/saved-tutors/{tutor_id}` - unsave

---

## Phase 3: Tutor Features

### 3.1 Dashboard Service & Endpoints (services/tutor_dashboard_service.py, api/v1/dashboard.py)
- `GET /tutors/{tutor_id}/dashboard` - stats: total_students, total_sessions, upcoming_sessions, total_earnings, rating
- `GET /tutors/{tutor_id}/earnings` - summary: this_month, last_month, total, pending_payout
- `GET /tutors/{tutor_id}/payouts` - list: id, amount, status, date, bank_account

### 3.2 Bank Accounts (models/bank_account.py, api/v1/bank_accounts.py)
- **BankAccount** table: id, tutor_id, bank_name, account_number, account_name, branch, is_default, created_at
- CRUD endpoints: GET, POST, PUT, DELETE `/tutors/{tutor_id}/bank-accounts`

### 3.3 Verification (models/verification_doc.py, api/v1/verification.py)
- **VerificationDocument** table: id, tutor_id, document_type (nic/certificate/other), file_url, status (pending/approved/rejected), submitted_at, reviewed_at
- `POST /tutors/{tutor_id}/verification` - submit docs (multipart/form-data)
- Returns verification status

### 3.4 My Students (api/v1/tutors.py or new)
- `GET /tutors/{tutor_id}/students` - unique students who booked sessions

---

## Phase 4: Advanced (Future)

### 4.1 Social Login (api/v1/auth.py)
- `POST /auth/social-login` - verify Supabase OAuth token, create/sync profile, return profile + is_new_user

### 4.2 Password Reset (api/v1/auth.py)
- `POST /auth/password-reset` - trigger Supabase password reset email via Admin API

### 4.3 WebSocket (new module)
- Real-time messages between student/tutor
- Connection auth via token
- Channels per session

### 4.4 Push Notifications
- Store Expo push tokens on user profile
- Send via Expo push API on session events

---

## Key Implementation Details

### Database
- PostgreSQL with UUID primary keys
- SQLAlchemy 2.0 async (asyncpg)
- Alembic for migrations
- Connection pooling

### Security
- Supabase JWT validation on every protected endpoint
- CORS configured for Expo origins (localhost:8081, exp://, file://)
- Rate limiting on auth endpoints (slowapi)
- Request logging middleware

### Error Handling
- Custom exception classes
- Global exception handler returning consistent ErrorResponse
- Validation errors from Pydantic → 400 with details

### Testing
- pytest with async support
- Test database (SQLite or test Postgres)
- Fixtures for authenticated client
- Coverage target: 80%+

### Health & Monitoring
- `GET /health` - checks DB connection, returns 200/503
- `GET /version` - returns API version, git commit
- Structured logging (JSON)

---

## Environment Variables (.env.example)

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/studymachan

# App
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:8081
ENVIRONMENT=development
API_VERSION=1.0.0

# Optional: Rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60
```

---

## Migration Strategy (from docs)

1. Create `backend/` in this repo
2. Run old backend on :8000, new on :8001
3. Switch frontend via `.env`: `EXPO_PUBLIC_BACKEND_URL=http://localhost:8001`
4. Test all flows
5. Migrate data if needed
6. Deploy new backend
7. Update production env

---

## Implementation Order

| Order | Component | Files |
|-------|-----------|-------|
| 1 | Project setup, config, database | requirements.txt, config.py, database.py, main.py |
| 2 | Models (Student, Tutor) | models/student.py, models/tutor.py |
| 3 | Auth: JWT validation, dependencies | security.py, dependencies.py |
| 4 | Auth: schemas, service, endpoints | schemas/auth.py, services/auth_service.py, api/v1/auth.py |
| 5 | Alembic init + first migration | alembic.ini, migrations/ |
| 6 | Tutor listing + filters | schemas/tutor.py, services/tutor_service.py, api/v1/tutors.py |
| 7 | Sessions | models/session.py, schemas/session.py, services/session_service.py, api/v1/sessions.py |
| 8 | Saved tutors | models/saved_tutor.py, services/student_service.py, api/v1/students.py |
| 9 | Tutor dashboard, earnings, payouts | services/tutor_dashboard_service.py, api/v1/dashboard.py |
| 10 | Bank accounts | models/bank_account.py, api/v1/bank_accounts.py |
| 11 | Verification | models/verification_doc.py, api/v1/verification.py |
| 12 | Health, version, CORS, logging | api/v1/health.py, main.py middleware |
| 13 | Tests | tests/ |
| 14 | Dockerfile, README | Dockerfile, README.md |

---

## Risk Notes

1. **Username uniqueness across tables** - requires checking both students and tutors tables on signup; use a single query with UNION or two separate checks
2. **Supabase JWT validation** - JWKS caching critical for performance; handle key rotation
3. **Email normalization** - frontend sends lowercase, but backend must enforce at DB level (CITEXT or lower() in queries)
4. **Date handling** - frontend sends YYYY-MM-DD; store as DATE, return as string
5. **Price storage** - frontend shows "LKR 900"; store as integer (900), not cents
6. **Tutor availability** - frontend expects dates/times/modes; design flexible schema for recurring/one-time slots
7. **Session status transitions** - enforce: pending → confirmed → completed/cancelled; tutor can only confirm/complete/cancel
8. **CORS for Expo** - must allow exp://, file://, and localhost origins

---

## Files NOT to Modify in Frontend (Contract)

- `supabase/authService.ts` - All backend calls
- `constants/api/api.ts` - Backend URL resolution
- `hooks/useProfile.ts` - Profile fetching
- `lib/storage/roleStorage.ts` - Local role preference

Backend MUST match these exact request/response shapes.