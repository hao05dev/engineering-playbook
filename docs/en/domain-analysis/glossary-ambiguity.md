# Domain Glossary, Assumptions & Ambiguity Detection

Ambiguity is the single largest cause of software defects and architectural rework. This guide establishes the methodology for creating a strict **Domain Glossary (Ubiquitous Language)**, managing unverified **Assumptions**, and using AI to proactively **challenge ambiguous requirements**.

---

## 1. The Domain Glossary (Ubiquitous Language)

A Domain Glossary provides single, unambiguous definitions for core business concepts shared across business stakeholders, developers, database schemas, and AI prompts.

```
┌─────────────────────────────────────────────────────────────┐
│                 DOMAIN GLOSSARY SAMPLE                      │
├─────────────────────────────────────────────────────────────┤
│ Term: Internship Placement                                  │
│ Definition: The binding agreement where an approved student │
│ is assigned to a specific company for an academic term.     │
│ Synonyms to Avoid: "Job", "Work", "Intern Contract"        │
│ Related Entities: Student, Company, FacultyAdvisor          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Managing Unverified Assumptions

When developing requirements with AI, unverified assumptions frequently contaminate system specifications. 

### The Invariant Rule of Assumptions
> [!CAUTION]
> **Never Silently Convert Assumptions into Confirmed Rules**
> If a developer states: *"Students can confirm an internship."*
> The AI must NOT assume: *"Only one internship can be active."*
> The AI must tag it as: `<span class="badge-assumption">[ASSUMPTION]</span> A student may only hold one active internship placement at a time.` and ask `<span class="badge-question">[QUESTION]</span> Can a student hold two part-time internship placements simultaneously?`

---

## 3. Detecting Linguistic Ambiguity in Requirements

AI agents must scan requirement statements for common linguistic traps:

| Ambiguity Trap | Example Statement | AI Challenge / Probing Question |
| :--- | :--- | :--- |
| **Vague Adjectives** | *"The search must be fast."* | *"What is the exact P95 latency threshold in milliseconds under what record load?"* |
| **Dangling Pronouns** | *"They will approve it."* | *"Which specific Actor role executes the approval action?"* |
| **Passive Voice** | *"Notifications are sent."* | *"Which system component triggers the notification, and via what channel (email/SMS/push)?"* |
| **Missing Boundaries** | *"Users can upload files."* | *"What are the permitted MIME types, max file sizes, and malware scanning rules?"* |

---

## 4. The AI Questioning Protocol

When the developer provides an underspecified requirement, the AI executes the **10-Point Probing Questionnaire**:

1. **Who** initiates the action?
2. **Who** approves or rejects it?
3. **What** preconditions must be satisfied?
4. **What** happens to related pending items when this succeeds?
5. **What** happens if the external party fails to respond?
6. **What** is the exact deadline or expiration policy?
7. **What** specific state transition occurs?
8. **What** audit logs and notifications are emitted?
9. **What** data is permanently archived vs soft-deleted?
10. **What** security authorization is required?

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Ambiguity Audit & Probing Questions</div>

```markdown
# TASK: Requirement Ambiguity Audit & Probing Questions
You are an expert System Analyst trained in IEEE 29148 requirements verification.

## Input Requirement:
[INSERT RAW DEVELOPER REQUIREMENT OR FEATURE PROPOSAL HERE]

## Instructions:
1. Extract all core business terms and add them to a Domain Glossary.
2. Identify all instances of vague adjectives, passive voice, and missing boundaries.
3. Formulate a list of 5-10 targeted, probing clarification questions.
4. Output your analysis using:
   - [CONFIRMED] Facts explicitly defined by me.
   - [ASSUMPTION] Assumptions you made that need confirmation.
   - [PROPOSAL] Architecture or workflow options you recommend.
   - [QUESTION] Blocking questions that must be answered before drafting specs.
```
</div>

---

## 6. Review Checklist

- [ ] Does every domain term have exactly one canonical name and definition?
- [ ] Are all vague terms (e.g. "fast", "user-friendly", "appropriate") converted to measurable metrics?
- [ ] Has every assumption been formally recorded and presented for human developer sign-off?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>IEEE 29148:2018 — Requirements Characteristics (Unambiguous, Complete, Verifiable).</li>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Ubiquitous Language</em>.</li>
  </ul>
</div>
