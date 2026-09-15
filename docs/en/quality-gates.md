# Quality Gates & Guardrails

Quality Gates are formal checkpoint criteria that must be satisfied before transitioning software artifacts from one phase of the AI-SDLC to the next. They prevent unverified assumptions and defective code from propagating downstream.

---

## The 6 AI-SDLC Quality Gates

```
  [PRD & Scope]
        │
     [ GATE 1: Requirements Clarity ]
        ▼
  [Technical Design]
        │
     [ GATE 2: Architecture & Contract Lock ]
        ▼
  [Implementation Plan]
        │
     [ GATE 3: Plan Feasibility Approval ]
        ▼
  [AI Code Generation]
        │
     [ GATE 4: Automated Verification (Tests & Lints) ]
        ▼
  [Human Review]
        │
     [ GATE 5: Security & Logic Audit ]
        ▼
  [CI/CD & Merge]
        │
     [ GATE 6: Deployment & Regression Pass ]
```

---

## Gate 1: Requirements Clarity Gate
*Transition: Domain Exploration ➔ Product Requirements (PRD)*

- [ ] Problem statement and target user persona clearly defined.
- [ ] User stories include explicit **Acceptance Criteria (Given-When-Then)**.
- [ ] Explicitly defined Out-of-Scope boundaries to prevent scope creep.
- [ ] Edge cases (concurrency, network drops, invalid states) enumerated.

---

## Gate 2: Architecture & Contract Lock Gate
*Transition: Technical Design ➔ Task Breakdown*

- [ ] Database schema, table relationships, and index definitions finalized.
- [ ] API endpoints defined with request/response schemas, error codes, and status codes.
- [ ] Authentication, authorization, and tenant isolation policies documented.
- [ ] Technology stack and third-party dependencies approved without version conflicts.

---

## Gate 3: Plan Feasibility Approval Gate
*Transition: Implementation Planning ➔ AI Code Generation*

- [ ] Granular list of modified, created, or deleted files identified.
- [ ] Exact dependencies between tasks sequenced (e.g., migration before entity before service before controller).
- [ ] Test strategy outlined (which unit/integration tests will verify the change).
- [ ] Human developer approves the proposed implementation plan.

---

## Gate 4: Automated Verification Gate
*Transition: AI Code Generation ➔ Human Review*

- [ ] **Compilation**: Code compiles cleanly with zero syntax or type errors.
- [ ] **Linters**: Zero formatting or static analysis violations (ESLint, Prettier, Checkstyle, SonarQube).
- [ ] **Tests**: 100% of new and existing unit tests pass without skipping.
- [ ] **Coverage**: Minimum test coverage threshold met for newly added business logic.

---

## Gate 5: Security & Logic Audit Gate
*Transition: Human Review ➔ Commit & PR*

- [ ] **Zero-Trust Review**: Human reviewer verifies business logic and data consistency.
- [ ] **Security Checklist**:
  - No SQL injection, command injection, or XSS vulnerabilities.
  - Role-based authorization checked on every private endpoint.
  - No hardcoded API keys, passwords, or secrets.
- [ ] **Resource Management**: Database connections, file handles, and stream resources properly closed.

---

## Gate 6: CI/CD & Deployment Gate
*Transition: PR ➔ Main Branch / Staging*

- [ ] Automated CI pipeline succeeds (build, test, lint, containerization).
- [ ] Integration tests pass against staging database or test containers.
- [ ] Documentation updated to reflect new APIs or configuration parameters.
- [ ] PR approved by at least one senior peer reviewer.

> [!CAUTION]
> **Never Bypass Quality Gates**
> Skipping a Quality Gate to meet a deadline creates compounding technical debt. If an AI agent fails to pass Gate 4 (Automated Tests), do not proceed to Gate 5; reject the code and prompt the agent to diagnose and fix the failure.
