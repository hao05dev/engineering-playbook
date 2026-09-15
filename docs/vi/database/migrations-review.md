# Migration, Dữ liệu Mẫu & Checklist Review CSDL (Migrations)

Schema cơ sở dữ liệu bắt buộc phải tiến hóa song hành cùng mã nguồn ứng dụng theo cách có thể lặp lại, tự động hóa và tương thích ngược. Hướng dẫn này thiết lập quy chuẩn **Database Migrations (Flyway/Liquibase)**, **Quản lý Dữ liệu Mẫu (Seed Data)** và **Bộ Checklist 10 Điểm Kiểm duyệt Cơ sở Dữ liệu**.

---

## 1. Tự động hóa Schema Migration (Chuẩn Flyway)

Tuyệt đối không chạy các câu lệnh SQL thủ công trực tiếp trên môi trường Production. Mọi script DDL đều phải được đánh số phiên bản:

```
src/main/resources/db/migration/
├── V1__initial_schema_setup.sql
├── V2__add_internship_tables.sql
├── V3__add_application_audit_index.sql
└── R__repeatable_view_internship_stats.sql
```

### Mẫu Thiết kế Expand & Contract (Migration Không Gián đoạn - Zero Downtime)
Khi đổi tên cột hoặc đổi kiểu dữ liệu trong hệ thống đang chạy:
1. **Giai đoạn 1 (Expand - Mở rộng)**: Thêm cột mới `full_name` song song với các cột cũ `first_name`, `last_name`. Ứng dụng ghi đồng thời vào cả 2 cột.
2. **Giai đoạn 2 (Migrate Data - Chuyển dữ liệu)**: Chạy tiến trình nền cập nhật dữ liệu lịch sử.
3. **Giai đoạn 3 (Contract - Thu hẹp)**: Đổi luồng đọc sang cột `full_name`, sau đó xóa các cột cũ trong bản release tiếp theo.

---

## 2. Phân loại Quản lý Dữ liệu Mẫu (Seed Data)

- **Dữ liệu Danh mục Cố định (Reference Data)**: Enum, Bảng mã quốc gia, Quyền hạn hệ thống. Lưu trong file migration chính thức (`V1_1__seed_system_roles.sql`).
- **Dữ liệu Test Môi trường Dev (Development Seeds)**: Dữ liệu giả lập sinh viên, tin tuyển dụng ảo. Lưu tại `src/test/resources/db/test-seeds/` và tuyệt đối không chạy trên Production.

---

## 3. Bộ Checklist 10 Điểm Kiểm duyệt Thiết kế CSDL

Kiểm toán toàn bộ script migration dựa trên checklist chuẩn:

- [ ] **1. Khóa Chính (Primary Key)**: Mọi bảng đều có khóa chính bất biến và duy nhất (ưu tiên `UUID` hoặc `BIGINT`)?
- [ ] **2. Index trên Khóa Ngoại**: Toàn bộ các cột khóa ngoại (FK) đều được đánh B-tree index?
- [ ] **3. Tính Cho phép Null**: Các cột đều có `NOT NULL` rõ ràng trừ khi có lý do chính đáng?
- [ ] **4. Kiểu Số Chính xác**: Tiền tệ và điểm số có dùng `NUMERIC`/`DECIMAL` thay vì số thực không?
- [ ] **5. Múi giờ Chuẩn**: Toàn bộ cột thời gian có dùng kiểu `TIMESTAMPTZ` (UTC) không?
- [ ] **6. Ràng buộc Nghiệp vụ**: Có cài đặt CHECK và UNIQUE constraint cho các bất biến không?
- [ ] **7. Tính Lũy biến (Idempotency)**: Script migration có chạy sạch sẽ trên database mới dựng không?
- [ ] **8. Không Khóa Bảng Lâu**: Các index trên bảng lớn có được tạo bằng `CREATE INDEX CONCURRENTLY` không?
- [ ] **9. Đạt Dạng Chuẩn 3 (3NF)**: Schema có đạt chuẩn hóa 3NF và không có dư thừa ngoài ý muốn không?
- [ ] **10. Chính sách Xóa (Delete Policy)**: Khóa ngoại có cấu hình rõ ràng `ON DELETE RESTRICT` hoặc `ON DELETE CASCADE` không?

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh File Migration & Kiểm toán Schema CSDL</div>

```markdown
# TASK: Sinh Migration Script Flyway & Kiểm toán 10 Điểm Schema CSDL
Bạn là Chuyên gia Quản trị CSDL và Chuyên gia Migration Flyway.

## Thay đổi Yêu cầu / Schema Đầu vào:
[MÔ TẢ THAY ĐỔI CSDL HOẶC DÁN ĐẶC TẢ THỰC THỂ MỚI]

## Yêu cầu Thực hiện:
1. Sinh file script migration Flyway chuẩn (`V...__name.sql`) có tính tiền định.
2. Áp dụng mẫu Expand & Contract nếu có thao tác đổi tên cột hoặc sửa kiểu dữ liệu.
3. Kiểm toán bản migration dựa trên Bộ Checklist 10 Điểm Kiểm duyệt CSDL.
4. Tách biệt rõ ràng script DDL cho production và script seed data giả lập cho môi trường test.
```
</div>

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Pramod Sadalage & Martin Fowler (2006). <em>Refactoring Databases: Evolutionary Database Design</em>. Addison-Wesley.</li>
    <li>Tài liệu Hướng dẫn Flyway: <a href="https://flywaydb.org/" target="_blank" rel="noopener">https://flywaydb.org/</a></li>
  </ul>
</div>
