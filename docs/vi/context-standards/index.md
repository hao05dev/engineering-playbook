# Tổng quan Tệp Ngữ cảnh AI & Tiêu chuẩn Tham chiếu (Context Standards)

Các tác nhân lập trình AI hoạt động hiệu quả và chính xác nhất khi được cung cấp ngữ cảnh repository có cấu trúc dạng module và được kiểm soát phiên bản trong Git. Thay vì nhồi nhét những câu prompt khổng lồ không có cấu trúc vào context window của LLM, các nhóm kỹ thuật duy trì một bộ **Tệp Ngữ cảnh AI (AI Context Files)** chuyên biệt và tuân thủ các **Tiêu chuẩn Kỹ thuật Quốc tế**.

---

## 1. Kiến trúc Tệp Ngữ cảnh AI Dạng Module (Modular AI Context Architecture)

```
┌─────────────────────────────────────────────────────────────────┐
│                 MODULAR AI CONTEXT ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────────┤
│ ├── AGENTS.md           ──> Vai trò, giới hạn & quy tắc AI agent│
│ ├── PROJECT_CONTEXT.md  ──> Tech stack, lệnh build & quy ước    │
│ ├── DOMAIN.md           ──> Ngôn ngữ chung & bất biến nghiệp vụ │
│ ├── REQUIREMENTS.md     ──> Backlog IEEE 29148 & tiêu chí duyệt │
│ ├── ARCHITECTURE.md     ──> Mô hình C4 & kiến trúc arc42        │
│ ├── DATABASE.md         ──> Schema quan hệ & chiến lược index   │
│ ├── API.md              ──> Danh mục OpenAPI 3.1 & mã lỗi HTTP  │
│ ├── UI_UX.md            ──> Design tokens, wireframes & chuẩn a11y│
│ ├── TRACEABILITY.md     ──> Ma trận truy vết yêu cầu (RTM)      │
│ └── DECISIONS/          ──> Nhật ký Quyết định Kiến trúc (ADR)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Vì sao Tệp Ngữ cảnh Dạng Module lại Quan trọng?

1. **Tiết kiệm Token**: Agent chỉ tải đúng tệp ngữ cảnh liên quan đến tác vụ đang làm (ví dụ: chỉ nạp `DATABASE.md` khi viết migration thay vì đọc toàn bộ tài liệu).
2. **Cơ sở Chân lý Xác định (Ground Truth)**: Ngăn chặn AI tự suy diễn phiên bản framework, tên cột trong CSDL hoặc logic nghiệp vụ.
3. **Điều phối Đa Agent (Multi-Agent Orchestration)**: Các subagent chuyên biệt (DB Reviewer, API Reviewer) có thể được khởi tạo với tệp ngữ cảnh riêng.
4. **Đồng bộ theo Triết lý Docs-as-Code**: Các tệp ngữ cảnh được cập nhật thông qua Pull Request song song với mã nguồn tính năng.

---

## 3. Lộ trình Nội dung

- [Đặc tả Bộ Tệp Ngữ cảnh AI](./ai-context-files.md) — Biểu mẫu và hướng dẫn chi tiết cho toàn bộ 10 tệp ngữ cảnh gốc.
- [Thư viện Prompt AI Tổng thể](./ai-prompt-library.md) — Tổng hợp các prompt mẫu sẵn sàng sao chép cho toàn bộ 12 mảng kỹ thuật.
- [Tiêu chuẩn Kỹ thuật Quốc tế](./reference-standards.md) — Bảng ma trận tham chiếu chuẩn cho IEEE 29148, OMG UML, C4 Model, arc42, OpenAPI, NN/g và Google Doc guide.
