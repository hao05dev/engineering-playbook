# 10 — Bug Fix & Diagnostic Loop

When automated tests fail or human reviewers reject a diff, engineers enter the **Bug Fix & Diagnostic Loop**. Rather than making arbitrary trial-and-error edits, the AI-SDLC enforces a rigorous root-cause diagnostic method to permanently resolve defects.

---

## The 4-Step Diagnostic Protocol

```
┌─────────────────────────────────────────────────────────────┐
│                 BUG FIX DIAGNOSTIC PROTOCOL                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Isolate the Failure (Capture Exact Error Stack)          │
│ 2. Write a Failing Reproducing Test (Red)                   │
│ 3. Apply Minimal Targeted Fix (Green)                       │
│ 4. Verify No Regression Across the Entire Test Suite        │
└─────────────────────────────────────────────────────────────┘
```

---

## Preventing AI Thrashing

When an AI agent struggles with a bug, it may enter a state of **thrashing** — repeatedly modifying code randomly, introducing new bugs, or modifying test assertions to artificially force a pass.

### How to Stop AI Thrashing:
1. **Never Let AI Weaken Test Assertions**: A test assertion defines the requirement. If the test fails, fix the implementation, not the assertion (unless the requirement itself changed).
2. **Provide the Full Stack Trace**: Give the agent the complete error stack trace, file path, and line numbers.
3. **Anchor Context**: Remind the agent of invariants and relevant type definitions.

---

## Example: Root-Cause Prompting for Bug Resolution

```markdown
# BUG DIAGNOSTIC: NullPointerException in Discount Calculation

## Error Trace
```
java.lang.NullPointerException: Cannot invoke "java.math.BigDecimal.compareTo(java.math.BigDecimal)" 
because "minSpend" is null
    at com.app.discount.DiscountService.applyCoupon(DiscountService.java:42)
    at com.app.discount.DiscountServiceTest.testCouponWithoutMinSpend(DiscountServiceTest.java:78)
```

## Diagnosis Requirement
1. Analyze `DiscountService.java` at line 42.
2. The database permits `min_spend` column to be `NULL` for coupons without spending restrictions.
3. Fix: Handle null `minSpend` defensively by defaulting comparison logic or checking for null before `.compareTo()`.
4. Re-run `./mvnw test -Dtest=DiscountServiceTest`.
```

---

## Regression Verification

After applying a bug fix:
- [ ] The newly added reproducing test passes.
- [ ] All existing unit tests pass without regression.
- [ ] The fix does not introduce performance bottlenecks or extra database queries.
