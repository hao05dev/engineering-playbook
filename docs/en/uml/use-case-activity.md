# Use Case & Activity Diagrams

Use Case Diagrams and Activity Diagrams are the two primary behavioral representations used to capture user goals and business workflows during system analysis.

---

## 1. Use Case Diagram Principles (OMG UML)

A Use Case diagram visualizes the interactions between external actors and system capabilities within a defined boundary.

```
┌─────────────────────────────────────────────────────────────┐
│                 USE CASE NOTATION ESSENTIALS                │
├─────────────────────────────────────────────────────────────┤
│ • Actor: Stick figure or «actor» box (Role of external user)│
│ • System Boundary: Rectangle enclosing all internal use cases│
│ • Use Case: Oval with active verb-noun goal                 │
│ • «include»: Base case cannot complete without included case │
│ • «extend»: Optional extension triggered at extension point │
│ • Generalization: Child actor/use case inherits behavior    │
└─────────────────────────────────────────────────────────────┘
```

### Practical Example: University Internship System

```
  ┌─────────────────────────────────────────────────────────┐
  │                 Internship Portal Boundary              │
  │                                                         │
  │   [Student] ────► ( (Apply for Internship) )            │
  │                            │                            │
  │                            ├──«include»──► ( (Validate Prerequisites) )
  │                            │                            │
  │                            └──«extend»───► ( (Request Recommendation Letter) )
  │                                                         │
  │   [Advisor] ────► ( (Review Application) )              │
  │                            │                            │
  │                            └──«include»──► ( (Record Decision & Reason) )
  └─────────────────────────────────────────────────────────┘
```

---

## 2. Activity Diagram & Swimlanes (Process Modeling)

Activity diagrams model computational and organizational workflows, including sequential actions, decision branches, and concurrent forks.

### Core Elements:
- **Initial Node**: Filled circle (`●`) marking workflow start.
- **Action State**: Rounded rectangle describing step execution.
- **Decision & Merge Node**: Diamond shape (`◇`) for conditional branching.
- **Fork & Join**: Horizontal/vertical synchronization bars for concurrency.
- **Activity Final Node**: Bullseye circle (`◉`) marking workflow end.
- **Swimlanes (Partitions)**: Vertical columns grouping actions by responsible Actor.

```
   Student                     System                     Advisor
      │                           │                          │
      ● (Start)                   │                          │
      ▼                           │                          │
[ Fill Application Form ] ───────►│                          │
                                  ▼                          │
                        [ Validate Student GPA ]             │
                                  │                          │
                                 ◇ (GPA >= 2.0?)             │
                                ╱ ╲                          │
                         [No]  ╱   ╲ [Yes]                   │
                              ▼     ▼                        │
                       [Reject]   [ Notify Advisor ] ───────►│
                                                             ▼
                                                    [ Review Application ]
                                                             │
                                                             ▼
                                                    ( Approve / Reject )
```

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Use Case & Activity Diagram Generation</div>

```markdown
# TASK: Generate OMG UML Use Case & Activity Diagrams
You are an expert UML Modeling Architect.

## Input Context:
Feature/Domain: [INSERT FEATURE OR DOMAIN DESCRIPTION]

## Instructions:
1. Identify all primary and secondary actors.
2. Formulate a complete Use Case Diagram specifying System Boundaries, «include» dependencies, and «extend» extension points.
3. Generate a multi-swimlane Activity Diagram showing the sequential, conditional, and concurrent actions across actors.
4. Output diagrams using clean, standard ASCII / Mermaid syntax.
5. Provide a semantic explanation of every include/extend relationship.
```
</div>

---

## 4. Review Checklist

- [ ] Are use case names formulated as active verb-noun phrases (e.g. `Submit Order`, not `Order`)?
- [ ] Is `<<include>>` used strictly for mandatory behaviors and `<<extend>>` for optional variations?
- [ ] Do all decision diamonds in activity diagrams have explicit boolean guard conditions on outgoing branches?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 18: Use Cases, Section 15: Activities.</li>
  </ul>
</div>
