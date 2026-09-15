# Validation, Xác thực & Phân quyền Bảo mật (Auth & Security)

API là cửa ngõ công khai tiếp xúc trực tiếp với môi trường ngoài. **Validation Dữ liệu, Xác thực (Authentication), Phân quyền (Authorization) và Giới hạn Tần suất (Rate Limiting)** cấu thành nên hệ thống phòng thủ đa tầng bảo vệ các dịch vụ backend khỏi truy cập trái phép, tấn công tiêm mã (injection) và cạn kiệt tài nguyên.

---

## 1. Kiến trúc Validation Dữ liệu Đầu vào

Tuyệt đối không tin tưởng dữ liệu từ client gửi lên. Hãy validate kiểu dữ liệu, định dạng, độ dài và các bất biến trước khi dữ liệu chạm tới tầng Service:

```java
// Ví dụ Jakarta Bean Validation trong Spring Boot
public record SubmitApplicationRequest(
    @NotNull(message = "Mã sinh viên là bắt buộc")
    UUID studentId,

    @NotBlank(message = "Đường dẫn CV là bắt buộc")
    @Pattern(regexp = "^https://.*\\.pdf$", message = "Phải là đường dẫn HTTPS trỏ tới file .pdf")
    String resumeUrl,

    @Size(max = 2000, message = "Thư xin việc không được vượt quá 2000 ký tự")
    String coverLetter
) {}
```

---

## 2. Xác thực & Phân quyền (JWT & RBAC)

```
┌─────────────────────────────────────────────────────────────┐
│                 LUỒNG XÁC THỰC & PHÂN QUYỀN                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Client gửi: Authorization: Bearer <JWT_TOKEN>            │
│ 2. API Gateway / Filter kiểm tra chữ ký & thời hạn token    │
│ 3. Security Context trích xuất: { sub, role: "ADVISOR" }    │
│ 4. Method Interceptor chặn: @PreAuthorize("hasRole('...')") │
└─────────────────────────────────────────────────────────────┘
```

- **Xác thực (Authentication - Bạn là ai?)**: Được chứng thực bằng chữ ký mật mã học trên JWT Token.
- **Phân quyền (Authorization - Bạn được làm gì?)**: Được đánh giá qua Phân quyền theo Vai trò (RBAC) hoặc theo Thuộc tính (ABAC).

---

## 3. Giới hạn Tần suất & Chống Tấn công DoS (Rate Limiting)

Bảo vệ các endpoint nhạy cảm bằng thuật toán **Token Bucket** kết hợp Redis:

```
Client ──► [ Bộ Giới Hạn Tần Suất (Redis) ] ──► [ Backend API ]
```

### Các Header Phản hồi Chuẩn khi Bị Giới hạn:
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1773700000
Retry-After: 45
Content-Type: application/problem+json
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Tăng cường Bảo mật API (JWT, RBAC, Rate Limiting)</div>

```markdown
# TASK: Tăng cường Bảo mật API (Validation, JWT, RBAC & Rate Limiting)
Bạn là Chuyên gia Bảo mật Ứng dụng & DevSecOps.

## Danh sách Endpoint Đầu vào:
[DÁN ĐẶC TẢ CONTROLLER HOẶC OPENAPI TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Thiết lập các quy tắc Bean Validation / DTO Schema nghiêm ngặt có thông điệp lỗi rõ ràng.
2. Thêm các annotation phân quyền bảo vệ (@PreAuthorize / Role Guards) trên toàn bộ các route nhạy cảm.
3. Cấu hình chính sách Rate Limiting (ví dụ: 10 request/phút cho Auth, 100 request/phút cho API đọc dữ liệu).
4. Cấu hình chính sách CORS chặt chẽ và các Security Header (CSP, HSTS, X-Frame-Options).
5. Xuất mã nguồn cấu hình bảo mật hoàn chỉnh.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Dữ liệu đầu vào có được validate chặt chẽ qua DTO schema trước khi chuyển sang tầng Service không?
- [ ] Toàn bộ các route riêng tư có được bảo vệ bằng kiểm tra vai trò (RBAC) không?
- [ ] Các endpoint nhạy cảm (đăng nhập, quên mật khẩu) có được bảo vệ bằng Rate Limiting không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OWASP REST Security Cheat Sheet: <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener">https://cheatsheetseries.owasp.org/</a></li>
    <li>IETF RFC 7519 — JSON Web Token (JWT).</li>
  </ul>
</div>
