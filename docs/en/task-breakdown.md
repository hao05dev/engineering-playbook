# 04 — Phasing & Task Breakdown

The **Phasing & Task Breakdown** step transforms high-level architectural designs into a topological sequence of small, verifiable, independent engineering tasks.

---

## Why Sizing Matters for AI Agents

Large language models degrade in accuracy when prompted with sprawling tasks. Breaking features into atomic units provides distinct advantages:
- **Zero Hallucination Drift**: The agent focuses on a single class or interface contract.
- **Fast Feedback Loops**: Unit tests can run in 5 seconds after each task.
- **Trivial Code Reviews**: Humans can review and approve a 50-line diff in under two minutes.

```
┌─────────────────────────────────────────────────────────────┐
│                    THE IDEAL TASK SIZING                    │
├─────────────────────────────────────────────────────────────┤
│ • Estimated duration: 15 to 30 minutes                      │
│ • Net code change: 50 to 150 lines                          │
│ • Files touched: 1 to 3 related files                       │
│ • Verification: At least 1 automated unit or integration test│
└─────────────────────────────────────────────────────────────┘
```

---

## Dependency-Ordered Phasing

Order tasks by architectural dependency, working from the database layer outward:

```
  Phase 1: Persistence Layer (Database Migrations & Entities)
                    │
                    ▼
  Phase 2: Repository & Data Access Interfaces
                    │
                    ▼
  Phase 3: Core Business Services & Domain Logic
                    │
                    ▼
  Phase 4: API Controllers, DTO Mappings & Security Filters
                    │
                    ▼
  Phase 5: End-to-End & Integration Test Verification
```

---

## Example Task Breakdown Breakdown Checklist

### Phase 1: Database & Entity Layer
- [ ] **Task 1.1**: Create Flyway migration `V2__create_internship_tables.sql`.
- [ ] **Task 1.2**: Create JPA Entity `InternshipPosting.java` with validations and enums.

### Phase 2: Service & Business Logic
- [ ] **Task 2.1**: Implement `InternshipPostingRepository.java` with custom search query.
- [ ] **Task 2.2**: Write unit test `InternshipServiceTest.java` covering validation rules.
- [ ] **Task 2.3**: Implement `InternshipServiceImpl.java` to pass the tests.

### Phase 3: REST API & Security
- [ ] **Task 3.1**: Create Request/Response DTOs and validation annotations.
- [ ] **Task 3.2**: Implement `InternshipController.java` with `@PreAuthorize` guards.
- [ ] **Task 3.3**: Write WebMvc integration test `InternshipControllerTest.java`.

---

## Definition of Done (DoD) per Task

A task is only considered complete when:
1. All newly added logic has corresponding unit test coverage.
2. The project compiles with zero warnings or linter errors.
3. Git working tree is clean and ready for an atomic commit.
