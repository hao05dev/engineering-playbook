# Usability Review & Nielsen's 10 Heuristics

Heuristic Evaluation is a discount usability inspection method where evaluators examine an interface against established psychological and design principles.

---

## 1. Jakob Nielsen's 10 Usability Heuristics

```
┌─────────────────────────────────────────────────────────────────┐
│              10 USABILITY HEURISTICS (JAKOB NIELSEN)            │
├─────────────────────────────────────────────────────────────────┤
│ 01. Visibility of System Status                                 │
│     Keep users informed with timely feedback (progress, toasts).│
│                                                                 │
│ 02. Match Between System and Real World                         │
│     Use natural language, familiar metaphors, and domain terms. │
│                                                                 │
│ 03. User Control and Freedom                                    │
│     Provide emergency exits (Undo, Cancel, Back, Revert).       │
│                                                                 │
│ 04. Consistency and Standards                                   │
│     Follow platform conventions (Jakob's Law: users spend most  │
│     time on other sites).                                       │
│                                                                 │
│ 05. Error Prevention                                            │
│     Eliminate error-prone conditions or confirm before action.  │
│                                                                 │
│ 06. Recognition Rather Than Recall                              │
│     Make elements, actions, and options visible; reduce memory. │
│                                                                 │
│ 07. Flexibility and Efficiency of Use                           │
│     Provide accelerators (shortcuts, power-user batch actions). │
│                                                                 │
│ 08. Aesthetic and Minimalist Design                             │
│     Remove irrelevant info; signal-to-noise ratio matters.      │
│                                                                 │
│ 09. Help Users Recognize, Diagnose, and Recover from Errors    │
│     Express errors in plain language and suggest constructive   │
│     solutions.                                                  │
│                                                                 │
│ 10. Help and Documentation                                      │
│     Provide contextual tooltips, FAQ, and searchable help docs. │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Usability Severity Rating Scale (NN/g Standard)

| Severity Level | Name | Description | Action Required |
|---|---|---|---|
| **0** | Not an issue | Does not impede user progress | No action required |
| **1** | Cosmetic only | Superficial styling or minor alignment flaw | Fix if time permits |
| **2** | Minor | Causes slight delay or confusion; easy workaround | Low priority fix |
| **3** | Major | Severely hinders task completion; high friction | High priority fix before release |
| **4** | Usability Catastrophe | Blocks task completion completely; data loss risk | Blocker — must fix immediately |

---

## 3. Practical Example: Usability Audit of Application Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            USABILITY AUDIT LOG                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Issue ID: USA-01                                                            │
│ Heuristic Violated: #05 Error Prevention & #03 User Control                 │
│ Severity: 4 (Catastrophe)                                                   │
│ Description: Clicking "Withdraw Application" immediately deletes the record │
│ without a confirmation modal or 30-day grace period undo option.            │
│ Recommendation: Add a destructive confirmation dialog requiring typing the │
│ word "WITHDRAW" or provide an immediate 10-second "Undo" snackbar.          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Issue ID: USA-02                                                            │
│ Heuristic Violated: #01 Visibility of System Status                         │
│ Severity: 3 (Major)                                                         │
│ Description: Uploading large PDF resumes (>5MB) shows no progress bar or   │
│ loading indicator; the button appears frozen for 4 seconds.                 │
│ Recommendation: Implement an upload progress percentage bar and disable the │
│ submit button with an active spinner.                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Heuristic Usability Evaluation</div>

```markdown
# TASK: Conduct a 10 Heuristics Usability Review
You are a Principal Usability Specialist and UX Auditor from Nielsen Norman Group.

## Screen / Flow Context:
[PASTE SCREEN WIREFRAME, USER FLOW, OR FRONTEND CODE]

## Instructions:
1. Systematically evaluate the interface against all 10 Nielsen Usability Heuristics.
2. For each identified flaw:
   - Cite the specific heuristic violated (#01 - #10).
   - Assign a Severity Rating (0 to 4).
   - Provide concrete, actionable remediation steps (layout, copy, interaction design).
3. Conclude with an overall Usability Scorecard and top 3 immediate fixes.
```
</div>

---

## 5. Review Checklist

- [ ] Does every user action trigger unambiguous feedback within 100ms?
- [ ] Are all destructive operations protected by confirmation or undo mechanisms?
- [ ] Are technical error codes replaced with user-friendly corrective guidance?
- [ ] Is the interface usable entirely via keyboard without getting trapped?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Nielsen, Jakob (1994). <em>10 Usability Heuristics for User Interface Design</em>. Nielsen Norman Group.</li>
    <li>Nielsen, Jakob (1995). <em>Severity Ratings for Usability Problems</em>. Nielsen Norman Group.</li>
  </ul>
</div>
