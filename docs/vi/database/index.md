# 07 — Kỹ nghệ Cơ sở Dữ liệu (Database Engineering)

Một hệ thống phần mềm vững chắc luôn được neo giữ bởi một cơ sở dữ liệu được thiết kế bài bản. **Kỹ nghệ Cơ sở Dữ liệu (Database Engineering)** là môn khoa học kỹ thuật có phương pháp nhằm chuyển hóa các thực thể domain nghiệp vụ thành các kiến trúc lưu trữ dữ liệu chuẩn hóa, có đánh index, an toàn giao dịch và hiệu năng cao.

---

## Quy trình 6 Bước Thiết kế Cơ sở Dữ liệu

Trong phương pháp luận AI-SDLC, schema cơ sở dữ liệu không bao giờ được viết ngẫu hứng thành các câu lệnh SQL rời rạc. Chúng tuân theo quy trình chuyển đổi 6 bước nghiêm ngặt:

```
[ 1. Domain Nghiệp vụ ] ──► [ 2. Domain Model ] ──► [ 3. Mô hình Khái niệm ]
                                                              │
                                                              ▼
[ 6. Mã nguồn SQL DDL ] ◄── [ 5. Mô hình Vật lý ] ◄── [ 4. Mô hình Logic ]
```

---

## Các Mô-đun Trọng tâm trong Phần này

1. [Quy trình Thiết kế CSDL](./design-pipeline): Lộ trình từng bước từ thực thể nghiệp vụ đến câu lệnh DDL vật lý.
2. [Mô hình ERD & Chuẩn hóa Dữ liệu](./erd-normalization): Bản số, tính tùy chọn, khóa ngoại và các dạng chuẩn 1NF đến 3NF/BCNF.
3. [Indexes, Ràng buộc & Tối ưu Truy vấn](./indexes-constraints): B-tree, GIN, Partial Index và phân tích Query Execution Plan.
4. [Giao dịch, Đồng thời & Khóa Dữ liệu](./transactions-concurrency): Ngữ nghĩa ACID, cấp độ cô lập (Isolation Levels) và khóa bi quan/lạc quan.
5. [Migration, Dữ liệu Mẫu & Checklist Review](./migrations-review): Quản lý phiên bản migration (Flyway/Liquibase) và checklist review CSDL.

---

## Các Bất biến Cốt lõi trong Cơ sở Dữ liệu

1. **Khóa Ngoại Tường Minh (Explicit Foreign Keys)**: Duy trì tính toàn vẹn tham chiếu ngay trong engine CSDL, không chỉ dựa vào code ứng dụng.
2. **Migration Tiền định (Deterministic Migrations)**: Mọi thay đổi bảng/cột đều phải được quản lý phiên bản qua file migration tự động.
3. **Không Bỏ Quên Index trên Khóa Ngoại**: Luôn đánh index trên các cột khóa ngoại thường xuyên dùng trong `JOIN` và `WHERE`.
4. **Chọn Kiểu Dữ liệu Chuẩn xác**: Sử dụng UUID, kiểu số chính xác (`NUMERIC`/`DECIMAL` cho tiền tệ, tuyệt đối không dùng `FLOAT`) và timestamp có múi giờ (`TIMESTAMPTZ`).

<div class="ref-box">
  <strong>Chuẩn Tham chiếu Chính thức:</strong>
  <ul>
    <li>Date, C.J. (2003). <em>An Introduction to Database Systems (8th Edition)</em>. Addison-Wesley.</li>
    <li>Kleppmann, Martin (2017). <em>Designing Data-Intensive Applications</em>. O'Reilly Media.</li>
  </ul>
</div>
