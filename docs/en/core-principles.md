# Core Principles

The AI-SDLC methodology is built upon five non-negotiable engineering principles. These principles ensure software teams maximize velocity while preventing technical debt, security vulnerabilities, and architectural decay.

---

## 1. AI is an Assistant, You Own the Code

```
┌─────────────────────────────────┐
│        Human Developer          │  ◄── Architecture, Ownership, Security, Logic
└────────────────┬────────────────┘
                 │ Commands & Prompts
┌────────────────▼────────────────┐
│            AI Agent             │  ◄── Syntax, Drafting, Scaffolding, Test Running
└─────────────────────────────────┘
```

- **Accountability**: You are 100% accountable for every line of code merged into the repository.
- **No Hallucinated Trust**: Never assume AI generated correct logic just because it compiles or sounds convincing.
- **Deep Understanding**: If you cannot explain every line of the AI's output, you are not ready to approve it.

---

## 2. Granular & Scoped Iterations

LLMs perform with peak accuracy when the problem scope is tight, well-defined, and isolated.

> [!TIP]
> **The Golden Rule of Scope**
> Aim for tasks that touch **1 to 3 related files** and require less than **150 lines of net change**. Large, monolithic prompts lead to hallucinations, skipped edge cases, and subtle regressions.

- Break multi-day features into modular 15–30 minute execution units.
- Always provide relevant context (interfaces, schemas, types) without polluting the prompt with irrelevant files.

---

## 3. Test-Driven Verification (TDD First)

Verification is the ultimate counterweight to AI nondeterminism.

```
Write Test / Spec ──► AI Generates Code ──► Run Automated Test ──► Green / Refactor
```

- **Spec before Code**: Define unit test assertions or integration criteria before prompting the AI to implement business logic.
- **Deterministic Green**: A task is only complete when automated tests pass locally and in CI/CD.
- **Negative Testing**: Always require tests for error conditions, authorization failures, and boundary inputs.

---

## 4. Zero-Trust Code Review

Treat all AI-generated code as code submitted by an external, ultra-fast junior contributor.

> [!WARNING]
> **Common AI Code Pitfalls**
> - Swallowing exceptions or printing empty logs.
> - Inventing non-existent third-party library functions.
> - Bypassing input sanitization, leading to SQL injection or XSS.
> - Subtle off-by-one errors and unbounded loops.

### Human Review Checklist:
1. **Security**: Does this introduce unauthorized data access or unvalidated inputs?
2. **Performance**: Are there N+1 database queries, memory leaks, or missing indexes?
3. **Maintainability**: Does the code adhere to the project's design patterns and naming conventions?
4. **Idempotency & Resilience**: How does this handle network timeouts and transaction rollbacks?

---

## 5. Architectural Integrity First

Never let AI dictate architectural choices in an ad-hoc manner.

- Architecture, domain models, database schemas, and API contracts must be decided in the **Design Phase** before writing code.
- AI must adhere to the defined patterns (e.g., Domain-Driven Design, Hexagonal Architecture, Clean Architecture, CQRS) rather than introducing arbitrary structures.

---

## Summary Matrix

| Principle | Anti-Pattern | Recommended Practice |
| :--- | :--- | :--- |
| **Ownership** | Blind copy-pasting into production | Line-by-line understanding and approval |
| **Granularity** | "Build me an entire eCommerce backend" | "Implement `applyDiscountCoupon` logic in `DiscountService`" |
| **Testing** | Manual visual clicking in UI | Unit tests, integration tests, mock assertions |
| **Review** | Skimming diffs quickly | Zero-trust security, performance & logic audit |
| **Architecture** | Allowing AI to create random folders & helpers | Strict adherence to existing layer boundaries |
