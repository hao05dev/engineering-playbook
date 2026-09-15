# AI Context Files Specification

To ground AI assistants in reality, repositories should maintain structured Markdown context files in the root or `.agent/` directory.

---

## 1. Complete Suite of 10 AI Context Files

```
┌─────────────────────────────────────────────────────────────────┐
│                      THE 10 CONTEXT FILES                       │
├─────────────────────────────────────────────────────────────────┤
│ 1. AGENTS.md          ──> Agent behavior rules, safety guardrails│
│ 2. PROJECT_CONTEXT.md ──> Build, run, test commands & tech stack │
│ 3. DOMAIN.md          ──> Domain terms, invariants & rules       │
│ 4. REQUIREMENTS.md    ──> IEEE 29148 backlog with acceptance reqs│
│ 5. ARCHITECTURE.md    ──> C4 diagrams, container & component maps│
│ 6. DATABASE.md        ──> Relational tables, indexes & FK paths  │
│ 7. API.md             ──> OpenAPI endpoints, auth & error schema │
│ 8. UI_UX.md           ──> Tokens, screen inventory & a11y rules  │
│ 9. TRACEABILITY.md    ──> RTM connecting requirements to tests   │
│ 10. DECISIONS/        ──> Directory of MADR Architecture Records │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Standardized Templates & Specifications

### `AGENTS.md` (Agent Behavioral Guardrails)
```markdown
# Agent Operating Rules & Guardrails
- **Planning Gate**: For any multi-file refactor or new feature, create `implementation_plan.md` and obtain approval before editing code.
- **Classification**: Always tag unverified statements with `[ASSUMPTION]` and blocking questions with `[QUESTION]`.
- **Testing**: Never mark a task complete without executing automated test suites (`npm test` / `pytest`).
```

### `PROJECT_CONTEXT.md` (Repository Environment)
```markdown
# Project Context
- **Runtime**: Node.js 22 LTS / TypeScript 5.4 / VitePress 1.6
- **Package Manager**: npm (v10.8+)
- **Build Command**: `npm run docs:build`
- **Lint Command**: `npm run lint`
- **Conventions**: Strict camelCase for TS variables, kebab-case for markdown files.
```

### `DOMAIN.md` (Ubiquitous Language & Invariants)
```markdown
# Domain Invariants & Ubiquitous Language
- **InternshipApplication**: An application submitted by an eligible student to a single posting.
- **Invariant INV-01**: A student can hold at most ONE active accepted placement per academic term.
- **Invariant INV-02**: An application cannot be modified after status transitions to `ACCEPTED`.
```

### `REQUIREMENTS.md` (IEEE 29148 Backlog)
```markdown
# Requirements Backlog
| ID | Title | Priority | Status | Acceptance Criteria |
|---|---|---|---|---|
| FR-01 | Gale-Shapley Matching | P0 | DONE | Zero unallocated eligible students if quota exists |
| FR-02 | Resume PDF Upload | P1 | ACTIVE | Validates PDF format, scans virus, max size 5MB |
```

### `DATABASE.md` (Schema & Indexing Guide)
```markdown
# Database Architecture
- **Engine**: PostgreSQL 16
- **Migration Tool**: Flyway (`migrations/V*.sql`)
- **Key Tables**: `users`, `students`, `job_postings`, `internship_applications`
- **Index Rule**: All foreign keys must have corresponding B-Tree indexes.
```

---

## 3. Context Maintenance Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 CONTEXT SYNCHRONIZATION FLOW                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Feature Planned  ──> Update `REQUIREMENTS.md` & `DOMAIN.md`  │
│ 2. Schema Altered   ──> Update `DATABASE.md` with column & index│
│ 3. API Contract Mod ──> Update `API.md` with OpenAPI schemas    │
│ 4. Decisions Taken  ──> Add `DECISIONS/000X-title.md`           │
│ 5. Code & Tests Run ──> Update `TRACEABILITY.md` verified flag  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Context Files Audit & Generation</div>

```markdown
# TASK: Generate or Audit Repository AI Context Files
You are a Principal Repository Architect.

## Input Codebase / Specification:
[PASTE REPOSITORY STRUCTURE, PACKAGE.JSON, OR REPO SUMMARY]

## Instructions:
1. Audit the repository against the 10 standard AI Context Files.
2. Generate production-ready Markdown content for any missing context files:
   - `AGENTS.md` (Rules, permissions, quality gates)
   - `PROJECT_CONTEXT.md` (Tech stack, commands, conventions)
   - `DOMAIN.md` (Ubiquitous language, invariants)
   - `REQUIREMENTS.md` (IEEE 29148 backlog)
   - `DATABASE.md` (Schema, table constraints, indexes)
   - `API.md` (OpenAPI endpoints, auth, error codes)
3. Ensure all files use strict, scannable Markdown tables and diagrams.
```
</div>

---

## 5. Review Checklist

- [ ] Are all 10 context files located in standard root or docs directories?
- [ ] Are build, test, and lint commands verified in `PROJECT_CONTEXT.md`?
- [ ] Does `DOMAIN.md` document explicit business invariants?
- [ ] Are context files updated in the same Git commit as the feature code?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Google DeepMind — Agentic Coding Standards & Grounding Protocols.</li>
    <li>Docs-as-Code Best Practices & Git Repository Organization Standards.</li>
  </ul>
</div>
