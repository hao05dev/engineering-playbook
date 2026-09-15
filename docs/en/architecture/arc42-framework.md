# The arc42 Architecture Documentation Framework

Created by Dr. Gernot Starke and Dr. Peter Hruschka, **arc42** is the internationally recognized open standard for software architecture documentation. It provides a pragmatic, comprehensive **12-section template** that answers every critical question about a system's structure.

---

## 1. The 12 Sections of arc42

```
┌─────────────────────────────────────────────────────────────┐
│                     THE arc42 STRUCTURE                     │
├─────────────────────────────────────────────────────────────┤
│ 01. Introduction and Goals (Business context & top 3 goals) │
│ 02. Architecture Constraints (Non-negotiable limits)        │
│ 03. Context and Scope (Business & technical boundaries)     │
│ 04. Solution Strategy (Fundamental architectural decisions) │
│ 05. Building Block View (Hierarchical component breakdown)  │
│ 06. Runtime View (Scenarios, state changes, message flows)  │
│ 07. Deployment View (Hardware, infrastructure & networks)   │
│ 08. Cross-cutting Concepts (Security, logging, transactions)│
│ 09. Architecture Decisions (Links to ADR records)           │
│ 10. Quality Requirements (Quality tree & scenarios)         │
│ 11. Risks and Technical Debt (Known risks & mitigation)     │
│ 12. Glossary (Ubiquitous language & abbreviations)          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Section Breakdown & Engineering Deliverables

### Section 1: Introduction and Goals
- **Key Deliverables**: Top 3 Quality Goals (e.g. 1. Security, 2. Reliability, 3. Performance) and primary Stakeholder expectation table.

### Section 3: Context and Scope
- **Key Deliverables**: C4 Level 1 System Context diagram showing all external technical interfaces and protocols.

### Section 5: Building Block View
- **Key Deliverables**: C4 Level 2 (Containers) and Level 3 (Components) decomposing black boxes into white boxes.

### Section 8: Cross-Cutting Concepts
- **Key Deliverables**: Unified guidelines for Security (JWT/RBAC), Logging (MDC/Structured JSON), Exception Handling, and Database Transactions.

### Section 10: Quality Requirements (Quality Tree)
- **Key Deliverables**: ATAM (Architecture Trade-off Analysis Method) quality scenarios mapping to ISO 25010 metrics.

---

## 3. Practical Example: arc42 Section 8 Excerpt (Cross-Cutting Concepts)

```markdown
### 8.1 Security Concept
- Authentication via OIDC / JWT with RSA-256 asymmetric signatures.
- Authorization enforced at the Service layer using Spring Security `@PreAuthorize("hasRole('ADVISOR')")`.

### 8.2 Structured Observability Concept
- Structured JSON logs emitted with Correlation ID (`traceId`, `spanId`) passed via HTTP Header `X-Correlation-Id`.
- Prometheus metrics exported at `/actuator/prometheus` for P95 latency and error rate alerts.
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: arc42 Architecture Document Authoring</div>

```markdown
# TASK: Generate an arc42 Software Architecture Document
You are a Principal Software Architect certified in the arc42 framework.

## Input Context:
System & Requirements: [PASTE PRD, SYSTEM CONTEXT, OR SRS]

## Instructions:
1. Author a comprehensive Software Architecture Document conforming to the 12-section arc42 standard.
2. Formulate explicit Solution Strategies, Building Block Views (C4 mapping), and Cross-cutting Concepts (Auth, Logging, Transactions).
3. Include Section 9 (Architecture Decisions) referencing key ADRs.
4. Structure Section 10 with a prioritized Quality Tree.
5. Identify known risks and technical debt in Section 11.
```
</div>

---

## 5. Review Checklist

- [ ] Are all 12 sections addressed or explicitly marked as not applicable with justification?
- [ ] Does Section 5 (Building Block View) align consistently with the C4 diagrams?
- [ ] Are cross-cutting architectural patterns (Auth, Logging, Transactions) documented in Section 8?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Starke, Gernot (2020). <em>Effective Software Architectures: A Practical Approach with arc42</em>. Leanpub.</li>
    <li>Official arc42 Template & Documentation: <a href="https://arc42.org/" target="_blank" rel="noopener">https://arc42.org/</a></li>
  </ul>
</div>
