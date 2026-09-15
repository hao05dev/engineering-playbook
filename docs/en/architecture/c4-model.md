# The C4 Model for Architecture Visualization

Created by Simon Brown, the **C4 Model** provides a hierarchical, zoomable framework for visualising software architecture at four distinct levels of abstraction: **System Context**, **Containers**, **Components**, and **Code**.

---

## 1. The 4 Levels of the C4 Model

```
┌─────────────────────────────────────────────────────────────┐
│                       THE C4 HIERARCHY                      │
├─────────────────────────────────────────────────────────────┤
│ Level 1: System Context Diagram ──► The 10,000-foot view    │
│   (Users, external systems, and overall system boundary)    │
│                                                             │
│ Level 2: Container Diagram ──► The high-level technology map│
│   (Web apps, mobile apps, backend services, databases)      │
│                                                             │
│ Level 3: Component Diagram ──► Inside a single container    │
│   (Controllers, services, repositories, internal contracts)│
│                                                             │
│ Level 4: Code Diagram ──► Implementation anatomy            │
│   (UML class diagrams, interfaces — often auto-generated)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Practical Example: The C4 Journey

### Level 1: System Context Diagram
Shows how humans and external systems interact with the Internship Portal.

```
┌─────────────────────────┐               ┌─────────────────────────┐
│     Student (User)      │               │   Faculty Advisor (User)│
└────────────┬────────────┘               └────────────┬────────────┘
             │                                         │
             │ Uses web portal                         │ Approves applications
             ▼                                         ▼
┌───────────────────────────────────────────────────────────────────┐
│              University Internship Management System              │
│       (Allows students to apply and advisors to review placements) │
└────────────┬─────────────────────────────────────────┬────────────┘
             │ Sends verification                      │ Syncs calendar
             ▼                                         ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│   SendGrid Email API    │               │  Google Calendar API    │
│    (External System)    │               │    (External System)    │
└─────────────────────────┘               └─────────────────────────┘
```

### Level 2: Container Diagram
Zooms inside the system boundary to show separate deployable runtimes and data stores.

```
┌───────────────────────────────────────────────────────────────────┐
│               Internship System (Container Boundary)              │
│                                                                   │
│ ┌─────────────────────────┐   HTTPS / REST    ┌─────────────────┐ │
│ │ Single-Page App (Vue 3) ├──────────────────►│ API Application │ │
│ │ (Browser client UI)     │   Port 443        │ (Spring Boot)   │ │
│ └─────────────────────────┘                   └────────┬────────┘ │
│                                                        │          │
│                                           JDBC / TCP   │          │
│                                           Port 5432    ▼          │
│                                               ┌─────────────────┐ │
│                                               │ PostgreSQL DB   │ │
│                                               │ (Tables, Views) │ │
│                                               └─────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

### Level 3: Component Diagram
Zooms inside the **API Application** container.

```
┌───────────────────────────────────────────────────────────────────┐
│              API Application (Component Boundary)                 │
│                                                                   │
│ ┌─────────────────────────┐                   ┌─────────────────┐ │
│ │  InternshipController   ├──────────────────►│  AuthService    │ │
│ │  (REST API endpoints)   │                   │  (JWT verify)   │ │
│ └────────────┬────────────┘                   └─────────────────┘ │
│              │ Delegates                                          │
│              ▼                                                    │
│ ┌─────────────────────────┐                   ┌─────────────────┐ │
│ │    WorkflowService      ├──────────────────►│ PlacementRepo   │ │
│ │  (Business state logic) │                   │ (Spring Data JPA│ │
│ └─────────────────────────┘                   └─────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

---

## 3. C4 Diagram Review Principles

Every C4 diagram must adhere to these clarity rules:
1. **Explicit Box Descriptions**: Every container/component box must state its purpose and technology (e.g., `Spring Boot Application [Java 21]`).
2. **Labeled Relationships**: Every arrow must state the action verb and protocol (e.g., `Reads/Writes data using JDBC/TLS [Port 5432]`).
3. **No Ambiguous Acronyms**: Explain system acronyms in a legend.

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: C4 Model Architecture Synthesis</div>

```markdown
# TASK: Generate C4 Model Architecture Diagrams (Levels 1, 2, and 3)
You are a Software Architect certified in the C4 Model.

## Input Context:
System & Requirements: [DESCRIBE THE SYSTEM, TECH STACK, AND EXTERNAL INTEGRATIONS]

## Instructions:
1. Level 1: Generate a System Context Diagram showing all users, system boundaries, and external SaaS dependencies.
2. Level 2: Generate a Container Diagram specifying deployable runtimes, databases, and communication protocols.
3. Level 3: Generate a Component Diagram for the primary backend container specifying layer responsibilities.
4. Ensure every box includes explicit Technology labels and every arrow specifies an action verb and protocol.
5. Format output in clean ASCII / Mermaid syntax.
```
</div>

---

## 5. Review Checklist

- [ ] Does every box specify its technology stack (e.g. `[Vue 3 / TypeScript]`, `[PostgreSQL 16]`)?
- [ ] Does every connecting arrow state the action verb and communication protocol?
- [ ] Are external systems clearly differentiated from internal containers?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Brown, Simon (2018). <em>Visualising Software Architecture with the C4 Model</em>. Leanpub.</li>
    <li>Official C4 Model Website: <a href="https://c4model.com/" target="_blank" rel="noopener">https://c4model.com/</a></li>
  </ul>
</div>
