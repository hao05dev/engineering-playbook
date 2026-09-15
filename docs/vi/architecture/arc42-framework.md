# Khung Tài liệu Kiến trúc arc42 (arc42 Framework)

Được sáng lập bởi Tiến sĩ Gernot Starke và Tiến sĩ Peter Hruschka, **arc42** là tiêu chuẩn mở được quốc tế công nhận rộng rãi nhất để ghi chép tài liệu kiến trúc phần mềm. Nó cung cấp một **khung tài liệu thực dụng gồm 12 phần** trả lời toàn bộ các câu hỏi trọng yếu về cấu trúc của một hệ thống.

---

## 1. 12 Phần mục Cốt lõi của Khung arc42

```
┌─────────────────────────────────────────────────────────────┐
│                     12 PHẦN MỤC CỦA arc42                   │
├─────────────────────────────────────────────────────────────┤
│ 01. Giới thiệu & Mục tiêu (Bối cảnh & Top 3 mục tiêu chất lượng)│
│ 02. Ràng buộc Kiến trúc (Các giới hạn kỹ thuật bắt buộc)    │
│ 03. Bối cảnh & Phạm vi (Ranh giới nghiệp vụ & kỹ thuật)     │
│ 04. Chiến lược Giải pháp (Các quyết định kiến trúc then chốt)│
│ 05. Khối Xây dựng (Building Block View - C4 Container/Comp) │
│ 06. Luồng Vận hành (Runtime View - Sơ đồ tuần tự & State)   │
│ 07. Triển khai (Deployment View - Hạ tầng & Cấu hình mạng)  │
│ 08. Khái niệm Xuyên suốt (Cross-cutting: Bảo mật, Log, Tx)  │
│ 09. Quyết định Kiến trúc (Liên kết tới các bản ghi ADR)     │
│ 10. Yêu cầu Chất lượng (Cây chất lượng Quality Tree)        │
│ 11. Rủi ro & Nợ Kỹ thuật (Nhận diện rủi ro & giải pháp)     │
│ 12. Bảng Thuật ngữ (Glossary & từ viết tắt)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Chi tiết Từng Phần mục & Sản phẩm Kỹ thuật Cần Có

### Mục 1: Giới thiệu & Mục tiêu (Introduction & Goals)
- **Sản phẩm cốt lõi**: Top 3 Mục tiêu Chất lượng (ví dụ: 1. Bảo mật, 2. Độ sẵn sàng, 3. Hiệu năng) và Bảng kỳ vọng của Stakeholder.

### Mục 3: Bối cảnh & Phạm vi (Context & Scope)
- **Sản phẩm cốt lõi**: Sơ đồ C4 Cấp 1 (System Context) thể hiện toàn bộ giao diện kỹ thuật bên ngoài và giao thức giao tiếp.

### Mục 5: Khối Xây dựng (Building Block View)
- **Sản phẩm cốt lõi**: Sơ đồ C4 Cấp 2 (Containers) và Cấp 3 (Components) bóc tách các hộp đen thành các hộp trắng rõ ràng.

### Mục 8: Khái niệm Xuyên suốt (Cross-Cutting Concepts)
- **Sản phẩm cốt lõi**: Các quy chuẩn dùng chung về Bảo mật (JWT/RBAC), Ghi Log (Correlation ID), Xử lý Ngoại lệ và Quản lý Transaction.

### Mục 10: Yêu cầu Chất lượng (Quality Requirements)
- **Sản phẩm cốt lõi**: Cây chất lượng (Quality Tree) và các kịch bản kiểm thử chất lượng ATAM gắn với chỉ số ISO 25010.

---

## 3. Ví dụ Thực tế: Trích đoạn Mục 8 của arc42 (Khái niệm Xuyên suốt)

```markdown
### 8.1 Khái niệm Bảo mật (Security Concept)
- Xác thực qua OIDC / JWT với chữ ký bất đối xứng RSA-256.
- Phân quyền bắt buộc tại tầng Service sử dụng Spring Security `@PreAuthorize("hasRole('ADVISOR')")`.

### 8.2 Khái niệm Khả năng Quan sát (Observability Concept)
- Ghi log JSON có cấu trúc kèm Correlation ID (`traceId`, `spanId`) truyền qua HTTP Header `X-Correlation-Id`.
- Xuất metric Prometheus tại endpoint `/actuator/prometheus` để cảnh báo độ trễ P95 và tỷ lệ lỗi HTTP 5xx.
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Soạn thảo Tài liệu Kiến trúc Chuẩn arc42</div>

```markdown
# TASK: Soạn thảo Tài liệu Kiến trúc Phần mềm Chuẩn arc42
Bạn là Kiến trúc sư Phần mềm Trưởng (Principal Software Architect) có chứng chỉ arc42.

## Bối cảnh Đầu vào:
Hệ thống & Yêu cầu: [DÁN PRD, TÀI LIỆU YÊU CẦU HOẶC SRS TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Soạn thảo Tài liệu Kiến trúc Phần mềm đầy đủ 12 phần theo đúng chuẩn arc42.
2. Thiết lập Chiến lược Giải pháp (Mục 4), Khối Xây dựng (Mục 5 - ánh xạ C4 Model) và Khái niệm Xuyên suốt (Mục 8 - Bảo mật, Log, Transaction).
3. Đưa ra Mục 9 (Architecture Decisions) liên kết tới các hồ sơ ADR chính.
4. Xây dựng Cây Chất lượng (Quality Tree) tại Mục 10.
5. Nhận diện các rủi ro vận hành và nợ kỹ thuật tại Mục 11.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ 12 mục của arc42 đều được trình bày hoặc giải trình rõ lý do nếu không áp dụng?
- [ ] Khối Xây dựng (Mục 5) có hoàn toàn đồng nhất với các sơ đồ C4 Model không?
- [ ] Các mẫu xử lý xuyên suốt (Bảo mật, Giao dịch DB, Log) có được quy chuẩn hóa trong Mục 8 không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Starke, Gernot (2020). <em>Effective Software Architectures: A Practical Approach with arc42</em>. Leanpub.</li>
    <li>Trang web và mẫu template chính thức của arc42: <a href="https://arc42.org/" target="_blank" rel="noopener">https://arc42.org/</a></li>
  </ul>
</div>
