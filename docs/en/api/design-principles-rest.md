# REST Design & Resource Modeling

REST (Representational State Transfer) is a resource-oriented architectural style for distributed hypermedia systems. This guide establishes the standard rules for resource naming, hierarchical URI paths, and HTTP verb mappings.

---

## 1. Resource Modeling & URI Naming Rules

```
┌─────────────────────────────────────────────────────────────┐
│                 REST URI DESIGN CONVENTIONS                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Use Plural Nouns for Collections: /api/v1/students       │
│ 2. Use Path Identifiers for Single Resources: /students/{id}│
│ 3. Use Kebab-Case for URIs: /internship-postings            │
│ 4. Limit Sub-Resource Nesting to Maximum 2 Levels           │
│ 5. Use Query Parameters for Filtering, Sorting, Pagination  │
└─────────────────────────────────────────────────────────────┘
```

### Good vs. Bad URI Examples:
- ❌ `POST /api/v1/createStudent` ➔ ✅ `POST /api/v1/students`
- ❌ `GET /api/v1/getOpenJobs` ➔ ✅ `GET /api/v1/internship-postings?status=OPEN`
- ❌ `POST /api/v1/students/12/applications/45/evaluations/99/comments` (Too deep) ➔ ✅ `POST /api/v1/evaluations/99/comments`

---

## 2. HTTP Verb Semantics Matrix

| Verb | Action | Idempotent? | Safe (Read-Only)? | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Retrieve resource or collection | ✅ Yes | ✅ Yes | `200 OK` |
| **POST**| Create a new resource / trigger RPC | ❌ No | ❌ No | `201 Created` / `200 OK` |
| **PUT** | Replace entire existing resource | ✅ Yes | ❌ No | `200 OK` |
| **PATCH**| Partially update specific fields | ⚠️ Contextual | ❌ No | `200 OK` |
| **DELETE**| Remove resource | ✅ Yes | ❌ No | `204 No Content` |

---

## 3. Practical Example: RESTful Internship API Matrix

```
┌────────┬──────────────────────────────────────────┬─────────────────────────────┐
│ Method │ URI Path                                 │ Action / Description        │
├────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ GET    │ /api/v1/internship-postings              │ List & filter postings      │
│ POST   │ /api/v1/internship-postings              │ Create new posting          │
│ GET    │ /api/v1/internship-postings/{id}         │ Get single posting details  │
│ PATCH  │ /api/v1/internship-postings/{id}         │ Update quota or deadline    │
│ DELETE │ /api/v1/internship-postings/{id}         │ Soft-delete/close posting   │
│ POST   │ /api/v1/internships/{id}/applications    │ Submit application (Nested) │
│ GET    │ /api/v1/applications/{id}                │ Get application status      │
│ PATCH  │ /api/v1/applications/{id}/status         │ Transition review state     │
└────────┴──────────────────────────────────────────┴─────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: RESTful API Resource Modeling</div>

```markdown
# TASK: RESTful Resource Modeling & Endpoint Design
You are a Principal API Architect certified in OpenAPI and REST design.

## Input Domain Model / Feature:
[DESCRIBE DOMAIN ENTITIES AND USER INTERACTIONS]

## Instructions:
1. Formulate a complete RESTful URI hierarchy using plural nouns, kebab-case, and max 2 levels of nesting.
2. Map each operation to the correct HTTP verb (GET, POST, PUT, PATCH, DELETE) with matching HTTP success status codes (200, 201, 204).
3. Specify Query Parameters for filtering, sorting (`?sort=appliedAt,desc`), and pagination (`?page=1&size=20`).
4. Output an API Endpoint Matrix table with Method, Path, Summary, Request Body, and Response Status.
```
</div>

---

## 5. Review Checklist

- [ ] Are all URI paths constructed using plural nouns without action verbs in the path?
- [ ] Is sub-resource nesting limited to a maximum depth of 2 levels?
- [ ] Are HTTP verbs used according to strict RFC semantics (e.g. GET is safe and idempotent)?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Fielding, Roy (2000). <em>Architectural Styles and the Design of Network-based Software Architectures</em>.</li>
    <li>OpenAPI Specification v3.1.0 — Paths and Operations.</li>
  </ul>
</div>
