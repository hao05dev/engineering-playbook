# Transactions, Concurrency & Locking

In multi-user software systems, concurrent database operations frequently collide. **Transactions, Concurrency Control, and Locking** guarantee data integrity during simultaneous balance deductions, placement quota reservations, or inventory updates.

---

## 1. The ACID Guarantees

```
┌─────────────────────────────────────────────────────────────┐
│                       ACID PROPERTIES                       │
├─────────────────────────────────────────────────────────────┤
│ • Atomicity: All operations succeed, or all rollback (0/1)  │
│ • Consistency: Database transitions between valid states     │
│ • Isolation: Concurrent transactions do not corrupt each other│
│ • Durability: Committed data survives crashes/power loss    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Transaction Isolation Levels & Concurrency Anomalies

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Serialization Anomaly |
| :--- | :--- | :--- | :--- | :--- |
| **Read Uncommitted** | ⚠️ Allowed | ⚠️ Allowed | ⚠️ Allowed | ⚠️ Allowed |
| **Read Committed** (Default) | 🛡️ Prevented | ⚠️ Allowed | ⚠️ Allowed | ⚠️ Allowed |
| **Repeatable Read** | 🛡️ Prevented | 🛡️ Prevented | 🛡️ Prevented (PG)| ⚠️ Allowed |
| **Serializable** | 🛡️ Prevented | 🛡️ Prevented | 🛡️ Prevented | 🛡️ Prevented |

---

## 3. Concurrency Control: Pessimistic vs. Optimistic Locking

```
┌─────────────────────────────────────────────────────────────┐
│                 LOCKING STRATEGY COMPARISON                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Pessimistic Locking (SELECT FOR UPDATE)                  │
│    - Locks the database row at query time.                  │
│    - Other transactions must wait in line.                  │
│    - Best for: High contention, low inventory, money/quota. │
│                                                             │
│ 2. Optimistic Locking (Version Column)                      │
│    - No row locks held during reading.                      │
│    - Validates version on UPDATE: WHERE version = :version  │
│    - Throws OptimisticLockException if conflict occurs.     │
│    - Best for: Low contention, read-heavy workloads.        │
└─────────────────────────────────────────────────────────────┘
```

### Pessimistic Locking Implementation (PostgreSQL & Spring Data):

```java
public interface InternshipPostingRepository extends JpaRepository<InternshipPosting, UUID> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM InternshipPosting p WHERE p.id = :id")
    Optional<InternshipPosting> findByIdForUpdate(@Param("id") UUID id);
}

@Service
public class QuotaReservationService {
    
    @Transactional
    public void reservePlacementQuota(UUID postingId) {
        InternshipPosting posting = postingRepository.findByIdForUpdate(postingId)
            .orElseThrow(() -> new ResourceNotFoundException("Posting not found"));

        if (posting.getRemainingQuota() <= 0) {
            throw new QuotaExhaustedException("No slots remaining for posting: " + postingId);
        }

        posting.setRemainingQuota(posting.getRemainingQuota() - 1);
        postingRepository.save(posting);
    }
}
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Concurrency Analysis & Locking Strategy</div>

```markdown
# TASK: Concurrency Control & Transaction Isolation Audit
You are an expert Distributed Database Systems Architect.

## Input Critical Operation:
[DESCRIBE THE CONCURRENT OPERATION, E.G. MONEY TRANSFER, QUOTA RESERVATION, SEAT BOOKING]

## Instructions:
1. Identify all potential concurrency race conditions (lost updates, double-spending, phantom reads).
2. Recommend the appropriate Transaction Isolation Level and Locking Strategy (Pessimistic vs Optimistic).
3. Provide robust Java/Spring Boot or SQL implementation with explicit transactional boundaries.
4. Define deadlock prevention guidelines (consistent acquisition ordering, lock timeouts).
```
</div>

---

## 5. Review Checklist

- [ ] Are transactional boundaries (`@Transactional`) declared on write operations?
- [ ] Is row-level locking (`SELECT FOR UPDATE`) or optimistic versioning applied to shared finite resources?
- [ ] Are lock timeout parameters configured defensively to prevent database deadlocks?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Gray, Jim & Reuter, Andreas (1992). <em>Transaction Processing: Concepts and Techniques</em>. Morgan Kaufmann.</li>
    <li>Kleppmann, Martin (2017). <em>Designing Data-Intensive Applications: Chapter 7. Transactions</em>.</li>
  </ul>
</div>
