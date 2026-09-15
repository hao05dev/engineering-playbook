# Sơ đồ Lớp & Mô hình Domain (Class Diagrams)

Sơ đồ Lớp (Class Diagram) và Mô hình Domain (Domain Model) là các biểu diễn cấu trúc nền tảng của phương pháp Phân tích và Thiết kế Hướng đối tượng (OOAD). Chúng định nghĩa các thực thể, thuộc tính, phương thức và mối quan hệ cấu thành nên bản vẽ kỹ thuật của phần mềm.

---

## 1. Mô hình Domain vs. Sơ đồ Lớp Cài đặt (Implementation Class)

```
┌─────────────────────────────────────────────────────────────┐
│                 MÔ HÌNH KHÁI NIỆM VS. THIẾT KẾ              │
├─────────────────────────────────────────────────────────────┤
│ • Mô hình Domain Khái niệm: Tập trung vào các khái niệm     │
│   nghiệp vụ thực tế, thuộc tính và liên kết (Không chi tiết).│
│                                                             │
│ • Sơ đồ Lớp Cài đặt (Design Class): Tập trung vào cấu trúc  │
│   kiểu dữ liệu, tầm nhìn (+/-), signature hàm và pattern.   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Giải phẫu Lớp & Ngữ nghĩa Mối quan hệ trong UML

### Ký hiệu Tầm nhìn (Visibility Modifiers):
- `+` Public (Công khai)
- `-` Private (Riêng tư)
- `#` Protected (Được bảo vệ)
- `~` Package / Default (Phạm vi package)

### 5 Mối Quan hệ Cốt lõi:

| Mối quan hệ | Ký hiệu | Ngữ nghĩa | Ràng buộc Vòng đời |
| :--- | :--- | :--- | :--- |
| **Liên kết (Association)** | `────` | "Có liên kết cấu trúc với" | Vòng đời độc lập nhau |
| **Kết tập (Aggregation)** | `◇───` | "Chứa một phần" (Thuộc về) | Thực thể con tồn tại độc lập khi cha bị xóa |
| **Hợp thành (Composition)**| `◆───` | "Sở hữu toàn bộ một phần" | Thực thể con bị tiêu hủy khi cha bị xóa |
| **Kế thừa (Generalization)**| `─▷` | "Là một kiểu con của" | Thay thế kiểu dữ liệu cha |
| **Phụ thuộc (Dependency)** | `<- - -`| "Sử dụng tạm thời qua hàm" | Truyền qua tham số hàm |

---

## 3. Ví dụ Thực tế: Mô hình Domain

```
┌───────────────────────────┐                 ┌───────────────────────────┐
│         SinhVien          │ 1             * │     DonUngTuyen           │
├───────────────────────────┼─────────────────┼───────────────────────────┤
│ - studentId: UUID         │                 │ - id: UUID                │
│ - gpa: BigDecimal         │                 │ - status: TrangThaiDon    │
│ - earnedCredits: int      │                 │ - appliedAt: Instant      │
├───────────────────────────┤                 ├───────────────────────────┤
│ + canApply(): boolean     │                 │ + transition(newState)    │
└─────────────┬─────────────┘                 └─────────────┬─────────────┘
              │ 1                                           │ *
              │                                             │
              │                                             │ 1
              │ *                             ┌─────────────▼─────────────┐
┌─────────────▼─────────────┐                 │       TinTuyenDung        │
│    GiangVienHuongDan      │                 ├───────────────────────────┤
├───────────────────────────┤                 │ - id: UUID                │
│ - advisorId: UUID         │                 │ - title: String           │
│ - department: String      │                 │ - remainingQuota: int     │
└───────────────────────────┘                 └───────────────────────────┘
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Sơ đồ Lớp & Mô hình Domain</div>

```markdown
# TASK: Sinh Sơ đồ Lớp (Class Diagram) & Mô hình Domain Chuẩn OMG UML
Bạn là Kiến trúc sư Thiết kế Hướng đối tượng (OOAD Architect).

## Bối cảnh Đầu vào:
Danh sách Thực thể & Quy tắc Nghiệp vụ: [MÔ TẢ THỰC THỂ VÀ QUAN HỆ]

## Yêu cầu Thực hiện:
1. Xây dựng Mô hình Domain Khái niệm thể hiện các khái niệm nghiệp vụ chính và mối liên kết.
2. Thiết kế Sơ đồ Lớp Cài đặt chi tiết với đầy đủ Thuộc tính, Tầm nhìn (+/-), Kiểu dữ liệu, Phương thức và Bản số quan hệ (Multiplicities: 1, 0..1, 1..*, 0..*).
3. Phân biệt chính xác giữa Association, Aggregation (hình thoi trắng), Composition (hình thoi đen) và Generalization (mũi tên tam giác rỗng).
4. Xuất sơ đồ bằng định dạng ASCII / Mermaid chuẩn.
5. Giải thích ngắn gọn các bất biến cấu trúc được đảm bảo bởi sơ đồ.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các đầu quan hệ đều có ghi rõ bản số (Multiplicity: 1, 0..1, 1..*) chưa?
- [ ] Quan hệ Composition (`◆`) có được dùng đúng cho các thực thể con không thể tồn tại độc lập không?
- [ ] Các thuộc tính và phương thức có khai báo kiểu dữ liệu rõ ràng và tầm nhìn (+/-) không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 11: Structured Classifiers.</li>
    <li>Larman, Craig (2004). <em>Applying UML and Patterns (3rd Edition)</em>. Prentice Hall.</li>
  </ul>
</div>
