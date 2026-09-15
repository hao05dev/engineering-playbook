# Quy tắc & Ràng buộc cho Agent (Agent Rules)

**Agent Rules (Quy tắc cho Agent)** là các ràng buộc vận hành nghiêm ngặt được nhúng vào System Prompt hoặc tệp cấu hình quy tắc (`.antigravity/rules/`, `.cursorrules`, `AGENTS.md`) nhằm ngăn AI Agent tự ý thay đổi ngoài tầm kiểm soát hoặc thiết kế quá mức cần thiết (over-engineering).

---

## 1. 10 Quy tắc Bất biến cho Agent

```
┌─────────────────────────────────────────────────────────────┐
│                 10 QUY TẮC BẤT BIẾN CHO AGENT               │
├─────────────────────────────────────────────────────────────┤
│ 1. Nguyên tắc Minimal Diff (Thay đổi tối thiểu)             │
│ 2. Không tự ý Refactor khi không được yêu cầu              │
│ 3. Hỏi khi mơ hồ (Tuyệt đối không tự đoán mò)               │
│ 4. Bảo toàn Comment và Tài liệu sẵn có                      │
│ 5. Tôn trọng Kiến trúc và Pattern hiện tại                 │
│ 6. Luôn chạy Tests trước khi báo hoàn thành                 │
│ 7. Không tự cài Thư viện ảo / Lạ (No Phantom Deps)          │
│ 8. Đảm bảo Type Safety chặt chẽ (Không dùng 'any')          │
│ 9. Tuyệt đối không Hardcode Secrets                         │
│ 10. Tạo Commit nguyên tử và rõ nghĩa                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Phân tích Chi tiết & Ví dụ

### Quy tắc 1: Nguyên tắc Thay đổi Tối thiểu (Minimal Diff)
> **Ràng buộc**: Chỉ chỉnh sửa đúng những dòng mã cần thiết để đáp ứng yêu cầu. Không reformat hay xáo trộn các vùng code không liên quan.

### Quy tắc 2: Không tự ý Refactor ngoài yêu cầu
> **Ràng buộc**: Khi được yêu cầu sửa lỗi trong `OrderService.java`, không được tự ý viết lại toàn bộ class, đổi signature của hàm khác hoặc đổi tên biến trên toàn bộ repository.

### Quy tắc 3: Hỏi khi gặp điểm chưa rõ ràng
> **Ràng buộc**: Nếu yêu cầu có điểm mâu thuẫn hoặc thiếu ngữ cảnh nghiệp vụ, phải dừng lại và hỏi kỹ sư. Tuyệt đối không tự bịa logic nghiệp vụ.

```
❌ KHÔNG TỐT: AI tự đưa ra giả định chưa kiểm chứng:
"Vì yêu cầu không nói rõ thuế suất, tôi đã mặc định áp dụng 20% cho tất cả các quốc gia."

✅ TỐT: AI dừng lại hỏi rõ ràng:
"Tài liệu PRD chưa nói rõ cách tính thuế cho giao dịch xuyên biên giới tại EU. Chúng ta nên tính thuế theo quốc gia phát hành hay quốc gia nhận hàng?"
```

### Quy tắc 4: Giữ nguyên Comment và Tài liệu
> **Ràng buộc**: Tuyệt đối không xóa bỏ comment giải thích logic cũ, header bản quyền hay tài liệu trừ khi có yêu cầu rõ ràng.

### Quy tắc 5: Không cài đặt Thư viện không rõ nguồn gốc (No Phantom Dependencies)
> **Ràng buộc**: Không tự ý thêm package npm/maven mà không có sự đồng ý của kỹ sư. Đảm bảo package được yêu cầu thực sự tồn tại trên registry chính thức.

### Quy tắc 6: Xác thực Tự động trước khi Báo hoàn thành
> **Ràng buộc**: Luôn chạy test suite hoặc build check trước khi thông báo đã hoàn thành task. Nếu test thất bại, phải tìm nguyên nhân gốc rễ (root cause) chứ không được sửa assertion của test để pass ảo.

---

## Mẫu Cấu hình Nhúng System Prompt

Bạn có thể đưa đoạn cấu hình này vào cài đặt của AI Agent:

```markdown
# Agent Execution Guardrails
- Bạn đang làm việc trên một codebase thực tế chuẩn production.
- Hãy tuân thủ nghiêm ngặt quy ước, lint rules và ranh giới kiến trúc hiện hữu.
- Không gây ra breaking changes cho các public API hiện có.
- Viết Unit Test cho tất cả các hàm mới.
- Nếu gặp lỗi build hoặc test, hãy phân tích stack trace cẩn thận và sửa đúng trọng tâm.
```
