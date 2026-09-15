# Information Architecture, Wireframes & Mockups

Before writing frontend components in Vue or React, software teams structure content through **Information Architecture (IA)** and translate user flows into **Screen Inventories**, **Low-Fidelity Wireframes**, and **High-Fidelity Mockups**.

---

## 1. Information Architecture (IA) & Screen Inventory

Information Architecture defines how content and features are categorized, labeled, and navigated:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCREEN INVENTORY TAXONOMY                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Public Portal                                                │
│    ├── SCR-01: Landing Page / Hero Search                       │
│    ├── SCR-02: Postings Browse & Filter View                    │
│    └── SCR-03: Single Posting Detail View                       │
│                                                                 │
│ 2. Student Workspace (Authenticated)                            │
│    ├── SCR-04: Student Dashboard & Placement Status             │
│    ├── SCR-05: Application Submission Modal                     │
│    └── SCR-06: Student Profile & Prerequisite Transcripts       │
│                                                                 │
│ 3. Faculty Advisor Portal (RBAC Protected)                      │
│    ├── SCR-07: Pending Application Review Queue                 │
│    └── SCR-08: Application Decision & Feedback Drawer           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Low-Fidelity Wireframes vs. High-Fidelity Mockups

```
┌─────────────────────────────────────────────────────────────┐
│                 FIDELITY PROGRESSION SPECTRUM               │
├─────────────────────────────────────────────────────────────┤
│ 1. Wireframe (Low-Fidelity): Layout, content blocks, IA     │
│    - Zero colors, zero decorative styling.                  │
│    - Fast to iterate and challenge with developers.         │
│                                                             │
│ 2. Mockup (High-Fidelity): Typography, brand colors, spacing│
│    - Pixel-perfect visual assets and component styles.      │
│                                                             │
│ 3. Prototype (Interactive): Clickable transitions & states │
│    - Validates realistic user interactions before coding.   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Practical Example: Application Submission Modal (Wireframe)

```
┌─────────────────────────────────────────────────────────────────┐
│ Modal: Apply for Backend Engineering Internship                 │
├─────────────────────────────────────────────────────────────────┤
│ Company: Acme Cloud Corp   | Location: Remote  | Salary: $1,200 │
│                                                                 │
│ Student Information (Auto-populated from Profile):              │
│ Name: Nguyen Van A        | Student ID: STD-8821                │
│ Cumulative GPA: 3.42 / 4.00 [✓ Meets Minimum Requirement 2.50]  │
│                                                                 │
│ Resume Upload (Mandatory):                                      │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  [📄 my_resume_v2.pdf] (1.8 MB)                [ Replace ]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Cover Letter (Optional):                                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Explain why you are excited to join this team...            │ │
│ │                                                  [ 142/2000]│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [ Cancel ]                                [ Submit Application ]│
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Screen Inventory & Wireframe Layout Generation</div>

```markdown
# TASK: Generate Screen Inventory & Text-Based Wireframe Mockups
You are a Principal Information Architect & UI Designer.

## Input Feature Context:
[PASTE USER STORIES, USER FLOW, OR FEATURE SPECIFICATION]

## Instructions:
1. Produce a complete Screen Inventory categorizing screens by User Role and Access Permissions.
2. For each primary screen, construct a structured Low-Fidelity ASCII Wireframe.
3. Explicitly annotate Visual Hierarchy, Primary CTA buttons, Secondary actions, and Information Groupings.
4. Highlight how the layout adheres to the F-pattern reading flow and responsive breakpoints.
```
</div>

---

## 5. Review Checklist

- [ ] Does every screen have a unique Screen ID and defined access role in the inventory?
- [ ] Is there exactly one primary CTA button with clear visual hierarchy?
- [ ] Are input fields arranged in a single-column, logical progression?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Rosenfeld, Louis & Morville, Peter (2015). <em>Information Architecture: For the Web and Beyond</em>. O'Reilly Media.</li>
    <li>Nielsen Norman Group — Wireframing & Prototyping Guidelines.</li>
  </ul>
</div>
