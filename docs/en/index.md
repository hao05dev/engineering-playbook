---
layout: home

hero:
  name: "AI-SDLC Engineering Playbook"
  text: "Practical Engineering Workflow with AI"
  tagline: "A practical engineering workflow for building software with AI — from requirements and technical design to implementation, testing, review, and delivery."
  image:
    src: /logo.svg
    alt: AI-SDLC Engineering Playbook
  actions:
    - theme: brand
      text: Get Started (Introduction)
      link: /en/introduction
    - theme: alt
      text: 11-Step Workflow
      link: /en/domain-exploration
    - theme: alt
      text: Đọc bằng Tiếng Việt
      link: /vi/

features:
  - icon: 📐
    title: 1. Design Phase
    details: Domain exploration, precise product requirements (PRD), architectural technical designs, and deterministic task breakdown.
  - icon: ⚡
    title: 2. Execution Phase
    details: Implementation planning, structured S.C.O.P.E prompting, AI code generation, automated test execution, and bug diagnostics.
  - icon: 🔒
    title: 3. Quality & Governance
    details: Zero-trust human reviews, explicit quality gates, coding standards, and rigorous agent constraint rules.
---

## 11-Step AI-SDLC Workflow Overview

The AI-SDLC methodology divides software engineering into two synchronized phases: **Design** and **Execution**.

```
  [01 Domain Exploration]
            │
            ▼
  [02 Product Requirements]
            │
            ▼
  [03 Technical Design]
            │
            ▼
  [04 Task Breakdown]
            │
            ▼
  [05 Implementation Planning]
            │
            ▼
  [06 Prompt & AI Execute] ──► [07 AI Code Generation]
                                       │
                                       ▼
                               [08 AI Run Tests]
                                       │
                                       ▼
  [11 Commit & Push] ◄── [10 Bug Fix] ◄── [09 Human Review]
```

### Core Principle

> **"AI is a development assistant, not the owner of the code."**
> 
> Software engineers are responsible for system architecture, business correctness, security, and maintainability. AI acts as an ultra-fast drafting engine and implementation partner.

<div class="workflow-stepper">
  <div class="workflow-card">
    <div class="step-heading"><span class="badge-step">Phase 1</span> Design Phase (Steps 01 - 04)</div>
    <p class="step-desc">Establish clear domain context, write unambiguous requirement specifications, formulate data/system architectures, and divide scope into small, verifiable chunks.</p>
  </div>
  <div class="workflow-card">
    <div class="step-heading"><span class="badge-step">Phase 2</span> Execution Phase (Steps 05 - 11)</div>
    <p class="step-desc">Create technical implementation plans, construct structured prompts, generate scoped code, run automated test suites, conduct strict human reviews, diagnose failures, and commit clean changes.</p>
  </div>
</div>
