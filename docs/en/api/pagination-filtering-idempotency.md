# Pagination, Filtering, Sorting & Idempotency

Production APIs must handle large datasets efficiently and withstand network timeouts without corrupting data. This guide establishes protocols for **Pagination Strategies**, **Filtering/Sorting Syntax**, and the **`Idempotency-Key` Protocol**.

---

## 1. Pagination Strategies: Offset vs. Cursor

```
┌─────────────────────────────────────────────────────────────┐
│                 PAGINATION STRATEGIES COMPARISON            │
├─────────────────────────────────────────────────────────────┤
│ 1. Offset Pagination (?page=1&size=20)                      │
│    - Simple to implement (SQL: OFFSET 20 LIMIT 20).         │
│    - Suffers from performance degradation on deep offsets.   │
│    - Vulnerable to phantom skips when rows are inserted.    │
│                                                             │
│ 2. Keyset / Cursor Pagination (?cursor=aWQ9OTk&limit=20)    │
│    - Ultra-fast: Uses indexed WHERE id > :cursor LIMIT 20.  │
│    - Zero degradation on billion-row tables.                │
│    - Best for: Infinite scroll mobile feeds and large scale.│
└─────────────────────────────────────────────────────────────┘
```

### Standard Offset Pagination Response Envelope:
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "size": 20,
    "totalItems": 342,
    "totalPages": 18,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

---

## 2. Filtering, Sorting & Full-Text Search Syntax

- **Field Filtering**: `GET /api/v1/internship-postings?status=OPEN&location=Hanoi`
- **Multi-Column Sorting**: `GET /api/v1/internship-postings?sort=appliedAt,desc&sort=gpa,asc`
- **Full-Text Search**: `GET /api/v1/internship-postings?q=java+backend`

---

## 3. The `Idempotency-Key` Protocol

When an HTTP client executes a mutating request (e.g. `POST /api/v1/applications`) and encounters a network timeout, it does not know if the backend succeeded. Re-sending blindly causes duplicate submissions.

### The Idempotent Execution Flow:

```
Client                             API Gateway / Cache                   Database
  │                                         │                               │
  │── POST /applications ──────────────────►│                               │
  │   Idempotency-Key: "req-9982-uuid"      │── Key exists in Redis?        │
  │                                         │   [No: First time]            │
  │                                         │── Process & Save ────────────►│
  │                                         │◄- - Persisted - - - - - - - - │
  │                                         │── Cache response in Redis     │
  │◄- - 201 Created (Receipt) - - - - - - - │                               │
  │                                         │                               │
  │── [NETWORK TIMEOUT / RETRY] ───────────►│                               │
  │   Idempotency-Key: "req-9982-uuid"      │── Key exists in Redis?        │
  │                                         │   [Yes: Return cached result] │
  │◄- - 201 Created (Cached Receipt) - - - -│                               │
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Pagination, Filtering & Idempotency Implementation</div>

```markdown
# TASK: Implement Pagination, Dynamic Filtering & Idempotency Handler
You are an expert Backend API Architect.

## Input Context:
Target Entity/API: [DESCRIBE THE RESOURCE AND SEARCH WORKFLOW]

## Instructions:
1. Implement a Spring Boot or Node.js repository query supporting dynamic filtering (JPA Specifications / Knex query builder).
2. Format the response with a standard Pagination Metadata envelope.
3. Implement an Idempotency interceptor/middleware utilizing Redis to store `Idempotency-Key` hashes with a 24-hour TTL.
4. Output complete, production-ready source code with unit test assertions.
```
</div>

---

## 5. Review Checklist

- [ ] Does every collection endpoint enforce a maximum page size cap (e.g. max `size=100`)?
- [ ] Are sorting columns validated against an allowlist to prevent SQL injection?
- [ ] Do critical financial or quota-mutating endpoints enforce `Idempotency-Key` validation?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>IETF Draft — The Idempotency-Key HTTP Header Field: <a href="https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/" target="_blank" rel="noopener">IETF HTTPAPI Working Group</a></li>
  </ul>
</div>
