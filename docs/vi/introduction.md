# Giới thiệu về AI-SDLC

**AI-SDLC (AI-Assisted Software Development Life Cycle)** là phương pháp luận kỹ thuật phần mềm có tính kỷ luật, chuẩn hóa và tái lập được, thiết kế riêng cho các đội ngũ kỹ sư hiện đại làm việc cùng các AI Agent lập trình và mô hình ngôn ngữ lớn (LLM).

Thay vì xem AI như một công cụ sinh code ngẫu nhiên và khó kiểm soát, AI-SDLC thiết lập các rào chắn chất lượng (guardrails), tài liệu cấu trúc và ranh giới trách nhiệm rõ ràng xuyên suốt toàn bộ vòng đời kỹ thuật.

---

## Sự chuyển dịch mô hình (Paradigm Shift)

Phát triển phần mềm truyền thống phụ thuộc lớn vào việc gõ phím thủ công, ghi nhớ ngữ cảnh cá nhân và chu kỳ phản hồi kéo dài. Khi có sự tham gia của AI coding assistant, điểm nghẽn chuyển từ **tốc độ sinh cú pháp (syntax generation)** sang **độ chính xác của đặc tả yêu cầu, thẩm định kiến trúc và kiểm thử chất lượng**.

| Tiêu chí | SDLC Truyền thống | Phương pháp luận AI-SDLC |
| :--- | :--- | :--- |
| **Điểm nghẽn chính** | Tốc độ viết code & gõ phím | Độ rõ ràng của đặc tả & độ phủ kiểm thử |
| **Vai trò Kỹ sư** | Người viết code thủ công từng dòng | Kiến trúc sư, Reviewer & Người gác cổng chất lượng |
| **Vai trò AI** | Công cụ tìm kiếm / autocomplete | Trợ lý phát triển tốc độ cao & động cơ thực thi |
| **Đơn vị lặp (Iteration)** | Pull Request lớn làm thủ công nhiều ngày | Từng Task nhỏ, có phạm vi rõ ràng và kiểm chứng tự động |
| **Xác thực chất lượng** | Kiểm thử thủ công sau khi code xong | Xác thực liên tục qua Automated Tests & TDD |

---

## Quy trình Hai Giai đoạn (Two-Phase Lifecycle)

AI-SDLC phân chia quy trình thành hai giai đoạn cân bằng:

```
┌─────────────────────────────────────────────────────────────┐
│                 GIAI ĐOẠN THIẾT KẾ (01 - 04)                │
│ Khám phá Domain ──► PRD ──► Thiết kế Kỹ thuật ──► Phân rã Task│
└──────────────────────────────┬──────────────────────────────┘
                               │ Chuyển giao Ngữ cảnh Cấu trúc
┌──────────────────────────────▼──────────────────────────────┐
│                 GIAI ĐOẠN THỰC THI (05 - 11)                │
│  Plan ──► Prompt ──► Sinh Code ──► Test ──► Review ──► Push │
└─────────────────────────────────────────────────────────────┘
```

### 1. Giai đoạn Thiết kế (Design Phase - Con người dẫn dắt, AI hỗ trợ)
- **01. Khám phá Domain & Ý tưởng**: Làm rõ bài toán nghiệp vụ, nỗi đau của người dùng và các ca biên (edge cases).
- **02. Định nghĩa Yêu cầu Sản phẩm (PRD)**: Chuẩn hóa yêu cầu chức năng và phi chức năng.
- **03. Thiết kế Kỹ thuật (Technical Design)**: Xây dựng mô hình dữ liệu, thiết kế API, kiến trúc bảo mật và luồng xử lý.
- **04. Phân kỳ & Phân rã Nhiệm vụ**: Chia nhỏ kiến trúc thành các task độc lập, có thể đo lường và kiểm thử được.

### 2. Giai đoạn Thực thi (Execution Phase - AI thực thi, Con người quản trị)
- **05. Kế hoạch Thực thi (Implementation Planning)**: Lập kế hoạch chi tiết từng bước thay đổi tệp tin.
- **06. Prompting & AI Thực thi**: Viết prompt theo khung chuẩn S.C.O.P.E.
- **07. Sinh Mã nguồn (AI Code Gen)**: Sinh code chuẩn production tuân thủ coding standards của dự án.
- **08. Tự động Chạy Tests**: Chạy unit test, integration test và kiểm thử hồi quy tự động.
- **09. Review & Phê duyệt (Human Review)**: Kiểm tra nghiêm ngặt (Zero-trust) về logic, bảo mật và tính tối ưu.
- **10. Xử lý Bug & Chẩn đoán**: Vòng lặp phản hồi chẩn đoán lỗi kiểm thử và hồi quy.
- **11. Commit & Đẩy mã nguồn (Push)**: Tuân thủ Conventional Commits, tạo Pull Request và kích hoạt CI/CD.

---

## Tài liệu này dành cho ai?

- **Kỹ sư Phần mềm & Tech Lead**: Muốn tăng tốc độ bàn giao 5x–10x mà vẫn giữ vững chuẩn mực kiến trúc và chất lượng code.
- **Engineering Manager**: Cần chuẩn hóa quy trình làm việc và thiết lập hàng rào chất lượng khi ứng dụng AI vào đội ngũ.
- **Founders & Indie Hackers**: Cần xây dựng sản phẩm chất lượng cao, sẵn sàng phục vụ thực tế trong thời gian ngắn với đội ngũ tinh gọn.

> [!IMPORTANT]
> **Nguyên tắc Cốt lõi**
> AI là động cơ tăng tốc đắc lực, nhưng **bạn** mới là chủ sở hữu mã nguồn. Không bao giờ đưa code do AI sinh ra lên production mà thiếu review kiến trúc, automated tests và sự xác nhận của kỹ sư con người.
