# 03 — Thiết kế Kỹ thuật (Technical Design)

Giai đoạn **Thiết kế Kỹ thuật (Technical Design)** thiết lập bản vẽ kiến trúc, mô hình dữ liệu và các hợp đồng API trước khi tiến hành viết code. Bước này ngăn chặn AI Agent tự ý tạo ra các schema xung đột hoặc kết nối lộn xộn giữa các service.

---

## Cấu trúc Bản Thiết kế Kỹ thuật (Technical Design Document)

```
┌─────────────────────────────────────────────────────────────┐
│             CÁC THÀNH PHẦN THIẾT KẾ KỸ THUẬT                │
├─────────────────────────────────────────────────────────────┤
│ 1. Kiến trúc Hệ thống & Sơ đồ Phân tầng (Layer Diagram)     │
│ 2. Mô hình Dữ liệu (ERD, Primary Keys, Indexes, Ràng buộc)  │
│ 3. Hợp đồng API Chuẩn mực (REST, Request/Response DTO)      │
│ 4. Ma trận Phân quyền & Bảo mật (Authorization Matrix)      │
│ 5. Chuẩn hóa Định dạng Lỗi & Mã HTTP Status                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Kiến trúc Hệ thống & Luồng Thành phần

```
┌──────────────┐       HTTPS / JSON       ┌────────────────────────┐
│  Client App  ├─────────────────────────►│  Spring Boot REST API  │
│  (Vue 3 SPA) │                          │  (Tầng Controller)     │
└──────────────┘                          └───────────┬────────────┘
                                                      │ DTO Mapping
                                          ┌───────────▼────────────┐
                                          │      Tầng Service      │
                                          │  (Logic Nghiệp vụ)     │
                                          └───────────┬────────────┘
                                                      │ Thao tác Entity
                                          ┌───────────▼────────────┐
                                          │    Repository / JPA    │
                                          └───────────┬────────────┘
                                                      │ Câu lệnh SQL
                                          ┌───────────▼────────────┐
                                          │ Cơ sở Dữ liệu Postgres │
                                          └────────────────────────┘
```

---

## 2. Mô hình Dữ liệu & Database Schema

Định nghĩa bảng dữ liệu, kiểu dữ liệu, index và khóa ngoại một cách tường minh:

```sql
-- Migration Schema (Flyway / Liquibase)
CREATE TABLE internship_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    location VARCHAR(100) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_postings_status_tags ON internship_postings (status) USING GIN (tags);
```

---

## 3. Đặc tả Hợp đồng API (API Contract Specification)

Quy định chuẩn RESTful và cấu trúc dữ liệu gửi nhận:

### `POST /api/v1/internships/{id}/apply`

#### Request Payload:
```json
{
  "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "resumeUrl": "https://storage.example.com/resumes/std-8821.pdf",
  "coverLetter": "Rất mong muốn được đóng góp cho đội ngũ Cloud Backend."
}
```

#### Response Payload Thành công (`201 Created`):
```json
{
  "success": true,
  "data": {
    "applicationId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "status": "SUBMITTED",
    "appliedAt": "2026-09-15T11:00:00Z"
  }
}
```

#### Cấu trúc Đóng gói Báo lỗi (`400 Bad Request`):
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_APPLICATION",
    "message": "Sinh viên đã nộp hồ sơ vào vị trí thực tập này.",
    "timestamp": "2026-09-15T11:00:00Z"
  }
}
```

---

## 4. Ma trận Phân quyền & Bảo mật

| Endpoint | Method | Role yêu cầu | Chính sách kiểm tra |
| :--- | :--- | :--- | :--- |
| `/api/v1/internships` | `GET` | `STUDENT`, `ADVISOR`, `COMPANY` | Tìm kiếm công khai các vị trí đang mở |
| `/api/v1/internships` | `POST` | `COMPANY_ADMIN` | Chỉ công ty đã duyệt mới được đăng tin |
| `/api/v1/internships/{id}/apply` | `POST` | `STUDENT` | Phải khớp với token của sinh viên đang login |
| `/api/v1/applications/{id}/status`| `PATCH` | `ADVISOR`, `COMPANY_ADMIN` | Chuyển đổi trạng thái theo State Machine |

> [!IMPORTANT]
> **Khóa Hợp đồng Kỹ thuật (Contract Lock)**
> Sau khi bản Thiết kế Kỹ thuật được duyệt (Quality Gate 2), các prompt sinh code ở giai đoạn sau bắt buộc phải trỏ trực tiếp vào các định nghĩa API và Schema này.
