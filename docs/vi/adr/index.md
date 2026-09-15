# 06 — Quyết định Kiến trúc (Architecture Decision Records — ADR)

**Bản ghi Quyết định Kiến trúc (Architecture Decision Record - ADR)** là tài liệu gọn nhẹ, được quản lý phiên bản cùng mã nguồn (Git) nhằm ghi lại một quyết định kiến trúc quan trọng trong dự án, bao gồm bối cảnh, các phương án thay thế được cân nhắc và hệ quả của quyết định đó.

---

## Tại sao ADR lại Sống còn đối với Kỹ sư và AI Agent?

Nếu thiếu các bản ghi ADR, đội ngũ phần mềm sẽ mắc phải căn bệnh **"mất trí nhớ kiến trúc" (Architectural Amnesia)** — cả lập trình viên và AI Agent đều quên mất *tại sao* hệ thống lại chọn thư viện này, cơ sở dữ liệu kia hay giao thức truyền thông đó. Điều này dẫn tới việc tranh cãi lại các vấn đề đã chốt hoặc vô tình phá vỡ các bất biến kiến trúc.

```
┌─────────────────────────────────────────────────────────────┐
│                       VÒNG ĐỜI CỦA ADR                      │
├─────────────────────────────────────────────────────────────┤
│ Đề xuất (Proposed) ──► Chấp nhận (Accepted) ──► Bị Thay thế │
│                                                             │
│ Một bản ADR ghi lại:                                        │
│ 1. Bối cảnh: Vấn đề kỹ thuật nào đòi hỏi phải ra quyết định?│
│ 2. Các phương án: Có những lựa chọn khả thi nào được xét?   │
│ 3. Quyết định: Phương án nào được chọn và vì sao?           │
│ 4. Hệ quả: Những tác động tích cực và đánh đổi tiêu cực gì? │
└─────────────────────────────────────────────────────────────┘
```

---

## Khi nào Cần Viết một Bản ADR?

Hãy tạo ADR bất cứ khi nào một quyết định mang tính **cốt lõi, cấu trúc hoặc khó đảo ngược**:
- Lựa chọn phong cách kiến trúc (Modular Monolith vs Microservices).
- Chọn hệ quản trị cơ sở dữ liệu chính (PostgreSQL vs MongoDB).
- Chọn framework cốt lõi hoặc giao thức bảo mật (Spring Security OIDC).
- Áp dụng một mẫu truyền thông phân tán (Transactional Outbox vs REST trực tiếp).

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Cấu trúc & Vòng đời ADR (MADR)](./lifecycle-structure): Mẫu tài liệu Markdown ADR chuẩn và vòng đời trạng thái.
2. [Checklist Review ADR & Prompt AI](./review-prompts): Kiểm toán chất lượng bản ghi quyết định và prompt AI mẫu.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://adr.github.io/" target="_blank" rel="noopener">Tổ chức ADR GitHub — Architectural Decision Records</a></li>
    <li><a href="https://adr.github.io/madr/" target="_blank" rel="noopener">MADR — Markdown Architectural Decision Records (Oliver Kopp)</a></li>
    <li>Nygard, Michael (2011). <em>Documenting Architecture Decisions</em>. Cognitect.</li>
  </ul>
</div>
