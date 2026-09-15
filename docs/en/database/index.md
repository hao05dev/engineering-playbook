# 07 — Database Engineering

A robust software application is anchored by a well-engineered database. **Database Engineering** is the disciplined science of translating business domain entities into normalized, indexed, transactional, and performant data storage architectures.

---

## The 6-Stage Database Design Pipeline

In the AI-SDLC, database schemas are never generated as ad-hoc SQL tables. They follow a rigorous 6-stage transformation pipeline:

```
[ 1. Business Domain ] ──► [ 2. Domain Model ] ──► [ 3. Conceptual Model ]
                                                            │
                                                            ▼
[ 6. Production SQL ] ◄── [ 5. Physical Model ] ◄── [ 4. Logical Model ]
```

---

## Key Modules in this Section

1. [The Database Design Pipeline](./design-pipeline): Step-by-step progression from business entities to physical DDL.
2. [ERD Modeling & Normalization](./erd-normalization): Cardinality, optionality, foreign keys, and 1NF through 3NF/BCNF.
3. [Indexes, Constraints & Performance](./indexes-constraints): B-tree, GIN, partial indexes, and query execution planning.
4. [Transactions, Concurrency & Locking](./transactions-concurrency): ACID semantics, isolation levels, and pessimistic vs optimistic locks.
5. [Migrations, Seed Data & Review Checklist](./migrations-review): Version-controlled migrations (Flyway/Liquibase) and database review checklists.

---

## Core Database Invariants

1. **Explicit Foreign Keys**: Maintain relational integrity in the database engine, not just in application memory.
2. **Deterministic Migrations**: All schema modifications must be version-controlled, automated, and idempotent.
3. **No Unindexed Foreign Keys**: Always add indexes on foreign key columns used in JOIN and WHERE clauses.
4. **Appropriate Data Types**: Use explicit UUIDs, exact numeric types (`NUMERIC`/`DECIMAL` for money, never `FLOAT`), and timezone-aware timestamps (`TIMESTAMPTZ`).

<div class="ref-box">
  <strong>Primary Official References:</strong>
  <ul>
    <li>Date, C.J. (2003). <em>An Introduction to Database Systems (8th Edition)</em>. Addison-Wesley.</li>
    <li>Kleppmann, Martin (2017). <em>Designing Data-Intensive Applications</em>. O'Reilly Media.</li>
  </ul>
</div>
