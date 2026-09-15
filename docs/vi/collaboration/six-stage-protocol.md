# Giao thức Hợp tác 6 Giai đoạn (Six-Stage Collaboration Protocol)

**Giao thức Hợp tác 6 Giai đoạn (Six-Stage Collaboration Protocol)** điều phối toàn bộ vòng đời tương tác giữa lập trình viên và trợ lý AI. Giao thức này loại bỏ các "ảo tưởng và giả định ngầm" (hallucinated assumptions) bằng cách thực thi nghiêm ngặt các cổng đánh giá trước khi bất kỳ dòng code nào được viết ra.

---

## 1. Tổng quan 6 Giai đoạn

```
┌─────────────────────────────────────────────────────────────────┐
│              THE 6-STAGE COLLABORATION LIFECYCLE                │
├─────────────────────────────────────────────────────────────────┤
│ [1. KHÁM PHÁ]  Làm rõ ranh giới nghiệp vụ, tác nhân & mục tiêu. │
│       │                                                         │
│ [2. PHÂN TÍCH] Lập bản đồ quy tắc, chuyển đổi trạng thái & NFRs.│
│       │                                                         │
│ [3. ĐỀ XUẤT]   Xây dựng phương án kiến trúc, ADRs & đánh đổi.   │
│       │                                                         │
│ [4. XÁC NHẬN]  ★ CỔNG DUYỆT CỦA CON NGƯỜI: Giải quyết câu hỏi.  │
│       │                                                         │
│ [5. TÀI LIỆU]  Cập nhật SRS, arc42, OpenAPI specs & Context.    │
│       │                                                         │
│ [6. THI CÔNG]  Lập trình theo TDD, chạy kiểm thử & nghiệm thu.  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Chi tiết Từng Giai đoạn & Tiêu chí Chuyển Cổng (Gate Criteria)

### Giai đoạn 1: Khám phá (Discover)
- **Mục tiêu**: Làm sáng tỏ ý định ban đầu của người dùng mà không tự ý đưa ra quyết định kỹ thuật ngầm.
- **Sản phẩm bàn giao của AI**: Các Thực thể Nghiệp vụ (Entities), Vai trò Người dùng, Mục tiêu Kinh doanh.
- **Tiêu chí qua cổng**: Mọi thuật ngữ đều được định nghĩa trong Bảng Thuật ngữ Chung (Glossary).

### Giai đoạn 2: Phân tích (Analyze)
- **Mục tiêu**: Bóc tách các ràng buộc tiềm ẩn, kịch bản lỗi và máy trạng thái (state machines).
- **Sản phẩm bàn giao của AI**: Ma trận chuyển đổi trạng thái, chỉ số phi chức năng (p99 latency, RPS), luồng phục hồi lỗi.
- **Tiêu chí qua cổng**: Các trường hợp biên và ranh giới phân quyền được liệt kê cụ thể.

### Giai đoạn 3: Đề xuất (Propose)
- **Mục tiêu**: Thiết kế giải pháp kỹ thuật tối ưu kèm phân tích đánh đổi (trade-offs).
- **Sản phẩm bàn giao của AI**: Bản Kế hoạch Triển khai (`implementation_plan.md`), ERD DDL, API contracts, và bản nháp ADR.
- **Tiêu chí qua cổng**: Được gắn nhãn `[PROPOSAL]` và nêu rõ các thay đổi có nguy cơ phá vỡ tính tương thích (breaking changes).

### Giai đoạn 4: Xác nhận (Confirm — Cổng duyệt của Con người)
- **Mục tiêu**: Kỹ sư con người xem xét các đề xuất và trả lời các câu hỏi mở.
- **Quy tắc bắt buộc**: **AI PHẢI DỪNG LẠI và chờ sự phê duyệt rõ ràng từ người dùng trước khi chạm vào mã nguồn.**
- **Tiêu chí qua cổng**: Mọi mục `[QUESTION]` được giải đáp và mọi `[ASSUMPTION]` được kiểm chứng.

### Giai đoạn 5: Tài liệu hóa (Document)
- **Mục tiêu**: Lưu vết chân lý kiến trúc vào hệ thống tài liệu và các tệp ngữ cảnh AI.
- **Sản phẩm bàn giao của AI**: Cập nhật `REQUIREMENTS.md`, `ARCHITECTURE.md`, `API.md`, và nhật ký ADR.
- **Tiêu chí qua cổng**: Tài liệu kỹ thuật được commit lên Git trước khi viết code tính năng.

### Giai đoạn 6: Thi công & Nghiệm thu (Implement & Verify)
- **Mục tiêu**: Viết mã nguồn chuẩn production được bảo vệ bằng kiểm thử tự động.
- **Sản phẩm bàn giao của AI**: Unit tests, integration tests, mã nguồn tính năng, và tài liệu nghiệm thu (`walkthrough.md`).
- **Tiêu chí qua cổng**: 100% test suite trong CI vượt qua thành công, không có lỗi linter, và khớp hoàn toàn tiêu chí nghiệm thu IEEE 29148.

---

## 3. Ví dụ Thực tế: Luồng Tiến triển Qua 6 Giai đoạn

```
[Giai đoạn 1 - Khám phá]: AI bóc tách nhu cầu "Sinh viên Rút đơn Ứng tuyển Thực tập".
[Giai đoạn 2 - Phân tích]: AI phát hiện trường hợp biên: "Nếu doanh nghiệp đã duyệt hồ sơ thì sao?"
[Giai đoạn 3 - Đề xuất]:  AI đề xuất soft-delete chuyển state thành `WITHDRAWN` và bắn webhook.
[Giai đoạn 4 - Xác nhận]: Kỹ sư xác nhận: "Đúng, chỉ cho phép rút đơn nếu trạng thái là PENDING."
[Giai đoạn 5 - Tài liệu]: AI cập nhật SRS (FR-09) và đặc tả OpenAPI (`DELETE /api/v1/applications/{id}`).
[Giai đoạn 6 - Thi công]: AI viết test Playwright E2E, controller NestJS/Spring Boot, và pass tests.
```

---

## 4. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Thực thi Phát triển Tính năng theo Giao thức 6 Giai đoạn</div>

```markdown
# TASK: Thực thi Phát triển Tính năng qua Giao thức Hợp tác 6 Giai đoạn
Bạn là một Đối tác Kỹ thuật AI Tự chủ (Autonomous AI Engineering Partner) tuân thủ nghiêm ngặt Quy trình 6 Giai đoạn.

