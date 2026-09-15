# Indexes, Constraints & Query Optimization

Indexes and constraints are the dual engines of database performance and data correctness. While constraints protect business invariants from corruption, indexes transform $O(N)$ full table scans into $O(\log N)$ logarithmic tree lookups.

---

## 1. Index Types & Use Cases

| Index Type | Internal Structure | Best Used For | Example in PostgreSQL |
| :--- | :--- | :--- | :--- |
| **B-Tree** (Default) | Balanced search tree | Equality (`=`), Range (`<`, `>`, `BETWEEN`), Sorting | `CREATE INDEX idx_student_gpa ON students(gpa);` |
| **Composite B-Tree** | Multi-column tree | Queries filtering on multiple specific columns | `CREATE INDEX idx_post_status_date ON postings(status, created_at);`|
| **Partial Index** | Filtered B-tree | Large tables where only a subset of rows is queried | `CREATE INDEX idx_active_apps ON apps(student_id) WHERE status = 'ACTIVE';`|
| **GIN** (Inverted) | Generalized Inverted Index | JSONB containment (`@>`), Arrays, Full-text search | `CREATE INDEX idx_post_tags ON postings USING GIN(tags);` |

---

## 2. The Leftmost Prefix Rule (Composite Indexes)

When creating a composite index on `(status, created_at)`:
- ✅ **Optimized**: `WHERE status = 'OPEN'` (Uses index).
- ✅ **Optimized**: `WHERE status = 'OPEN' AND created_at > NOW() - INTERVAL '7 days'` (Uses index).
- ❌ **NOT Optimized**: `WHERE created_at > NOW() - INTERVAL '7 days'` (Cannot use the index because the leftmost column `status` was skipped).

```
Index: (status, created_at)
┌──────────────┬───────────────────────────────┐
│ status       │ created_at                    │
├──────────────┼───────────────────────────────┤
│ OPEN         │ 2026-09-01T10:00:00Z          │ ◄── Search jumps to 'OPEN'
│ OPEN         │ 2026-09-02T11:00:00Z          │     then scans created_at
│ REJECTED     │ 2026-09-01T08:00:00Z          │
└──────────────┴───────────────────────────────┘
```

---

## 3. Database Constraints as Security Guards

Never rely exclusively on application code for validation. Enforce constraints at the database engine level:

```sql
ALTER TABLE internship_applications
  ADD CONSTRAINT uq_student_active_posting 
  UNIQUE (student_id, posting_id);

ALTER TABLE internship_postings
  ADD CONSTRAINT chk_positive_salary 
  CHECK (salary_monthly >= 0.00);

ALTER TABLE students
  ADD CONSTRAINT chk_valid_gpa 
  CHECK (gpa >= 0.00 AND gpa <= 4.00);
```

---

## 4. Query Profiling with `EXPLAIN ANALYZE`

Before approving queries, inspect the query execution plan:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM internship_applications
WHERE student_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  AND status = 'SUBMITTED';
```

- 🚩 **Red Flag**: `Seq Scan on internship_applications` (Full table scan — missing index).
- ✅ **Green Flag**: `Index Scan using idx_apps_student_status` (Logarithmic index traversal).

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Index Optimization & Constraint Hardening</div>

```markdown
# TASK: Database Indexing Strategy & Constraint Optimization
You are an expert PostgreSQL Performance & Optimization DBA.

## Input Queries & Table Schema:
[PASTE SLOW QUERIES AND CURRENT DDL SCHEMA]

## Instructions:
1. Analyze query execution access patterns (WHERE filters, JOIN conditions, ORDER BY clauses).
2. Recommend optimal B-tree, Composite, Partial, or GIN indexes applying the Leftmost Prefix Rule.
3. Define strict database CHECK, UNIQUE, and FOREIGN KEY constraints with explicit ON DELETE actions.
4. Output SQL migration scripts with index creation comments.
```
</div>

---

## 6. Review Checklist

- [ ] Does every foreign key column have a corresponding index to speed up JOIN operations?
- [ ] Do composite indexes follow the Leftmost Prefix rule based on high-cardinality equality filters?
- [ ] Are business invariants enforced through CHECK and UNIQUE database constraints?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Winand, Markus (2012). <em>Use The Index, Luke! A Guide to Database Performance</em>.</li>
    <li>PostgreSQL Global Development Group (2024). <em>PostgreSQL 16 Documentation: Chapter 11. Indexes</em>.</li>
  </ul>
</div>
