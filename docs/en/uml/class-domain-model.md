# Class Diagrams & Domain Modeling

Class Diagrams and Domain Models are the foundational structural diagrams of Object-Oriented Analysis and Design (OOAD). They define the entities, attributes, operations, and relationships that constitute the software's structural blueprint.

---

## 1. Domain Model vs. Implementation Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                 CONCEPTUAL VS. DESIGN CLASS                 │
├─────────────────────────────────────────────────────────────┤
│ • Conceptual Domain Model: Focuses on real-world concepts,  │
│   business rules, and entity associations (No tech details).│
│                                                             │
│ • Implementation Class Diagram: Focuses on software types,   │
│   visibility (+/-/null), method signatures, and design patterns. │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. UML Class Anatomy & Relationship Semantics

### Visibility Modifiers:
- `+` Public
- `-` Private
- `#` Protected
- `~` Package / Default

### The 5 Core Relationships:

| Relationship | Symbol | Semantic Meaning | Lifecycle Coupling |
| :--- | :--- | :--- | :--- |
| **Association** | `────` | "Has a structural link to" | Independent lifecycles |
| **Aggregation** | `◇───` | "Has a part" (Shared aggregation) | Child can exist without parent |
| **Composition** | `◆───` | "Owns a part" (Composite aggregation)| Child destroyed when parent dies |
| **Generalization**| `─▷` | "Is a subtype of" (Inheritance) | Type substitution |
| **Dependency** | `<- - -`| "Uses temporarily" | Parameter/local variable use |

---

## 3. Practical Example: Domain Model

```
┌───────────────────────────┐                 ┌───────────────────────────┐
│          Student          │ 1             * │   InternshipApplication   │
├───────────────────────────┼─────────────────┼───────────────────────────┤
│ - studentId: UUID         │                 │ - id: UUID                │
│ - gpa: BigDecimal         │                 │ - status: ApplicationState│
│ - earnedCredits: int      │                 │ - appliedAt: Instant      │
├───────────────────────────┤                 ├───────────────────────────┤
│ + canApply(): boolean     │                 │ + transition(newState)    │
└─────────────┬─────────────┘                 └─────────────┬─────────────┘
              │ 1                                           │ *
              │                                             │
              │                                             │ 1
              │ *                             ┌─────────────▼─────────────┐
┌─────────────▼─────────────┐                 │     InternshipPosting     │
│       FacultyAdvisor      │                 ├───────────────────────────┤
├───────────────────────────┤                 │ - id: UUID                │
│ - advisorId: UUID         │                 │ - title: String           │
│ - department: String      │                 │ - remainingQuota: int     │
└───────────────────────────┘                 └───────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Class Diagram & Domain Model Synthesis</div>

```markdown
# TASK: Generate OMG UML Class Diagram & Domain Model
You are an expert Object-Oriented Design Architect.

## Input Context:
Entities & Business Rules: [DESCRIBE ENTITIES, ATTRIBUTES, AND RELATIONSHIPS]

## Instructions:
1. Construct a Conceptual Domain Model capturing core business entities and associations.
2. Formulate an Implementation Class Diagram specifying attributes with visibility (+/-), types, method signatures, and exact multiplicities (1, 0..1, 1..*, 0..*).
3. Strictly distinguish between Association, Aggregation (white diamond), Composition (black diamond), and Generalization.
4. Output diagrams in standard ASCII / Mermaid syntax.
5. Provide a summary of structural invariants enforced by this design.
```
</div>

---

## 5. Review Checklist

- [ ] Are multiplicities specified at both ends of every association?
- [ ] Is Composition (`◆`) used strictly when the lifecycle of the child is strictly bound to the parent?
- [ ] Are class attributes and operations formatted with strict data types and visibility modifiers?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 11: Structured Classifiers (Classes & Associations).</li>
    <li>Larman, Craig (2004). <em>Applying UML and Patterns (3rd Edition)</em>. Prentice Hall.</li>
  </ul>
</div>
