# 08 — AI Run Tests & Automated Verification

In the AI-SDLC workflow, code is not finished when the model generates it; it is finished when **automated test suites pass completely**. Autonomous test execution provides deterministic proof that the implementation satisfies requirements without breaking existing functionality.

---

## The Automated Testing Loop

```
┌─────────────────────────────────────────────────────────────┐
│                 AUTOMATED VERIFICATION LOOP                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Agent executes project test runner CLI                   │
│ 2. Tool captures stdout, stderr, and exit codes             │
│ 3. If tests FAIL ➔ Trigger Step 10 (Bug Fix & Diagnostics)  │
│ 4. If tests PASS ➔ Advance to Step 09 (Human Review)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Writing Comprehensive Unit Tests with AI

Unit tests must cover both nominal paths and boundary/error conditions:

```java
package com.app.service;

import com.app.exception.IllegalStateTransitionException;
import com.app.model.ApplicationStatus;
import com.app.model.InternshipApplication;
import com.app.repository.InternshipApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ApplicationWorkflowServiceTest {

    @Mock
    private InternshipApplicationRepository applicationRepository;

    @InjectMocks
    private ApplicationWorkflowService workflowService;

    private UUID appId;
    private InternshipApplication application;

    @BeforeEach
    void setUp() {
        appId = UUID.randomUUID();
        application = new InternshipApplication();
        application.setId(appId);
        application.setStatus(ApplicationStatus.SUBMITTED);
    }

    @Test
    @DisplayName("Should successfully transition SUBMITTED to FACULTY_APPROVED")
    void shouldTransitionToFacultyApproved() {
        when(applicationRepository.findById(appId)).thenReturn(Optional.of(application));
        when(applicationRepository.save(any(InternshipApplication.class))).thenAnswer(i -> i.getArgument(0));

        InternshipApplication result = workflowService.transitionStatus(appId, ApplicationStatus.FACULTY_APPROVED);

        assertNotNull(result);
        assertEquals(ApplicationStatus.FACULTY_APPROVED, result.getStatus());
        verify(applicationRepository).save(application);
    }

    @Test
    @DisplayName("Should throw IllegalStateTransitionException when transitioning REJECTED to PLACED")
    void shouldThrowOnInvalidTransition() {
        application.setStatus(ApplicationStatus.REJECTED);
        when(applicationRepository.findById(appId)).thenReturn(Optional.of(application));

        assertThrows(IllegalStateTransitionException.class, () ->
            workflowService.transitionStatus(appId, ApplicationStatus.PLACED)
        );

        verify(applicationRepository, never()).save(any());
    }
}
```

---

## Test Execution Commands & Protocols

| Framework | Test Command | Quick Filter |
| :--- | :--- | :--- |
| **Java / Maven** | `./mvnw clean test` | `./mvnw test -Dtest=ApplicationWorkflowServiceTest` |
| **Node / Vitest** | `npm run test` | `npx vitest run src/services/workflow.test.ts` |
| **Python / Pytest**| `pytest` | `pytest tests/test_workflow.py -v` |
| **Go** | `go test ./...` | `go test -v ./services/... -run TestTransitionStatus` |

> [!NOTE]
> **Zero Flakiness Policy**
> If a test intermittently fails, investigate async timers, database locks, or unseeded random generators immediately. Flaky tests destroy trust in autonomous verification.
