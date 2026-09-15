# 07 — Sinh Mã nguồn (AI Code Generation)

**Sinh Mã nguồn (AI Code Generation)** là giai đoạn chuyển hóa bản kế hoạch thực thi đã được phê duyệt thành mã nguồn thực tế đạt chuẩn production. Nhờ việc đã khóa chặt kiến trúc, hợp đồng API và kế hoạch chi tiết ở các bước trước, việc sinh code diễn ra rất nhanh chóng, chính xác và có tính tiền định cao.

---

## Các Nguyên tắc Sinh Mã nguồn Chuẩn mực

```
┌─────────────────────────────────────────────────────────────┐
│                 NGUYÊN TẮC SINH CODE CHUẨN                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Sinh từng file tuần tự (Incremental Synthesis)           │
│ 2. Giữ nguyên ngữ cảnh xung quanh & Diff gọn gàng           │
│ 3. Lập trình phòng thủ (Defensive Validation) ngay từ đầu   │
│ 4. Luôn sinh kèm Unit Test tương ứng song song với Logic    │
└─────────────────────────────────────────────────────────────┘
```

---

## Ví dụ Mã nguồn Chuẩn Production

Dưới đây là đoạn code mẫu sạch sẽ, có tính phòng thủ cao được sinh ra để hoàn thành task `ApplicationWorkflowService`:

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
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn ứng tuyển: " + applicationId));

        Set<ApplicationStatus> allowed = VALID_TRANSITIONS.getOrDefault(app.getStatus(), Set.of());
        if (!allowed.contains(targetStatus)) {
            log.warn("Cố gắng chuyển đổi trạng thái bất hợp lệ: appId={}, from={}, to={}",
                applicationId, app.getStatus(), targetStatus);
            throw new IllegalStateTransitionException(
                String.format("Không thể chuyển đổi từ %s sang %s", app.getStatus(), targetStatus)
            );
        }

        app.setStatus(targetStatus);
        InternshipApplication updated = applicationRepository.save(app);
        log.info("Chuyển đổi trạng thái đơn thành công: appId={}, newStatus={}", applicationId, targetStatus);
        return updated;
    }
}
```

---

## Checklist Chất lượng Mã nguồn sau khi Sinh

Trước khi chuyển sang bước chạy test tự động, mã nguồn phải thỏa mãn:
- [ ] Khai báo package và import rõ ràng, có tổ chức.
- [ ] Không hardcode chuỗi cấu hình hoặc bỏ qua nguy cơ giá trị null.
- [ ] Sử dụng annotation giao dịch `@Transactional` trên các thao tác ghi dữ liệu.
- [ ] Kiểu dữ liệu chặt chẽ, không dùng kiểu generic thô hoặc `any`.
