# User Stories & Use Case Specifications

Software development bridges stakeholder desires and technical implementation using two complementary behavioral artifacts: **User Stories** (with Given-When-Then Acceptance Criteria) for agile planning, and **Formal Use Case Specifications** for detailed engineering.

---

## 1. User Stories vs. Use Cases

```
┌─────────────────────────────────────────────────────────────┐
│                 BEHAVIORAL SPECIFICATION PAIR               │
├─────────────────────────────────────────────────────────────┤
│ • User Story: "Who needs what and why?" (Agile Scope)       │
│   └── Complemented by Given-When-Then Acceptance Criteria   │
│                                                             │
│ • Use Case: "What is the exact multi-step actor-system      │
│   interaction, including alternative and error branches?"   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The User Story & Acceptance Criteria Standard

### Connextra Template
```
As a [Specific User Role],
I want to [Perform an Action / Exercise a Capability],
So that [Achieve a Measurable Business Outcome].
```

### Given-When-Then (Gherkin) Acceptance Criteria
```gherkin
Scenario: Student submits application meeting all criteria
  Given a Student is authenticated with a cumulative GPA of 3.4
  And the student has selected an active Internship Posting with open quota
  When the student uploads a 2MB PDF resume and clicks "Submit Application"
  Then the System transitions the application status to "SUBMITTED"
  And the System displays confirmation message "Application submitted for advisor review"
  And the System dispatches an email notification to the assigned Faculty Advisor
```

---

## 3. Formal Use Case Specification Template (Cockburn Format)

```markdown
# USE CASE: UC-04 Apply for Internship Posting

- **Primary Actor**: Student
- **Supporting Actors**: Email Gateway, Faculty Advisor
- **Preconditions**:
  1. Student is authenticated and profile is active.
  2. Target Internship Posting status is `OPEN`.
- **Postconditions (Success Guarantee)**:
  1. Application record persisted with status `SUBMITTED`.
  2. Remaining quota reserved temporarily.
- **Main Success Scenario (Basic Flow)**:
  1. Student selects an open internship posting and clicks "Apply".
  2. System presents application form with pre-filled student academic metrics.
  3. Student attaches resume PDF and optional cover letter.
  4. Student confirms submission.
  5. System validates prerequisites (GPA, credits, file format).
  6. System saves application and generates audit log.
  7. System displays success receipt.
- **Extensions (Alternative & Exception Flows)**:
  - *5a. Student GPA is below minimum threshold*:
    1. System rejects submission.
    2. System displays error "GPA does not meet minimum requirement (2.50)".
    3. Use case aborts.
  - *5b. Student has already applied to this posting*:
    1. System detects duplicate application.
    2. System alerts student "You have an existing application for this position".
    3. Use case aborts.
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Dual User Story & Formal Use Case Authoring</div>

```markdown
# TASK: Author User Stories with Acceptance Criteria and Formal Use Cases
You are an expert Agile Product Owner and System Analyst.

## Input Feature:
[DESCRIBE THE FEATURE OR CAPABILITY]

## Instructions:
1. Write 2-3 User Stories using the standard "As a... I want... So that..." format with Business Value justification.
2. For each User Story, produce at least 2 Given-When-Then (Gherkin) acceptance scenarios (1 happy path, 1 negative/edge case).
3. Author a complete Cockburn-style Formal Use Case Specification including Preconditions, Success Guarantees, Main Success Flow, and all Extension/Exception Branches.
4. Apply the Information Classification tags: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 5. Review Checklist

- [ ] Does every User Story have a clear business value statement answering "So that..."?
- [ ] Does every Use Case specify all alternative and exception flows?
- [ ] Are Preconditions and Postconditions strictly testable?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Cockburn, Alistair (2000). <em>Writing Effective Use Cases</em>. Addison-Wesley.</li>
    <li>Cohn, Mike (2004). <em>User Stories Applied: For Agile Software Development</em>. Addison-Wesley.</li>
  </ul>
</div>
