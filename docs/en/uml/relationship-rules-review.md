# UML Relationship Rules & Review Checklist

Incorrect usage of UML relationship arrows is one of the most common mistakes made by software engineers and AI agents. This guide establishes strict semantic rules for UML relationships and provides an exhaustive **10-Point UML Review Checklist**.

---

## 1. Deep Dive: `<<include>>` vs. `<<extend>>`

```
┌─────────────────────────────────────────────────────────────┐
│                 INCLUDE VS. EXTEND SEMANTICS                │
├─────────────────────────────────────────────────────────────┤
│ • «include»: Mandatory Sub-routine                          │
│   - Base use case CANNOT finish without the included case.  │
│   - Arrow direction: Base Case ──────«include»─────► Sub Case│
│   - Example: (Apply for Job) ──────«include»─────► (Verify GPA)│
│                                                             │
│ • «extend»: Optional / Conditional Branch                   │
│   - Base use case CAN complete independently without it.    │
│   - Arrow direction: Extension Case ──«extend»───► Base Case│
│   - Triggered only when Extension Point condition is met.   │
│   - Example: (Apply Fee Waiver) ───«extend»────► (Pay Fees) │
└─────────────────────────────────────────────────────────────┘
```

> [!CAUTION]
> **Common Arrow Direction Trap**
> In `<<extend>>`, the arrow points from the **Extension Use Case TOWARDS the Base Use Case**, NOT the other way around. The base use case does not know about its extensions.

---

## 2. Structural Relationships Comparison Matrix

| Relationship | Arrow Notation | Direction | Semantic Meaning | Lifecycle Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Association** | Solid line (`───`) | Bidirectional / Unidirectional | "Knows about" or "communicates with" | Independent |
| **Aggregation** | White diamond at parent (`◇───`) | Parent to Child | "Has-a" part (Weak ownership) | Child outlives parent |
| **Composition** | Black diamond at parent (`◆───`) | Parent to Child | "Owns-a" part (Strong ownership) | Child destroyed with parent |
| **Generalization**| Hollow triangle at parent (`─▷`) | Child to Parent | "Is-a" subtype (Inheritance) | Type hierarchy |
| **Realization** | Dashed line with hollow triangle (`- - -▷`)| Class to Interface | "Implements contract" | Behavioral contract |
| **Dependency** | Dashed line with open arrow (`<- - -`)| Dependent to Supplier | "Uses temporarily" | Ephemeral / Parametric |

---

## 3. The 10-Point UML Diagram Review Checklist

Use this checklist to audit any UML diagram before writing code:

- [ ] **1. Active Verb Naming**: Are all use cases named with active verb-noun phrases?
- [ ] **2. System Boundary**: Are internal capabilities separated from external actors?
- [ ] **3. Include/Extend Direction**: Are `<<include>>` and `<<extend>>` arrow directions syntactically correct?
- [ ] **4. Multiplicity Integrity**: Does every association line in class diagrams define multiplicities at both ends?
- [ ] **5. Composition vs. Aggregation**: Is `◆` strictly used only when child entities cannot exist without the parent?
- [ ] **6. Complete Sequence Messages**: Do all sequence arrows define exact method names and return types?
- [ ] **7. FSM Guard Coverage**: Are all state transitions guarded by explicit boolean conditions?
- [ ] **8. Deadlock & Terminal States**: Does the state machine have unreachable states or deadlocks?
- [ ] **9. Protocol Labels on Deployment**: Are all deployment links labeled with network protocol and port?
- [ ] **10. Traceability**: Can every element in the diagram be traced back to an IEEE 29148 requirement?

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: UML Diagram Semantics & Quality Audit</div>

```markdown
# TASK: UML Diagram Verification & Semantic Review
You are a Lead UML Modeling Reviewer certified by the Object Management Group (OMG).

## Input Diagram / Specification:
[PASTE UML DIAGRAM CODE OR DESCRIPTION]

## Instructions:
1. Audit the diagram against the 10-Point UML Review Checklist.
2. Check specifically for arrow direction errors in <<include>>, <<extend>>, Generalization, and Realization.
3. Validate Multiplicities and Lifecycle dependencies (Composition vs Aggregation).
4. Output a detailed Audit Report classifying findings as:
   - PASS: Conforms to OMG UML 2.5.1 semantics.
   - SEMANTIC_ERROR: Violated UML rules with exact correction instructions.
   - SMELL: Ambiguous modeling that could confuse developers.
```
</div>

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG Unified Modeling Language (OMG UML) Specification v2.5.1.</li>
  </ul>
</div>
