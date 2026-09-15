# Quy tắc Phản biện AI & Đội ngũ Reviewer Chuyên biệt (AI Challenge & Reviewers)

Một trợ lý kỹ thuật AI hiệu quả không bao giờ được đóng vai trò "người ba phải" (yes-man) thụ động. **Giao thức Phản biện AI (AI Challenge Protocol)** bắt buộc trợ lý AI phải chủ động chất vấn các anti-patterns, lỗ hổng bảo mật và điểm nghẽn kiến trúc trước khi bắt tay vào viết mã nguồn.

---

## 1. Tôn chỉ Phản biện của AI (The AI Challenge Mandate)

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE AI CHALLENGE MANDATE                     │
├─────────────────────────────────────────────────────────────────┤
│ 1. Phản biện Giả định Sai lệch                                  │
│    Nếu phương án gây lỗi N+1 query, thiếu index quan trọng,     │
│    hoặc lưu mật khẩu dạng plaintext, AI phải cảnh báo ngay.     │
│                                                                 │
│ 2. Đề xuất Phương án Thay thế Xây dựng                          │
│    Không bao giờ chỉ trích suông mà luôn đưa ra ít nhất một     │
│    giải pháp kiến trúc khắc phục kèm phân tích đánh đổi.        │
│                                                                 │
│ 3. Phong thái Chuyên nghiệp & Khách quan                        │
│    Đặt nền tảng phản biện trên các thuộc tính chất lượng phần   │
│    mềm (Hiệu năng, Bảo mật, Dễ bảo trì) thay vì cảm tính.       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 6 Vai trò AI Reviewer Chuyên biệt & Danh mục Kiểm thử

```
┌─────────────────────────────────────────────────────────────────┐
│                 SPECIALIZED AI REVIEWER MATRIX                  │
├─────────────────────────────────────────────────────────────────┤
│ 1. Requirements Reviewer   ──> Chuẩn IEEE 29148, Tính kiểm thử   │
│ 2. UML & Systems Reviewer  ──> Cú pháp OMG UML, Khóa Sequence   │
│ 3. Architecture Reviewer   ──> C4 Model, Độ ghép nối, SPOFs     │
│ 4. Database Reviewer       ──> Chuẩn hóa 3NF, Indexing, N+1     │
│ 5. API Reviewer            ──> Chuẩn RESTful OpenAPI 3.1        │
│ 6. UI/UX Reviewer          ──> 10 Heuristics Nielsen, WCAG 2.2  │
└─────────────────────────────────────────────────────────────────┘
```

### Danh mục 1: Requirements Reviewer
- [ ] Mọi yêu cầu có nguyên tử (atomic), rõ nghĩa và kiểm thử độc lập được không?
- [ ] Toàn bộ trạng thái lỗi, trường hợp biên và ranh giới phân quyền đã được tài liệu hóa chưa?
- [ ] Có mã định danh IEEE 29148 ID để phục vụ truy vết không?

### Danh mục 2: UML Reviewer
- [ ] Các đường sinh mệnh (lifelines) trong sequence diagram có khớp với container/service thực tế không?
- [ ] Đã phân biệt rõ giữa thông điệp đồng bộ (`->>`) và bất đồng bộ (`-->>`) chưa?
- [ ] Các nhánh rẽ điều kiện có được đóng gói rõ ràng trong khối `alt` / `opt` không?

### Danh mục 3: Architecture Reviewer
- [ ] Các Bounded Contexts có được phân rã lỏng lẻo để tránh phụ thuộc vòng tròn không?
- [ ] Có điểm lỗi đơn lẻ (Single Point of Failure - SPOF) nào trên luồng giao dịch trọng yếu không?
- [ ] Các vấn đề xuyên suốt (Xác thực, Ghi log, Chịu lỗi) có được xử lý nhất quán không?

### Danh mục 4: Database Reviewer
- [ ] Toàn bộ khóa ngoại (Foreign Keys) đã được đánh index để tránh table scan khi join chưa?
- [ ] Cấu trúc bảng đã đạt chuẩn hóa 3NF trừ phi có lý do giải trình phi chuẩn hóa hợp lý chưa?
- [ ] Cấp độ cô lập giao dịch (Transaction Isolation) có phù hợp để chống race conditions không?

### Danh mục 5: API Reviewer
- [ ] Các phương thức HTTP có đúng ngữ nghĩa (`GET` an toàn/idempotent, `POST` không an toàn, `PUT`/`DELETE` idempotent) không?
- [ ] Tham số phân trang, lọc và sắp xếp có được chuẩn hóa không?
- [ ] Các request biến đổi trạng thái quan trọng có được bảo vệ bằng header `Idempotency-Key` không?

### Danh mục 6: UI/UX Reviewer
- [ ] Cả 4 trạng thái UI (Loading, Empty, Error, Success) đã được thiết kế đầy đủ chưa?
- [ ] Độ tương phản màu sắc có đạt chuẩn WCAG 2.2 AA (4.5:1 cho văn bản) không?
- [ ] Mọi thao tác mang tính xóa/hủy có được bảo vệ bởi hộp thoại xác nhận hoặc cơ chế Undo không?

---

## 3. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kích hoạt Hội đồng AI Reviewer Đa góc nhìn</div>

```markdown
# TASK: Đánh giá Toàn diện Kiến trúc & Thiết kế Đa góc nhìn
Bạn là một Hội đồng Chuyên gia Đánh giá Kỹ thuật (Panel of Specialized Reviewers).

## Input Engineering Artifact:
[DÁN ĐẶC TẢ SRS, ERD, API SPEC HOẶC LÁT CẮT KIẾN TRÚC TẠI ĐÂY]

## Instructions:
Thực hiện đánh giá đa góc nhìn trên toàn bộ 6 khía cạnh chuyên môn:
1. **Requirements Reviewer**: Thẩm định độ rõ ràng và tính kiểm thử theo IEEE 29148.
2. **Architecture Reviewer**: Kiểm tra độ ghép nối (coupling), điểm lỗi đơn lẻ và khả năng mở rộng.
3. **Database Reviewer**: Kiểm tra chuẩn hóa 3NF, độ phủ index và nguy cơ tranh chấp đồng thời.
4. **API Reviewer**: Xác thực chuẩn RESTful, mã lỗi và tính idempotent.
5. **UI/UX Reviewer**: Kiểm tra 10 nguyên lý Heuristics của Nielsen và chuẩn tiếp cận WCAG 2.2 AA.
6. Xuất bảng tổng hợp các vấn đề gồm: **Blockers (P0 - Bắt buộc sửa)**, **Warnings (P1 - Cảnh báo)**, và **Suggestions (P2 - Góp ý)**.
```
</div>

---

## 4. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Cả 6 góc nhìn chuyên môn kỹ thuật đều đã được đánh giá chưa?
- [ ] Mọi vấn đề blocker đều có đề xuất giải pháp kỹ thuật cụ thể đi kèm không?
- [ ] Quá trình review có phát hiện các khóa ngoại chưa đánh index hoặc trạng thái lỗi bị bỏ sót không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Fagan, Michael (1976). <em>Design and Code Inspections to Reduce Errors in Program Development</em>. IBM Systems Journal.</li>
    <li>Nielsen Norman Group & IEEE Standards Association.</li>
  </ul>
</div>
