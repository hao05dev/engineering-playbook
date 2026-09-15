# 04 — System Analysis & UML (OMG UML)

System Analysis bridges business requirements and software architecture through visual, standardized modeling languages. The **Object Management Group Unified Modeling Language (OMG UML v2.5.1)** provides the formal graphical notation used by developers and AI agents to design, analyze, and communicate software systems.

---

## The Role of OMG UML in the AI Era

Without standardized UML diagrams, AI agents generate ambiguous text descriptions that lead to subtle structural flaws. UML serves as a visual formal contract:

```
┌─────────────────────────────────────────────────────────────┐
│                     THE 2 FAMILIES OF UML                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Structural Diagrams (Static Anatomy)                     │
│    └── Class, Domain Model, Component, Deployment           │
│                                                             │
│ 2. Behavioral Diagrams (Dynamic Interactions)               │
│    └── Use Case, Activity, Sequence, State Machine          │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Modules in this Section

1. [Use Case & Activity Diagrams](./use-case-activity): Functional boundaries, actor interactions, and operational workflows.
2. [Sequence & State Machine Diagrams](./sequence-state): Message timing, async lifecycles, and discrete entity transitions.
3. [Class Diagrams & Domain Modeling](./class-domain-model): Object-oriented structures, aggregations, and domain models.
4. [Component & Deployment Diagrams](./component-deployment): Modular boundaries, container runtimes, and network topologies.
5. [UML Relationship Rules & Review Checklist](./relationship-rules-review): Strict semantics (`<<include>>` vs `<<extend>>`, generalization) and AI review checklists.

---

## The Standard UML Notation Rules

When generating diagrams, AI agents must adhere strictly to OMG UML 2.5.1 semantic rules:
- **Actors**: Must represent roles, not specific individuals (e.g. `Student`, not `John Doe`).
- **Use Cases**: Ovals representing complete user goals, titled with active verb-noun phrases (e.g. `Submit Application`).
- **Include (`<<include>>`)**: Unconditional, mandatory sub-flow execution.
- **Extend (`<<extend>>`)**: Conditional, optional branch execution based on an extension point.

<div class="ref-box">
  <strong>Primary Official Reference:</strong>
  <ul>
    <li><a href="https://www.omg.org/uml/" target="_blank" rel="noopener">Object Management Group (OMG) UML Specification v2.5.1</a></li>
    <li>Fowler, Martin (2003). <em>UML Distilled: A Brief Guide to the Standard Object Modeling Language (3rd Edition)</em>. Addison-Wesley.</li>
  </ul>
</div>
