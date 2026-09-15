# Đặc tả OpenAPI & Checklist Review API (OpenAPI 3.1)

**Đặc tả OpenAPI (OpenAPI Specification - OAS v3.1.0)** là tiêu chuẩn toàn cầu để định nghĩa hợp đồng kỹ thuật cho REST API ở định dạng có thể đọc hiểu tự động bằng máy tính. Tài liệu này hướng dẫn cách soạn thảo đặc tả OpenAPI và cung cấp **Bộ Checklist 10 Điểm Kiểm duyệt Thiết kế API**.

---

## 1. Cấu trúc Tài liệu Đặc tả OpenAPI 3.1 Chuẩn

```yaml
openapi: 3.1.0
info:
  title: API Quản lý Thực tập Đại học
  version: 1.0.0
  description: Hợp đồng RESTful API cho quản lý hồ sơ thực tập sinh viên.
paths:
  /api/v1/internships/{id}/applications:
    post:
      summary: Nộp hồ sơ ứng tuyển thực tập
      operationId: submitApplication
      tags: [Applications]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitApplicationRequest'
      responses:
        '201':
          description: Nộp hồ sơ thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplicationResponse'
        '400':
          $ref: '#/components/responses/400BadRequest'
        '422':
          $ref: '#/components/responses/422ValidationError'
```

---

## 2. Bộ Checklist 10 Điểm Kiểm duyệt Thiết kế API

Kiểm toán mọi bản thiết kế API dựa trên 10 tiêu chí chuẩn mực:

- [ ] **1. Danh từ Số nhiều trong URI**: Toàn bộ đường dẫn có dùng danh từ số nhiều và định dạng kebab-case không?
- [ ] **2. Đúng Ngữ nghĩa Động từ HTTP**: GET có đảm bảo an toàn và chỉ đọc? POST/PATCH/DELETE có dùng đúng chức năng không?
- [ ] **3. Mã Status Code Chuẩn**: Có dùng đúng `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429` không?
- [ ] **4. Đóng gói Báo lỗi Chuẩn**: Mọi lỗi trả về có tuân thủ cấu trúc chuẩn RFC 7807 Problem Details không?
- [ ] **5. Phân quyền Bảo vệ (RBAC)**: Toàn bộ các route nhạy cảm có khai báo kiểm tra quyền hạn không?
- [ ] **6. Validate Dữ liệu Chặt chẽ**: Các DTO có validate bắt buộc, độ dài chuỗi, khoảng giá trị và định dạng không?
- [ ] **7. Giới hạn Phân trang**: Các API lấy danh sách có chặn kích thước trang tối đa (ví dụ: max `size=100`) không?
- [ ] **8. Hỗ trợ Idempotency**: Các endpoint thay đổi dữ liệu nhạy cảm có kiểm tra header `Idempotency-Key` không?
- [ ] **9. Giới hạn Tần suất (Rate Limit)**: Các endpoint công khai có được bảo vệ bằng Rate Limiting không?
- [ ] **10. Khớp Chuẩn OpenAPI 3.1**: Có bản đặc tả OpenAPI hoàn chỉnh để client tự động sinh SDK và mock server không?

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh File Đặc tả OpenAPI 3.1 & Kiểm duyệt 10 Điểm API</div>

```markdown
# TASK: Sinh Đặc tả OpenAPI 3.1 & Kiểm toán 10 Điểm Thiết kế API
Bạn là Kiến trúc sư API Cấp cao và Chuyên gia Đặc tả OpenAPI (OAS 3.1).

## Danh sách Endpoint / DTOs Đầu vào:
[DÁN DANH MỤC ENDPOINT, CONTROLLER HOẶC DTOS TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Sinh file đặc tả YAML chuẩn OAS 3.1 đầy đủ Paths, Parameters, RequestBodies, Schemas và Responses (200, 201, 400, 401, 403, 404, 422).
2. Định nghĩa chi tiết JSON Schema types (UUID, regex pattern, min/max).
3. Kiểm toán thiết kế API dựa trên Bộ Checklist 10 Điểm Kiểm duyệt API và xuất báo cáo đánh giá.
```
</div>

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Đặc tả Chuẩn OpenAPI Specification v3.1.0: <a href="https://spec.openapis.org/oas/v3.1.0" target="_blank" rel="noopener">https://spec.openapis.org/oas/v3.1.0</a></li>
  </ul>
</div>
