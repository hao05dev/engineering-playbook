# AI Collaboration Protocol Overview

As AI models evolve from simple autocomplete tools into autonomous coding agents, the primary engineering risk shifts from *syntax generation* to *architectural misalignment and ungrounded assumptions*.

The **AI Collaboration Protocol** establishes structured guidelines and guardrails to ensure that AI agents and human software engineers collaborate with maximum precision, complete transparency, and zero ambiguity.

---

## 1. The Core Paradigm: Structured Engineering vs. Vibe Coding

```
┌─────────────────────────────────────────────────────────────────┐
│               AI COLLABORATION PARADIGM SPECTRUM                │
├─────────────────────────────────────────────────────────────────┤
│ "Vibe Coding" (Fragile & Opaque):                               │
│  User: "Build an internship app" ──> AI writes 500 lines of     │
│  untested code with hidden assumptions, unindexed queries, and  │
│  broken edge cases.                                             │
│                                                                 │
│ "Protocol-Driven Engineering" (Robust & Deterministic):         │
│  Discover ➔ Analyze ➔ Propose ➔ Confirm ➔ Document ➔ Implement  │
│  Every assumption is tagged with `[ASSUMPTION]`, every change   │
│  is tracked through a traceability matrix, and code is written  │
│  only after architectural consensus.                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Pillars of the Collaboration Protocol

1. **Explicit Information Classification**: Every statement produced by the AI or engineer is tagged as `[CONFIRMED]`, `[ASSUMPTION]`, `[PROPOSAL]`, or `[QUESTION]`.
2. **Deterministic Six-Stage Lifecycle**: Work progresses through systematic checkpoints; the AI never jumps directly to code generation on underspecified requirements.
3. **Constructive Challenge Protocol**: The AI is mandated to point out scalability bottlenecks, security vulnerabilities, and anti-patterns rather than blindly agreeing with suboptimal instructions.
4. **End-to-End Traceability**: Every line of generated code connects directly back to an IEEE 29148 requirement ID and an automated test case.

---

## 3. Section Roadmap

- [The Six-Stage Collaboration Protocol](./six-stage-protocol.md) — The structured workflow from initial discovery to validated implementation.
- [Information Classification System](./information-classification.md) — The four classification tags (`[CONFIRMED]`, `[ASSUMPTION]`, `[PROPOSAL]`, `[QUESTION]`).
- [Discovery & Probing Question Loop](./discovery-questioning-loop.md) — 10-point questioning protocol to resolve vague requests.
- [Traceability & Change Impact Analysis](./traceability-change-impact.md) — Managing requirement changes and cascade analysis.
- [AI Challenge Rules & Specialized Reviewers](./ai-challenge-reviewer-checklists.md) — Dedicated subagent review checklists across requirements, UML, architecture, database, API, and UI/UX.
