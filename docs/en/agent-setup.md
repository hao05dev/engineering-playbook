# Agent Setup & Environment Configuration

An autonomous AI coding agent is only as effective as the environment, context, and guardrails you provide. Setting up your developer workstation properly ensures seamless execution, deterministic tool usage, and zero accidental destructive actions.

---

## 1. Project Context Architecture

Modern AI coding agents read context from specialized configuration files placed at the root of your repository.

```
your-project/
├── .antigravity/             # Antigravity agent configuration & skills
│   └── rules/
│       └── coding-rules.md
├── .cursor/rules/            # Cursor IDE rule configurations
│   └── architecture.mdc
├── AGENTS.md                 # Universal Agent Guidelines (Markdown)
├── tsconfig.json             # Compiler boundary definitions
└── package.json              # Script definitions (test, lint, build)
```

### Universal `AGENTS.md` File Template

Place an `AGENTS.md` file in the project root to instruct any LLM or AI Agent:

```markdown
# Agent Instructions & Project Context

## Tech Stack
- **Backend**: Java 21, Spring Boot 3.3, Hibernate, PostgreSQL 16
- **Frontend**: Vue 3, TypeScript, Vite, Tailwind CSS
- **Testing**: JUnit 5, Mockito, Testcontainers, Vitest

## Command Rules
- Run unit tests with: `mvn test` or `npm run test`
- Format code with: `mvn spotless:apply` or `npm run format`
- Check linter with: `npm run lint`

## Architectural Invariants
1. Never import Controllers directly into other Controllers.
2. Services must communicate through interface contracts.
3. Every database modification must happen inside a transactional service method.
4. Always write unit tests for newly created services.
```

---

## 2. Tool Permissions & Safe Execution Boundaries

When configuring autonomous agents that have shell and file access, enforce the **Principle of Least Privilege**:

| Permission Category | Recommended Policy | Rationale |
| :--- | :--- | :--- |
| **File Read** | Unrestricted in workspace | Agent needs complete codebase context |
| **File Write** | Restricted to project directory | Prevent modifying system files or parent directories |
| **Git Commands** | Read-only & Branch-only | Never allow `git push --force` or modifying main directly |
| **Database Actions** | Ephemeral / Test DB only | Never connect agents to production credentials |
| **Destructive Shell** | Prompt for Confirmation | Commands like `rm -rf`, `drop table`, `kill` require human approval |

---

## 3. Local Tooling Prerequisites

To allow the AI Agent to run fast verification loops:

1. **Deterministic Test Runners**: Ensure `npm test`, `pytest`, or `mvn test` can run headlessly from the CLI and output structured error stacks.
2. **Fast Linting & Formatting**: Configure linters (e.g. ESLint, Biome, Spotless) so the agent can self-correct formatting violations before human review.
3. **Containerized Dependencies**: Use `docker-compose` or Testcontainers so agents can spin up PostgreSQL, Redis, or Kafka instances locally without manual environment drift.

> [!TIP]
> **Context Optimization**
> Keep your `.gitignore` and agent exclude lists updated. Avoid letting agents index large directories like `node_modules/`, `target/`, `dist/`, or binary assets, which waste context tokens and degrade reasoning speed.
