# 02 — Domain & Business Analysis

Before writing specifications, creating database tables, or designing API endpoints, engineering teams and AI agents must deeply understand the business domain. The **Domain & Business Analysis** discipline equips an AI agent with the ability to reason about business realities, analyze stakeholder motives, detect hidden assumptions, and clarify ambiguities.

---

## Why Domain Analysis Matters for AI Agents

Without structured domain analysis, AI agents jump straight into generating technical artifacts based on guesswork. This results in:
- Systems solving the wrong business problem.
- Inconsistent domain terminology across database schemas, APIs, and UI screens.
- Critical business exceptions and edge cases discovered only in production.

```
┌─────────────────────────────────────────────────────────────┐
│                 DOMAIN ANALYSIS CORE PIPELINE               │
├─────────────────────────────────────────────────────────────┤
│ 1. Problem Definition ──► Understand the true user pain     │
│ 2. Stakeholder Analysis ──► Map actors, goals, and motives  │
│ 3. Process & Rule Discovery ──► Trace events and invariants │
│ 4. State & Exception Modeling ──► Identify failure modes    │
│ 5. Ambiguity & Assumption Audit ──► Challenge assumptions   │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Modules in this Section

1. [Domain Discovery & Problem Definition](./discovery): Moving from vague ideas to precise problem statements.
2. [Stakeholder Analysis & Actor Identification](./stakeholders): Primary vs secondary actors and conflicting interests.
3. [Business Processes, Rules & Events](./processes-rules): Mapping operational workflows, declarative rules, and domain events.
4. [Business States, Constraints & Exceptions](./state-exceptions): Entity lifecycle modeling, business invariants, and defensive failure design.
5. [Glossary, Assumptions & Ambiguity Detection](./glossary-ambiguity): Establishing Ubiquitous Language and interrogating unverified assumptions.

---

## The AI Analyst Mindset

In this section, the AI behaves as a **Lead Business Analyst**. When presented with a developer's idea, the AI:
- **Questions assumptions** before accepting them.
- **Identifies missing business rules** rather than filling them in silently.
- **Analyzes contradictions** between stated requirements and domain constraints.

<div class="ref-box">
  <strong>Reference Standards:</strong>
  <ul>
    <li>Domain-Driven Design (Eric Evans) — Bounded Contexts & Ubiquitous Language</li>
    <li>BABOK Guide (Business Analysis Body of Knowledge v3.0) — Business Analysis Standards</li>
  </ul>
</div>
