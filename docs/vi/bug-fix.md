# 10 — Xử lý Bug & Chẩn đoán Lỗi (Bug Fix)

Khi kiểm thử tự động thất bại hoặc bài review của kỹ sư bị từ chối, quy trình sẽ bước vào **Vòng lặp Chẩn đoán & Xử lý Bug (Bug Fix & Diagnostic Loop)**. Thay vì thử-sai (trial-and-error) một cách mò mẫm, AI-SDLC áp dụng phương pháp chẩn đoán nguyên nhân gốc rễ (root-cause analysis) để triệt tiêu lỗi tận gốc.

---

## Quy trình Chẩn đoán 4 Bước

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH CHẨN ĐOÁN & SỬA BUG               │
├─────────────────────────────────────────────────────────────┤
│ 1. Cô lập Lỗi (Thu thập Stack Trace và log chi tiết)        │
│ 2. Viết Test Case Tái hiện Lỗi (Red Test)                   │
│ 3. Sửa Mã nguồn Trọng tâm Tối thiểu (Green Fix)             │
│ 4. Kiểm thử Hồi quy Toàn bộ Dự án (Regression Check)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Chống Hiện tượng Agent Loạn nhịp (AI Thrashing)

Khi gặp lỗi hóc búa, AI Agent có thể rơi vào trạng thái **loạn nhịp (thrashing)** — liên tục sửa code lung tung, phát sinh lỗi mới hoặc tự ý sửa đổi bài test để ép bài test pass một cách giả tạo.

### Cách Ngăn chặn AI Thrashing:
1. **Tuyệt đối Không Cho Phép AI Sửa Assertion của Test**: Bài test đại diện cho yêu cầu nghiệp vụ. Nếu test fail, phải sửa code cài đặt, không được sửa bài test (trừ phi yêu cầu bài toán thay đổi).
2. **Cung cấp Toàn bộ Stack Trace**: Đưa cho Agent thông tin đầy đủ về file, dòng xảy ra lỗi và thông điệp ngoại lệ.
3. **Cố định Ngữ cảnh**: Nhắc lại các bất biến kiến trúc và các ràng buộc dữ liệu liên quan.

---

## Ví dụ: Prompt Chẩn đoán Nguyên nhân Gốc rễ

```markdown
# CHẨN ĐOÁN LỖI: NullPointerException trong Logic Tính Giảm Giá

## Log Lỗi (Error Trace)
```
java.lang.NullPointerException: Cannot invoke "java.math.BigDecimal.compareTo(java.math.BigDecimal)" 
because "minSpend" is null
    at com.app.discount.DiscountService.applyCoupon(DiscountService.java:42)
    at com.app.discount.DiscountServiceTest.testCouponWithoutMinSpend(DiscountServiceTest.java:78)
```

## Yêu cầu Chẩn đoán & Sửa đổi
1. Phân tích file `DiscountService.java` tại dòng 42.
2. CSDL cho phép cột `min_spend` nhận giá trị `NULL` đối với mã giảm giá không yêu cầu chi tiêu tối thiểu.
3. Khắc phục: Xử lý an toàn trường hợp `minSpend` là null trước khi gọi `.compareTo()`.
4. Chạy lại test: `./mvnw test -Dtest=DiscountServiceTest`.
```

---

## Xác thực Kiểm thử Hồi quy (Regression Verification)

Sau khi áp dụng bản sửa lỗi:
- [ ] Test case tái hiện lỗi mới viết chuyển sang trạng thái Pass.
- [ ] 100% unit tests cũ trong hệ thống đều vượt qua mà không bị hồi quy.
- [ ] Bản sửa lỗi không làm chậm hệ thống hay sinh thêm câu truy vấn thừa.
