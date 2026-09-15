# 07 — AI Code Generation & Scoped Execution

**AI Code Generation** is the phase where the approved implementation plan is converted into concrete, production-grade source code. Because the design, contracts, and plan have been pre-locked, code generation becomes fast, predictable, and deterministic.

---

## The Code Generation Principles

```
┌─────────────────────────────────────────────────────────────┐
│                 CODE GENERATION PRINCIPLES                  │
├─────────────────────────────────────────────────────────────┤
│ 1. One File at a Time (Incremental Synthesis)              │
│ 2. Preserve Code Context & Clean Diffs                     │
│ 3. Include Defensive Validations Upfront                   │
│ 4. Generate Associated Unit Tests Alongside Logic          │
└─────────────────────────────────────────────────────────────┘
```

---

## Production-Grade Code Example

Here is an example of clean, defensive code generated to fulfill the `ApplicationWorkflowService` task:

```java
package com.app.service;

import com.app.exception.IllegalStateTransitionException;
import com.app.exception.ResourceNotFoundException;
import com.app.model.ApplicationStatus;
import com.app.model.InternshipApplication;
import com.app.repository.InternshipApplicationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class ApplicationWorkflowService {

    private static final Logger log = LoggerFactory.getLogger(ApplicationWorkflowService.class);
    private final InternshipApplicationRepository applicationRepository;

    private static final Map<ApplicationStatus, Set<ApplicationStatus>> VALID_TRANSITIONS = Map.of(
        ApplicationStatus.SUBMITTED, EnumSet.of(ApplicationStatus.FACULTY_APPROVED, ApplicationStatus.REJECTED),
        ApplicationStatus.FACULTY_APPROVED, EnumSet.of(ApplicationStatus.PLACED, ApplicationStatus.REJECTED),
        ApplicationStatus.PLACED, EnumSet.of(ApplicationStatus.COMPLETED)
    );

    public ApplicationWorkflowService(InternshipApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public InternshipApplication transitionStatus(UUID applicationId, ApplicationStatus targetStatus) {
        InternshipApplication app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found: " + applicationId));

        Set<ApplicationStatus> allowed = VALID_TRANSITIONS.getOrDefault(app.getStatus(), Set.of());
        if (!allowed.contains(targetStatus)) {
            log.warn("Invalid state transition attempted: appId={}, from={}, to={}",
                applicationId, app.getStatus(), targetStatus);
            throw new IllegalStateTransitionException(
                String.format("Cannot transition from %s to %s", app.getStatus(), targetStatus)
            );
        }

        app.setStatus(targetStatus);
        InternshipApplication updated = applicationRepository.save(app);
        log.info("Application state changed: appId={}, newStatus={}", applicationId, targetStatus);
        return updated;
    }
}
```

---

## Code Generation Quality Checklist

Before moving to automated testing, the AI code must satisfy:
- [ ] Explicit package declaration and organized imports.
- [ ] No hardcoded configuration strings or unhandled nulls.
- [ ] Proper transaction annotations (`@Transactional`) on database writes.
- [ ] Clean type signatures without raw types or `any`.
