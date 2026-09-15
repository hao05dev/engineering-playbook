# Business Processes, Rules & Events

Software is essentially an automated engine that executes business processes, enforces business rules, and emits domain events. Disentangling these three concepts is crucial for clean software architecture and domain design.

---

## 1. Process vs. Rule vs. Event

```
┌─────────────────────────────────────────────────────────────┐
│                       THE TRIAD MODEL                       │
├─────────────────────────────────────────────────────────────┤
│ • Process: The sequence of activities to achieve a goal     │
│ • Rule: The constraints & policies governing each activity  │
│ • Event: A domain fact that occurred at a specific moment   │
└─────────────────────────────────────────────────────────────┘
```

| Dimension | Business Process | Business Rule | Domain Event |
| :--- | :--- | :--- | :--- |
| **Question** | *How does work flow?* | *What is allowed or forbidden?* | *What just happened?* |
| **Representation**| BPMN / Activity Diagram | Declarative Policy (If/Then) | Past-tense Fact (`OrderPlaced`) |
| **Volatility** | Moderate (Steps can be optimized)| High (Business policies shift often)| Low (Facts are immutable) |
| **Code Mapping** | Service Workflows / Sagas | Domain Invariants / Validation | Event Bus / Kafka Topics |

---

## 2. Business Rules Categorization

Business rules must never be buried in UI controllers or SQL triggers without formal cataloging.

### 1. Invariant Rules (Structural)
- *BR-01*: "A student cannot submit an internship application if their cumulative GPA is below 2.0."
- *BR-02*: "An internship posting must specify a non-negative salary and maximum applicant quota."

### 2. Operational / Behavioral Rules
- *BR-03*: "If a faculty advisor does not review a submitted application within 7 business days, escalate the review to the Department Chair."
- *BR-04*: "When an applicant accepts an offer, all other active pending applications for that student must be automatically transitioned to `WITHDRAWN`."

---

## 3. Domain Events (Event Storming Mapping)

Domain events represent notable business occurrences written in past tense:

```
[StudentRegistered] ──► [ApplicationSubmitted] ──► [AdvisorApproved] ──► [OfferAccepted]
                                │
                                ▼
                        [AdvisorRejected]
```

---

## 4. Practical Example: Business Rule Catalog

```
┌─────────┬────────────────────────────┬─────────────────────────────┬───────────────────────┐
│ Rule ID │ Rule Name                  │ Logic Expression            │ Action on Violation   │
├─────────┼────────────────────────────┼─────────────────────────────┼───────────────────────┤
│ BR-INT01│ Max Applications Limit     │ Count(ActiveApps) <= 5      │ Block submission (400)│
│ BR-INT02│ Minimum Prerequisite Credits│ EarnedCredits >= 60         │ Block submission (400)│
│ BR-INT03│ Application Expiry Period  │ Now() <= PostDeadline       │ Mark Expired (410)    │
│ BR-INT04│ Advisor Approval SLA       │ TimeSinceSubmit <= 7 Days   │ Emit Escalation Alert │
└─────────┴────────────────────────────┴─────────────────────────────┴───────────────────────┘
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Business Rules & Event Extraction</div>

```markdown
# TASK: Business Process, Rules & Domain Event Extraction
You are an expert Domain Analyst and Event-Driven Architect.

## Input Context:
Feature/Domain Workflow: [DESCRIBE THE WORKFLOW HERE]

## Instructions:
1. Map the end-to-end Business Process into distinct sequential steps.
2. Extract all Invariant and Behavioral Business Rules into a formal Business Rules Table (Rule ID, Name, Condition, Violation Outcome).
3. Identify all key Domain Events (in past tense) emitted at each transition.
4. Highlight any missing business rules or unhandled edge cases using [QUESTION] and [PROPOSAL] markers.
```
</div>

---

## 6. Review Checklist

- [ ] Are business rules expressed declaratively rather than tied to code implementation?
- [ ] Does every business rule have a defined behavior when violated?
- [ ] Are domain events named as past-tense business facts (e.g., `ApplicationApproved`, not `ApproveApplication`)?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Business Rules Group (BRG) — Defining Business Rules ~ What Are They Really?</li>
    <li>Brandolini, Alberto (2019). <em>Introducing EventStorming</em>. Leanpub.</li>
  </ul>
</div>
