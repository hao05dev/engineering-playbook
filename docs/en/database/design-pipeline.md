# The Database Design Pipeline

A common database failure mode occurs when developers immediately jump from a user story into writing `CREATE TABLE` scripts. The **Database Design Pipeline** enforces a systematic progression from conceptual domain reality to optimized physical SQL.

---

## 1. The 6-Stage Transformation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 THE 6-STAGE DATABASE PIPELINE               │
├─────────────────────────────────────────────────────────────┤
│ 1. Business Domain ──► Identify real-world nouns & policies │
│ 2. Domain Model ──► Classify Entities, Value Objects & Roots│
│ 3. Conceptual Model (CDM) ──► Map high-level associations   │
│ 4. Logical Model (LDM) ──► Normalize, define PKs, FKs & N:M │
│ 5. Physical Model (PDM) ──► Target engine types & indexes   │
│ 6. Production SQL (DDL) ──► Flyway / Liquibase migrations   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Step-by-Step Walkthrough: Internship Management

### Stage 1 & 2: Domain & Conceptual Model (CDM)
- *Entities*: `Student`, `FacultyAdvisor`, `Company`, `InternshipPosting`, `Application`.
- *Relationships*:
  - A `Student` submits many `Applications` (1:N).
  - A `Company` publishes many `InternshipPostings` (1:N).
  - An `Application` references exactly one `Student` and one `InternshipPosting` (N:1).

### Stage 4: Logical Data Model (LDM)
- Resolve Many-to-Many relationships via Join/Bridge entities.
- Enforce Third Normal Form (3NF).
- Define Candidate Keys, Primary Keys (`PK`), and Foreign Keys (`FK`).

### Stage 5 & 6: Physical Model & Production SQL (PostgreSQL DDL)

```sql
-- V1__create_internship_schema.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    gpa NUMERIC(3, 2) NOT NULL CHECK (gpa >= 0.00 AND gpa <= 4.00),
    earned_credits INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE internship_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    total_quota INT NOT NULL CHECK (total_quota > 0),
    remaining_quota INT NOT NULL CHECK (remaining_quota >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_quota_integrity CHECK (remaining_quota <= total_quota)
);

CREATE TABLE internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    posting_id UUID NOT NULL REFERENCES internship_postings(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    resume_url TEXT NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_posting UNIQUE (student_id, posting_id)
);

-- Indexing Foreign Keys for JOIN performance
CREATE INDEX idx_apps_student_id ON internship_applications(student_id);
CREATE INDEX idx_apps_posting_id ON internship_applications(posting_id);
CREATE INDEX idx_apps_status ON internship_applications(status);
```

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Systematic Database Design Pipeline</div>

```markdown
# TASK: Complete Database Design Pipeline (Domain to Physical SQL)
You are a Principal Database Architect & Data Modeler.

## Input Context:
Domain Requirements: [DESCRIBE DOMAIN ENTITIES, DATA RELATIONSHIPS, AND WORKFLOWS]
Target DBMS: [e.g. PostgreSQL 16 / MySQL 8.0]

## Instructions:
1. Stage 1 & 2: Identify Entities, Value Objects, and Domain Aggregates.
2. Stage 3: Produce a Conceptual Entity Relationship diagram (Mermaid ERD).
3. Stage 4: Develop a normalized Logical Data Model (3NF) specifying PKs, FKs, and Nullability.
4. Stage 5 & 6: Generate production-ready DDL SQL scripts including UUIDs, check constraints, foreign keys with ON DELETE policies, and explicit B-tree indexes.
5. Format findings with [CONFIRMED], [ASSUMPTION], [PROPOSAL], and [QUESTION].
```
</div>

---

## 4. Review Checklist

- [ ] Has the design progressed through Conceptual ➔ Logical ➔ Physical stages?
- [ ] Are all foreign key columns backed by explicit B-tree indexes?
- [ ] Are numeric monetary or academic metrics stored using exact `NUMERIC`/`DECIMAL` types?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Date, C.J. (2003). <em>An Introduction to Database Systems</em>. Addison-Wesley.</li>
  </ul>
</div>
