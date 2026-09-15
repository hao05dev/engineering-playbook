# ADR Review Checklist & AI Prompts

To ensure architectural decisions remain rigorous and actionable, every ADR should undergo a formal peer review. This guide provides the **ADR Review Checklist** and specialized **AI Prompts** for evaluating, challenging, and maintaining decision records.

---

## 1. The ADR Review Checklist

Before marking an ADR as `accepted`, verify it against the following criteria:

- [ ] **1. Context Specificity**: Does the context section describe the specific problem without assuming a pre-determined outcome?
- [ ] **2. Decision Drivers**: Are at least 2 measurable architectural forces (e.g. latency, cost, team velocity) identified?
- [ ] **3. Viable Alternatives**: Were realistic competing options evaluated rather than "strawman" bad options?
- [ ] **4. Negative Consequences Disclosed**: Are trade-offs, operational burdens, and risks stated transparently?
- [ ] **5. Reversibility & Blast Radius**: Is it clear how difficult it would be to reverse or supersede this decision in the future?
- [ ] **6. Invariant Compatibility**: Does the decision conflict with existing accepted ADRs?

---

## 2. Maintaining the Decision Log in Git

Organize ADRs in a dedicated repository directory:

```
your-project/
└── docs/
    └── decisions/
        ├── 0001-adopt-modular-monolith.md
        ├── 0002-use-postgresql-for-persistence.md
        ├── 0003-jwt-stateless-authentication.md
        └── README.md  (Generated index of all ADRs and their statuses)
```

---

## 3. Copyable AI Prompt Templates

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: ADR Reviewer & Challenger</div>

```markdown
# TASK: Critical Peer Review of Architectural Decision Record (ADR)
You are an expert Principal Architecture Reviewer.

## Input ADR:
[PASTE THE DRAFT ADR TEXT HERE]

## Instructions:
1. Audit the ADR against the 6-Point ADR Review Checklist.
2. Specifically challenge whether the "Considered Options" were treated fairly and whether the negative trade-offs were understated.
3. Check for hidden costs (operational maintenance, testing complexity, vendor lock-in).
4. Output a formal Review Decision:
   - ACCEPT: The decision is justified and thoroughly reasoned.
   - REVISE: Critical trade-offs or missing options must be addressed.
   - REJECT: The proposed decision introduces unacceptable architectural debt.
```
</div>

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li><a href="https://adr.github.io/" target="_blank" rel="noopener">ADR Tools and Repository Guidelines</a></li>
  </ul>
</div>
