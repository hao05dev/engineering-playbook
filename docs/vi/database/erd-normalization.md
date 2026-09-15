# Mô hình ERD & Chuẩn hóa Dữ liệu (Normalization)

Tính toàn vẹn dữ liệu bắt đầu từ việc vẽ Sơ đồ Quan hệ Thực thể (ERD) chính xác và áp dụng các quy chuẩn chuẩn hóa cơ sở dữ liệu. Hướng dẫn này định nghĩa ký hiệu chân quạ (Crow's Foot) và các bậc chuẩn hóa kinh điển từ **1NF đến BCNF**.

---

## 1. Ký hiệu Bản số Chân quạ (Crow's Foot Notation)

```
┌─────────────────────────────────────────────────────────────┐
│                 BẢNG KÝ HIỆU CHÂN QUẠ (CROW'S FOOT)         │
├─────────────────────────────────────────────────────────────┤
│ ──||──  Chính xác là Một (Bắt buộc)                         │
│ ──|o──  Không hoặc Một (Tùy chọn)                           │
│ ──|{──  Một hoặc Nhiều (Bắt buộc)                           │
│ ──o{──  Không hoặc Nhiều (Tùy chọn)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Thang Chuẩn hóa Dữ liệu (1NF đến BCNF)

```
┌─────────────────────────────────────────────────────────────┐
│                    THANG CHUẨN HÓA DỮ LIỆU                  │
├─────────────────────────────────────────────────────────────┤
│ 1NF: Triệt tiêu nhóm lặp (Dữ liệu nguyên tử)                │
│   └── 2NF: Triệt tiêu phụ thuộc một phần vào khóa chính     │
│         └── 3NF: Triệt tiêu phụ thuộc bắc cầu               │
│               └── BCNF: Mọi định thức đều là khóa ứng viên  │
└─────────────────────────────────────────────────────────────┘
```

### Dạng Chuẩn 1 (1NF - First Normal Form)
- **Quy tắc**: Mỗi cột chỉ chứa một giá trị nguyên tử (không thể chia nhỏ) và mỗi dòng phải có khóa định danh duy nhất.
- ❌ *Vi phạm*: Lưu chuỗi danh sách công nghệ phân tách bằng dấu phẩy trong cột `VARCHAR` (`"Java, Spring, PostgreSQL"`).
- ✅ *Khắc phục 1NF*: Tách `tags` sang bảng quan hệ phụ `posting_tags` hoặc dùng kiểu mảng có index.

### Dạng Chuẩn 2 (2NF - Second Normal Form)
- **Quy tắc**: Đạt 1NF và toàn bộ các cột không khóa phải phụ thuộc vào **toàn bộ** khóa chính phức hợp (Không phụ thuộc một phần).
- ❌ *Vi phạm*: Trong bảng khóa kép `application_reviews(student_id, posting_id)`, lại lưu cột `student_name`. `student_name` chỉ phụ thuộc vào `student_id`.
- ✅ *Khắc phục 2NF*: Đưa `student_name` về đúng bảng `students`.

### Dạng Chuẩn 3 (3NF - Third Normal Form)
- **Quy tắc**: Đạt 2NF và không có thuộc tính không khóa nào phụ thuộc bắc cầu vào thuộc tính không khóa khác ($X \rightarrow Y \rightarrow Z$).
- ❌ *Vi phạm*: Trong bảng `internship_postings`, lưu `company_id`, `company_name`, `company_hq_city`. `company_hq_city` phụ thuộc vào `company_id`, không phụ thuộc vào ID của tin tuyển dụng.
- ✅ *Khắc phục 3NF*: Tách thành thực thể `companies` độc lập.

### Dạng Chuẩn Boyce-Codd (BCNF)
- **Quy tắc**: Dạng chuẩn 3 nghiêm ngặt hơn, trong đó mọi phụ thuộc hàm $X \rightarrow Y$ thì $X$ bắt buộc phải là siêu khóa (superkey).

---

## 3. Chiến lược Phi Chuẩn hóa Có Chủ đích (Denormalization)

Chuẩn hóa đạt 3NF là lựa chọn mặc định cho các hệ thống giao dịch OLTP. Chỉ thực hiện phi chuẩn hóa khi:
1. Các truy vấn đọc báo cáo tốc độ cao bị nghẽn độ trễ do lệnh `JOIN` quá nhiều bảng.
2. Được chứng minh bằng phân tích câu lệnh (`EXPLAIN ANALYZE`).
3. Tính nhất quán dữ liệu được bảo vệ bằng Domain Event hoặc Materialized View.

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Vẽ ERD & Kiểm toán Chuẩn hóa 3NF</div>

```markdown
# TASK: Vẽ Sơ đồ ERD & Kiểm toán Chuẩn hóa Cơ sở Dữ liệu (3NF)
Bạn là Chuyên gia Mô hình hóa Cơ sở Dữ liệu Quan hệ (Relational Database Modeler).

## Dữ liệu / Bảng Dự thảo Đầu vào:
[DÁN DANH MỤC THỰC THỂ HOẶC CÁC BẢNG DỰ THẢO TẠI ĐÂY]

## Yêu cầu Thực hiện:
1. Kiểm toán schema dựa trên các dạng chuẩn 1NF, 2NF, 3NF và BCNF. Chỉ ra toàn bộ các phụ thuộc một phần và phụ thuộc bắc cầu.
2. Vẽ Sơ đồ ERD Chuẩn 3NF hoàn chỉnh bằng cú pháp Mermaid Crow's Foot (chỉ rõ bản số ||, |o, |{, o{).
3. Chỉ định rõ Khóa Chính (PK), Khóa Ngoại (FK) và Ràng buộc Unique.
4. Xuất bảng giải trình lý do vì sao thiết kế này thỏa mãn trọn vẹn 3NF.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các cột đều có tính nguyên tử, không chứa chuỗi danh sách nối bằng dấu phẩy?
- [ ] Các phụ thuộc bắc cầu đã được bóc tách về đúng thực thể cha chưa?
- [ ] Các đường liên kết Crow's Foot có chỉ rõ ràng bản số và tính tùy chọn hai đầu không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Codd, E.F. (1970). <em>A Relational Model of Data for Large Shared Data Banks</em>. Communications of the ACM.</li>
    <li>Date, C.J. (2003). <em>Database Design and Relational Theory</em>. O'Reilly Media.</li>
  </ul>
</div>
