# Requirements Validation, Verification & Traceability

A software system is resilient when every line of code, database column, and API route can be traced directly back to a validated business requirement. **Requirements Traceability** guarantees that systems neither build unrequested bloat (gold plating) nor omit essential requirements.

---

## 1. The End-to-End Traceability Chain

```
[ Business Goal ]
       │
       ▼
[ Business Requirement (BRD) ]
       │
       ▼
[ Functional Requirement (SRS) ] ◄── [ Use Case ]
       │                                   │
       ▼                                   ▼
[ Architecture Component ] ─────────► [ User Flow / UI Screen ]
       │
       ▼
[ API Endpoint ] ──► [ Database Table ] ──► [ Automated Test Case ]
```

---

## 2. The Requirements Traceability Matrix (RTM)

The RTM is a structured cross-reference grid linking every requirement to its design, implementation, and verification artifacts:

| Req ID | Business Goal | Use Case | Component | API Endpoint | DB Table | Test Case | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-INT-01** | BG-02 (Automate Application) | UC-04 (Apply) | `ApplicationService` | `POST /api/v1/applications` | `internship_applications` | `TC-INT-001` | **VERIFIED** |
| **FR-INT-02** | BG-02 (Advisor Review) | UC-05 (Approve) | `WorkflowEngine` | `PATCH /api/v1/applications/{id}` | `internship_applications` | `TC-INT-002` | **VERIFIED** |
| **FR-INT-03** | BG-04 (Export Reports) | UC-09 (Export) | `ReportGenerator` | `GET /api/v1/reports/placements` | N/A (View query) | `TC-INT-003` | **IN PROGRESS** |

---

## 3. Requirements Change Impact Analysis

When a confirmed business rule changes (e.g., *"Students may now apply to a maximum of 10 positions instead of 5"*), the AI executes an immediate **Change Impact Audit**:

```
┌─────────────────────────────────────────────────────────────┐
│                 CHANGE IMPACT AUDIT PROTOCOL                │
├─────────────────────────────────────────────────────────────┤
│ 1. Scan SRS / Business Rules: Update BR-INT01 (5 -> 10)     │
│ 2. Scan Use Cases: Update UC-04 error branch 5b             │
│ 3. Scan API Specifications: Update validation constraint    │
│ 4. Scan Database Constraints: Alter check constraint if any │
│ 5. Scan UI Components: Update helper text & validation rule │
│ 6. Scan Test Suites: Update mock assertions in TC-INT-001   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Traceability Matrix & Change Impact Analysis</div>

```markdown
# TASK: Requirements Traceability & Change Impact Analysis
You are a Lead Quality Assurance Architect and Configuration Manager.

## Input Context:
Requirements Document: [INSERT SRS / REQUIREMENTS LIST]
Proposed Change (if any): [DESCRIBE PROPOSED REQUIREMENT CHANGE]

## Instructions:
1. Construct a comprehensive Bidirectional Requirements Traceability Matrix (RTM) linking Req ID, Use Case, Architecture Component, API, DB Table, and Test ID.
2. If a requirement change is specified, perform a Change Impact Analysis identifying all impacted artifacts (SRS, APIs, DB schemas, UI screens, Test Cases).
3. Produce a Change Impact Report outlining risks, estimated effort, and required regression tests.
4. Flag unresolved items with [QUESTION] and [ASSUMPTION].
```
</div>

---

## 5. Review Checklist

- [ ] Does every functional requirement have at least one corresponding test case in the matrix?
- [ ] Are there orphan code components or database tables with no parent requirement?
- [ ] Is every change accompanied by an impact assessment before code modifications?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Section 6.5: Requirements Traceability Process.</li>
    <li>Gotel, Orlena & Finkelstein, Anthony (1994). <em>An Analysis of the Requirements Traceability Problem</em>. IEEE.</li>
  </ul>
</div>
