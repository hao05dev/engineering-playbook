# AI Context Files & Reference Standards Overview

AI coding agents perform best when provided with modular, structured, and version-controlled repository context. Rather than feeding massive, unstructured prompts into an LLM's context window, engineering teams maintain a dedicated suite of **AI Context Files** and adhere to authoritative **International Engineering Standards**.

---

## 1. The Modular AI Context Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 MODULAR AI CONTEXT ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────────┤
│ ├── AGENTS.md           ──> Agent personas, boundaries, rules   │
│ ├── PROJECT_CONTEXT.md  ──> Tech stack, commands, conventions   │
│ ├── DOMAIN.md           ──> Ubiquitous glossary & invariants    │
│ ├── REQUIREMENTS.md     ──> IEEE 29148 backlog & acceptance     │
│ ├── ARCHITECTURE.md     ──> C4 Model & arc42 architectural view │
│ ├── DATABASE.md         ──> Relational schema & indexing strategy│
│ ├── API.md              ──> OpenAPI 3.1 endpoints & error codes │
│ ├── UI_UX.md            ──> Design tokens, wireframes & a11y    │
│ ├── TRACEABILITY.md     ──> Requirements Traceability Matrix    │
│ └── DECISIONS/          ──> Architecture Decision Records (ADR) │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Why Modular Context Files Matter

1. **Token Efficiency**: Agents load only the specific context file relevant to the active task (e.g., loading `DATABASE.md` during schema migrations instead of the entire repo).
2. **Deterministic Ground Truth**: Prevents the AI from hallucinating framework versions, database column names, or business logic.
3. **Multi-Agent Orchestration**: Specialized subagents (DB Reviewer, API Reviewer) can be initialized with dedicated domain context files.
4. **Docs-as-Code Synchronization**: Context files are updated via Pull Requests alongside feature implementations.

---

## 3. Section Roadmap

- [AI Context Files Specification](./ai-context-files.md) — Comprehensive templates and guidelines for all 10 root context files.
- [AI Master Prompt Library](./ai-prompt-library.md) — Copyable prompts covering domain analysis, requirements, UML, architecture, database, API, UX, docs, and code reviews.
- [Authoritative Reference Standards](./reference-standards.md) — Attribution matrix and references for IEEE 29148, OMG UML, C4 Model, arc42, OpenAPI, NN/g, and Google Doc standards.
