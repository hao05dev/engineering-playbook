# Nguyên tắc Cốt lõi (Core Principles)

Phương pháp luận AI-SDLC được xây dựng dựa trên 5 nguyên tắc kỹ thuật không thể thỏa hiệp. Những nguyên tắc này giúp đội ngũ kỹ sư tối đa hóa tốc độ phát triển mà vẫn ngăn ngừa nợ kỹ thuật (technical debt), lỗ hổng bảo mật và sự suy thoái kiến trúc.

---

## 1. AI là Trợ lý, Bạn là Chủ sở hữu Mã nguồn

```
┌─────────────────────────────────┐
│         Kỹ sư Phần mềm          │  ◄── Kiến trúc, Trách nhiệm, Bảo mật, Nghiệp vụ
└────────────────┬────────────────┘
                 │ Chỉ thị & Prompting
┌────────────────▼────────────────┐
│            AI Agent             │  ◄── Cú pháp, Phác thảo, Scaffolding, Chạy test
└─────────────────────────────────┘
```

- **Tính chịu trách nhiệm (Accountability)**: Bạn chịu trách nhiệm 100% cho từng dòng code được merge vào repository.
- **Không tin tưởng mù quáng**: Không bao giờ giả định code AI sinh ra là đúng chỉ vì nó compile được hoặc trông có vẻ mượt mà.
- **Thấu hiểu sâu sắc**: Nếu bạn không thể giải thích cặn kẽ từng dòng trong kết quả AI sinh ra, bạn chưa sẵn sàng để phê duyệt (approve) nó.

---

## 2. Chia nhỏ Phạm vi & Lặp Tinh gọn (Granular & Scoped)

Các mô hình LLM đạt độ chính xác cao nhất khi phạm vi bài toán hẹp, rõ ràng và biệt lập.

> [!TIP]
> **Quy tắc Vàng về Phạm vi (Golden Rule of Scope)**
> Hãy chia các task sao cho chỉ tác động đến **1 đến 3 file liên quan** và thay đổi dưới **150 dòng code ròng**. Prompt nguyên khối quá lớn dễ dẫn đến ảo giác (hallucination), bỏ sót edge cases và gây lỗi hồi quy ngầm.

- Phân rã các tính năng lớn kéo dài nhiều ngày thành các đơn vị thực thi kéo dài 15–30 phút.
- Luôn cung cấp ngữ cảnh cần thiết (interface, schema, types) nhưng tránh nhồi nhét các file không liên quan vào prompt.

---

## 3. Xác thực bằng Kiểm thử Tự động (TDD First)

Kiểm thử tự động là đối trọng quan trọng nhất để triệt tiêu tính bất định (nondeterminism) của AI.

```
Viết Test / Spec ──► AI Sinh Code ──► Chạy Test Tự động ──► Pass (Green) / Refactor
```

- **Viết Spec/Test trước**: Định nghĩa assertion cho unit test hoặc tiêu chí kiểm thử tích hợp trước khi yêu cầu AI viết logic nghiệp vụ.
- **Xác thực Xanh (Deterministic Green)**: Một task chỉ được xem là hoàn thành khi toàn bộ automated tests vượt qua ở máy local và CI/CD.
- **Kiểm thử phủ định (Negative Testing)**: Luôn yêu cầu test cho các tình huống ngoại lệ, lỗi phân quyền và dữ liệu đầu vào không hợp lệ.

---

## 4. Kiểm tra Code theo Cơ chế Zero-Trust (Zero-Trust Review)

Hãy đối xử với toàn bộ code do AI sinh ra như code được nộp bởi một lập trình viên Junior có tốc độ gõ phím cực nhanh nhưng chưa nắm vững toàn cảnh hệ thống.

> [!WARNING]
> **Các cạm bẫy phổ biến của code AI**
> - Bỏ qua exception hoặc chỉ ghi log rỗng (`catch (Exception e) {}`).
> - Tự bịa ra các hàm hoặc thư viện bên thứ ba không tồn tại.
> - Bỏ qua bước kiểm tra tính hợp lệ của dữ liệu đầu vào (dẫn tới SQL Injection, XSS).
> - Lỗi lệch 1 đơn vị (off-by-one errors) hoặc vòng lặp vô hạn.

### Checklist Review của Kỹ sư:
1. **Bảo mật (Security)**: Đoạn code này có làm rò rỉ dữ liệu hoặc bỏ qua xác thực/phân quyền không?
2. **Hiệu năng (Performance)**: Có lỗi truy vấn N+1, tràn bộ nhớ (memory leak) hay thiếu index không?
3. **Khả năng bảo trì (Maintainability)**: Code có tuân thủ đúng Design Pattern và quy ước đặt tên của dự án không?
4. **Tính lũy biến & Khả năng chịu lỗi (Idempotency & Resilience)**: Xử lý thế nào khi mạng timeout hoặc cần rollback transaction?

---

## 5. Đặt Tính toàn vẹn Kiến trúc lên Hàng đầu

Không bao giờ để AI tự ý đưa ra các quyết định kiến trúc một cách tùy tiện.

- Kiến trúc, mô hình dữ liệu (domain models), database schema và hợp đồng API phải được chốt trong **Giai đoạn Thiết kế** trước khi bắt tay viết code.
- AI phải tuân thủ nghiêm ngặt các pattern sẵn có (ví dụ: Domain-Driven Design, Hexagonal Architecture, Clean Architecture, CQRS) thay vì tự tạo ra các cấu trúc file lộn xộn.

---

## Bảng Đối chiếu Nguyên tắc

| Nguyên tắc | Phản mẫu (Anti-Pattern) | Thực hành Khuyến nghị |
| :--- | :--- | :--- |
| **Sở hữu** | Copy-paste code AI thẳng vào production | Đọc hiểu và kiểm chứng từng dòng code |
| **Chia nhỏ** | "Hãy viết cho tôi toàn bộ hệ thống eCommerce" | "Cài đặt hàm `applyDiscountCoupon` trong `DiscountService`" |
| **Kiểm thử** | Bấm thử giao diện bằng tay để test | Viết Unit Test, Integration Test và Mock Assertion |
| **Review** | Lướt qua diff một cách hời hợt | Đánh giá nghiêm ngặt về bảo mật, hiệu năng và logic |
| **Kiến trúc** | Để AI tự do tạo folder và hàm helper tùy tiện | Tuân thủ tuyệt đối ranh giới các tầng kiến trúc |
