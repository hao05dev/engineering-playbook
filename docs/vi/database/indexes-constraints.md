# Indexes, Ràng buộc & Tối ưu Truy vấn (Optimization)

Index và Ràng buộc (Constraints) là động cơ kép đảm bảo hiệu năng và tính chính xác của cơ sở dữ liệu. Trong khi ràng buộc bảo vệ các bất biến nghiệp vụ khỏi bị sai lệch dữ liệu, index biến các câu quét toàn bảng tốn kém $O(N)$ thành các phép tìm kiếm cây logarit $O(\log N)$ siêu tốc.

---

## 1. Các Loại Index & Trường hợp Ứng dụng

| Loại Index | Cấu trúc Nội bộ | Ứng dụng Tối ưu Nhất | Ví dụ trong PostgreSQL |
| :--- | :--- | :--- | :--- |
| **B-Tree** (Mặc định) | Cây cân bằng tự điều chỉnh | Phép so bằng (`=`), khoảng (`<`, `>`), sắp xếp (`ORDER BY`) | `CREATE INDEX idx_student_gpa ON students(gpa);` |
| **Composite B-Tree** | Cây nhiều cột ghép | Lọc đồng thời trên nhiều cột cụ thể | `CREATE INDEX idx_post_status_date ON postings(status, created_at);`|
| **Partial Index** | Index có lọc điều kiện | Bảng lớn nhưng chỉ truy vấn tập con dữ liệu | `CREATE INDEX idx_active_apps ON apps(student_id) WHERE status = 'ACTIVE';`|
| **GIN** (Inverted) | Index đảo ngược | Chứa JSONB (`@>`), Tìm kiếm mảng, Full-text Search | `CREATE INDEX idx_post_tags ON postings USING GIN(tags);` |

---

## 2. Quy tắc Tiền tố Phía Tả (The Leftmost Prefix Rule)

Khi tạo một Composite Index trên 2 cột `(status, created_at)`:
- ✅ **Tận dụng được Index**: `WHERE status = 'OPEN'`
- ✅ **Tận dụng được Index**: `WHERE status = 'OPEN' AND created_at > NOW() - INTERVAL '7 days'`
- ❌ **KHÔNG TẬN DỤNG ĐƯỢC**: `WHERE created_at > NOW() - INTERVAL '7 days'` (Bị quét toàn bảng do bỏ qua cột đầu tiên bên trái `status`).

```
Composite Index: (status, created_at)
┌──────────────┬───────────────────────────────┐
│ status       │ created_at                    │
├──────────────┼───────────────────────────────┤
│ OPEN         │ 2026-09-01T10:00:00Z          │ ◄── Nhảy trực tiếp tới 'OPEN'
│ OPEN         │ 2026-09-02T11:00:00Z          │     sau đó quét created_at
│ REJECTED     │ 2026-09-01T08:00:00Z          │
└──────────────┴───────────────────────────────┘
```

---

## 3. Ràng buộc Cơ sở Dữ liệu như Hàng rào Phòng thủ

Tuyệt đối không phụ thuộc hoàn toàn vào code ứng dụng để validate. Hãy cài đặt ràng buộc ở tầng CSDL:

```sql
ALTER TABLE internship_applications
  ADD CONSTRAINT uq_student_active_posting 
  UNIQUE (student_id, posting_id);

ALTER TABLE internship_postings
  ADD CONSTRAINT chk_positive_salary 
  CHECK (salary_monthly >= 0.00);

ALTER TABLE students
  ADD CONSTRAINT chk_valid_gpa 
  CHECK (gpa >= 0.00 AND gpa <= 4.00);
```

---

## 4. Phân tích Kế hoạch Thực thi với `EXPLAIN ANALYZE`

Trước khi approve một câu truy vấn, hãy chạy phân tích execution plan:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM internship_applications
WHERE student_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  AND status = 'SUBMITTED';
```

- 🚩 **Báo động Đỏ**: `Seq Scan on internship_applications` (Quét toàn bộ bảng — thiếu index).
- ✅ **Chuẩn Tối ưu**: `Index Scan using idx_apps_student_status` (Duyệt cây index logarit).

---

## 5. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Chiến lược Đánh Index & Cài đặt Ràng buộc</div>

```markdown
# TASK: Tối ưu hóa Index & Cài đặt Ràng buộc Dữ liệu PostgreSQL
Bạn là Chuyên gia Tối ưu Cơ sở Dữ liệu (Database Performance DBA).

## Truy vấn Chậm & Schema Hiện tại:
[DÁN CÁC CÂU TRUY VẤN CẦN TỐI ƯU VÀ SCHEMA DDL]

## Yêu cầu Thực hiện:
1. Phân tích mẫu truy cập dữ liệu (bộ lọc WHERE, điều kiện JOIN, sắp xếp ORDER BY).
2. Đề xuất các Index B-tree, Composite (áp dụng Leftmost Prefix), Partial Index hoặc GIN tối ưu nhất.
3. Thiết lập các ràng buộc CHECK, UNIQUE và FOREIGN KEY (kèm chính sách ON DELETE) chặt chẽ.
4. Xuất mã script SQL Migration kèm chú thích giải thích lý do đánh index.
```
</div>

---

## 6. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các cột khóa ngoại đều có index tương ứng để tăng tốc JOIN không?
- [ ] Các composite index có tuân thủ đúng quy tắc Leftmost Prefix dựa trên độ phân biệt (cardinality) không?
- [ ] Các bất biến nghiệp vụ có được chốt bằng CHECK và UNIQUE constraint không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Winand, Markus (2012). <em>Use The Index, Luke! Hướng dẫn Hiệu năng Cơ sở Dữ liệu</em>.</li>
    <li>PostgreSQL 16 Documentation: Chapter 11. Indexes.</li>
  </ul>
</div>
