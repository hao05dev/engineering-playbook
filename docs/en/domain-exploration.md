# 01 — Domain & Idea Exploration

The **Domain & Idea Exploration** phase is the foundational step of the AI-SDLC. Before writing a single line of code or designing database schemas, engineering teams must deeply understand the problem space, user pain points, domain terminology, and business workflows.

---

## Objectives of this Step

1. **Clarify Business Intent**: Move from vague ideas ("we need a notification center") to concrete business capabilities.
2. **Establish Ubiquitous Language**: Standardize domain definitions (e.g., distinguishing between a `User`, a `Customer`, an `Account`, and a `Tenant`).
3. **Map Domain Workflows & States**: Visualize entity lifecycles and business transitions.
4. **Surface Edge Cases Early**: Identify concurrency, multi-tenant isolation, network latency, and compliance hurdles upfront.

---

## The AI Exploration Dialogue Pattern

Leverage AI agents as domain brainstorming partners and devil's advocates. Prompt the AI with domain constraints to stress-test your assumptions.

```
┌─────────────────────────────────────────────────────────────┐
│                 DOMAIN EXPLORATION WORKFLOW                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Brainstorm Domain Boundaries (Bounded Contexts)         │
│ 2. Map Entity State Transitions (FSM)                       │
│ 3. Question Edge Cases & Security Vectors                   │
│ 4. Produce Domain Summary Document                          │
└─────────────────────────────────────────────────────────────┘
```

### Example Domain Exploration Prompt

```markdown
# DOMAIN EXPLORATION: Student Internship Management

Act as a Principal Domain Architect in Higher Education SaaS.
Help us explore the domain boundaries for an "Internship Application & Evaluation" module.

Context:
- Universities have Students, Faculty Advisors, and Corporate Mentors.
- Companies post internship positions; students apply with resumes.
- Faculty advisors must approve applications before companies review them.
- Mid-term and final evaluations are completed by both Mentors and Students.

Please produce:
1. Core Bounded Contexts and Ubiquitous Domain Terminology.
2. Entity Lifecycle diagram for `InternshipApplication` (states and valid transitions).
3. 5 subtle domain edge cases or compliance risks we must anticipate.
```

---

## State Transition Modeling

Visualizing state transitions prevents invalid states from being introduced during execution.

```
  [Draft] ──► [Submitted] ──► [Faculty Approved] ──► [Interview Scheduled]
                                    │                           │
                                    ▼                           ▼
                              [Rejected]                   [Accepted]
                                                                │
                                                                ▼
                                                        [Active Placement]
                                                                │
                                                                ▼
                                                           [Completed]
```

---

## Deliverables from Step 01

At the conclusion of Domain Exploration, you should have:
- A brief **Domain Brief** document.
- Standardized entity naming rules.
- State machines and transition rules.

> [!TIP]
> **Check Quality Gate 1**
> Do not jump straight to database modeling. If domain terminology is ambiguous, the AI will invent conflicting names in subsequent code generation steps.
