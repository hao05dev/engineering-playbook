# 06 — Architecture Decisions (ADR)

An **Architecture Decision Record (ADR)** is a lightweight, version-controlled document that captures a significant architectural decision made on a software project, along with its context, considered alternatives, and consequences.

---

## Why ADRs are Vital for Human & AI Collaboration

Without ADRs, software teams suffer from **architectural amnesia** — developers and AI agents forget *why* a particular library, database engine, or communication pattern was chosen. They risk reopening settled debates or unintentionally breaking system invariants.

```
┌─────────────────────────────────────────────────────────────┐
│                       THE ADR LIFECYCLE                     │
├─────────────────────────────────────────────────────────────┤
│ Proposed ──► Accepted ──► Superseded / Deprecated           │
│                                                             │
│ An ADR records:                                             │
│ 1. Context: What technical problem required a decision?     │
│ 2. Options: What realistic alternatives were evaluated?     │
│ 3. Decision: Which option was chosen and why?               │
│ 4. Consequences: What are the positive & negative trade-offs?│
└─────────────────────────────────────────────────────────────┘
```

---

## When to Create an ADR

Create an ADR whenever a decision has a **significant, structural, or irreversible impact**:
- Choosing an architectural style (e.g. Modular Monolith vs Microservices).
- Selecting a primary database engine (e.g. PostgreSQL vs MongoDB).
- Adopting a core framework or authentication protocol (e.g. Spring Security with OIDC).
- Introducing a distributed messaging pattern (e.g. Transactional Outbox vs Direct REST).

---

## Key Modules in this Section

1. [ADR Structure & Lifecycle](./lifecycle-structure): The Markdown Architectural Decision Record (MADR) template and status lifecycle.
2. [ADR Review Checklist & Prompts](./review-prompts): Verifying decision records and copyable AI prompt templates.

<div class="ref-box">
  <strong>Primary Official References:</strong>
  <ul>
    <li><a href="https://adr.github.io/" target="_blank" rel="noopener">ADR GitHub Organization — Architectural Decision Records</a></li>
    <li><a href="https://adr.github.io/madr/" target="_blank" rel="noopener">MADR — Markdown Architectural Decision Records (Oliver Kopp)</a></li>
    <li>Nygard, Michael (2011). <em>Documenting Architecture Decisions</em>. Cognitect.</li>
  </ul>
</div>
