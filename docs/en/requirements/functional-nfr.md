# Functional vs. Non-Functional Requirements

Software requirements are divided into two fundamental categories: **Functional Requirements (FR)** which describe *what* the system does, and **Non-Functional Requirements (NFR)** which specify *how well* the system performs under constraints.

---

## 1. Functional vs. Non-Functional Requirements

```
┌─────────────────────────────────────────────────────────────┐
│                 REQUIREMENTS TAXONOMY                       │
├─────────────────────────────────────────────────────────────┤
│ • Functional Requirements (FR): System behaviors, inputs,  │
│   outputs, transformations, state changes, business logic.  │
│                                                             │
│ • Non-Functional Requirements (NFR): Quality attributes,    │
│   performance thresholds, security guarantees, reliability. │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The ISO/IEC 25010 Software Quality Model

To prevent omitting critical operational attributes, requirements engineers classify NFRs using the **ISO/IEC 25010** quality model:

| Quality Characteristic | Definition | Example Requirement |
| :--- | :--- | :--- |
| **Performance Efficiency** | Response times, throughput, resource consumption | *NFR-PERF-01*: P95 latency for search API shall be < 150ms at 1,000 QPS. |
| **Security** | Confidentiality, integrity, authentication, authorization | *NFR-SEC-01*: All passwords shall be hashed using Argon2id with m=65536, t=3, p=4. |
| **Reliability & Availability**| Uptime, fault tolerance, MTTR | *NFR-REL-01*: System availability shall exceed 99.9% uptime per calendar month. |
| **Maintainability** | Testability, modularity, modifiability | *NFR-MNT-01*: Code coverage for domain service packages shall exceed 85%. |
| **Usability & Accessibility**| Learnability, accessibility (WCAG 2.1 AA) | *NFR-ACC-01*: All UI views shall comply with WCAG 2.1 Level AA color contrast ratios. |
| **Compatibility** | Interoperability with external protocols | *NFR-CMP-01*: System shall export calendar invites using the iCalendar (RFC 5545) format. |

---

## 3. Quantifying NFRs (Eliminating Subjective Statements)

Unquantified NFRs are untestable. Never allow statements like *"The system must be secure and fast."*

```
┌─────────────────────────────────────────────────────────────┐
│                 QUANTIFYING NFR TEMPLATE                    │
├─────────────────────────────────────────────────────────────┤
│ Scale: The measurement unit (e.g. milliseconds, percentage) │
│ Baseline: Current system state (e.g. 1.2s response time)   │
│ Target: The mandatory threshold (e.g. < 250ms)              │
│ Constraint Load: Under conditions (e.g. 5,000 concurrent)   │
│ Verification: Automated test tool (e.g. k6 / Gatling)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: NFR Extraction & Quantification</div>

```markdown
# TASK: Functional vs. Non-Functional Requirements Specification
You are an expert Quality Architect and Performance Engineer.

## Input Context:
Feature/System: [DESCRIBE THE SYSTEM OR COMPONENT]

## Instructions:
1. Decompose the feature into unambiguous Functional Requirements (FRs).
2. For each ISO/IEC 25010 category (Performance, Security, Reliability, Maintainability, Usability), define at least one quantified NFR.
3. For every NFR, specify: Metric Unit, Target Threshold, Worst Acceptable Threshold, and Automated Verification Tool (e.g., k6, SonarQube, OWASP ZAP).
4. Tag items with [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 5. Review Checklist

- [ ] Does every NFR specify a numeric metric that can be tested in an automated pipeline?
- [ ] Are security NFRs mapped to recognized standards (e.g. OWASP ASVS, NIST)?
- [ ] Are performance criteria coupled with specific load conditions (e.g., concurrency, dataset size)?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC 25010:2023 — Systems and software Quality Requirements and Evaluation (SQuaRE).</li>
    <li>Gilb, Tom (2005). <em>Competitive Engineering: A Handbook For Systems Engineering</em>. Elsevier.</li>
  </ul>
</div>
