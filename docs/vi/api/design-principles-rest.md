# Thiết kế REST & Mô hình Tài nguyên (REST Resource Modeling)

REST (Representational State Transfer) là phong cách kiến trúc định hướng tài nguyên dành cho các hệ thống phân tán. Tài liệu này thiết lập các quy tắc chuẩn mực về đặt tên tài nguyên, cấu trúc đường dẫn URI phân cấp và ánh xạ động từ HTTP.

---

## 1. Quy tắc Thiết kế URI & Đặt tên Tài nguyên

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY ƯỚC THIẾT KẾ REST URI                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Dùng Danh từ Số nhiều cho Tập hợp: /api/v1/students      │
│ 2. Dùng Path ID cho Thực thể Đơn lẻ: /students/{id}         │
│ 3. Dùng Kebab-Case (gạch ngang) cho URI: /internship-postings│
│ 4. Giới hạn Lồng nhau (Nesting) Tối đa 2 Cấp                │
│ 5. Dùng Query Parameters cho Lọc, Sắp xếp và Phân trang     │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ Thực tế: Chuẩn vs. Vi phạm:
- ❌ `POST /api/v1/createStudent` ➔ ✅ `POST /api/v1/students`
- ❌ `GET /api/v1/getOpenJobs` ➔ ✅ `GET /api/v1/internship-postings?status=OPEN`
- ❌ `POST /api/v1/students/12/applications/45/evaluations/99/comments` (Quá sâu) ➔ ✅ `POST /api/v1/evaluations/99/comments`

---

## 2. Bảng Ma trận Ngữ nghĩa Động từ HTTP

| Động từ | Hành động | Tính Lũy biến (Idempotent)? | An toàn (Chỉ đọc)? | Mã Thành công |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Truy vấn tài nguyên hoặc danh sách | ✅ Có | ✅ Có | `200 OK` |
| **POST**| Tạo tài nguyên mới / Kích hoạt RPC | ❌ Không | ❌ Không | `201 Created` / `200 OK` |
| **PUT** | Thay thế toàn bộ tài nguyên hiện có | ✅ Có | ❌ Không | `200 OK` |
| **PATCH**| Cập nhật từng phần các trường chỉ định | ⚠️ Tùy ngữ cảnh | ❌ Không | `200 OK` |
| **DELETE**| Xóa tài nguyên | ✅ Có | ❌ Không | `204 No Content` |

---

## 3. Ví dụ Thực tế: Ma trận API Quản lý Thực tập Chuẩn REST

```
┌────────┬──────────────────────────────────────────┬─────────────────────────────┐
│ Phương │ Đường dẫn URI                            │ Hành động / Mô tả           │
├────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ GET    │ /api/v1/internship-postings              │ Danh sách & Lọc tin         │
│ POST   │ /api/v1/internship-postings              │ Đăng tin tuyển dụng mới     │
│ GET    │ /api/v1/internship-postings/{id}         │ Chi tiết 1 tin tuyển dụng   │
│ PATCH  │ /api/v1/internship-postings/{id}         │ Cập nhật chỉ tiêu / hạn chót│
│ DELETE │ /api/v1/internship-postings/{id}         │ Đóng / Xóa mềm tin          │
│ POST   │ /api/v1/internships/{id}/applications    │ Nộp đơn ứng tuyển (Lồng)    │
│ GET    │ /api/v1/applications/{id}                │ Chi tiết trạng thái đơn     │
│ PATCH  │ /api/v1/applications/{id}/status         │ Chuyển đổi trạng thái duyệt │
└────────┴──────────────────────────────────────────┴─────────────────────────────┘
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Mô hình hóa Tài nguyên API Chuẩn REST</div>

```markdown
# TASK: Thiết kế Mô hình Tài nguyên API Chuẩn RESTful
Bạn là Kiến trúc sư API Cấp cao (Principal API Architect).

## Mô hình Nghiệp vụ / Tính năng Đầu vào:
[MÔ TẢ THỰC THỂ VÀ CÁC THAO TÁC CỦA NGƯỜI DÙNG]

## Yêu cầu Thực hiện:
1. Xây dựng cấu trúc URI chuẩn RESTful dùng danh từ số nhiều, kebab-case và lồng tối đa 2 cấp.
2. Ánh xạ chính xác các thao tác vào động từ HTTP (GET, POST, PUT, PATCH, DELETE) kèm mã HTTP Status thành công tương ứng (200, 201, 204).
3. Thiết lập Query Parameters cho việc lọc (`?status=ACTIVE`), sắp xếp (`?sort=appliedAt,desc`) và phân trang (`?page=1&size=20`).
4. Xuất Bảng Ma trận Endpoint API gồm Phương thức, Đường dẫn, Tóm tắt chức năng, Request Body và Response Code.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các đường dẫn URI có dùng danh từ số nhiều và không chứa động từ hành động không?
- [ ] Mức độ lồng nhau của tài nguyên con có được khống chế tối đa 2 cấp không?
- [ ] Các động từ HTTP có tuân thủ đúng ngữ nghĩa RFC (ví dụ: GET an toàn và không làm thay đổi trạng thái hệ thống)?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Fielding, Roy (2000). <em>Architectural Styles and the Design of Network-based Software Architectures</em>.</li>
    <li>Đặc tả Chuẩn OpenAPI Specification v3.1.0 — Paths & Operations.</li>
  </ul>
</div>
