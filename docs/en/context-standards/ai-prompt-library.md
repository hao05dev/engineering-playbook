# AI Master Prompt Library

This prompt library provides production-ready, standardized system and task prompts covering all 12 software engineering disciplines in the knowledge base.

---

## 1. Domain & Business Analysis Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 01: Domain Discovery & Ubiquitous Glossary</div>

```markdown
# TASK: Domain Discovery & Glossary Formulation
You are a Principal Domain Analyst and DDD Specialist.

## Feature / Project Brief:
[PASTE BUSINESS DESCRIPTION OR FEATURE REQUEST]

## Instructions:
1. Extract all core Business Entities, Value Objects, and Domain Events.
2. Formulate a Ubiquitous Glossary defining all business terms with unambiguous semantics.
3. Identify all strict Business Invariants (rules that must NEVER be violated).
4. Output in scannable Markdown tables.
```
</div>

---

## 2. Requirements Engineering (IEEE 29148) Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 02: IEEE 29148 Functional & Non-Functional Requirements Specification</div>

```markdown
# TASK: Author IEEE 29148 Requirements Suite
You are a Lead Requirements Engineer.

## Input Context:
[PASTE PRODUCT BRIEF OR USER STORIES]

## Instructions:
1. Structure Functional Requirements into an IEEE 29148 table (ID, Title, Description, Priority, Acceptance Criteria in Given-When-Then format).
2. Specify quantified Non-Functional Requirements under ISO 25010 (Latency, Throughput, Availability, Security).
3. Flag all unverified assumptions with `[ASSUMPTION]` and blocking unknowns with `[QUESTION]`.
```
</div>

---

## 3. System Analysis & UML Modeling Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 03: OMG UML Sequence & State Machine Generation</div>

```markdown
# TASK: Generate OMG UML Sequence & State Machine Diagrams
You are a Principal Systems Architect.

## Workflow Description:
[PASTE TRANSACTION OR LIFECYCLE FLOW]

## Instructions:
1. Generate a Mermaid Sequence Diagram distinguishing Synchronous (`->>`) and Asynchronous (`-->>`) calls.
2. Encapsulate validation failures in `alt ... else ... end` conditional blocks.
3. Generate a State Transition Table and Mermaid State Diagram for all entity lifecycle stages.
```
</div>

---

## 4. Software Architecture (C4 & arc42) Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 04: C4 Model & arc42 Architecture Specification</div>

```markdown
# TASK: Author C4 Container Architecture & arc42 Solution Strategy
You are a Chief Software Architect.

## System Scope:
[PASTE SYSTEM REQUIREMENTS OR REPO CONTEXT]

## Instructions:
1. Produce C4 Level 1 (System Context) and C4 Level 2 (Container Diagram) using Mermaid syntax.
2. Outline the arc42 Solution Strategy and Building Block views.
3. Explicitly document cross-cutting concerns (Authentication, Logging, Resilience, Caching).
```
</div>

---

## 5. Architecture Decision Record (ADR / MADR) Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 05: MADR-Compliant Architecture Decision Record</div>

```markdown
# TASK: Author Architecture Decision Record (ADR)
You are a Principal Software Architect.

## Decision Context:
[PASTE ARCHITECTURAL PROBLEM, TRADE-OFFS, OR TECHNOLOGY CHOICE]

## Instructions:
Draft a complete MADR 3.0.0 ADR with:
1. Title, Status (Proposed/Accepted), Deciders, and Date.
2. Context and Problem Statement.
3. Decision Drivers (Priorities & Constraints).
4. Considered Options with Pros and Cons analysis.
5. Decision Outcome and Positive/Negative Consequences.
```
</div>

---

## 6. Database Engineering Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 06: Relational Schema DDL & Indexing Strategy</div>

```markdown
# TASK: Design 3NF Relational Database Schema & Indexing Plan
You are a Principal Database Administrator & PostgreSQL Specialist.

## Domain Model:
[PASTE ENTITIES, ATTRIBUTES, AND QUERY ACCESS PATTERNS]

## Instructions:
1. Produce PostgreSQL 16 DDL with primary keys (UUID), foreign keys, and check constraints.
2. Design indexing strategy (B-Tree, Partial, Composite) with explicit query rationale.
3. Include concurrency controls (Optimistic locking `version INT` or Pessimistic locking rules).
```
</div>

---

## 7. API Engineering (OpenAPI 3.1) Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 07: OpenAPI 3.1 RESTful Contract Specification</div>

```markdown
# TASK: Generate OpenAPI 3.1 RESTful Endpoint Specification
You are a Staff API Architect.

## Feature / Resource:
[PASTE RESOURCE REQUIREMENTS AND WORKFLOWS]

## Instructions:
1. Design RESTful endpoint URIs following plural noun conventions.
2. Define JSON schemas for Request Payloads and 200/201/400/401/403/404/409/422 responses.
3. Enforce `Idempotency-Key` headers for state-mutating POST/PATCH operations.
4. Standardize Keyset/Offset pagination and filtering parameters.
```
</div>

---

## 8. UI/UX & Accessibility (WCAG 2.2 AA) Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 08: UI State Design & Web Accessibility Audit</div>

```markdown
# TASK: Design Component States & WCAG 2.2 AA Accessibility Spec
You are a Principal UI/UX Engineer & Accessibility Specialist.

## Component / Screen Description:
[PASTE SCREEN WIREFRAME OR FRONTEND COMPONENT]

## Instructions:
1. Define visual and behavioral specifications for all 4 UI States: Loading, Empty, Error, Success.
2. Enforce WCAG 2.2 Level AA compliance (semantic HTML, ARIA bindings, focus management).
3. Verify color contrast ratios (minimum 4.5:1 text, 3:1 UI borders).
```
</div>

---

## 9. Technical Documentation & Refactoring Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 09: Google-Style Technical Documentation Refactoring</div>

```markdown
# TASK: Refactor Technical Spec according to Google Documentation Standards
You are a Senior Technical Writer.

## Draft Spec:
[PASTE DRAFT SPECIFICATION OR NOTES]

## Instructions:
1. Rewrite using active voice, present tense, and concise technical style.
2. Format scannable Markdown comparison tables and bullet points.
3. Eliminate vague filler terms ("obviously", "simply", "just").
4. Add standard document metadata frontmatter.
```
</div>

---

## 10. AI Collaboration & Multi-Perspective Review Prompts

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 Prompt 10: Multi-Perspective Specialized Engineering Review Panel</div>

```markdown
# TASK: Execute Multi-Disciplinary Engineering Review
You are a Panel of Specialized Reviewers (Requirements, Architecture, Database, API, UI/UX).

## Artifact to Review:
[PASTE SYSTEM SLICE, ERD, API SPEC, OR PULL REQUEST]

## Instructions:
1. Evaluate against IEEE 29148, OMG UML, C4/arc42, 3NF Indexing, OpenAPI 3.1, and Nielsen Heuristics.
2. Produce a prioritized defect matrix:
   - **P0 Blockers**: Must fix before code changes.
   - **P1 Warnings**: Architectural risks or edge case gaps.
   - **P2 Suggestions**: Optimization opportunities.
3. Provide concrete code/DDL remediation snippets for all P0 and P1 issues.
```
</div>

---

## 11. Review Checklist

- [ ] Does every prompt specify the persona, input context, and structured output expectations?
- [ ] Are prompts aligned with the corresponding international engineering standard?
- [ ] Do prompts enforce the Information Classification badges (`[CONFIRMED]`, `[ASSUMPTION]`, etc.)?
