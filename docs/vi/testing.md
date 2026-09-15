# 08 — Tự động Chạy Tests (AI Run Tests)

Trong phương pháp luận AI-SDLC, code không phải hoàn thành khi mô hình AI sinh xong text; code chỉ thực sự hoàn thành khi **toàn bộ bộ kiểm thử tự động (automated test suite) vượt qua 100%**. Việc tự động chạy test cung cấp bằng chứng tiền định rằng giải pháp đáp ứng đúng yêu cầu mà không gây lỗi hồi quy cho hệ thống.

---

## Vòng lặp Kiểm thử Tự động (Automated Testing Loop)

```
┌─────────────────────────────────────────────────────────────┐
│                 VÒNG LẶP XÁC THỰC TỰ ĐỘNG                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Agent tự động kích hoạt lệnh chạy test qua CLI           │
│ 2. Tool thu thập stdout, stderr và mã thoát (exit code)     │
│ 3. Nếu test THẤT BẠI ➔ Kích hoạt Bước 10 (Chẩn đoán & Fix) │
│ 4. Nếu test THÀNH CÔNG ➔ Chuyển sang Bước 09 (Human Review) │
└─────────────────────────────────────────────────────────────┘
```

---

## Viết Unit Test Toàn diện Cùng AI

Unit test bắt buộc phải bao quát cả luồng chạy thông thường (happy path) và các tình huống ngoại lệ:

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
    @DisplayName("Chuyển đổi trạng thái từ SUBMITTED sang FACULTY_APPROVED thành công")
    void shouldTransitionToFacultyApproved() {
        when(applicationRepository.findById(appId)).thenReturn(Optional.of(application));
        when(applicationRepository.save(any(InternshipApplication.class))).thenAnswer(i -> i.getArgument(0));

        InternshipApplication result = workflowService.transitionStatus(appId, ApplicationStatus.FACULTY_APPROVED);

        assertNotNull(result);
        assertEquals(ApplicationStatus.FACULTY_APPROVED, result.getStatus());
        verify(applicationRepository).save(application);
    }

    @Test
    @DisplayName("Ném IllegalStateTransitionException khi chuyển từ REJECTED sang PLACED")
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

## Bảng Lệnh Kiểm thử Chuẩn theo Ngôn ngữ

| Framework | Lệnh Chạy Toàn bộ Test | Lệnh Lọc Nhanh Từng File |
| :--- | :--- | :--- |
| **Java / Maven** | `./mvnw clean test` | `./mvnw test -Dtest=ApplicationWorkflowServiceTest` |
| **Node / Vitest** | `npm run test` | `npx vitest run src/services/workflow.test.ts` |
| **Python / Pytest**| `pytest` | `pytest tests/test_workflow.py -v` |
| **Go** | `go test ./...` | `go test -v ./services/... -run TestTransitionStatus` |

> [!NOTE]
> **Chính sách Không Khoan nhượng với Test Chập chờn (Flaky Tests)**
> Nếu một bài test lúc pass lúc fail, hãy điều tra ngay lập tức các yếu tố bất đồng bộ (async timers), khóa database hoặc hàm random chưa gán seed. Test chập chờn sẽ phá hủy niềm tin vào quy trình tự động hóa.
