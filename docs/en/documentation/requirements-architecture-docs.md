# Requirements & Architecture Documentation

High-quality software begins with rigorous specifications. Documenting requirements and architecture bridges the communication gap between business sponsors, product managers, software architects, and AI development agents.

---

## 1. Requirements Documentation Hierarchy (BRD vs. PRD vs. SRS)

```
┌─────────────────────────────────────────────────────────────────┐
│               REQUIREMENTS SPECIFICATION TAXONOMY               │
├─────────────────────────────────────────────────────────────────┤
│ 1. Business Requirements Document (BRD)                         │
│    - Audience: Executives, Business Sponsors, Product Leads.    │
│    - Focus: Business Problem, ROI, Strategic Goals, KPIs.       │
│                                                                 │
│ 2. Product Requirements Document (PRD)                          │
│    - Audience: Product Managers, Designers, Tech Leads.         │
│    - Focus: User Personas, User Journeys, Feature Scope, UX.    │
│                                                                 │
│ 3. Software Requirements Specification (SRS - IEEE 29148)       │
│    - Audience: Software Engineers, QA Leads, AI Agents.         │
│    - Focus: Unambiguous Functional Requirements, NFRs, Data     │
│      Models, Interfaces, Error Handlers, and Edge Cases.        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Standard PRD Template Structure

```markdown
# [PRD] Feature: Automated Student Placement Engine

## 1. Context & Business Value
- **Problem Statement**: Manual allocation of 500+ students to 80 host companies takes 3 weeks and suffers from a 15% error rate.
- **Success Metric / KPI**: Reduce allocation duration from 21 days to < 2 hours with 0 constraint violations.

## 2. User Personas & Scenarios
- **Student**: Selects prioritized preferences and uploads verified CV.
- **Faculty Coordinator**: Configures allocation constraints (GPA weighting, company capacity) and triggers batch solver.

## 3. Functional Requirements
| Req ID | Description | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-01 | Match algorithm executes Gale-Shapley stable marriage model | P0 (Must) | Zero unallocated eligible students if slots exist |
| FR-02 | Email notification upon assignment publication | P1 (Should) | Dispatched within 60 seconds of approval |

## 4. Non-Functional Requirements (NFRs)
- **Performance**: Batch allocation execution completes in under 30 seconds for 1,000 students.
- **Security**: Student GPA data encrypted at rest (AES-256) and masked in audit logs.
```

---

## 3. Architecture Documentation Suite (arc42 & C4 Model)

Engineering teams use the **arc42 framework** to structure comprehensive architecture documents:

```
┌─────────────────────────────────────────────────────────────────┐
│                    arc42 CORE SECTION OVERVIEW                  │
├─────────────────────────────────────────────────────────────────┤
│ 01. Introduction and Goals (Business Context & Top Quality Goals│
│ 02. Architecture Constraints (Technical & Organizational limits)│
│ 03. Context and Scope (C4 Level 1: System Context Diagram)      │
│ 04. Solution Strategy (Key technology & architectural choices)  │
│ 05. Building Block View (C4 Level 2 Containers & Level 3 Comps) │
│ 06. Runtime View (UML Sequence Diagrams for critical workflows) │
│ 07. Deployment View (C4 Level 4: Infrastructure & Cloud Nodes)  │
│ 08. Cross-cutting Concepts (Auth, Logging, Resilience, Caching) │
│ 09. Architecture Decisions (ADR Log & References)               │
│ 10. Quality Requirements (ISO 25010 Quality Tree)               │
│ 11. Risks and Technical Debt (Identified vulnerabilities)       │
│ 12. Glossary (Ubiquitous Domain Language)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Authoring IEEE 29148 SRS & arc42 Architecture Doc</div>

```markdown
# TASK: Generate Comprehensive SRS & arc42 System Architecture Document
You are a Principal Software Architect and Requirements Engineer.

## Project Scope & Business Goals:
[PASTE PRODUCT BRIEF, FEATURES, OR USER STORIES]

## Instructions:
1. Produce an IEEE 29148-compliant Software Requirements Specification (SRS):
   - Scope, System Overview, and User Classes.
   - Structured Functional Requirements table (ID, Title, Description, Priority, Acceptance Criteria).
   - Measurable Non-Functional Requirements (ISO 25010: Latency, Throughput, Security, Availability).
2. Produce an arc42 Architecture Document:
   - System Context (C4 Level 1 in Mermaid).
   - Container Architecture (C4 Level 2 in Mermaid).
   - Runtime Sequence Diagram for the primary transactional flow.
   - Cross-cutting concerns and Security Architecture.
```
</div>

---

## 5. Review Checklist

- [ ] Are business goals linked directly to measurable KPIs?
- [ ] Does every functional requirement have unambiguous acceptance criteria?
- [ ] Are NFRs quantified with measurable metrics (e.g., p99 latency < 200ms)?
- [ ] Are architecture diagrams rendered in valid Mermaid syntax with clear actor boundaries?
- [ ] Are all critical trade-offs documented as Architecture Decision Records (ADRs)?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — <em>Systems and Software Engineering — Life Cycle Processes — Requirements Engineering</em>.</li>
    <li>Starke, Gernot & Hruschka, Peter (2023). <em>arc42 in Practice</em>. Leanpub.</li>
    <li>Brown, Simon (2020). <em>The C4 Model for Visualising Software Architecture</em>.</li>
  </ul>
</div>
