# ERD Modeling & Normalization

Data integrity starts with precise Entity-Relationship Diagramming (ERD) and rigorous database normalization. This guide defines Crow's Foot cardinality notation and the canonical normalization levels from **1NF through BCNF**.

---

## 1. Crow's Foot ERD Cardinality Notation

```
┌─────────────────────────────────────────────────────────────┐
│                 CROW'S FOOT NOTATION GUIDE                  │
├─────────────────────────────────────────────────────────────┤
│ ──||──  Exactly One (Mandatory)                             │
│ ──|o──  Zero or One (Optional)                              │
│ ──|{──  One or Many (Mandatory)                             │
│ ──o{──  Zero or Many (Optional)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The Normalization Ladder (1NF to BCNF)

```
┌─────────────────────────────────────────────────────────────┐
│                 THE NORMALIZATION LADDER                    │
├─────────────────────────────────────────────────────────────┤
│ 1NF: Eliminate Repeating Groups (Ensure Atomic Values)      │
│   └── 2NF: Eliminate Partial Functional Dependencies        │
│         └── 3NF: Eliminate Transitive Dependencies          │
│               └── BCNF: Every Determinant is a Candidate Key│
└─────────────────────────────────────────────────────────────┘
```

### First Normal Form (1NF)
- **Rule**: Every column must contain atomic (indivisible) scalar values, and each record must have a unique identifier.
- ❌ *Violation*: Storing a comma-separated list of technology tags in a `VARCHAR` column (`"Java, Spring, PostgreSQL"`).
- ✅ *1NF Solution*: Separate `tags` into a related `posting_tags` table or queryable array type.

### Second Normal Form (2NF)
- **Rule**: Must be in 1NF, and all non-key columns must depend on the **entire** composite primary key (No partial key dependency).
- ❌ *Violation*: In composite table `application_reviews(student_id, posting_id)`, storing `student_name`. `student_name` depends only on `student_id`, not the composite key.
- ✅ *2NF Solution*: Move `student_name` to the `students` table.

### Third Normal Form (3NF)
- **Rule**: Must be in 2NF, and no non-key column may depend on another non-key column (No transitive dependency: $X \rightarrow Y \rightarrow Z$).
- ❌ *Violation*: In `internship_postings`, storing `company_id`, `company_name`, `company_hq_city`. `company_hq_city` depends on `company_id`, not the posting ID.
- ✅ *3NF Solution*: Extract a separate `companies` entity.

### Boyce-Codd Normal Form (BCNF)
- **Rule**: A stricter version of 3NF where for every functional dependency $X \rightarrow Y$, $X$ must be a superkey.

---

## 3. Intentional Denormalization Strategy

Normalizing to 3NF is the default for transactional OLTP systems. Denormalize only when:
1. High-throughput read dashboards encounter unbearable JOIN latency.
2. The read pattern is proven by query profiling (`EXPLAIN ANALYZE`).
3. Data consistency is protected by automated application events or Materialized Views.

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: ERD Generation & Normalization Audit</div>

```markdown
# TASK: ERD Modeling & 3NF Normalization Audit
You are an expert Relational Database Modeler.

## Input Data Model / Table Draft:
[PASTE DRAFT TABLE DEFINITIONS OR ENTITIES]

## Instructions:
1. Audit the schema against 1NF, 2NF, 3NF, and BCNF. Identify all partial or transitive dependencies.
2. Produce a normalized 3NF Entity Relationship Diagram in Mermaid Crow's Foot syntax (specifying exact cardinalities ||, |o, |{, o{).
3. Specify Primary Keys, Foreign Keys, and Unique constraints.
4. Output a summary table explaining why the design satisfies 3NF.
```
</div>

---

## 5. Review Checklist

- [ ] Are all columns atomic with zero multi-value comma strings?
- [ ] Are all transitive non-key dependencies eliminated into proper parent entities?
- [ ] Are Crow's Foot relationships annotated with explicit cardinality and optionality?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Codd, E.F. (1970). <em>A Relational Model of Data for Large Shared Data Banks</em>. Communications of the ACM.</li>
    <li>Date, C.J. (2003). <em>Database Design and Relational Theory</em>. O'Reilly Media.</li>
  </ul>
</div>
