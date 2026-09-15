# Chuẩn mực Lập trình & Quy ước Mã nguồn (Coding Standards)

Để đảm bảo mã nguồn do AI sinh ra hòa nhập mượt mà vào dự án mà không tạo ra xung đột hay nợ kỹ thuật, bạn cần thiết lập chuẩn mực lập trình tường minh. AI Agent học theo mẫu rất nhanh; việc cung cấp ví dụ code chuẩn mực sẽ mang lại kết quả chất lượng vượt trội.

---

## 1. Tính An toàn Kiểu Dữ liệu (Strict Type Safety)

Tuyệt đối không cho phép AI sử dụng kiểu dữ liệu lỏng lẻo, kiểu `any` hoặc ép kiểu (cast) không được kiểm chứng.

### Quy tắc TypeScript / Frontend:
- Bật `strict: true` trong `tsconfig.json`.
- Tránh `any` — sử dụng `unknown` kết hợp với Schema Validation (như Zod, Valibot) khi nhận dữ liệu từ bên ngoài.
- Sử dụng Interface rõ ràng và Discriminated Unions cho các trạng thái phức tạp.

```typescript
// ❌ KHÔNG TỐT: Sử dụng kiểu any lỏng lẻo
export async function fetchUserProfile(userId: any): Promise<any> {
  const res = await api.get(`/users/${userId}`);
  return res.data;
}

// ✅ TỐT: Định kiểu chặt chẽ với Interface và DTO
export interface UserProfileDTO {
  id: string;
  email: string;
  role: 'ADMIN' | 'ENGINEER' | 'VIEWER';
  createdAt: string;
}

export async function fetchUserProfile(userId: string): Promise<UserProfileDTO> {
  const response = await api.get<UserProfileDTO>(`/users/${encodeURIComponent(userId)}`);
  return response.data;
}
```

---

## 2. Xử lý Lỗi & Ghi Log Chuẩn mực (Error Handling & Logging)

AI thường có thói quen bỏ qua exception hoặc chỉ ghi log đơn sơ. Cần ép AI xử lý ngoại lệ có cấu trúc.

### Quy tắc Backend (Ví dụ Java / Spring Boot):
- Tuyệt đối không dùng `catch` rỗng hoặc `e.printStackTrace()`.
- Định nghĩa Custom Exception theo domain nghiệp vụ kèm mã HTTP status tương ứng.
- Ghi log có cấu trúc kèm thông tin ngữ cảnh (Trace ID, User ID).

```java
// ❌ KHÔNG TỐT: Bỏ qua lỗi và ghi log tùy tiện
try {
    paymentGateway.charge(order);
} catch (Exception e) {
    System.out.println("Charge failed");
}

// ✅ TỐT: Xử lý ngoại lệ có chủ đích và ghi log có cấu trúc
@Service
public class PaymentProcessingService {
    private static final Logger log = LoggerFactory.getLogger(PaymentProcessingService.class);

    @Transactional
    public PaymentResult processOrderPayment(Order order, PaymentDetails details) {
        try {
            return paymentGateway.charge(order.getId(), details.getAmount());
        } catch (GatewayTimeoutException ex) {
            log.error("Payment gateway timed out for orderId={}", order.getId(), ex);
            throw new PaymentProcessingException(ErrorCode.PAYMENT_TIMEOUT, "Gateway không phản hồi", ex);
        } catch (InsufficientFundsException ex) {
            log.warn("Tài khoản không đủ số dư orderId={}, customerId={}", order.getId(), order.getCustomerId());
            throw new DomainValidationException(ErrorCode.INSUFFICIENT_FUNDS, "Số dư không khả dụng");
        }
    }
}
```

---

## 3. Tính Bất biến & Hàm Thuần khiết (Immutability & Pure Functions)

- Mặc định dùng `const` trong JavaScript/TypeScript và `final` / `record` trong Java.
- Đặt các phép tính toán nghiệp vụ trong các hàm thuần khiết (pure functions) không có tác dụng phụ (side-effects).
- Hàm thuần khiết cực kỳ dễ viết Unit Test và kiểm thử tính đúng đắn.

```typescript
// ✅ Hàm tính toán thuần khiết: Dễ dàng viết Unit Test 100%
export function calculateTierDiscount(
  orderSubtotal: number,
  tier: 'SILVER' | 'GOLD' | 'PLATINUM'
): number {
  if (orderSubtotal <= 0) return 0;
  
  const discountRateMap: Record<'SILVER' | 'GOLD' | 'PLATINUM', number> = {
    SILVER: 0.05,
    GOLD: 0.10,
    PLATINUM: 0.15,
  };

  return Math.round(orderSubtotal * (discountRateMap[tier] ?? 0) * 100) / 100;
}
```

---

## 4. Phân chia Ranh giới Tầng Kiến trúc (Layer Boundaries)

Bắt buộc tuân thủ nguyên tắc tách biệt trách nhiệm:
1. **Controller / API Handler**: Nhận input HTTP, kiểm tra hợp lệ, xác thực phiên đăng nhập, ủy quyền xử lý cho Service và format response HTTP.
2. **Service / Use Case**: Chứa toàn bộ logic nghiệp vụ, quản lý ranh giới Transaction, thao tác trên Domain Entity.
3. **Repository / Data Access**: Truy vấn cơ sở dữ liệu, map entity và lưu trữ dữ liệu.

> [!IMPORTANT]
> **Không Viết Logic Nghiệp vụ trong Controller**
> Luôn chỉ dẫn AI Agent không thực hiện các câu truy vấn cơ sở dữ liệu trực tiếp hoặc tính toán nghiệp vụ phức tạp ngay trong tầng Controller.
