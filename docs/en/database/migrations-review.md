# Migrations, Seed Data & Database Review Checklist

Database schemas must evolve alongside application code in a repeatable, automated, and backward-compatible manner. This guide establishes the standard for **Database Migrations (Flyway/Liquibase)**, **Seed Data Management**, and the **10-Point Database Review Checklist**.

---

## 1. Automated Schema Migrations (Flyway Standard)

Never execute manual SQL commands directly in production. All DDL scripts must be versioned:

```
src/main/resources/db/migration/
├── V1__initial_schema_setup.sql
├── V2__add_internship_tables.sql
├── V3__add_application_audit_index.sql
└── R__repeatable_view_internship_stats.sql
```

### The Expand & Contract Pattern (Zero-Downtime Migrations)
When renaming a column or changing a type without downtime:
1. **Phase 1 (Expand)**: Add the new column `full_name` alongside old columns `first_name`, `last_name`. Dual-write in code.
2. **Phase 2 (Migrate Data)**: Backfill historical data in background batches.
3. **Phase 3 (Contract)**: Update read paths to use `full_name`, then drop old columns in a subsequent release.

---

## 2. Seed Data Management

- **Reference Data (Static)**: Enums, Country codes, System roles. Shipped in versioned migrations (`V1_1__seed_system_roles.sql`).
- **Development / Test Seeds**: Dummy students, test companies, fake postings. Placed in `src/test/resources/db/test-seeds/` and never executed in production.

---

## 3. The 10-Point Database Design Review Checklist

Audit all proposed schema migrations against this checklist:

- [ ] **1. Primary Keys**: Does every table have an immutable, unique primary key (preferably `UUID` or `BIGINT`)?
- [ ] **2. Foreign Key Indexes**: Are all foreign key columns backed by explicit B-tree indexes?
- [ ] **3. Strict Nullability**: Are columns explicitly marked `NOT NULL` unless optionality is justified?
- [ ] **4. Exact Numeric Types**: Are monetary and score values stored using `NUMERIC`/`DECIMAL` rather than floating-point?
- [ ] **5. Timezone-Aware Timestamps**: Are all timestamp columns defined as `TIMESTAMPTZ` (UTC)?
- [ ] **6. Domain Constraints**: Are CHECK and UNIQUE constraints defined for invariants?
- [ ] **7. Idempotent Scripts**: Can migration scripts execute cleanly on empty or restored databases?
- [ ] **8. Non-Blocking DDL**: Are long-running indexes created concurrently (`CREATE INDEX CONCURRENTLY`) on production tables?
- [ ] **9. Normalized Structures**: Is the schema normalized to 3NF without unintentional redundancy?
- [ ] **10. Deletion Policies**: Are foreign keys configured with explicit `ON DELETE RESTRICT` or `ON DELETE CASCADE` policies?

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Database Schema Review & Migration Generation</div>

```markdown
# TASK: Database Migration Generation & 10-Point Schema Audit
You are a Principal Database Administrator and Flyway Migration Specialist.

## Input Schema Change / Requirement:
[DESCRIBE THE DATABASE CHANGE OR PASTE NEW ENTITY DEFINITIONS]

## Instructions:
1. Generate an idempotent, version-controlled Flyway migration script (`V...__name.sql`).
2. Apply the Expand & Contract pattern if the change involves column renames or type conversions.
3. Audit the migration against the 10-Point Database Review Checklist.
4. Output separate DDL scripts for production schema and development seed data.
```
</div>

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Pramod Sadalage & Martin Fowler (2006). <em>Refactoring Databases: Evolutionary Database Design</em>. Addison-Wesley.</li>
    <li>Flyway Documentation: <a href="https://flywaydb.org/" target="_blank" rel="noopener">https://flywaydb.org/</a></li>
  </ul>
</div>
