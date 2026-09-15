# 01 — Khám phá Ý tưởng & Nghiệp vụ (Domain Exploration)

Bước **Khám phá Ý tưởng & Nghiệp vụ (Domain Exploration)** là nền móng khởi đầu cho toàn bộ quy trình AI-SDLC. Trước khi viết bất kỳ dòng mã nào hay thiết kế bảng dữ liệu, đội ngũ kỹ sư cần hiểu sâu sắc bài toán, nỗi đau của người dùng, thuật ngữ nghiệp vụ và luồng xử lý thực tế.

---

## Mục tiêu của Bước này

1. **Làm rõ Ý định Nghiệp vụ**: Chuyển hóa ý tưởng sơ khai ("chúng ta cần một trung tâm thông báo") thành năng lực nghiệp vụ cụ thể.
2. **Xây dựng Ngôn ngữ Chung (Ubiquitous Language)**: Chuẩn hóa định nghĩa thuật ngữ (ví dụ: phân biệt rõ giữa `User`, `Customer`, `Account` và `Tenant`).
3. **Mô hình hóa Luồng Trạng thái (State Machine)**: Trực quan hóa vòng đời của thực thể và các chuyển dịch hợp lệ.
4. **Phát hiện sớm các Ca biên (Edge Cases)**: Nhận diện sớm vấn đề đồng thời (concurrency), cô lập đa người thuê (multi-tenancy) và bảo mật.

---

## Mẫu Hội thoại Khám phá Domain cùng AI

Sử dụng AI như một đối tác phản biện kiến trúc (devil's advocate). Cung cấp bối cảnh ban đầu và yêu cầu AI chất vấn để làm lộ ra các lỗ hổng logic.

```
┌─────────────────────────────────────────────────────────────┐
│                 QUY TRÌNH KHÁM PHÁ DOMAIN                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Brainstorm Ranh giới Nghiệp vụ (Bounded Contexts)        │
│ 2. Mô hình hóa Vòng đời Thực thể (State Machine)            │
│ 3. Phản biện các Ca biên & Rủi ro Bảo mật                   │
│ 4. Tổng hợp Tài liệu Khái niệm Nghiệp vụ (Domain Brief)     │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ Prompt Khám phá Nghiệp vụ

```markdown
# DOMAIN EXPLORATION: Hệ thống Quản lý Thực tập Sinh viên

Hãy đóng vai trò là Chuyên gia Kiến trúc Nghiệp vụ (Domain Architect).
Giúp chúng tôi phân tích ranh giới nghiệp vụ cho module "Nộp đơn & Đánh giá Thực tập".

Bối cảnh:
- Trường đại học có Sinh viên (Student), Giảng viên hướng dẫn (Advisor) và Mentor doanh nghiệp.
- Doanh nghiệp đăng vị trí tuyển dụng; sinh viên nộp CV ứng tuyển.
- Giảng viên cần duyệt đơn trước khi doanh nghiệp xem hồ sơ.
- Cả Mentor và Sinh viên đều phải hoàn thành đánh giá giữa kỳ và cuối kỳ.

Hãy phân tích và đưa ra:
1. Các Bounded Context chính và Bảng thuật ngữ nghiệp vụ chuẩn mực.
2. Sơ đồ trạng thái cho thực thể `InternshipApplication`.
3. 5 ca biên phức tạp hoặc rủi ro vận hành cần lưu ý trước khi thiết kế kỹ thuật.
```

---

## Mô hình hóa Chuyển dịch Trạng thái

Việc vẽ sơ đồ trạng thái giúp ngăn chặn các trạng thái bất hợp lệ trong quá trình code sau này:

```
  [Bản nháp] ──► [Đã nộp] ──► [Giảng viên duyệt] ──► [Lên lịch phỏng vấn]
                                      │                           │
                                      ▼                           ▼
                                  [Từ chối]                  [Trúng tuyển]
                                                                  │
                                                                  ▼
                                                          [Đang thực tập]
                                                                  │
                                                                  ▼
                                                           [Hoàn thành]
```

---

## Kết quả Đầu ra (Deliverables) của Bước 01

Sau khi kết thúc bước Khám phá Nghiệp vụ, bạn cần đạt được:
- Tài liệu tóm tắt nghiệp vụ (**Domain Brief**).
- Danh mục thuật ngữ chuẩn hóa cho toàn dự án.
- Sơ đồ máy trạng thái (FSM) của các thực thể trọng tâm.

> [!TIP]
> **Đối chiếu Cổng Chất lượng 1**
> Không vội vàng chuyển sang vẽ Database Table khi thuật ngữ còn nhập nhằng. Sự mơ hồ ở bước này sẽ khiến AI sinh code với các tên biến và bảng dữ liệu xung đột nhau ở các bước sau.
