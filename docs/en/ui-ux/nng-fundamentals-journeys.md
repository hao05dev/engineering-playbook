# User Goals, User Journeys & User Flows

Before drawing UI buttons or writing CSS styles, UX engineers map the cognitive journey of the human user. Grounded in **Nielsen Norman Group (NN/g)** research, this guide structures **User Goals**, **User Journeys**, and **User Flow Diagrams**.

---

## 1. User Goals vs. User Tasks

```
┌─────────────────────────────────────────────────────────────┐
│                       GOALS VS. TASKS                       │
├─────────────────────────────────────────────────────────────┤
│ • User Goal: The high-level desired end-state (Why).        │
│   (e.g., "Secure a paid internship before semester end")    │
│                                                             │
│ • User Task: The specific procedural steps to get there.   │
│   (e.g., "Filter jobs by Java", "Upload PDF", "Submit Form")│
└─────────────────────────────────────────────────────────────┘
```

A great UX minimizes the mechanical tasks required to accomplish a goal.

---

## 2. Customer / User Journey Mapping

A User Journey maps the user's emotional and operational progression across distinct phases:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    STUDENT INTERNSHIP APPLICATION JOURNEY               │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase:       1. Discovery       2. Evaluation      3. Application       │
│ User Action: Searches by tag    Reads salary & req Uploads PDF & submits│
│ Emotion:     🤔 Curious         🧐 Evaluating      😰 Anxious / Excited │
│ Pain Point:  Too many dead jobs Unclear GPA rules  Unsure if received   │
│ Solution:    Hide expired posts Display badge      Show instant receipt │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. User Flow Diagrams (Branching Logic)

A User Flow represents the complete path a user takes through a series of screen interactions to complete a task:

```
   [ Landing Page ]
          │
          ▼
   [ Search & Filter ] ──► (Any matching postings?)
                                  │
                   ┌──────────────┴──────────────┐
              [No] │                             │ [Yes]
                   ▼                             ▼
       [ Empty State Suggestion ]       [ Postings List View ]
                                                 │
                                                 ▼
                                      [ Select Specific Job ]
                                                 │
                                                 ▼
                                        [ Open Apply Modal ]
                                                 │
                                                 ▼
                                      ( GPA >= 2.0 & PDF Valid? )
                                                 │
                                ┌────────────────┴────────────────┐
                           [No] │                                 │ [Yes]
                                ▼                                 ▼
                     [ Inline Form Error ]             [ Show Success Screen & ]
                                                       [ Transition Status     ]
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: User Journey & User Flow Mapping</div>

```markdown
# TASK: User Journey Mapping & Decision-Branch User Flow Synthesis
You are a Principal UX Researcher & Interaction Designer certified by NN/g.

## Input Persona & Feature:
User Persona: [DESCRIBE USER ROLE, MOTIVATIONS, AND PAIN POINTS]
Feature Scope: [DESCRIBE THE WORKFLOW]

## Instructions:
1. Define the primary User Goal (Outcome-oriented).
2. Produce a 4-phase User Journey Map including User Actions, Thoughts, Emotional States, Pain Points, and UX Opportunities.
3. Generate a complete User Flow Diagram mapping screen decision points, positive completion paths, and failure/error recovery branches.
4. Output diagrams in clean ASCII / Mermaid syntax.
```
</div>

---

## 5. Review Checklist

- [ ] Is the user flow mapped from the user's perspective rather than internal database operations?
- [ ] Are failure and recovery branches explicitly included in the user flow?
- [ ] Does every step in the user flow directly advance the user towards their primary goal?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Gibbons, Sarah (2018). <em>Journey Mapping 101</em>. Nielsen Norman Group.</li>
    <li>Nielsen Norman Group — UX Research Methodologies: <a href="https://www.nngroup.com/articles/" target="_blank" rel="noopener">https://www.nngroup.com/articles/</a></li>
  </ul>
</div>
