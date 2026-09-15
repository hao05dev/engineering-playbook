# Introduction to AI-SDLC

The **AI-SDLC (AI-Assisted Software Development Life Cycle)** is a disciplined, repeatable engineering methodology designed for modern software teams collaborating with autonomous AI coding agents and Large Language Models (LLMs).

Rather than treating AI as an unpredictable code generator, AI-SDLC establishes strict guardrails, structured artifacts, and clear responsibility boundaries across the entire engineering lifecycle.

---

## The Paradigm Shift

Traditional software engineering relies on manual typing, mental context retention, and slow iteration loops. With the emergence of AI coding assistants, the bottleneck moves from **syntax generation** to **specification precision, architecture validation, and quality verification**.

| Dimension | Traditional SDLC | AI-SDLC Methodology |
| :--- | :--- | :--- |
| **Primary Bottleneck** | Code authoring & typing speed | Specification clarity & test coverage |
| **Engineer Role** | Code author & syntax writer | Architect, reviewer & quality gatekeeper |
| **AI Role** | Search engine / autocomplete | High-speed co-developer & implementation engine |
| **Iteration Unit** | Manual multi-day PRs | Scoped, automated task iterations |
| **Verification** | Post-implementation manual QA | Continuous automated test-driven validation |

---

## The Two-Phase Lifecycle

AI-SDLC structures development into two balanced phases:

```
┌─────────────────────────────────────────────────────────────┐
│                    DESIGN PHASE (01 - 04)                   │
│  Domain Exploration ──► PRD ──► Technical Design ──► Tasks  │
└──────────────────────────────┬──────────────────────────────┘
                               │ Structured Context Handoff
┌──────────────────────────────▼──────────────────────────────┐
│                  EXECUTION PHASE (05 - 11)                  │
│  Plan ──► Prompt ──► Code Gen ──► Test ──► Review ──► Push   │
└─────────────────────────────────────────────────────────────┘
```

### 1. Design Phase (Human-Led, AI-Augmented)
- **01. Domain & Idea Exploration**: Clarify business domain, user pain points, and edge cases.
- **02. Product Requirement Definition (PRD)**: Formalize functional and non-functional requirements.
- **03. Technical Design**: Formulate data models, APIs, security, and component architectures.
- **04. Phasing & Task Breakdown**: Decompose architecture into granular, testable tasks.

### 2. Execution Phase (AI-Executed, Human-Governed)
- **05. Implementation Planning**: Generate concrete step-by-step file modification plans.
- **06. Prompt & AI Execute**: Issue structured prompts following the S.C.O.P.E framework.
- **07. AI Code Generation**: Generate production-grade code adhering to project standards.
- **08. AI Run Tests**: Execute unit, integration, and regression suites automatically.
- **09. Human Review & Confirm**: Zero-trust human inspection for logic, security, and edge cases.
- **10. Bug Fix**: Diagnostic feedback loops to resolve test failures and regressions.
- **11. Commit & Push**: Conventional commits, pull request creation, and CI/CD validation.

---

## Who is this Playbook for?

- **Software Engineers & Tech Leads**: Who want to 5x-10x their delivery speed without sacrificing software architecture and code quality.
- **Engineering Managers**: Who need standardized team workflows and quality guardrails for AI adoption.
- **Founders & Indie Hackers**: Who need to build resilient, production-ready systems rapidly with small teams.

> [!IMPORTANT]
> **Fundamental Thesis**
> AI is a powerful accelerator, but **you** own the codebase. Never deploy AI-generated code without architectural review, automated tests, and human verification.
