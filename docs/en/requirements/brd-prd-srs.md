# Document Hierarchy: BRD vs. PRD vs. SRS

A major source of confusion in software engineering is conflating business goals, product behavior, and engineering contracts. This guide formalizes the **3-Tier Document Hierarchy**: **BRD**, **PRD**, and **SRS**.

---

## 1. The 3-Tier Document Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                 THE 3-TIER REQUIREMENTS MODEL               │
├─────────────────────────────────────────────────────────────┤
│ Level 1: Business Requirements Document (BRD)               │
│ └── Target: Executives & Sponsors (Business Value & ROI)    │
│                                                             │
│ Level 2: Product Requirements Document (PRD)                │
│ └── Target: Product Managers & Designers (User UX & Scope)  │
│                                                             │
│ Level 3: Software Requirements Specification (SRS)          │
│ └── Target: Engineers, Architects & QA (Technical Contract) │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Comparison Matrix

| Dimension | BRD (Business) | PRD (Product) | SRS (Software) |
| :--- | :--- | :--- | :--- |
| **Primary Question**| *Why are we building this?* | *What are users experiencing?*| *How must software behave?* |
| **Primary Audience**| C-Suite, Business Sponsors, Finance | Product Managers, UX Designers | Software Engineers, Architects, QA |
| **Standard Reference**| BABOK Guide | Lean Product Playbook | ISO/IEC/IEEE 29148 / IEEE 830 |
| **Key Contents** | Business Goals, ROI, Market Fit | User Stories, Wireframes, Personas| Formal Functional Specs, DB, APIs |
| **Technical Depth** | Zero technical details | Moderate (User interactions) | High (Data types, algorithms, SLAs)|

---

## 3. Standard SRS Document Structure (IEEE 29148 Template)

The SRS is the official engineering specification used by AI agents to construct software:

```markdown
1. Introduction
   1.1 Purpose
   1.2 Scope of System
   1.3 Definitions, Acronyms & Abbreviations
   1.4 References
2. Overall Description
   2.1 Product Perspective & System Interfaces
   2.2 User Characteristics & Personas
   2.3 Operating Environment & Constraints
   2.4 Assumptions and Dependencies
3. Specific Requirements
   3.1 External Interface Requirements (API, UI, Hardware)
   3.2 System Features & Functional Requirements (FR-01, FR-02...)
   3.3 Non-Functional Requirements (Performance, Security, Reliability)
   3.4 Database & Data Management Requirements
4. Verification & Validation Matrix
```

---

## 4. Practical Example: From BRD Goal to SRS Specification

- **BRD Goal**: *"Increase university corporate partner retention by 20% by eliminating manual paperwork delays."*
- **PRD User Story**: *"As a Corporate Recruiter, I want to review pre-screened student applicants on a dashboard so that I can schedule interviews within 48 hours."*
- **SRS Technical Requirement (FR-REC-01)**: *"When a Recruiter clicks 'Schedule Interview', the System **shall** query the Student's Google Calendar availability via OAuth2 within 500ms, display open 30-minute time slots, and emit an `InterviewScheduledEvent` upon confirmation."*

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Formal SRS Generation</div>

```markdown
# TASK: Generate ISO/IEC/IEEE 29148 Software Requirements Specification (SRS)
You are a Principal Requirements Architect.

## Input Source Material:
Product PRD / Feature Specification: [PASTE PRD OR APPROVED REQUIREMENTS HERE]

## Invariant Rule:
Generate the SRS only from CONFIRMED business rules. If any critical technical detail is missing, insert a [QUESTION] marker rather than making unauthorized assumptions.

## Required Output Structure:
1. Section 1: Scope and System Interfaces.
2. Section 2: User Personas and Operating Constraints.
3. Section 3: Formal IEEE 29148 Functional Requirements (ID, Statement with SHALL, Input/Output, Error Case).
4. Section 4: Non-Functional Requirements (ISO 25010 metrics).
5. Section 5: Verification & Acceptance Criteria Matrix.
```
</div>

---

## 6. Review Checklist

- [ ] Does the SRS avoid mixing high-level business marketing language with low-level technical specifications?
- [ ] Is every functional requirement in the SRS traceable back to a user story in the PRD and a business goal in the BRD?
- [ ] Does the SRS follow the IEEE 29148 standardized section structure?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Section 9: Software Requirements Specification (SRS) Structure.</li>
    <li>IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications (Superseded by 29148).</li>
  </ul>
</div>
