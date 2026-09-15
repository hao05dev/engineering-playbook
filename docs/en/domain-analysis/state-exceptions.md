# Business States, Constraints & Exceptions

Complex software systems break most frequently at boundary transitions and error pathways. Modeling **Business States, Constraints, and Business Exceptions** upfront guarantees that the AI agent designs defensive, resilient systems rather than fragile "happy-path" implementations.

---

## 1. Modeling Entity Lifecycles (State Machines)

Every core business entity follows a deterministic lifecycle. A state machine specifies:
- **Valid States**: Discrete milestones in an entity's lifecycle.
- **Valid Transitions**: Legal pathways from one state to another.
- **Transition Guards**: Business rules that must evaluate to `TRUE` before a transition occurs.
- **Terminal States**: Final states where no further transitions are permitted.

```
┌─────────────────────────────────────────────────────────────┐
│              INTERNSHIP APPLICATION STATE MACHINE           │
├─────────────────────────────────────────────────────────────┤
│ [DRAFT] ──(submit)──► [SUBMITTED] ──(advisorApprove)──►     │
│ [FACULTY_APPROVED] ──(companyAccept)──► [PLACED]            │
│                                                             │
│ Invalid Transitions:                                        │
│ • [REJECTED] ──► [PLACED] (FORBIDDEN)                       │
│ • [DRAFT] ──► [FACULTY_APPROVED] (FORBIDDEN)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Business Constraints vs. Technical Constraints

| Constraint Type | Definition | Example |
| :--- | :--- | :--- |
| **Business Constraint** | Imposed by policy, law, or financial rules | "A student cannot apply to more than 5 companies simultaneously." |
| **Technical Constraint**| Imposed by hardware, network, or data stores | "Resume upload payload size must not exceed 10 MB." |
| **Temporal Constraint** | Imposed by deadlines or schedules | "Internship mid-term evaluation must be submitted between week 6 and 8." |

---

## 3. Business Exceptions vs. Technical Errors

Software must distinguish between domain violations and technical failures:

```
┌─────────────────────────────────────────────────────────────┐
│                 EXCEPTION TAXONOMY                          │
├─────────────────────────────────────────────────────────────┤
│ 1. Business Exceptions (4xx HTTP): Expected domain failures │
│    - DuplicateApplicationException                          │
│    - PrerequisiteNotMetException                            │
│    - ApplicationExpiredException                            │
│ 2. System Errors (5xx HTTP): Infrastructure failures        │
│    - DatabaseConnectionTimeoutException                     │
│    - StorageDiskFullException                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. State Transition Matrix Template

```
┌──────────────────┬──────────────────┬─────────────────────────────┬──────────────────────────┐
│ Source State     │ Target State     │ Trigger Event               │ Guard Condition          │
├──────────────────┼──────────────────┼─────────────────────────────┼──────────────────────────┤
│ DRAFT            │ SUBMITTED        │ Student clicks Submit       │ GPA >= 2.0 & Files != null│
│ SUBMITTED        │ FACULTY_APPROVED │ Advisor clicks Approve      │ Advisor has AssignedDept │
│ SUBMITTED        │ REJECTED         │ Advisor clicks Reject       │ RejectionReason != null  │
│ FACULTY_APPROVED │ PLACED           │ Company submits Offer Accept│ RemainingQuota > 0       │
└──────────────────┴──────────────────┴─────────────────────────────┴──────────────────────────┘
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: State Machine & Exception Modeling</div>

```markdown
# TASK: State Machine & Business Exception Modeling
You are an expert System Analyst & Resiliency Engineer.

## Input Context:
Target Entity: [ENTITY NAME, e.g. InternshipApplication, Order, AuctionBid]
Lifecycle Description: [DESCRIBE THE LIFECYCLE]

## Instructions:
1. Construct a comprehensive State Transition Matrix including Source State, Target State, Trigger Event, and Guard Conditions.
2. List all strictly FORBIDDEN transitions that must throw domain exceptions.
3. Define a catalog of Domain Business Exceptions with explicit Error Codes and user-friendly explanation messages.
4. Distinguish between Business Constraints and Technical Constraints.
5. Format findings with [CONFIRMED], [ASSUMPTION], [PROPOSAL], and [QUESTION] tags.
```
</div>

---

## 6. Review Checklist

- [ ] Are all entity states explicitly enumerated with clear terminal states?
- [ ] Are invalid transitions explicitly forbidden with guard checks and custom business exceptions?
- [ ] Are domain business exceptions separated cleanly from technical infrastructure failures?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG UML v2.5.1 — State Machine Diagrams</li>
    <li>Fowler, Martin (2010). <em>Domain-Specific Languages: State Machine Patterns</em>. Addison-Wesley.</li>
  </ul>
</div>
