# Hợp đồng HTTP & Mô hình Báo lỗi Chuẩn (HTTP Contracts & Errors)

Một API chuyên nghiệp và có tính tiền định luôn giao tiếp trạng thái thành công và thất bại thông qua các **Mã Trạng thái HTTP (HTTP Status Codes)** chuẩn hóa và cấu trúc **Đóng gói Thông báo Lỗi chuẩn (RFC 7807 Problem Details)** thân thiện với máy tính.

---

## 1. Bảng Phân loại Mã HTTP Status Code Chuẩn

```
┌─────────────────────────────────────────────────────────────┐
│                 PHÂN LOẠI MÃ TRẠNG THÁI HTTP                │
├─────────────────────────────────────────────────────────────┤
│ Nhóm 2xx Thành công: 200 (OK), 201 (Created), 204 (No Content)│
│ Nhóm 4xx Lỗi từ Client: 400, 401, 403, 404, 409, 422, 429   │
│ Nhóm 5xx Lỗi từ Server: 500 (Internal Error), 502, 503, 504 │
└─────────────────────────────────────────────────────────────┘
```

| Mã HTTP | Tên Tiếng Anh | Ý nghĩa Bản chất | Trường hợp Sử dụng Thực tế |
| :--- | :--- | :--- | :--- |
| **200** | `OK` | Yêu cầu xử lý thành công | Phản hồi chuẩn cho `GET`, `PUT`, `PATCH`. |
| **201** | `Created` | Tài nguyên mới đã được tạo | `POST` nộp đơn thành công (kèm header `Location`). |
| **204** | `No Content` | Thành công nhưng không có body | Thao tác `DELETE` thành công. |
| **400** | `Bad Request` | Lỗi cú pháp JSON hoặc payload | Request gửi lên bị lỗi cú pháp cú pháp không parse được. |
| **401** | `Unauthorized`| Chưa xác thực danh tính | Thiếu Token Bearer hoặc JWT đã hết hạn. |
| **403** | `Forbidden` | Đã xác thực nhưng không đủ quyền | Sinh viên cố tình gọi vào API duyệt đơn của Giảng viên. |
| **404** | `Not Found` | Tài nguyên không tồn tại | `GET /applications/999` với ID không có trong CSDL. |
| **409** | `Conflict` | Xung đột bất biến nghiệp vụ | Nộp đơn trùng lặp, hoặc vị trí tuyển dụng đã hết chỉ tiêu. |
| **422** | `Unprocessable`| Lỗi validation ngữ nghĩa dữ liệu| Sai định dạng email, điểm GPA nằm ngoài khoảng 0.00-4.00. |
| **429** | `Too Many Requests`| Vượt quá giới hạn tần suất | Người dùng gọi API quá 60 lần/phút (Rate Limit). |

---

## 2. Cấu trúc Đóng gói Báo lỗi Chuẩn Quốc tế RFC 7807

Tuyệt đối không trả về chuỗi text báo lỗi tự phát như `{"error": "Có lỗi xảy ra"}`. Hãy áp dụng chuẩn **IETF RFC 7807 Problem Details**:

```json
{
  "type": "https://api.university.edu/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "Dữ liệu gửi lên có 2 trường không hợp lệ.",
  "instance": "/api/v1/internships/12/applications",
  "code": "VALIDATION_FAILED",
  "timestamp": "2026-09-15T10:30:00Z",
  "invalidParams": [
    {
      "field": "resumeUrl",
      "rejectedValue": "ftp://bad-link",
      "reason": "Phải là đường dẫn HTTPS hợp lệ trỏ tới file .pdf"
    },
    {
      "field": "gpa",
      "rejectedValue": 5.2,
      "reason": "Điểm GPA phải nằm trong khoảng từ 0.00 đến 4.00"
    }
  ]
}
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Chuẩn hóa Xử lý Lỗi HTTP & Cài đặt RFC 7807</div>

```markdown
# TASK: Chuẩn hóa Mã Trạng thái HTTP & Đóng gói Lỗi RFC 7807
Bạn là Chuyên gia Kỹ nghệ REST API.

## Code Controller / Service Đầu vào:
[DÁN CODE CONTROLLER HOẶC EXCEPTION HANDLER TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Ánh xạ từng Domain Exception sang đúng mã HTTP Status Code (400, 401, 403, 404, 409, 422, 500).
2. Viết bộ xử lý lỗi tập trung toàn cục (Global Exception Handler - `@RestControllerAdvice` trong Spring Boot hoặc Middleware trong Express) format dữ liệu trả về theo chuẩn RFC 7807 Problem Details.
3. Bổ sung mảng `invalidParams` liệt kê chi tiết các trường bị lỗi validate.
4. Ẩn hoàn toàn stack trace nội bộ của cơ sở dữ liệu khỏi payload trả về client.
```
</div>

---

## 4. Checklist Kiểm duyệt (Review Checklist)

- [ ] API có phân biệt rạch ròi giữa `401 Unauthorized` (chưa login) và `403 Forbidden` (sai quyền) không?
- [ ] Mọi endpoint đều trả về cấu trúc đóng gói lỗi chuẩn mực RFC 7807 không?
- [ ] Các thông tin nhạy cảm về hạ tầng và database stack trace có được giấu kín khỏi production response không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>IETF RFC 7807 — Problem Details for HTTP APIs: <a href="https://datatracker.ietf.org/doc/html/rfc7807" target="_blank" rel="noopener">https://datatracker.ietf.org/doc/html/rfc7807</a></li>
  </ul>
</div>
