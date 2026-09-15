# Domain Discovery & Problem Definition

Domain Discovery is the disciplined investigation of a business environment to identify core problems, boundaries, goals, and opportunities before proposing any software solution.

---

## 1. Definition & Purpose

- **Definition**: A structured exploratory process where analysts and engineers interrogate the current business reality to define the true root problem.
- **Purpose**: Prevent building the wrong software. A technical team that understands the domain can make autonomous, high-quality architectural trade-offs.

---

## 2. When to Use & Who Uses It

- **When**: At the inception of a new product, a major feature initiative, or when refactoring a legacy domain.
- **Who**: Product Owners, System Architects, Lead Developers, and AI Analysis Agents.

---

## 3. Step-by-Step Discovery Process

```
┌─────────────────────────────────────────────────────────────┐
│                 5-STEP DISCOVERY METHODOLOGY                │
├─────────────────────────────────────────────────────────────┤
│ Step 1: Capture Raw Idea & Intent                          │
│ Step 2: Formulate the Problem Statement (5 Whys)           │
│ Step 3: Define Bounded Context Boundaries                  │
│ Step 4: Map Strategic Impact & Success Metrics             │
│ Step 5: Classify Findings ([CONFIRMED], [QUESTION], etc.)  │
└─────────────────────────────────────────────────────────────┘
```

### The 5-Whys Root Cause Technique
When a user says: *"We need an automated PDF generator for student resumes."*
1. *Why?* Because faculty advisors spend hours reviewing messy Word documents.
2. *Why?* Because students submit unstructured resumes with missing GPA and prerequisite coursework.
3. *Why?* Because there is no standardized submission portal with validation.
4. *Root Problem*: The core pain is **lack of structured qualification verification**, not PDF generation.

---

## 4. Practical Example: University Internship Management

### Problem Statement Form
- **Current Situation**: 1,200 computer science students apply to 150 partner companies manually via email threads and spreadsheets.
- **Root Pain**: 35% of student placements are delayed beyond semester deadlines because faculty advisors cannot track application review statuses in real time.
- **Desired Outcome**: A centralized portal where applications transition through clear approval gates with SLA alerts.

---

## 5. Common Mistakes to Avoid

| Anti-Pattern | Why It Fails | Correct Practice |
| :--- | :--- | :--- |
| **Solutionizing prematurely** | Jumps directly to "Let's build a microservice with Kafka" | State the problem without mentioning technology |
| **Accepting vague goals** | "Make the system faster and more modern" | Quantify: "Reduce placement verification time from 7 days to 24 hours" |
| **Ignoring organizational boundaries** | Mixing billing, grading, and job matching in one monolithic module | Establish clear Bounded Contexts upfront |

---

## 6. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Domain Discovery & Root Cause Analysis</div>

```markdown
# TASK: Domain Discovery & Problem Definition
You are an expert System Analyst & Domain-Driven Design (DDD) Architect.

## Input Context:
I want to build a software feature for: [DESCRIBE YOUR IDEA OR FEATURE HERE].

## Instructions:
1. Conduct a "5-Whys" root cause analysis to uncover the underlying business pain.
2. Formulate a structured Problem Statement (Current Situation, Root Pain, Desired Outcome, Success Metrics).
3. Identify the proposed Bounded Contexts (Core Domain, Supporting Subdomains, Generic Subdomains).
4. Output your findings using the Information Classification standard:
   - [CONFIRMED] for facts directly stated in my input.
   - [ASSUMPTION] for logical deductions requiring human validation.
   - [QUESTION] for critical unknowns you need clarified before proceeding.
```
</div>

---

## 7. Review Checklist

- [ ] Is the problem defined independently of specific technologies or programming languages?
- [ ] Are success criteria measurable and quantified?
- [ ] Have the bounded contexts separated core domain logic from generic infrastructure?
- [ ] Have all assumptions been explicitly flagged as `[ASSUMPTION]`?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Tackling Complexity in the Heart of Software</em>. Addison-Wesley.</li>
    <li>IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering.</li>
  </ul>
</div>
