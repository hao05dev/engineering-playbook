# Discovery & Probing Questioning Loop

When users submit vague or one-line requirements (e.g., *"Add payment processing"* or *"Allow managers to review students"*), coding assistants often hallucinate default behaviors that conflict with business intent.

The **10-Point Probing Questioning Protocol** systematically extracts the necessary requirements before any architectural or code decisions are made.

---

## 1. The 10-Point Probing Question Framework

```
┌─────────────────────────────────────────────────────────────────┐
│              10-POINT PROBING QUESTION PROTOCOL                 │
├─────────────────────────────────────────────────────────────────┤
│ 01. Business Goal: What measurable problem does this solve?     │
│ 02. Target Actors: Who executes this action, and with what RBAC?│
│ 03. Preconditions: What state must the system be in beforehand? │
│ 04. Trigger & Inputs: What specific event/payload initiates it? │
│ 05. Happy Path Flow: What is the exact step-by-step progression?│
│ 06. State Mutations: What entity states transition (A ➔ B)?     │
│ 07. Alternative Paths: What branching conditions exist?         │
│ 08. Failure & Recovery: What happens if network/DB/APIs fail?   │
│ 09. Data & Privacy: What sensitive fields require encryption?  │
│ 10. Non-Functional SLA: What are the latency and throughput reqs?│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Guardrails Against Hallucinated Defaults

| Risk Scenario | Naive AI Behavior (Bad) | Protocol AI Behavior (Good) |
|---|---|---|
| **Ambiguous Auth** | Silently hardcodes JWT Bearer auth | Asks: *"Is this endpoint authenticated via Session Cookie or OAuth2 Bearer Token?"* |
| **Missing Validation** | Silently assumes email is optional | Asks: *"Is email mandatory and what uniqueness constraint applies across tenants?"* |
| **Unstated Edge Case** | Deletes parent record leaving orphan rows | Proposes: *"[PROPOSAL] Soft-delete parent with cascade flag or restrict if children exist?"* |

---

## 3. Practical Example: Probing a Vague Prompt

**User Prompt:** *"Add an endpoint for teachers to grade student reports."*

```markdown
### AI Probing Response:

To ensure the grading engine adheres to your domain requirements, please confirm the following:

1. **[Actor & RBAC]**: Is grading restricted to the assigned `FacultyAdvisor`, or can any `DepartmentAdmin` override grades?
2. **[Grading Scale]**: Is the grade a numeric float (`0.0 - 10.0`), letter grade (`A-F`), or custom rubric scorecard?
3. **[State Transition]**: Does submitting a grade transition the `InternshipReport` state from `SUBMITTED` directly to `COMPLETED`, or is a student acknowledgment step required?
4. **[Late Submissions]**: Can teachers grade reports submitted past the deadline, and should a penalty deduction be automatically calculated?
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: 10-Point Probing Requirement Extraction</div>

```markdown
# TASK: Execute 10-Point Probing Question Protocol on Vague Requirements
You are a Staff Requirements Engineer and Domain Analyst.

## Input Requirement:
[PASTE VAGUE USER REQUEST]

## Instructions:
1. Identify all ambiguities, missing business rules, and unstated edge cases in the input.
2. Formulate 3 to 5 high-leverage probing questions selecting from the 10-point framework:
   - Actors & RBAC permissions
   - Exact state transition mechanics
   - Error handling & rollback expectations
   - Validation & data boundary constraints
3. Provide recommended defaults formatted as `[PROPOSAL]` alongside each question to minimize user cognitive burden.
```
</div>

---

## 5. Review Checklist

- [ ] Were vague requirements probed before starting implementation planning?
- [ ] Are questions focused on business invariants rather than trivial stylistic choices?
- [ ] Did the AI provide sensible recommended options alongside questions?
- [ ] Were all actor permission boundaries explicitly confirmed?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Wiegers, Karl & Beatty, Joy (2013). <em>Software Requirements (3rd Edition)</em>. Microsoft Press.</li>
    <li>IEEE 29148:2018 — Requirements Elicitation Techniques.</li>
  </ul>
</div>
