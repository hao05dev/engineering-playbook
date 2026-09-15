# 03 — Technical Design & Architecture

The **Technical Design** phase establishes the architectural blueprints, database models, and API contracts before any code is generated. This prevents the AI agent from inventing inconsistent schemas or coupling unrelated services.

---

## Technical Design Document (TDD) Structure

```
┌─────────────────────────────────────────────────────────────┐
│                 TECHNICAL DESIGN COMPONENTS                 │
├─────────────────────────────────────────────────────────────┤
│ 1. System Architecture & Layer Diagram                      │
│ 2. Data Model (ERD, Primary Keys, Indexes, Constraints)     │
│ 3. API Contract Specifications (REST, Request/Response DTO) │
│ 4. Security & Authorization Matrix                          │
│ 5. Error Handling Envelope & HTTP Status Mappings           │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. System Architecture & Component Flow

```
┌──────────────┐       HTTPS / JSON       ┌────────────────────────┐
│  Client App  ├─────────────────────────►│  Spring Boot REST API  │
│  (Vue 3 SPA) │                          │  (Controller Layer)    │
└──────────────┘                          └───────────┬────────────┘
                                                      │ DTO Mapping
                                          ┌───────────▼────────────┐
                                          │     Service Layer      │
                                          │   (Business Logic)     │
                                          └───────────┬────────────┘
                                                      │ Entity Operations
                                          ┌───────────▼────────────┐
                                          │   Repository / JPA     │
                                          └───────────┬────────────┘
                                                      │ SQL Queries
                                          ┌───────────▼────────────┐
                                          │ PostgreSQL 16 Database │
                                          └────────────────────────┘
```

---

## 2. Data Model & Database Schema

Define tables, data types, indexes, and foreign keys explicitly:

```sql
-- Flyway / Liquibase Migration Schema
CREATE TABLE internship_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    location VARCHAR(100) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_postings_status_tags ON internship_postings (status) USING GIN (tags);
```

---

## 3. API Contract Specification

Define standard RESTful contracts with explicit payload shapes:

### `POST /api/v1/internships/{id}/apply`

#### Request Payload:
```json
{
  "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "resumeUrl": "https://storage.example.com/resumes/std-8821.pdf",
  "coverLetter": "Excited to contribute to the cloud backend team."
}
```

#### Response Payload (`201 Created`):
```json
{
  "success": true,
  "data": {
    "applicationId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "status": "SUBMITTED",
    "appliedAt": "2026-09-15T11:00:00Z"
  }
}
```

#### Standard Error Response Envelope (`400 Bad Request`):
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_APPLICATION",
    "message": "Student has already applied to this posting.",
    "timestamp": "2026-09-15T11:00:00Z"
  }
}
```

---

## 4. Security & Authorization Matrix

| Endpoint | Method | Role Required | Policy |
| :--- | :--- | :--- | :--- |
| `/api/v1/internships` | `GET` | `STUDENT`, `ADVISOR`, `COMPANY` | Public search for open postings |
| `/api/v1/internships` | `POST` | `COMPANY_ADMIN` | Only approved companies can publish |
| `/api/v1/internships/{id}/apply` | `POST` | `STUDENT` | Must match authenticated student token |
| `/api/v1/applications/{id}/status`| `PATCH` | `ADVISOR`, `COMPANY_ADMIN` | State machine transitions |

> [!IMPORTANT]
> **Lock the Contracts**
> Once the Technical Design is approved (Quality Gate 2), code generation prompts must link directly to these API and Schema definitions.
