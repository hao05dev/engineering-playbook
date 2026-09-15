# Agent Rules & Constraints

Agent Rules are strict operational constraints embedded into system prompts or rules files (`.antigravity/rules/`, `.cursorrules`, `AGENTS.md`) to prevent AI agents from drifting, making unintended changes, or over-engineering solutions.

---

## 1. The 10 Invariant Agent Rules

```
┌─────────────────────────────────────────────────────────────┐
│                 THE 10 INVARIANT AGENT RULES                │
├─────────────────────────────────────────────────────────────┤
│ 1. Minimal Diff Principle                                  │
│ 2. No Unrequested Refactoring                              │
│ 3. Ask When Ambiguous (Do Not Guess)                       │
│ 4. Never Delete Existing Comments & Docs                   │
│ 5. Preserve Architecture & Patterns                        │
│ 6. Always Run Tests Before Announcing Completion           │
│ 7. No Phantom Dependencies                                 │
│ 8. Strict Type Safety (No 'any')                           │
│ 9. Do Not Hardcode Secrets                                 │
│ 10. Atomic, Descriptive Commits                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Rule Breakdown & Examples

### Rule 1: Minimal Diff Principle
> **Constraint**: Make the smallest possible set of edits required to fulfill the requirement. Do not reformat or reorganize untouched sections of the file.

### Rule 2: No Unrequested Refactoring
> **Constraint**: When asked to fix a bug in `OrderService.java`, do not rewrite the entire class, change method signatures of unrelated methods, or rename variables across the repository.

### Rule 3: Ask When Ambiguous
> **Constraint**: If a requirement has conflicting requirements or missing domain context, stop and ask the human engineer for clarification. Never guess critical business logic.

```
❌ BAD: AI assumes unverified behavior:
"Since the requirements did not specify tax rates, I defaulted to 20% for all countries."

✅ GOOD: AI asks for explicit decision:
"The PRD does not specify tax calculation rules for cross-border EU transactions. Should we use the origin rate or destination rate?"
```

### Rule 4: Preserve Comments and Documentation
> **Constraint**: Never strip existing code comments, license headers, or documentation unless explicitly instructed.

### Rule 5: No Phantom Dependencies
> **Constraint**: Do not import external packages or npm/maven libraries without explicit approval. Verify that the requested package exists in the current registry.

### Rule 6: Deterministic Verification
> **Constraint**: Always run the relevant test suite or compiler check before declaring a task completed. If a test fails, diagnose the root cause rather than modifying the test assertions to artificially pass.

---

## Agent System Prompt Excerpt

You can embed this block into your agent configuration:

```markdown
# Agent Execution Guardrails
- You are working on an existing production codebase.
- Maintain consistency with existing conventions, lint rules, and architectural layers.
- Do not introduce breaking changes to public APIs.
- Write unit tests for all new functions.
- If you encounter a build or test error, analyze the stack trace carefully and apply minimal targeted fixes.
```
