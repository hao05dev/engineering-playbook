# S.C.O.P.E Prompting Framework

Prompting an autonomous AI coding agent is fundamentally different from chatting with a conversational bot. It requires structured, deterministic engineering communication. The **S.C.O.P.E** framework turns ambiguous requests into high-precision technical instructions.

---

## The 5 Pillars of S.C.O.P.E

```
┌─────────────────────────────────────────────────────────────┐
│                 THE S.C.O.P.E FRAMEWORK                     │
├─────────────────────────────────────────────────────────────┤
│ S ── Situation / System Context                             │
│ C ── Constraints & Invariants                               │
│ O ── Objectives & Deliverables                              │
│ P ── Plan & Implementation Sequence                         │
│ E ── Evaluation & Test Criteria                             │
└─────────────────────────────────────────────────────────────┘
```

| Element | Description | Key Question Answered |
| :--- | :--- | :--- |
| **S** - Situation | Project context, files involved, framework versions | *Where are we and what already exists?* |
| **C** - Constraints | Non-negotiable boundaries, patterns, forbidden edits | *What must NOT be broken or altered?* |
| **O** - Objectives | Exact function, component, or behavior to create | *What is the specific target outcome?* |
| **P** - Plan | Logical execution sequence and file modifications | *In what order should this be built?* |
| **E** - Evaluation | Test commands, edge cases, acceptance assertions | *How do we definitively verify success?* |

---

## Anatomy of a S.C.O.P.E Prompt

### Real-World Example: Adding Coupon Validation

```markdown
# TASK: Implement Percentage Discount Coupon Logic

## S — Situation
We are in a Spring Boot 3.3 e-commerce service with PostgreSQL.
Relevant files:
- `src/main/java/com/app/discount/DiscountService.java`
- `src/main/java/com/app/discount/dto/ApplyCouponRequest.java`
- `src/main/java/com/app/discount/entity/Coupon.java`

## C — Constraints
- Do not modify existing `FixedAmountDiscount` logic.
- Do not introduce new database migrations in this step.
- Ensure max discount cap ($50.00) is enforced.
- Throw `CouponExpiredException` if `validUntil` is in the past.

## O — Objective
Implement method `DiscountResult applyPercentageCoupon(String couponCode, BigDecimal cartTotal)` in `DiscountService`.

## P — Plan
1. Validate coupon existence and expiration.
2. Calculate discount: `min(cartTotal * percentage, maxDiscountCap)`.
3. Return `DiscountResult` containing discounted total and savings.

## E — Evaluation
- Run unit tests: `./mvnw test -Dtest=DiscountServiceTest`
- Include tests for:
  - Expired coupon (must throw exception)
  - Cart total under min spend threshold
  - Discount exceeding $50 cap (must cap at $50.00)
```

---

## Comparison: Bad vs. S.C.O.P.E Prompt

### ❌ Bad Prompt
> *"Can you write a coupon discount feature for my backend?"*
- **Result**: AI guesses data types, creates redundant entities, picks arbitrary discount rules, and writes no tests.

### ✅ Good S.C.O.P.E Prompt
- **Result**: AI generates precise code targeting exact classes, respects architectural invariants, handles specified edge cases, and produces matching unit test assertions.

---

## Multi-Turn Prompting Best Practices

1. **Step-by-Step Approval**: For complex features, prompt the agent to output its plan first, review it, and then prompt for code execution.
2. **Context Refreshing**: In long sessions, summarize resolved items and re-anchor the agent with fresh file paths.
3. **Error Feedback**: When tests fail, paste the exact stack trace and ask for root cause diagnosis without modifying test expectations.
