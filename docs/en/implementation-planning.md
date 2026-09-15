# 05 — Implementation Planning

Before modifying any file, the AI agent must construct a concrete, file-by-file **Implementation Plan**. This step prevents blind code generation and gives the human engineer an opportunity to spot architectural flaws before code is written.

---

## The Planning Protocol

```
┌─────────────────────────────────────────────────────────────┐
│                 IMPLEMENTATION PLAN STEPS                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Identify Target Files (Create, Modify, Delete)          │
│ 2. Outline Key Classes, Functions & Types                   │
│ 3. Define the Verification Strategy                         │
│ 4. Seek Human Approval (Quality Gate 3)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Structure of an Implementation Plan Artifact

When generating an implementation plan, the AI must output the following structured format:

```markdown
# Implementation Plan: Internship Application State Machine

## Target Files & Proposed Changes

### [MODIFY] `src/main/java/com/app/model/ApplicationStatus.java`
- Add new enum values: `FACULTY_APPROVED`, `REJECTED`, `PLACED`.

### [NEW] `src/main/java/com/app/service/ApplicationWorkflowService.java`
- Implement transition method: `transitionStatus(UUID applicationId, ApplicationStatus targetStatus)`
- Enforce valid state transition matrix.
- Emit audit event `ApplicationStatusChangedEvent`.

### [NEW] `src/test/java/com/app/service/ApplicationWorkflowServiceTest.java`
- Test valid transition: `SUBMITTED` -> `FACULTY_APPROVED`.
- Test invalid transition: `REJECTED` -> `PLACED` (throws `IllegalStateTransitionException`).

## Verification Plan
1. Run `./mvnw test -Dtest=ApplicationWorkflowServiceTest`
2. Run linter check: `./mvnw spotless:check`
```

---

## Human Review of the Plan

As the human engineer, scrutinize the plan against these questions:
- *Did the agent choose the right directory and layer for new files?*
- *Are there unnecessary file modifications that could cause merge conflicts?*
- *Is the proposed test plan thorough enough to catch edge cases?*

> [!IMPORTANT]
> **No Code without Plan Approval**
> Never allow an agent to write multi-file code modifications without first presenting an explicit, approved implementation plan.
