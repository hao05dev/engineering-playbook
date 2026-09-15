# 08 — API Engineering (OpenAPI)

APIs are the formal contracts through which frontend interfaces, mobile clients, and third-party microservices interact with backend business logic. **API Engineering** establishes standard protocols for REST resource design, HTTP semantics, idempotent requests, security, and OpenAPI (OAS 3.1) documentation.

---

## Why API Engineering Matters for AI Agents

Without standardized API engineering, AI agents invent chaotic URLs (e.g. `POST /getUserDetailsById`, `GET /deleteStudent`), arbitrary JSON envelopes, and inconsistent HTTP status codes (e.g. returning `200 OK` for server crashes).

```
┌─────────────────────────────────────────────────────────────┐
│                 API ENGINEERING DISCIPLINE                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Resource Modeling ──► Nouns, plural collections, nesting │
│ 2. HTTP Semantics ──► Verbs (GET, POST, PUT, PATCH, DELETE) │
│ 3. Standard Error Envelope ──► RFC 7807 Problem Details     │
│ 4. Resilience ──► Idempotency-Key, Pagination, Rate Limits  │
│ 5. Specification ──► OpenAPI 3.1 Contract as Source of Truth│
└─────────────────────────────────────────────────────────────┘
```

---

## Key Modules in this Section

1. [REST Design & Resource Modeling](./design-principles-rest): Resource naming, hierarchical paths, and HTTP verb mappings.
2. [HTTP Contracts & Error Models](./http-contracts-errors): Correct status codes and RFC 7807 Problem Details.
3. [Validation, Auth & Security](./validation-auth-security): Input validation, JWT/OAuth2, and Rate Limiting.
4. [Pagination, Filtering, Sorting & Idempotency](./pagination-filtering-idempotency): Cursor vs Offset pagination, and the `Idempotency-Key` header.
5. [OpenAPI (OAS 3.1) & Review Checklist](./openapi-review): OpenAPI specification generation and API review checklists.

---

## The 4 Invariant API Rules

1. **Nouns for Resources, Not Verbs**: Use `POST /api/v1/applications`, never `POST /api/v1/submitApplication`.
2. **Correct HTTP Status Codes**: Never return `200 OK` when an error occurs. Use `400`, `401`, `403`, `404`, `409`, `422`, or `500`.
3. **Strict Validation Envelopes**: Return machine-readable error codes and specific field validation arrays.
4. **Idempotency on Mutating Actions**: Support `Idempotency-Key` headers for financial, application, or quota booking endpoints.

<div class="ref-box">
  <strong>Primary Official References:</strong>
  <ul>
    <li><a href="https://spec.openapis.org/oas/v3.1.0" target="_blank" rel="noopener">OpenAPI Specification v3.1.0</a></li>
    <li><a href="https://datatracker.ietf.org/doc/html/rfc7807" target="_blank" rel="noopener">IETF RFC 7807 — Problem Details for HTTP APIs</a></li>
    <li>Fielding, Roy (2000). <em>Architectural Styles and the Design of Network-based Software Architectures (REST)</em>. UC Irvine.</li>
  </ul>
</div>
