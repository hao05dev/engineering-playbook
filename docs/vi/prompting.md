# Khung Kỹ thuật Prompt S.C.O.P.E

Viết prompt cho một AI Agent lập trình khác hoàn toàn với việc trò chuyện thông thường. Nó đòi hỏi giao tiếp kỹ thuật có cấu trúc và tính tiền định (deterministic). Khung kỹ thuật **S.C.O.P.E** giúp biến các yêu cầu mơ hồ thành các chỉ thị kỹ thuật có độ chính xác tuyệt đối.

---

## 5 Trụ cột của Khung S.C.O.P.E

```
┌─────────────────────────────────────────────────────────────┐
│                   KHUNG KỸ THUẬT S.C.O.P.E                  │
├─────────────────────────────────────────────────────────────┤
│ S ── Situation (Bối cảnh & Hiện trạng hệ thống)             │
│ C ── Constraints (Ràng buộc & Bất biến kỹ thuật)            │
│ O ── Objectives (Mục tiêu & Sản phẩm đầu ra cụ thể)         │
│ P ── Plan (Trình tự kế hoạch thực thi từng bước)            │
│ E ── Evaluation (Tiêu chí Đánh giá & Kiểm thử nghiệm thu)   │
└─────────────────────────────────────────────────────────────┘
```

| Thành phần | Ý nghĩa | Câu hỏi then chốt |
| :--- | :--- | :--- |
| **S** - Situation | Bối cảnh dự án, các file liên quan, phiên bản thư viện | *Hệ thống đang ở đâu và đã có những gì?* |
| **C** - Constraints | Ranh giới cấm thay đổi, quy chuẩn, bất biến kiến trúc | *Điều gì TUYỆT ĐỐI KHÔNG được làm hỏng?* |
| **O** - Objectives | Hàm, component hoặc tính năng cụ thể cần tạo mới | *Kết quả đầu ra chính xác là gì?* |
| **P** - Plan | Thứ tự logic triển khai và các file cần sửa | *Nên thực hiện theo các bước nào?* |
| **E** - Evaluation | Lệnh chạy test, các ca biên, điều kiện pass | *Làm sao để chứng minh task hoàn thành 100%?* |

---

## Cấu trúc Một Prompt Chuẩn S.C.O.P.E

### Ví dụ Thực tế: Thêm Logic Áp dụng Mã Giảm Giá (%)

```markdown
# TASK: Cài đặt Logic Mã Giảm Giá Theo Phần Trăm

## S — Situation (Bối cảnh)
Dự án Spring Boot 3.3 e-commerce với PostgreSQL.
Các file liên quan:
- `src/main/java/com/app/discount/DiscountService.java`
- `src/main/java/com/app/discount/dto/ApplyCouponRequest.java`
- `src/main/java/com/app/discount/entity/Coupon.java`

## C — Constraints (Ràng buộc)
- Không chỉnh sửa logic `FixedAmountDiscount` hiện có.
- Không tạo thêm migration database trong bước này.
- Đảm bảo giới hạn giảm giá tối đa ($50.00).
- Ném lỗi `CouponExpiredException` nếu `validUntil` đã qua.

## O — Objective (Mục tiêu)
Viết phương thức `DiscountResult applyPercentageCoupon(String couponCode, BigDecimal cartTotal)` trong `DiscountService`.

## P — Plan (Kế hoạch)
1. Kiểm tra sự tồn tại và hạn dùng của coupon.
2. Tính tiền giảm: `min(cartTotal * percentage, maxDiscountCap)`.
3. Trả về `DiscountResult` gồm tổng tiền sau giảm và số tiền tiết kiệm.

## E — Evaluation (Kiểm thử)
- Chạy unit tests: `./mvnw test -Dtest=DiscountServiceTest`
- Bổ sung test case cho:
  - Coupon hết hạn (phải ném exception)
  - Đơn hàng chưa đạt giá trị tối thiểu
  - Số tiền giảm vượt quá $50 (phải chặn ở $50.00)
```

---

## So sánh: Prompt Kém vs. Prompt Chuẩn S.C.O.P.E

### ❌ Prompt Kém
> *"Viết giúp tôi tính năng giảm giá coupon cho backend."*
- **Hậu quả**: AI tự đoán kiểu dữ liệu, tự tạo entity thừa, tự bịa quy tắc nghiệp vụ và không viết unit test.

### ✅ Prompt Chuẩn S.C.O.P.E
- **Kết quả**: AI tạo đúng class mục tiêu, tuân thủ kiến trúc, xử lý đầy đủ ca biên và sinh kèm bộ unit test hoàn chỉnh.

---

## Kinh nghiệm Tối ưu hóa Hội thoại Nhiều Lượt (Multi-Turn)

1. **Phê duyệt Kế hoạch trước**: Yêu cầu AI đưa ra Plan trước, bạn review xác nhận rồi mới cho AI sinh code.
2. **Làm mới Ngữ cảnh**: Khi đoạn chat quá dài, tóm tắt lại các điểm đã xong và cung cấp lại đường dẫn file trọng tâm.
3. **Phản hồi Lỗi bằng Stack Trace**: Khi test fail, dán trực tiếp log lỗi chi tiết để AI phân tích nguyên nhân gốc rễ thay vì sửa bài test để đối phó.