## User Request:
[DÁN YÊU CẦU TÍNH NĂNG HOẶC BÁO CÁO LỖI TẠI ĐÂY]

## Operating Protocol:
1. Thực hiện GIAI ĐOẠN 1 (Khám phá) & GIAI ĐOẠN 2 (Phân tích): Liệt kê thực thể, quy tắc và rủi ro.
2. Trình bày GIAI ĐOẠN 3 (Đề xuất): Xuất Kế hoạch Triển khai kèm ERD, API specs, gắn nhãn `[PROPOSAL]`.
3. DỪNG LẠI tại GIAI ĐOẠN 4 (Xác nhận): Liệt kê toàn bộ mục `[QUESTION]` và `[ASSUMPTION]`. KHÔNG viết code.
4. Chờ người dùng phản hồi xác nhận trước khi chuyển sang GIAI ĐOẠN 5 (Tài liệu) và GIAI ĐOẠN 6 (Thi công).
```
</div>

---

## 5. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] AI có dừng lại tại Giai đoạn 4 (Xác nhận) trước khi thực hiện bất kỳ sửa đổi code nào không?
- [ ] Mọi điểm chưa rõ hoặc mơ hồ có được đánh dấu bằng nhãn `[QUESTION]` không?
- [ ] Tài liệu kỹ thuật và file context AI có được cập nhật trước khi code thay đổi không?
- [ ] Toàn bộ kiểm thử tự động có vượt qua trước khi xác nhận hoàn thành công việc không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Fowler, Martin (2018). <em>Refactoring & Continuous Delivery Workflows</em>. Addison-Wesley.</li>
    <li>IEEE Computer Society (2020). <em>Guide to the Software Engineering Body of Knowledge (SWEBOK v3.0)</em>.</li>
  </ul>
</div>
