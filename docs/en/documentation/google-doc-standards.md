# Google Engineering Documentation Standards

Clear, concise, and structured documentation is essential for engineering velocity. Following the **Google Developer Documentation Style Guide** and Google's Technical Writing philosophy ensures that technical documents remain actionable, accessible, and easy to maintain by humans and AI agents alike.

---

## 1. Core Principles of Google Technical Writing

```
┌─────────────────────────────────────────────────────────────────┐
│              GOOGLE TECHNICAL WRITING PRINCIPLES                │
├─────────────────────────────────────────────────────────────────┤
│ 1. Focus on the Audience                                        │
│    Write for what the reader needs to accomplish, not for what  │
│    the author knows. State prerequisites upfront.               │
│                                                                 │
│ 2. Use Active Voice & Direct Language                           │
│    ✓ "The Auth Gateway validates the JWT token."                │
│    ✗ "The JWT token is validated by the Auth Gateway."          │
│                                                                 │
│ 3. Optimize for Scannability                                    │
│    Use descriptive H2/H3 headers, bulleted lists, comparison    │
│    tables, and diagrams instead of dense walls of prose text.   │
│                                                                 │
│ 4. Unambiguous Terminology                                      │
│    Define acronyms on first use. Avoid vague pronouns ("this",  │
│    "that") and ambiguous buzzwords ("simply", "easily", "just").│
│                                                                 │
│ 5. Self-Contained Code Samples                                  │
│    Provide minimal, runnable, and commented code examples       │
│    illustrating real-world usage rather than abstract snippets. │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Document Lifecycle Management

Every engineering design document, RFC, or specification must have explicit metadata declaring its lifecycle status:

```markdown
---
title: Internship Placement Allocation Engine Design
document_id: ENG-DES-042
status: active # draft | in-review | active | superseded | deprecated
author: Alex Chen <alex@company.com>
approvers: [Tech Lead, Principal Architect, Security Lead]
last_reviewed: 2026-03-15
supersedes: ENG-DES-018
---
```

```
┌─────────────────────────────────────────────────────────────────┐
│                   DOCUMENT LIFECYCLE PIPELINE                   │
├─────────────────────────────────────────────────────────────────┤
│ [Draft] ──> [In-Review / RFC] ──> [Active] ──> [Superseded]    │
│   │                 │                 │               │         │
│ Authoring       Stakeholder       Production      Replaced by   │
│ initial idea    comments &        source of truth newer doc ID  │
│ & technical     consensus         for engineering               │
│ proposals       gathering         implementation                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Formatting & Style Rules

### A. List Formatting
- Start each bullet point with a capitalized letter.
- Use parallel grammatical structure (all start with an imperative verb or all start with a noun).
- Use numbered lists only when the sequential order is strictly required.

### B. Tables for Comparative Information
Instead of writing three paragraphs contrasting message queues, present a decision table:

| Technology | Throughput | Persistence | Operational Complexity | Recommendation |
|---|---|---|---|---|
| **RabbitMQ** | 50k msg/s | Disk & RAM | Moderate (Erlang runtime) | Preferred for complex routing |
| **Apache Kafka** | 1M+ msg/s | Distributed Log | High (ZooKeeper / KRaft) | Overkill for Phase 1 |
| **Redis Streams** | 200k msg/s | In-memory + AOF | Low (Existing infrastructure) | Selected for MVP events |

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Google-Style Technical Doc Polish & Refactor</div>

```markdown
# TASK: Refactor Technical Document according to Google Documentation Standards
You are a Principal Technical Writer adhering strictly to the Google Developer Documentation Style Guide.

## Input Document Draft:
[PASTE ROUGH TECHNICAL DRAFT OR NOTES]

## Instructions:
1. Rewrite the document adopting active voice, present tense, and second-person imperative style where appropriate.
2. Structure the content with clear, descriptive Markdown headers (H1 -> H2 -> H3).
3. Convert dense explanatory paragraphs into scannable comparison tables, bullet points, or ASCII flow diagrams.
4. Eliminate condescending filler words ("simply", "obviously", "just", "easy").
5. Add standard frontmatter metadata (Document ID, Status, Author, Approvers, Date).
```
</div>

---

## 5. Review Checklist

- [ ] Is the document written in active voice with clear actor-action relationships?
- [ ] Are all acronyms defined on first mention (e.g., *Role-Based Access Control (RBAC)*)?
- [ ] Are code snippets minimal, syntactically valid, and annotated with language tags?
- [ ] Does the document feature a metadata block with a valid lifecycle status?
- [ ] Are words like "simply", "just", and "obviously" eliminated?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Google (2024). <em>Google Developer Documentation Style Guide</em>. Google Open Source.</li>
    <li>Google (2023). <em>Technical Writing One & Two Courses</em>. Google Developers.</li>
  </ul>
</div>
