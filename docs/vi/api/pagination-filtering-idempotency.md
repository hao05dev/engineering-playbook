# Phân trang, Lọc, Sắp xếp & Tính Lũy biến (Idempotency)

Một API chuẩn production bắt buộc phải xử lý mượt mà các tập dữ liệu lớn và đứng vững trước sự cố mất kết nối mạng mà không làm sai lệch dữ liệu. Hướng dẫn này thiết lập các quy chuẩn về **Chiến lược Phân trang (Pagination)**, **Cú pháp Lọc/Sắp xếp** và **Giao thức Header `Idempotency-Key`**.

---

## 1. Chiến lược Phân trang: Phân trang theo Offset vs. Phân trang theo Con trỏ (Cursor)

```
┌─────────────────────────────────────────────────────────────┐
│                 SO SÁNH CÁC CHIẾN LƯỢC PHÂN TRANG           │
├─────────────────────────────────────────────────────────────┤
│ 1. Phân trang theo Offset (?page=1&size=20)                 │
│    - Dễ cài đặt (SQL: OFFSET 20 LIMIT 20).                  │
│    - Bị chậm rõ rệt khi offset quá sâu (trang 10.000).      │
│    - Dễ bị nhảy cóc dữ liệu khi có bản ghi mới chèn vào.    │
│                                                             │
│ 2. Phân trang theo Con trỏ Cursor (?cursor=aWQ9OTk&limit=20)│
│    - Siêu tốc: Dùng index WHERE id > :cursor LIMIT 20.      │
│    - Tốc độ không đổi dù bảng có hàng trăm triệu dòng.      │
│    - Tối ưu cho: Infinite scroll trên mobile và big data.   │
└─────────────────────────────────────────────────────────────┘
```

### Cấu trúc Đóng gói Dữ liệu Phân trang Chuẩn:
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "size": 20,
    "totalItems": 342,
    "totalPages": 18,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

---

## 2. Cú pháp Chuẩn cho Lọc, Sắp xếp và Tìm kiếm

- **Lọc theo Trường**: `GET /api/v1/internship-postings?status=OPEN&location=Hanoi`
- **Sắp xếp Nhiều Cột**: `GET /api/v1/internship-postings?sort=appliedAt,desc&sort=gpa,asc`
- **Tìm kiếm Toàn văn**: `GET /api/v1/internship-postings?q=java+backend`

---

## 3. Giao thức Header `Idempotency-Key`

Khi ứng dụng client gửi một request thay đổi dữ liệu (ví dụ: `POST /api/v1/applications`) nhưng gặp sự cố timeout mạng, client không thể biết server đã xử lý xong hay chưa. Việc gửi lại (retry) một cách mù quáng sẽ tạo ra đơn trùng lặp.

### Luồng Xử lý Lũy biến (Idempotent Flow):

```
Client                             API Gateway / Cache                   Database
  │                                         │                               │
  │── POST /applications ──────────────────►│                               │
  │   Idempotency-Key: "req-9982-uuid"      │── Key đã tồn tại trong Redis? │
  │                                         │   [Chưa: Lần đầu gọi]         │
  │                                         │── Xử lý & Lưu dữ liệu ───────►│
  │                                         │◄- - Đã lưu thành công - - - - │
  │                                         │── Cache kết quả vào Redis     │
  │◄- - 201 Created (Biên lai) - - - - - - -│                               │
  │                                         │                               │
  │── [MẤT MẠNG / GỌI LẠI RETRY] ──────────►│                               │
  │   Idempotency-Key: "req-9982-uuid"      │── Key đã tồn tại trong Redis? │
  │                                         │   [Có: Trả ngay kết quả cache]│
  │◄- - 201 Created (Biên lai từ Cache) - - │                               │
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Cài đặt Phân trang, Lọc Động & Xử lý Idempotency</div>

```markdown
# TASK: Cài đặt Phân trang, Bộ Lọc Động & Middleware Idempotency
Bạn là Kỹ sư Backend API Cấp cao.

## Tài nguyên / API Đầu vào:
[MÔ TẢ TÀI NGUYÊN VÀ CÁC THAO TÁC TÌM KIẾM CẦN HỖ TRỢ]

## Yêu cầu Thực hiện:
1. Viết mã nguồn Repository (JPA Specifications hoặc Knex Query Builder) hỗ trợ lọc động nhiều trường và sắp xếp an toàn chống SQLi.
2. Đóng gói kết quả trả về bằng cấu trúc Metadata Phân trang chuẩn hóa.
3. Cài đặt Interceptor/Middleware xử lý `Idempotency-Key` sử dụng Redis với thời gian hết hạn TTL 24 giờ.
4. Xuất mã nguồn hoàn chỉnh chuẩn production kèm các assertion unit test.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các API lấy danh sách có giới hạn kích thước trang tối đa (ví dụ: max `size=100`) không?
- [ ] Các trường sắp xếp có được kiểm tra qua danh sách trắng (allowlist) để chống SQL Injection không?
- [ ] Các endpoint nhạy cảm về giao dịch có bắt buộc kiểm tra header `Idempotency-Key` không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>IETF Draft — The Idempotency-Key HTTP Header Field: <a href="https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/" target="_blank" rel="noopener">IETF HTTPAPI Working Group</a></li>
  </ul>
</div>
