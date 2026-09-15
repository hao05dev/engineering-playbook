# The Six-Stage Collaboration Protocol

The **Six-Stage Collaboration Protocol** governs the complete interaction lifecycle between a developer and an AI agent. It eliminates "hallucinated assumptions" by enforcing explicit review gates before code is written.

---

## 1. The Six Stages Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              THE 6-STAGE COLLABORATION LIFECYCLE                │
├─────────────────────────────────────────────────────────────────┤
│ [1. DISCOVER]  Extract domain boundaries, actors, & goals.      │
│       │                                                         │
│ [2. ANALYZE]   Map business rules, state transitions, & NFRs.   │
│       │                                                         │
│ [3. PROPOSE]   Formulate architecture plan, ADRs, & trade-offs. │
│       │                                                         │
│ [4. CONFIRM]   ★ HUMAN REVIEW GATE: Resolve questions & risks.  │
│       │                                                         │
│ [5. DOCUMENT]  Update SRS, arc42, OpenAPI specs, & Context.     │
│       │                                                         │
│ [6. IMPLEMENT] Test-Driven Code Gen, run tests, & verify.       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Stage Breakdown & Gate Transition Criteria

### Stage 1: Discover (Khám phá)
- **Objective**: Clarify high-level user intent without making silent technical decisions.
- **AI Deliverables**: Identified Domain Entities, User Roles, Business Objectives.
- **Gate Criteria**: All domain terms defined in the Ubiquitous Glossary.

### Stage 2: Analyze (Phân tích)
- **Objective**: Uncover hidden constraints, error scenarios, and state machines.
- **AI Deliverables**: State transition matrix, non-functional targets (p99 latency, RPS), and failure recovery flows.
- **Gate Criteria**: Edge cases and permission boundaries explicitly enumerated.

### Stage 3: Propose (Đề xuất)
- **Objective**: Architect the optimal technical solution with trade-off analysis.
- **AI Deliverables**: Implementation Plan (`implementation_plan.md`), ERD DDL, API contracts, and ADR draft.
- **Gate Criteria**: Tagged with `[PROPOSAL]` and highlighting breaking changes or alternatives considered.

### Stage 4: Confirm (Xác nhận — Human Checkpoint)
- **Objective**: Human developer reviews proposals and answers open questions.
- **Rule**: **The AI MUST STOP and wait for explicit human approval before touching code.**
- **Gate Criteria**: Every `[QUESTION]` resolved and all `[ASSUMPTION]` items verified.

### Stage 5: Document (Tài liệu hóa)
- **Objective**: Persist architectural truth to documentation and AI context files.
- **AI Deliverables**: Updated `REQUIREMENTS.md`, `ARCHITECTURE.md`, `API.md`, and ADR log.
- **Gate Criteria**: Documentation committed to Git before feature code.

### Stage 6: Implement & Verify (Thi công & Nghiệm thu)
- **Objective**: Write production-grade code backed by automated tests.
- **AI Deliverables**: Unit tests, integration tests, implementation code, and Walkthrough artifact (`walkthrough.md`).
- **Gate Criteria**: 100% CI test suite passing, zero lint errors, and verified against IEEE 29148 acceptance criteria.

---

## 3. Practical Example: Stage Progression Walkthrough

```
[Stage 1 - Discover]: AI extracts need for "Student Internship Application Withdrawal".
[Stage 2 - Analyze]:  AI identifies edge case: "What if company has already reviewed the application?"
[Stage 3 - Propose]:  AI proposes soft-deletion with state `WITHDRAWN` and webhook notification.
[Stage 4 - Confirm]:  Developer confirms: "Yes, withdrawal allowed only if status is PENDING."
[Stage 5 - Document]: AI updates SRS (FR-09) and OpenAPI spec (`DELETE /api/v1/applications/{id}`).
[Stage 6 - Implement]: AI writes Playwright E2E test, Spring Boot/Node.js handler, and passes tests.
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Enforcing the 6-Stage Protocol</div>

```markdown
# TASK: Execute Feature Development via 6-Stage Protocol
You are an Autonomous AI Engineering Partner adhering strictly to the Six-Stage Protocol.

## User Request:
[PASTE FEATURE REQUEST OR BUG REPORT]

## Operating Protocol:
1. Conduct STAGE 1 (Discover) & STAGE 2 (Analyze): Outline entities, rules, and potential risks.
2. Present STAGE 3 (Propose): Output an Implementation Plan with ERD, API specs, and tagged `[PROPOSAL]`.
3. Halt at STAGE 4 (Confirm): List all `[QUESTION]` and `[ASSUMPTION]` items. DO NOT write code yet.
4. Wait for user confirmation before proceeding to STAGE 5 (Document) and STAGE 6 (Implement).
```
</div>

---

## 5. Review Checklist

- [ ] Did the AI stop at Stage 4 (Confirm) before writing any code?
- [ ] Are all open questions and ambiguities marked with `[QUESTION]`?
- [ ] Were the documentation and AI context files updated before code changes?
- [ ] Did all automated tests pass before claiming task completion?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Fowler, Martin (2018). <em>Refactoring & Continuous Delivery Workflows</em>. Addison-Wesley.</li>
    <li>IEEE Computer Society (2020). <em>Guide to the Software Engineering Body of Knowledge (SWEBOK v3.0)</em>.</li>
  </ul>
</div>
