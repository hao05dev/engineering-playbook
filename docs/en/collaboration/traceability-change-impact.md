# Traceability & Change Impact Analysis

In long-lived software systems, requirements continually evolve. Without bidirectional traceability, modifications cause silent regressions, orphaned code paths, and broken test suites.

---

## 1. Bidirectional Traceability Chain

Bidirectional traceability connects every business objective down to concrete code symbols and test cases:

```
┌─────────────────────────────────────────────────────────────────┐
│                 BIDIRECTIONAL TRACEABILITY CHAIN                │
├─────────────────────────────────────────────────────────────────┤
│ Business Need  ──> BRD-04: Automated Placement Matching         │
│       │                                                         │
│ User Story     ──> US-12: As an advisor, I want auto-matching... │
│       │                                                         │
│ IEEE 29148 Req ──> FR-01: Stable Marriage Placement Algorithm   │
│       │                                                         │
│ Architecture   ──> C4 Comp: `PlacementSolverService`            │
│       │                                                         │
│ Source Code    ──> `src/services/placement_solver.ts:L45`       │
│       │                                                         │
│ Test Suite     ──> `tests/unit/placement_solver.spec.ts:L12`    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Requirements Traceability Matrix (RTM)

| Req ID | Description | Architecture Component | DB Tables Affected | API Endpoints | Test Verification |
|---|---|---|---|---|---|
| **FR-01** | Gale-Shapley Matching | `PlacementSolverService` | `placements`, `match_runs` | `POST /api/v1/placements/solve` | `placement_solver.spec.ts` |
| **FR-02** | Application Submission | `ApplicationController` | `applications` | `POST /api/v1/applications` | `application_e2e.spec.ts` |
| **FR-03** | Faculty Report Review | `ReportReviewDrawer` | `internship_reports` | `PATCH /api/v1/reports/{id}` | `report_review.spec.ts` |

---

## 3. Change Impact Analysis Protocol (5-Step Cascade)

When a business requirement or database schema changes, execute the following 5-step cascade analysis:

```
┌─────────────────────────────────────────────────────────────────┐
│                 CHANGE IMPACT CASCADE PROTOCOL                  │
├─────────────────────────────────────────────────────────────────┤
│ Step 1: Pinpoint Mutation Root                                  │
│         Identify exact requirement ID, schema column, or API.   │
│                                                                 │
│ Step 2: Downstream Dependency Traversal                         │
│         Grep for references across architecture, code, and DB.  │
│                                                                 │
│ Step 3: Categorize Impact Severity                              │
│         - Breaking: API schema change, DB column dropped/renamed│
│         - Non-Breaking: Additive optional column, new endpoint  │
│                                                                 │
│ Step 4: Documentation & Context Synchronization                 │
│         Update SRS, OpenAPI spec, and `ARCHITECTURE.md`.        │
│                                                                 │
│ Step 5: Test & Implementation Refactoring                       │
│         Update unit tests, migration scripts, and frontend code.│
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Practical Example: Change Impact on Schema Alteration

**Change:** Company capacity field in `job_postings` changed from `max_slots INT` to `slots_breakdown JSONB` to support multiple department allocations.

```markdown
### Change Impact Assessment:

1. **Root Change**: `job_postings.max_slots` column deprecated; replaced by `job_postings.slots_by_dept`.
2. **Impacted Components**:
   - `DB Layer`: Needs SQL migration script `V4__split_slots_by_department.sql`.
   - `Backend Service`: `PlacementSolverService.ts` must parse JSONB instead of integer.
   - `API Contract`: OpenAPI `JobPostingResponse` schema modified (Breaking Change).
   - `Frontend UI`: Admin form `SCR-08` needs multi-department input repeater.
   - `Test Suite`: 4 unit tests and 1 Playwright E2E test require fixture updates.
3. **Execution Strategy**: Run database migration with backward-compatibility view before deploying v2 solver.
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Change Impact Analysis & Ripple Evaluation</div>

```markdown
# TASK: Conduct Change Impact Analysis for Modified Requirement / Schema
You are a Principal Software Architect and Systems Auditor.

## Proposed Change Description:
[PASTE PROPOSED REQUIREMENT CHANGE, SCHEMA MUTATION, OR API REFACTOR]

## Instructions:
1. Identify the root mutation point and classify it as (Breaking vs. Non-Breaking).
2. Trace all downstream dependencies across:
   - Database Tables, Views, and Foreign Key Constraints.
   - Domain Services, DTOs, and Business Invariants.
   - Public API Endpoints, Request/Response contracts, and Webhooks.
   - UI Screens, Forms, and Client State Stores.
   - Automated Unit, Integration, and E2E Test Suites.
3. Provide a phased rollout plan minimizing service downtime and regressions.
```
</div>

---

## 6. Review Checklist

- [ ] Does every changed requirement trace back to an IEEE 29148 ID?
- [ ] Were all downstream API and UI components identified before modifying code?
- [ ] Are breaking schema migrations accompanied by rollback/compatibility strategies?
- [ ] Were all affected test suites updated and verified in green state?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Traceability and Change Management.</li>
    <li>Leffingwell, Dean & Widrig, Don (2003). <em>Managing Software Requirements: A Use Case Approach</em>. Addison-Wesley.</li>
  </ul>
</div>
