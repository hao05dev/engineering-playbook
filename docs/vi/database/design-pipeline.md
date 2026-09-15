# Quy trình Thiết kế Cơ sở Dữ liệu (Database Design Pipeline)

Một lỗi phổ biến của các lập trình viên là vừa nhận được yêu cầu tính năng đã vội vàng viết ngay câu lệnh `CREATE TABLE`. **Quy trình Thiết kế Cơ sở Dữ liệu** bắt buộc tuân theo lộ trình chuyển đổi bài bản từ bức tranh nghiệp vụ thực tế đến mã nguồn SQL vật lý tối ưu.

---

## 1. Quy trình Chuyển đổi 6 Giai đoạn

```
┌─────────────────────────────────────────────────────────────┐
│                 LỘ TRÌNH THIẾT KẾ CSDL 6 BƯỚC               │
├─────────────────────────────────────────────────────────────┤
│ 1. Domain Nghiệp vụ ──► Nhận diện danh từ & chính sách thực │
│ 2. Mô hình Domain ──► Phân loại Entity, Value Object, Root  │
│ 3. Mô hình Khái niệm (CDM) ──► Mô hình hóa liên kết mức cao │
│ 4. Mô hình Logic (LDM) ──► Chuẩn hóa 3NF, chốt PK, FK, N:M  │
│ 5. Mô hình Vật lý (PDM) ──► Chọn kiểu dữ liệu DBMS & index  │
│ 6. Mã nguồn SQL (DDL) ──► Viết file Migration Flyway        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Ví dụ Thực tế: Hệ thống Quản lý Thực tập

### Giai đoạn 1 & 2: Mô hình Khái niệm (CDM)
- *Thực thể*: `SinhVien`, `GiangVienHuongDan`, `DoanhNghiep`, `TinTuyenDung`, `DonUngTuyen`.
- *Mối quan hệ*:
  - 1 `SinhVien` nộp nhiều `DonUngTuyen` (Quan hệ 1:N).
  - 1 `DoanhNghiep` đăng nhiều `TinTuyenDung` (Quan hệ 1:N).
  - 1 `DonUngTuyen` liên kết chính xác 1 `SinhVien` và 1 `TinTuyenDung` (Quan hệ N:1).

### Giai đoạn 4: Mô hình Dữ liệu Logic (LDM)
- Triệt tiêu quan hệ nhiều-nhiều (N:M) bằng bảng trung gian.
- Chuẩn hóa đạt Dạng Chuẩn 3 (3NF).
- Xác định Khóa Chính (`PK`), Khóa Ngoại (`FK`) và tính cho phép Null.

### Giai đoạn 5 & 6: Mô hình Vật lý & Mã SQL DDL (PostgreSQL)

```sql
-- V1__create_internship_schema.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    gpa NUMERIC(3, 2) NOT NULL CHECK (gpa >= 0.00 AND gpa <= 4.00),
    earned_credits INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE internship_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    total_quota INT NOT NULL CHECK (total_quota > 0),
    remaining_quota INT NOT NULL CHECK (remaining_quota >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_quota_integrity CHECK (remaining_quota <= total_quota)
);

CREATE TABLE internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    posting_id UUID NOT NULL REFERENCES internship_postings(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    resume_url TEXT NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_posting UNIQUE (student_id, posting_id)
);

-- Đánh Index trên Khóa Ngoại để tối ưu tốc độ JOIN
CREATE INDEX idx_apps_student_id ON internship_applications(student_id);
CREATE INDEX idx_apps_posting_id ON internship_applications(posting_id);
CREATE INDEX idx_apps_status ON internship_applications(status);
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Thiết kế Cơ sở Dữ liệu Trọn gói (Domain ➔ SQL)</div>

```markdown
# TASK: Thiết kế Toàn bộ Quy trình Cơ sở Dữ liệu (Domain ➔ SQL)
Bạn là Kiến trúc sư Cơ sở Dữ liệu Cấp cao (Principal Database Architect).

## Bối cảnh Đầu vào:
Yêu cầu Nghiệp vụ: [MÔ TẢ THỰC THỂ, QUAN HỆ DỮ LIỆU VÀ QUY TẮC]
Hệ quản trị CSDL mục tiêu: [ví dụ: PostgreSQL 16 / MySQL 8.0]

## Yêu cầu Thực hiện:
1. Giai đoạn 1 & 2: Xác định Entity, Value Object và Aggregate Root.
2. Giai đoạn 3: Vẽ Sơ đồ Quan hệ Thực thể Khái niệm (Mermaid ERD).
3. Giai đoạn 4: Thiết kế Mô hình Logic Chuẩn 3NF (PK, FK, Ràng buộc Null).
4. Giai đoạn 5 & 6: Sinh mã nguồn DDL SQL hoàn chỉnh gồm UUID, Check Constraints, Ràng buộc Khóa ngoại (kèm chính sách ON DELETE) và B-tree Indexes.
5. Định dạng đầu ra với các nhãn: [CONFIRMED], [ASSUMPTION], [PROPOSAL], [QUESTION].
```
</div>

---

## 4. Checklist Kiểm duyệt (Review Checklist)

- [ ] Bản thiết kế có đi đầy đủ qua các bước Khái niệm ➔ Logic ➔ Vật lý không?
- [ ] Toàn bộ các cột khóa ngoại (FK) đều được đánh index B-tree tương ứng chưa?
- [ ] Các trường dữ liệu điểm số hoặc tiền tệ có dùng kiểu số chính xác `NUMERIC`/`DECIMAL` không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Date, C.J. (2003). <em>An Introduction to Database Systems</em>. Addison-Wesley.</li>
  </ul>
</div>
