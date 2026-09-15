# Architecture Styles & Patterns

Selecting the appropriate architectural style is the most consequential technical decision in a software project. This guide compares **Layered Architecture**, **Modular Monolith**, **Microservices**, and **Event-Driven Architecture (EDA)**, providing decision criteria for engineers and AI agents.

---

## 1. The 4 Major Architectural Styles

```
┌─────────────────────────────────────────────────────────────┐
│                 ARCHITECTURAL STYLES SPECTRUM               │
├─────────────────────────────────────────────────────────────┤
│ 1. Layered Architecture (N-Tier): Classic separation        │
│ 2. Modular Monolith: Domain modules inside single artifact  │
│ 3. Microservices: Independently deployed distributed units  │
│ 4. Event-Driven Architecture (EDA): Asynchronous pub/sub    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Comparative Decision Matrix

| Dimension | Layered Monolith | Modular Monolith | Microservices | Event-Driven (EDA) |
| :--- | :--- | :--- | :--- | :--- |
| **Deployment Unit** | Single executable | Single executable | Many containers / pods | Distributed services + Broker |
| **Data Storage** | Single shared DB | Single DB / Isolated Schemas | Database-per-service | Decentralized event stores |
| **Communication** | In-memory method calls | In-memory module APIs | Network (REST / gRPC) | Async Events (Kafka / RabbitMQ)|
| **Operational Overhead**| Very Low | Low | Very High (K8s, mesh, tracing) | High (Event ordering, idempotency)|
| **Transaction Model** | ACID Transactions | ACID Transactions | 2PC / Sagas (Eventual) | Sagas / Eventual Consistency |
| **Recommended For** | Simple CRUD apps | **90% of SaaS & Enterprise** | Large, multi-team scale | Real-time streams, telemetry |

---

## 3. Deep Dive: The Modular Monolith (The Sweet Spot)

For most applications, the **Modular Monolith** provides high domain isolation without the distributed complexity of microservices:

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODULAR MONOLITH BOUNDARY                    │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐         ┌─────────────────────────┐ │
│ │  Module: Internship     │         │  Module: Notification   │ │
│ │  - Domain Logic         │         │  - Email / SMS Delivery │ │
│ │  - Package Private Repo │         │  - Template Engine      │ │
│ └────────────┬────────────┘         └────────────▲────────────┘ │
│              │ In-Process Event                  │              │
│              └───────────────────────────────────┘              │
│                                                                 │
│ Single Spring Boot / Node.js Deployment Unit                    │
│ Single PostgreSQL Database with Schema Isolation                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. When to Propose Microservices (AI Challenge Rule)

> [!WARNING]
> **AI Must Challenge Microservice Proposals**
> If a developer proposes: *"Let's build this new 3-person project as microservices with Kafka."*
> The AI MUST challenge the proposal:
> *"Potential Issue: Microservices introduce network latency, distributed transaction complexity (Sagas), and heavy DevOps overhead. For a 3-person team, a Modular Monolith delivers the same domain boundaries with 5x faster iteration. Recommended: Option 2 (Modular Monolith)."*

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Architecture Style Selection & Trade-off Analysis</div>

```markdown
# TASK: Architecture Style Evaluation & Trade-off Analysis
You are a Principal Software Architect.

## Input Context:
Project Domain & Requirements: [DESCRIBE PROJECT, TEAM SIZE, TRAFFIC EXPECTATIONS]
Proposed Architecture: [INSERT PROPOSED STYLE]

## Instructions:
1. Evaluate the proposed architecture against: Operational Complexity, Latency, Data Consistency, and Team Cognitive Load.
2. If the proposed architecture is over-engineered (e.g. premature microservices), challenge the proposal and present 3 alternatives with trade-offs.
3. Recommend the optimal architecture style with justified rationale.
4. Output your analysis using [CONFIRMED], [ASSUMPTION], [PROPOSAL], and [QUESTION] markers.
```
</div>

---

## 6. Review Checklist

- [ ] Does the chosen architecture match the current team size and operational capabilities?
- [ ] Are domain boundaries enforced via strict language access modifiers or in-memory API contracts?
- [ ] Is eventual consistency and distributed transaction handling accounted for if microservices are chosen?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Fowler, Martin (2015). <em>MonolithFirst</em>. martinfowler.com.</li>
    <li>Newman, Sam (2021). <em>Building Microservices (2nd Edition)</em>. O'Reilly Media.</li>
    <li>Richards, Mark & Ford, Neal (2020). <em>Fundamentals of Software Architecture</em>. O'Reilly Media.</li>
  </ul>
</div>
