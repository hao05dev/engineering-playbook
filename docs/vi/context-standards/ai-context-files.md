# Đặc tả Bộ Tệp Ngữ cảnh AI (AI Context Files Specification)

Để trợ lý AI bám sát thực tế và mã nguồn dự án, các repository nên duy trì một bộ tệp ngữ cảnh Markdown có cấu trúc rõ ràng tại thư mục gốc hoặc thư mục `.agent/`.

---

## 1. Bộ 10 Tệp Ngữ cảnh AI Tiêu chuẩn (The 10 Context Files)

```
┌─────────────────────────────────────────────────────────────────┐
│                      THE 10 CONTEXT FILES                       │
├─────────────────────────────────────────────────────────────────┤
│ 1. AGENTS.md          ──> Quy tắc hành vi, rào chắn an toàn AI   │
│ 2. PROJECT_CONTEXT.md ──> Lệnh build, test, tech stack & quy ước │
│ 3. DOMAIN.md          ──> Thuật ngữ, quy tắc & bất biến nghiệp vụ│
│ 4. REQUIREMENTS.md    ──> Backlog IEEE 29148 kèm tiêu chí duyệt  │
│ 5. ARCHITECTURE.md    ──> Sơ đồ C4, container & bản đồ component │
│ 6. DATABASE.md        ──> Bảng CSDL quan hệ, index & khóa ngoại  │
│ 7. API.md             ──> OpenAPI endpoints, auth & schema lỗi   │
│ 8. UI_UX.md           ──> Design tokens, screen inventory & a11y │
│ 9. TRACEABILITY.md    ──> RTM kết nối yêu cầu với test suites    │
│ 10. DECISIONS/        ──> Thư mục lưu trữ Quyết định Kiến trúc   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Biểu mẫu & Đặc tả Chi tiết

### `AGENTS.md` (Quy tắc Hành vi của Agent)
```markdown
# Agent Operating Rules & Guardrails
- **Cổng Lập kế hoạch**: Với các sửa đổi nhiều file hoặc tính năng mới, tạo `implementation_plan.md` và chờ phê duyệt trước khi sửa code.
- **Phân loại Thông tin**: Luôn gắn nhãn `[ASSUMPTION]` cho câu chưa kiểm chứng và `[QUESTION]` cho câu hỏi chặn.
- **Kiểm thử**: Không bao giờ kết luận hoàn thành tác vụ nếu chưa chạy test suites (`npm test` / `pytest`).
```

### `PROJECT_CONTEXT.md` (Môi trường Repository)
```markdown
# Project Context
- **Runtime**: Node.js 22 LTS / TypeScript 5.4 / VitePress 1.6
- **Trình quản lý Gói**: npm (v10.8+)
- **Lệnh Build**: `npm run docs:build`
- **Lệnh Lint**: `npm run lint`
- **Quy ước**: camelCase cho biến TS, kebab-case cho tên file markdown.
```

### `DOMAIN.md` (Ngôn ngữ Chung & Bất biến Nghiệp vụ)
```markdown
# Domain Invariants & Ubiquitous Language
- **InternshipApplication**: Hồ sơ ứng tuyển của sinh viên gửi tới một vị trí thực tập.
- **Bất biến INV-01**: Mỗi sinh viên chỉ có tối đa 1 vị trí thực tập được chấp nhận hoạt động trong một học kỳ.
- **Bất biến INV-02**: Không thể chỉnh sửa hồ sơ sau khi trạng thái đã chuyển sang `ACCEPTED`.
```

### `REQUIREMENTS.md` (Backlog Chuẩn IEEE 29148)
```markdown
# Requirements Backlog
| ID | Tiêu đề | Mức ưu tiên | Trạng thái | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| FR-01 | Ghép cặp Gale-Shapley | P0 | DONE | Không bỏ sót sinh viên đủ điều kiện nếu còn chỉ tiêu |
| FR-02 | Tải lên CV dạng PDF | P1 | ACTIVE | Validate định dạng PDF, quét virus, dung lượng tối đa 5MB |
```

### `DATABASE.md` (Kiến trúc CSDL & Đánh Index)
```markdown
# Database Architecture
- **Engine**: PostgreSQL 16
- **Công cụ Migration**: Flyway (`migrations/V*.sql`)
- **Các Bảng Chính**: `users`, `students`, `job_postings`, `internship_applications`
- **Quy tắc Index**: Mọi khóa ngoại FK bắt buộc phải có B-Tree index tương ứng.
```

---

## 3. Quy trình Duy trì & Cập nhật Ngữ cảnh

```
┌─────────────────────────────────────────────────────────────────┐
│                 CONTEXT SYNCHRONIZATION FLOW                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Lên kế hoạch tính năng ──> Cập nhật `REQUIREMENTS.md` & `DOMAIN.md`│
│ 2. Thay đổi CSDL          ──> Cập nhật `DATABASE.md` (cột & index)   │
│ 3. Thay đổi Hợp đồng API  ──> Cập nhật `API.md` (OpenAPI schemas)    │
│ 4. Ra Quyết định Kỹ thuật ──> Thêm `DECISIONS/000X-title.md`         │
│ 5. Code & Chạy Test       ──> Cập nhật cờ pass trong `TRACEABILITY.md`│
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kiểm toán & Khởi tạo Tệp Ngữ cảnh AI</div>

```markdown
# TASK: Khởi tạo hoặc Kiểm toán Bộ Tệp Ngữ cảnh AI cho Repository
Bạn là một Principal Repository Architect.

## Input Codebase / Specification:
[DÁN CẤU TRÚC REPO, PACKAGE.JSON HOẶC TÓM TẮT DỰ ÁN TẠI ĐÂY]

## Instructions:
1. Kiểm toán repository dựa trên bộ 10 Tệp Ngữ cảnh AI Tiêu chuẩn.
2. Sinh nội dung Markdown chuẩn production cho các tệp ngữ cảnh còn thiếu:
   - `AGENTS.md` (Quy tắc, phân quyền, cổng kiểm soát chất lượng)
   - `PROJECT_CONTEXT.md` (Tech stack, câu lệnh thực thi, quy ước)
   - `DOMAIN.md` (Ngôn ngữ nghiệp vụ, bất biến)
   - `REQUIREMENTS.md` (Backlog IEEE 29148)
   - `DATABASE.md` (Schema, ràng buộc bảng, chỉ mục index)
   - `API.md` (Danh mục endpoint OpenAPI, xác thực, mã lỗi)
3. Đảm bảo mọi tệp đều trình bày dưới dạng bảng Markdown rõ ràng và sơ đồ súc tích.
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Cả 10 tệp ngữ cảnh đã được lưu ở thư mục gốc hoặc docs tiêu chuẩn chưa?
- [ ] Các câu lệnh build, test, lint trong `PROJECT_CONTEXT.md` đã được kiểm chứng hoạt động chưa?
- [ ] `DOMAIN.md` có ghi nhận rõ ràng các bất biến nghiệp vụ không?
- [ ] Tệp ngữ cảnh có được commit cùng một Pull Request với code tính năng không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Google DeepMind — Agentic Coding Standards & Grounding Protocols.</li>
    <li>Docs-as-Code Best Practices & Chuẩn Tổ chức Git Repository.</li>
  </ul>
</div>
