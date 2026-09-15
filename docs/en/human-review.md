# 09 — Human Review & Confirm

**Human Review & Confirm** is the ultimate checkpoint before code enters version control. While AI handles mechanical implementation and automated testing, the human software engineer is the sole authority on business correctness, security, and long-term maintainability.

---

## The Zero-Trust Review Philosophy

```
┌─────────────────────────────────────────────────────────────┐
│                 ZERO-TRUST REVIEW PROTOCOL                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Never assume passing tests = 100% correct logic         │
│ 2. Scrutinize boundaries, authorizations, and transactions  │
│ 3. Check for omitted edge cases or excessive complexity     │
│ 4. Issue explicit Approval or structured Rejection feedback │
└─────────────────────────────────────────────────────────────┘
```

---

## The 4-Dimension Human Review Checklist

### 1. Business Logic & Invariants
- Does the code precisely match the Acceptance Criteria in the PRD?
- Are boundary conditions (e.g. 0 items, negative values, leap years) correctly handled?
- Are transactions scoped properly so failed operations rollback cleanly?

### 2. Security & Data Isolation
- Is user authentication and role authorization enforced at the service or endpoint level?
- Are inputs sanitized against SQL injection, NoSQL injection, and XSS?
- Is sensitive data (passwords, tokens, PII) masked or excluded from application logs?

### 3. Performance & Scalability
- Are there N+1 query patterns in ORM/JPA queries?
- Are necessary database indexes present for newly introduced query filters?
- Are network calls and external API timeouts configured defensively?

### 4. Code Quality & Clean Architecture
- Does the code follow existing project conventions and naming standards?
- Are functions concise, pure where possible, and single-purpose?
- Are error messages informative without leaking internal implementation details?

---

## Handling Rejections: Constructive Feedback Loop

If the review uncovers issues, do NOT fix the code blindly by hand if it requires significant rework. Instead, issue a structured rejection prompt to the AI agent:

```markdown
# HUMAN REVIEW FEEDBACK: ApplicationWorkflowService

Rejection Reason: Missing Authorization Check & Potential N+1 Query.

Please apply the following corrections:
1. In `ApplicationWorkflowService.java`: Ensure only the assigned Faculty Advisor or an Admin can trigger the `FACULTY_APPROVED` transition.
2. In `InternshipApplicationRepository.java`: Add `@EntityGraph` or `JOIN FETCH` to eagerly load the `Student` relationship, preventing N+1 queries when fetching applications.
3. Update `ApplicationWorkflowServiceTest.java` with a test verifying unauthorized advisor access is rejected with `AccessDeniedException`.
```

> [!IMPORTANT]
> **Human Approval is Required**
> Never bypass human review. Passing automated tests is necessary, but only human judgment guarantees production readiness.
