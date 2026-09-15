# 04 — Phân kỳ & Phân rã Nhiệm vụ (Task Breakdown)

Bước **Phân kỳ & Phân rã Nhiệm vụ (Phasing & Task Breakdown)** chuyển hóa các thiết kế kiến trúc tổng thể thành một chuỗi các task kỹ thuật nhỏ, độc lập, có thứ tự phụ thuộc chặt chẽ và dễ dàng kiểm chứng.

---

## Tại sao Kích thước Task lại Quyết định Thành bại khi Dùng AI?

Các mô hình ngôn ngữ lớn (LLM) giảm sút độ chính xác rõ rệt khi nhận các yêu cầu quá rộng. Việc chia nhỏ bài toán thành các đơn vị nguyên tử (atomic units) mang lại những lợi ích vượt trội:
- **Triệt tiêu Ảo giác (Zero Hallucination)**: Agent chỉ tập trung vào một class hoặc interface cụ thể.
- **Vòng lặp Phản hồi Nhanh**: Bộ unit test chạy xong chỉ sau 5 giây sau mỗi task.
- **Review Cực kỳ Dễ dàng**: Kỹ sư có thể đọc hiểu và duyệt một diff 50 dòng trong vòng chưa đầy 2 phút.

```
┌─────────────────────────────────────────────────────────────┐
│                 KÍCH THƯỚC TASK LÝ TƯỞNG                    │
├─────────────────────────────────────────────────────────────┤
│ • Thời gian hoàn thành: 15 đến 30 phút                      │
│ • Dung lượng code thay đổi: 50 đến 150 dòng                 │
│ • Số lượng file tác động: 1 đến 3 file liên quan            │
│ • Kiểm chứng: Có ít nhất 1 unit/integration test đi kèm     │
└─────────────────────────────────────────────────────────────┘
```

---

## Trình tự Phân kỳ Theo Thứ tự Phụ thuộc

Sắp xếp các task từ tầng lõi dữ liệu đi dần ra các tầng bên ngoài:

```
  Phase 1: Tầng Lưu trữ (Database Migration & Entity)
                         │
                         ▼
  Phase 2: Tầng Giao tiếp Dữ liệu (Repository & DAO)
                         │
                         ▼
  Phase 3: Tầng Nghiệp vụ Lõi (Service & Domain Logic)
                         │
                         ▼
  Phase 4: Tầng API (Controller, DTO Mapping & Security)
                         │
                         ▼
  Phase 5: Kiểm thử Tích hợp Đầu-Cuối (End-to-End Test)
```

---

## Danh mục Task Mẫu Chuẩn hóa

### Phase 1: Cơ sở Dữ liệu & Entity
- [ ] **Task 1.1**: Tạo migration Flyway `V2__create_internship_tables.sql`.
- [ ] **Task 1.2**: Tạo JPA Entity `InternshipPosting.java` kèm validation và Enum trạng thái.

### Phase 2: Tầng Service & Nghiệp vụ
- [ ] **Task 2.1**: Cài đặt interface `InternshipPostingRepository.java` kèm câu truy vấn tùy biến.
- [ ] **Task 2.2**: Viết unit test `InternshipServiceTest.java` kiểm tra các quy tắc nghiệp vụ.
- [ ] **Task 2.3**: Cài đặt `InternshipServiceImpl.java` để toàn bộ unit test chuyển sang màu xanh.

### Phase 3: Tầng REST API & Phân quyền
- [ ] **Task 3.1**: Tạo DTO Request/Response kèm các annotation kiểm tra dữ liệu đầu vào.
- [ ] **Task 3.2**: Cài đặt `InternshipController.java` kèm annotation bảo vệ `@PreAuthorize`.
- [ ] **Task 3.3**: Viết WebMvc integration test trong `InternshipControllerTest.java`.

---

## Tiêu chuẩn Hoàn thành (Definition of Done - DoD)

Một task chỉ được coi là hoàn tất khi:
1. Toàn bộ logic mới đều có unit test tương ứng kiểm chứng.
2. Dự án biên dịch sạch sẽ, không có cảnh báo hoặc lỗi linter.
3. Git working tree sạch sẽ và sẵn sàng tạo commit nguyên tử.
