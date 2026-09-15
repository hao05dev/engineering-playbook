# 05 — Software Architecture (C4 & arc42)

Software Architecture is the foundational structure of a system, embodied in its software elements, relationships, properties, and design principles. It establishes the high-level boundaries and trade-offs that govern long-term maintainability, scalability, and security.

---

## Why Architecture Frameworks Matter for AI Agents

Without standardized architectural frameworks, AI agents design ad-hoc, entangled systems with arbitrary layer boundaries. Utilizing proven standards like the **C4 Model** and **arc42** ensures that:
- Human engineers and AI share a common mental model across abstraction levels.
- System designs are transparent, reviewable, and documented in standardized structures.
- Quality attribute trade-offs (e.g. latency vs consistency, modularity vs deployment complexity) are explicitly reasoned through.

```
┌─────────────────────────────────────────────────────────────┐
│                 SOFTWARE ARCHITECTURE FOUNDATIONS           │
├─────────────────────────────────────────────────────────────┤
│ 1. Architecture Styles ──► Monolith, Modular, Microservices │
│ 2. Visual Architecture ──► The C4 Model (Context to Code)   │
│ 3. Comprehensive Docs ──► The arc42 Framework (12 Sections) │
│ 4. Quality Attributes ──► ISO 25010 & Trade-off Analysis    │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Modules in this Section

1. [Architecture Styles & Patterns](./styles-patterns): Layered, Modular Monolith, Microservices, and Event-Driven Architecture (EDA).
2. [The C4 Model](./c4-model): Zoomable architecture visualization (System Context, Container, Component, Code).
3. [The arc42 Architecture Framework](./arc42-framework): Standardized 12-section architecture documentation.
4. [Quality Attributes & Trade-off Analysis](./quality-attributes-tradeoffs): Balancing scalability, availability, performance, and security.

---

## The 4 Golden Rules of Architecture

1. **Architecture Before Code**: Lock domain boundaries, data models, and component responsibilities before generating implementation code.
2. **Prefer Simplicity First**: Default to a clean Modular Monolith before jumping into distributed Microservices complexity.
3. **Explicit Quality Trade-offs**: Every architecture choice is a trade-off. Never claim a design is "fast, fully scalable, perfectly secure, and trivial to maintain" without acknowledging trade-offs.
4. **Standardized Documentation**: Structure architectural blueprints using the C4 Model and arc42 templates.

<div class="ref-box">
  <strong>Primary Official References:</strong>
  <ul>
    <li><a href="https://c4model.com/" target="_blank" rel="noopener">The C4 Model for Visualising Software Architecture (Simon Brown)</a></li>
    <li><a href="https://arc42.org/" target="_blank" rel="noopener">arc42 — The Architecture Documentation Template (Dr. Gernot Starke & Dr. Peter Hruschka)</a></li>
    <li>Bass, Len; Clements, Paul; Kazman, Rick (2021). <em>Software Architecture in Practice (4th Edition)</em>. Addison-Wesley.</li>
  </ul>
</div>
