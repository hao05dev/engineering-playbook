# Stakeholder Analysis & Actor Identification

A system succeeds or fails based on how well it balances the needs, constraints, and conflicting motives of its stakeholders. **Stakeholder Analysis & Actor Identification** formalizes who interacts with the system and what value they expect to extract.

---

## 1. Stakeholders vs. System Actors

- **Stakeholder**: Any individual, group, or organization with an interest in or affected by the software (e.g., University Dean, Compliance Officer, Student, Recruiter).
- **Actor (UML/System Actor)**: A specific role played by an external entity (human, external system, hardware) that interacts directly with the software via its interfaces.

```
┌─────────────────────────────────────────────────────────────┐
│                    STAKEHOLDER HIERARCHY                    │
├─────────────────────────────────────────────────────────────┤
│ • Direct Actors (Primary): Initiates action (e.g. Student) │
│ • Supporting Actors (Secondary): Provides services (IdP)    │
│ • Indirect Stakeholders: Sets rules/audits (e.g. Dean, HR)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Power vs. Interest Matrix

Categorizing stakeholders helps determine engagement depth and security priorities:

| High Power / High Interest (Manage Closely) | High Power / Low Interest (Keep Satisfied) |
| :--- | :--- |
| **Faculty Advisors, Department Head**<br>Need daily operational workflows and veto power. | **University Legal & Security Board**<br>Mandates FERPA compliance and SSO. |
| **Low Power / High Interest (Keep Informed)** | **Low Power / Low Interest (Monitor)** |
| **Students, Corporate Interns**<br>Frequent direct users needing fast, friction-free UI. | **Alumni Office**<br>Receives end-of-year placement statistics. |

---

## 3. Resolving Conflicting Stakeholder Goals

In software systems, stakeholder objectives often clash:
- **Student Goal**: Instant 1-click application submission with minimal mandatory fields.
- **Advisor Goal**: Comprehensive pre-screening requiring verified GPA, prerequisite transcripts, and cover letter before any application leaves the university.
- **Resolution**: Design a multi-stage validation workflow where the student drafts easily, but the system enforces automated prerequisite validation before notifying the advisor.

---

## 4. Practical Example: Actor Catalog

```
┌──────────────┬───────────────────────────────┬─────────────────────────────┐
│ Actor Name   │ Role Type                     │ Core Responsibility         │
├──────────────┼───────────────────────────────┼─────────────────────────────┤
│ Student      │ Primary Human Actor           │ Browse jobs, apply, report  │
│ Advisor      │ Primary Human Actor           │ Verify criteria, approve    │
│ Recruiter    │ Primary Human Actor           │ Post jobs, schedule reviews │
│ Stripe API   │ Secondary System Actor        │ Payment processing          │
│ SSO / Auth0  │ Secondary Infrastructure Actor│ Identity verification       │
└──────────────┴───────────────────────────────┴─────────────────────────────┘
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Stakeholder & Actor Analysis</div>

```markdown
# TASK: Stakeholder & Actor Identification
You are a Lead Business Analyst and System Architect.

## Input Context:
System Domain: [INSERT SYSTEM DOMAIN / FEATURE DESCRIPTION]

## Instructions:
1. Identify all direct Primary Actors, Secondary Supporting Actors, and Indirect Stakeholders.
2. Produce a Power vs. Interest Matrix for the stakeholders.
3. Identify at least 3 potential conflicts of interest between actors and propose architectural or workflow solutions.
4. Output a clean Actor Catalog table specifying Actor Name, Type, Goals, and System Permissions.
5. Use [CONFIRMED], [ASSUMPTION], [PROPOSAL], and [QUESTION] markers.
```
</div>

---

## 6. Review Checklist

- [ ] Have all human personas interacting with the UI been identified as distinct actors?
- [ ] Are external systems (APIs, webhooks, payment gateways, identity providers) modeled as secondary actors?
- [ ] Are conflicting stakeholder requirements documented with clear resolution strategies?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG Unified Modeling Language (OMG UML) v2.5.1 — Actor Modeling</li>
    <li>BABOK Guide v3.0 — Chapter 3: Business Analysis Planning and Monitoring</li>
  </ul>
</div>
