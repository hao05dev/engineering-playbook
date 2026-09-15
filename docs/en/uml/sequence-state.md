# Sequence & State Machine Diagrams

While structural diagrams describe static anatomy, **Sequence Diagrams** and **State Machine Diagrams** model the precise temporal mechanics and entity lifecycles of software systems.

---

## 1. Sequence Diagrams (Temporal Message Flow)

A Sequence Diagram models object interactions arranged in chronological sequence along vertical lifelines.

```
┌─────────────────────────────────────────────────────────────┐
│                 SEQUENCE NOTATION ESSENTIALS                │
├─────────────────────────────────────────────────────────────┤
│ • Lifeline: Vertical dashed line representing participant   │
│ • Activation Bar: Narrow rectangle showing active processing│
│ • Sync Call: Solid line with filled arrow (──►)             │
│ • Async Call: Solid line with open arrow (──>)              │
│ • Return: Dashed line with open arrow (< - -)               │
│ • Combined Fragments: alt (if/else), opt (if), loop (while) │
└─────────────────────────────────────────────────────────────┘
```

### Practical Example: Application Submission Flow

```
Student               Controller              Service               Repository
   │                      │                      │                      │
   │── POST /apply ──────►│                      │                      │
   │                      │── submitApp() ──────►│                      │
   │                      │                      │── findById() ───────►│
   │                      │                      │◄- - return entity - -│
   │                      │                      │                      │
   │                      │   [ alt: GPA < 2.0 ] │                      │
   │                      │── throw 400 BadReq ─►│                      │
   │                      │                      │                      │
   │                      │   [ else: Valid ]    │                      │
   │                      │                      │── save(SUBMITTED) ──►│
   │                      │                      │◄- - return saved - - │
   │                      │◄- - 201 Created - - -│                      │
   │◄- - Success JSON - - │                      │                      │
```

---

## 2. State Machine Diagrams (Entity Lifecycles)

State machines model the discrete states an entity undergoes in response to events during its lifetime.

### Core Elements:
- **State**: Rounded rectangle containing State Name, `entry /`, `do /`, and `exit /` actions.
- **Transition**: Directed arrow with format: `Event [Guard] / Action`.
- **Composite States**: Nested states grouping sub-states.

```
┌─────────────────────────────────────────────────────────────┐
│                 INTERNSHIP APPLICATION FSM                  │
├─────────────────────────────────────────────────────────────┤
│   ● (Start)                                                 │
│   │                                                         │
│   ▼                                                         │
│ ┌──────────┐   submit [validData]   ┌───────────────┐       │
│ │  DRAFT   ├───────────────────────►│   SUBMITTED   │       │
│ └──────────┘                        └───────┬───────┘       │
│                                             │               │
│                        advisorApprove       │ advisorReject │
│                        [gpa >= 2.0]         │ [reasonGiven] │
│                             │               │               │
│                             ▼               ▼               │
│                     ┌───────────────┐ ┌───────────┐         │
│                     │FACULTY_APPROVED│ │ REJECTED  │         │
│                     └───────┬───────┘ └───────────┘         │
│                             │                               │
│                      companyAccept                          │
│                             ▼                               │
│                     ┌───────────────┐                       │
│                     │    PLACED     │ ──► ◉ (Terminal End)  │
│                     └───────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sequence & State Machine Generation</div>

```markdown
# TASK: Generate OMG UML Sequence & State Machine Diagrams
You are an expert Distributed Systems Architect.

## Input Context:
Target Scenario/Entity: [DESCRIBE THE SYSTEM INTERACTION OR ENTITY LIFECYCLE]

## Instructions:
1. Construct a comprehensive Sequence Diagram showing Controller, Service, Database, and External Service lifelines with explicit synchronous, asynchronous, and return arrows.
2. Utilize UML combined fragments (`alt`, `opt`, `loop`) to capture error paths and boundary conditions.
3. Construct a State Machine Diagram specifying all states, event triggers, guard conditions, and actions.
4. Output diagrams in standard ASCII / Mermaid syntax with detailed explanations.
```
</div>

---

## 4. Review Checklist

- [ ] Are synchronous calls clearly distinguished from asynchronous message dispatches?
- [ ] Do all `alt` combined fragments have complementary condition branches covering failure cases?
- [ ] Are state transitions protected by explicit boolean guards preventing illegal shortcuts?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 17: Interactions (Sequence Diagrams), Section 14: State Machines.</li>
  </ul>
</div>
