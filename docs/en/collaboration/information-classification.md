# Information Classification System

To prevent hallucinated consensus and ensure complete transparency, all communication between the AI agent and the developer must be tagged using the **Four-Tier Information Classification System**.

---

## 1. The Four Information Classification Badges

```
┌─────────────────────────────────────────────────────────────────┐
│              INFORMATION CLASSIFICATION TAXONOMY                │
├─────────────────────────────────────────────────────────────────┤
│ [CONFIRMED]   Verified fact backed by existing codebase, DB     │
│               schema, or explicit user confirmation.            │
│                                                                 │
│ [ASSUMPTION]  Inferred hypothesis made by the AI; requires      │
│               user verification before execution.               │
│                                                                 │
│ [PROPOSAL]    Architectural or design recommendation presenting │
│               trade-offs and alternatives.                      │
│                                                                 │
│ [QUESTION]    Blocking ambiguity or missing requirement that    │
│               halts progress until answered.                    │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Representation

- <span class="badge-confirmed">[CONFIRMED]</span> — Stable truth. No further debate needed.
- <span class="badge-assumption">[ASSUMPTION]</span> — Fragile hypothesis. Must be verified.
- <span class="badge-proposal">[PROPOSAL]</span> — Design recommendation. Awaiting trade-off evaluation.
- <span class="badge-question">[QUESTION]</span> — Blocker. Requires human clarification.

---

## 2. Classification Rules for AI Responses

1. **Never conflate `[CONFIRMED]` with `[ASSUMPTION]`**: If the user did not explicitly state a requirement, and it is not documented in the repository, it MUST be tagged as `[ASSUMPTION]`.
2. **Every `[ASSUMPTION]` must have a resolution path**: The AI must explain what happens if the assumption is valid versus if it is refuted.
3. **`[PROPOSAL]` must include trade-offs**: Whenever recommending an architecture pattern, DB index, or library, provide at least one alternative and reason for choice.
4. **`[QUESTION]` must be concise and actionable**: Avoid open-ended essays; provide structured options where possible.

---

## 3. Practical Example: AI Feature Analysis Output

```markdown
### Analysis: Student Resume File Upload Feature

- <span class="badge-confirmed">[CONFIRMED]</span> Storage backend is AWS S3 with pre-signed URLs (verified from `src/config/storage.ts:L14`).
- <span class="badge-confirmed">[CONFIRMED]</span> Max allowed resume file size is 5MB.
- <span class="badge-assumption">[ASSUMPTION]</span> Only PDF and DOCX formats should be accepted; image uploads (.png, .jpg) will be rejected.
- <span class="badge-proposal">[PROPOSAL]</span> Implement asynchronous virus scanning via AWS ClamAV Lambda trigger before marking resume status as `VERIFIED`.
- <span class="badge-question">[QUESTION]</span> Should students be allowed to replace their resume after an application is placed into `UNDER_REVIEW` state?
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Enforcing Information Classification in Analysis</div>

```markdown
# TASK: Analyze Feature Request with Information Classification Badges
You are a Principal Systems Analyst.

## Input Context:
[PASTE FEATURE REQUIREMENT OR TECHNICAL PROBLEM]

## Instructions:
Analyze the input and categorize every single technical assertion into one of the four tiers:
1. `[CONFIRMED]`: State facts proven by the codebase or previous prompts.
2. `[ASSUMPTION]`: State any educated guesses you are making regarding scope or business rules.
3. `[PROPOSAL]`: Present your technical design recommendations with brief trade-offs.
4. `[QUESTION]`: List all blocking ambiguities that require human confirmation.
```
</div>

---

## 5. Review Checklist

- [ ] Are all unverified statements marked with `[ASSUMPTION]` instead of treated as facts?
- [ ] Are blocking questions clearly highlighted with `[QUESTION]`?
- [ ] Do proposals explain why this approach was chosen over alternatives?
- [ ] Is every confirmed fact grounded in code or approved documentation?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>ISO/IEC/IEEE 29148:2018 — Requirements Verification and Validation Guidelines.</li>
    <li>SEI (Software Engineering Institute) — Architecture Evaluation & Trade-off Analysis.</li>
  </ul>
</div>
