# Tổng quan Kỹ thuật Tài liệu (Documentation Engineering)

Tài liệu kỹ thuật (documentation) là sản phẩm chuyển giao hạng nhất (first-class deliverable) trong kỹ thuật phần mềm. Nếu không có tài liệu kỹ thuật rõ ràng, chính xác và có thể bảo trì, hệ thống phần mềm sẽ trở nên mờ mịt, tri thức bị cô lập trong đầu một vài cá nhân, và các trợ lý AI sẽ thiếu cơ sở dữ liệu thực tế (ground truth) để hỗ trợ hiệu quả.

---

## 1. Triết lý Cốt lõi: Docs-as-Code

Kỹ thuật Tài liệu (Documentation Engineering) xử lý tài liệu kỹ thuật với cùng mức độ nghiêm ngặt, quy trình làm việc và tiêu chuẩn chất lượng như mã nguồn sản phẩm:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOCS-AS-CODE PRINCIPLES                      │
├─────────────────────────────────────────────────────────────────┤
│ 1. Lưu trữ Văn bản thuần: Markdown / MDX được lưu trực tiếp     │
│    trong Git cùng mã nguồn để kiểm soát phiên bản thống nhất.   │
│                                                                 │
│ 2. Kiểm thử Tự động: CI/CD linters kiểm tra liên kết hỏng,      │
│    chính tả, định dạng và quy tắc phong cách (Vale, markdownlint).│
│                                                                 │
│ 3. Đánh giá Đồng cấp (Peer Review): Cập nhật tài liệu qua Pull  │
│    Request song song với code tính năng.                        │
│                                                                 │
│ 4. Sinh trang Tĩnh Liên tục: Tự động build và host qua          │
│    VitePress / Docusaurus / GitHub Pages.                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Cấu trúc Tài liệu Kỹ thuật Phần mềm

```
┌─────────────────────────────────────────────────────────────────┐
│               ENGINEERING DOCUMENTATION TAXONOMY                │
├─────────────────────────────────────────────────────────────────┤
│ 1. Tài liệu Yêu cầu & Phân tích                                 │
│    ├── BRD (Business Requirements Document)                     │
│    ├── PRD (Product Requirements Document)                      │
│    └── SRS (Software Requirements Specification - IEEE 29148)   │
│                                                                 │
│ 2. Tài liệu Kiến trúc & Thiết kế                                │
│    ├── arc42 System Architecture Document                       │
│    ├── C4 Model Diagrams & Bối cảnh Hệ thống                    │
│    └── Architecture Decision Records (ADR / MADR)               │
│                                                                 │
│ 3. Đặc tả Kỹ thuật & Triển khai                                 │
│    ├── Database Schema & Từ điển Dữ liệu (Data Dictionary)      │
│    ├── Đặc tả Tham chiếu API OpenAPI 3.1                        │
│    ├── UI/UX Design System & Screen Inventory                   │
│    └── Master Test Plan & Ma trận Truy vết (Traceability Matrix)│
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Lộ trình Nội dung

- [Tiêu chuẩn Kỹ thuật Tài liệu theo Google](./google-doc-standards.md) — Quy tắc phong cách, giọng văn, tính rõ ràng và vòng đời tài liệu theo chuẩn Google.
- [Tài liệu Yêu cầu & Kiến trúc Hệ thống](./requirements-architecture-docs.md) — Biểu mẫu và tiêu chuẩn biên soạn BRD, PRD, SRS, arc42, C4 và ADRs.
- [Tài liệu Database, API, UI/UX & Kiểm thử](./db-api-ui-test-docs.md) — Đặc tả kỹ thuật tiêu chuẩn cho CSDL, REST API, Design System và Kế hoạch Kiểm thử QA.
