# 08 — Kỹ nghệ API (API Engineering — OpenAPI)

API là bản hợp đồng kỹ thuật chính thức cho phép giao diện Frontend, ứng dụng di động Mobile và các dịch vụ thứ ba giao tiếp với logic nghiệp vụ Backend. **Kỹ nghệ API (API Engineering)** thiết lập các giao thức chuẩn mực về mô hình hóa tài nguyên REST, ngữ nghĩa HTTP, tính lũy biến (idempotency), bảo mật và đặc tả OpenAPI (OAS 3.1).

---

## Tại sao Kỹ nghệ API lại Sống còn đối với AI Agent?

Nếu thiếu các chuẩn mực API, AI Agent sẽ tự tạo ra các URL tùy tiện và lộn xộn (ví dụ: `POST /getUserDetailsById`, `GET /deleteStudent`), cấu trúc đóng gói JSON không đồng nhất và sử dụng sai mã HTTP status (ví dụ: trả về `200 OK` ngay cả khi server bị sập).

```
┌─────────────────────────────────────────────────────────────┐
│                 KỶ LUẬT THIẾT KẾ KỸ NGHỆ API                │
├─────────────────────────────────────────────────────────────┤
│ 1. Mô hình Tài nguyên ──► Dùng danh từ số nhiều, phân cấp   │
│ 2. Ngữ nghĩa HTTP ──► GET, POST, PUT, PATCH, DELETE         │
│ 3. Đóng gói Lỗi Chuẩn ──► RFC 7807 Problem Details          │
│ 4. Khả năng Chịu lỗi ──► Idempotency-Key, Phân trang, Rate  │
│ 5. Đặc tả Hợp đồng ──► Chuẩn OpenAPI 3.1 làm Nguồn chân lý  │
└─────────────────────────────────────────────────────────────┘
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Thiết kế REST & Mô hình Tài nguyên](./design-principles-rest): Quy tắc đặt tên URL, đường dẫn phân cấp và ánh xạ động từ HTTP.
2. [Hợp đồng HTTP & Mô hình Báo lỗi](./http-contracts-errors): Sử dụng đúng mã Status Code và chuẩn đóng gói lỗi RFC 7807.
3. [Validation, Xác thực & Bảo mật](./validation-auth-security): Kiểm tra tính hợp lệ dữ liệu, phân quyền JWT/OAuth2 và Rate Limiting.
4. [Phân trang, Lọc, Sắp xếp & Tính Lũy biến](./pagination-filtering-idempotency): Cursor vs Offset Pagination và header `Idempotency-Key`.
5. [Đặc tả OpenAPI & Checklist Review API](./openapi-review): Sinh đặc tả OpenAPI OAS 3.1 và checklist kiểm duyệt API.

---

## 4 Quy tắc Bất biến trong Thiết kế API

1. **Dùng Danh từ cho Tài nguyên, Không Dùng Động từ**: Dùng `POST /api/v1/applications`, tuyệt đối không dùng `POST /api/v1/submitApplication`.
2. **Sử dụng Đúng Mã HTTP Status Code**: Không bao giờ trả về `200 OK` khi có lỗi xảy ra. Hãy dùng `400`, `401`, `403`, `404`, `409`, `422`, hoặc `500`.
3. **Cấu trúc Báo lỗi Có Định dạng Chuẩn**: Trả về mã lỗi machine-readable và danh sách chi tiết các trường bị lỗi validation.
4. **Hỗ trợ Tính Lũy biến (Idempotency)**: Hỗ trợ header `Idempotency-Key` cho các endpoint nhạy cảm như trừ tiền, nộp đơn hay đặt giữ chỉ tiêu.

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li><a href="https://spec.openapis.org/oas/v3.1.0" target="_blank" rel="noopener">Đặc tả Chuẩn OpenAPI Specification v3.1.0</a></li>
    <li><a href="https://datatracker.ietf.org/doc/html/rfc7807" target="_blank" rel="noopener">IETF RFC 7807 — Problem Details for HTTP APIs</a></li>
    <li>Fielding, Roy (2000). <em>Architectural Styles and the Design of Network-based Software Architectures (REST)</em>. UC Irvine.</li>
  </ul>
</div>
