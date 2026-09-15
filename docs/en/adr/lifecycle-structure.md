# ADR Structure & Lifecycle (MADR Standard)

This guide provides the formal **Markdown Architectural Decision Record (MADR v3.0)** template and documents the state lifecycle of architectural decisions.

---

## 1. The ADR Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                       ADR STATE MACHINE                     │
├─────────────────────────────────────────────────────────────┤
│   ● (Start) ──► [PROPOSED] ──► [ACCEPTED] ──► [SUPERSEDED]  │
│                      │                                      │
│                      ▼                                      │
│                 [REJECTED]                                  │
└─────────────────────────────────────────────────────────────┘
```

- **PROPOSED**: Under active discussion and review by the engineering team.
- **ACCEPTED**: Formally approved; engineers and AI agents must strictly adhere to this decision.
- **REJECTED**: Evaluated but declined; preserved in Git history to prevent re-debating.
- **DEPRECATED**: The decision is no longer relevant due to changed requirements.
- **SUPERSEDED**: Replaced by a newer record (e.g., *Superseded by ADR-014*).

---

## 2. Standard MADR v3.0 Template

```markdown
# [Short title of solved problem and decided option]

* Status: [proposed | accepted | rejected | deprecated | superseded by ADR-00X]
* Deciders: [list everyone involved in the decision]
* Date: [YYYY-MM-DD when the decision was last updated]

Technical Story: [description or link to Jira/GitHub Issue]

## Context and Problem Statement
[Describe the context and problem statement in 2-3 sentences. What forces make this decision necessary?]

## Decision Drivers
* [driver 1, e.g., low operational complexity]
* [driver 2, e.g., ACID transactions required]

## Considered Options
* [Option 1 - The selected option]
* [Option 2 - An alternative option]
* [Option 3 - An alternative option]

## Decision Outcome
Chosen option: "[Option 1]", because [justification. e.g., only option that satisfies driver 1 and 2].

### Positive Consequences
* [e.g., High data consistency out of the box]
* [e.g., Simple local developer setup]

### Negative Consequences / Trade-offs
* [e.g., Slightly higher memory footprint on small instances]

## Pros and Cons of the Options

### [Option 1]
* Good, because [argument a]
* Bad, because [argument b]

### [Option 2]
* Good, because [argument a]
* Bad, because [argument b - why it was rejected]
```

---

## 3. Practical Example: ADR-001 Modular Monolith Selection

```markdown
# ADR-001: Adopt Modular Monolith Architecture for Internship Portal

* Status: accepted
* Deciders: Lead Architect, Engineering Lead
* Date: 2026-09-15

## Context and Problem Statement
The University Internship Portal needs to support 2,000 active students and 150 corporate partners. The engineering team consists of 4 developers. We must decide between a Distributed Microservices architecture and a Modular Monolith.

## Decision Drivers
* Rapid delivery time-to-market.
* Low DevOps operational complexity.
* Strong ACID transaction integrity across student placements.

## Considered Options
* Option 1: Modular Monolith in Spring Boot 3.3 with Java packages as module boundaries.
* Option 2: 5 Independent Microservices deployed to Kubernetes with Kafka messaging.

## Decision Outcome
Chosen option: "Option 1 (Modular Monolith)", because it eliminates network latency and distributed transaction complexity while keeping domain boundaries clean.

### Positive Consequences
* Single deployment artifact simplifies CI/CD to a 2-minute pipeline.
* ACID database transactions prevent race conditions during placement quota reservation.

### Negative Consequences
* All modules must share the same Java runtime version.
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: MADR Architectural Decision Record Authoring</div>

```markdown
# TASK: Author a MADR v3.0 Architectural Decision Record (ADR)
You are an expert Software Architecture Documenter.

## Input Decision Context:
Technical Dilemma: [DESCRIBE THE PROBLEM, E.G., CHOOSING BETWEEN POSTGRES VS MONGO, OR JWT VS SESSION]
Candidate Options: [LIST THE OPTIONS CONSIDERED]

## Instructions:
1. Generate an ADR conforming strictly to MADR v3.0 format.
2. Formulate explicit Decision Drivers, Context Statement, Decision Outcome, Positive Consequences, and Negative Consequences.
3. Provide a structured Pros/Cons breakdown for every considered option.
4. Mark the status as [PROPOSED] and flag missing drivers with [QUESTION].
```
</div>

---

## 5. Review Checklist

- [ ] Does the ADR clearly state the problem context before jumping to the decision?
- [ ] Are at least two realistic alternatives evaluated with honest Pros and Cons?
- [ ] Are negative consequences and trade-offs explicitly documented?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>MADR Standard Specification: <a href="https://adr.github.io/madr/" target="_blank" rel="noopener">https://adr.github.io/madr/</a></li>
  </ul>
</div>
