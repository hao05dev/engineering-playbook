# 02 — Product Requirement Definition (PRD)

The **Product Requirement Definition (PRD)** translates domain insights into clear, unambiguous, and testable product specifications. In an AI-assisted engineering workflow, the PRD serves as the ultimate source of truth for business acceptance.

---

## The AI-SDLC PRD Structure

A well-formed PRD should contain four essential sections:

```
┌─────────────────────────────────────────────────────────────┐
│                       PRD STRUCTURE                         │
├─────────────────────────────────────────────────────────────┤
│ 1. Problem Statement & User Personas                        │
│ 2. Scoped User Stories with Given-When-Then Acceptance      │
│ 3. Explicit Out-of-Scope Boundaries                         │
│ 4. Non-Functional Requirements (NFRs)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Writing Testable Acceptance Criteria

Avoid vague requirements like *"The system should be fast and allow students to filter jobs easily."* Instead, use the **Given-When-Then (Gherkin)** format:

```gherkin
Feature: Filter Internship Postings by Technology Tag

  Scenario: Student filters active postings by 'Java' tag
    Given a student is logged into the student portal
    And there are 15 active internship postings, 4 of which are tagged with "Java"
    When the student selects the filter tag "Java"
    Then the system displays exactly 4 postings
    And each displayed posting contains the "Java" badge
    And the total count displays "4 postings found"
```

---

## 2. Non-Functional Requirements (NFRs)

Specify constraints that the AI coding agent must respect:
- **Performance**: P95 response time under 200ms for read queries with 10,000 active records.
- **Security**: Role-Based Access Control (RBAC) enforced on all write APIs; audit logs for all application state changes.
- **Data Retention**: Soft-delete records to preserve student evaluation history.

---

## 3. Explicit Out-of-Scope Guardrails

Defining what is NOT being built is just as critical as defining what IS being built:

```markdown
### Out-of-Scope for v1.0:
- Real-time chat between students and corporate mentors (deferred to v2.0).
- Automatic PDF resume generation (students will upload pre-built PDFs).
- Stripe payment processing for corporate job postings.
```

---

## Quality Gate Checklist: PRD Sign-off

- [ ] Every user story has at least one explicit positive and negative acceptance scenario.
- [ ] Edge cases (e.g., duplicate submissions, expired tokens) are covered.
- [ ] Technical prerequisites and API dependencies are acknowledged.
- [ ] Out-of-scope boundaries prevent scope bloat.
