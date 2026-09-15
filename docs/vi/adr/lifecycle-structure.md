# Cấu trúc & Vòng đời ADR (Chuẩn MADR)

Tài liệu này cung cấp mẫu định dạng chuẩn **Markdown Architectural Decision Record (MADR v3.0)** và quy chuẩn vòng đời trạng thái của các quyết định kiến trúc trong dự án phần mềm.

---

## 1. Vòng đời Trạng thái của một Bản ADR

```
┌─────────────────────────────────────────────────────────────┐
│                    MÁY TRẠNG THÁI CỦA ADR                   │
├─────────────────────────────────────────────────────────────┤
│   ● (Bắt đầu) ──► [PROPOSED] ──► [ACCEPTED] ──► [SUPERSEDED]│
│                        │                                    │
│                        ▼                                    │
│                   [REJECTED]                                │
└─────────────────────────────────────────────────────────────┘
```

- **PROPOSED (Đề xuất)**: Đang trong quá trình thảo luận và phản biện giữa các kỹ sư.
- **ACCEPTED (Chấp thuận)**: Đã được phê duyệt chính thức; toàn bộ kỹ sư và AI Agent bắt buộc phải tuân thủ.
- **REJECTED (Bác bỏ)**: Đã được xem xét nhưng bị từ chối; lưu lại trong lịch sử Git để tránh tranh cãi lại trong tương lai.
- **DEPRECATED (Hết hiệu lực)**: Quyết định không còn phù hợp do bài toán thay đổi.
- **SUPERSEDED (Bị thay thế)**: Được thay thế bởi một bản ADR mới hơn (ví dụ: *Bị thay thế bởi ADR-014*).

---

## 2. Mẫu Tài liệu MADR v3.0 Chuẩn mực

```markdown
# [Tên ngắn gọn của bài toán và phương án lựa chọn]

* Trạng thái: [proposed | accepted | rejected | deprecated | superseded by ADR-00X]
* Người quyết định: [danh sách những người tham gia biểu quyết]
* Ngày cập nhật: [YYYY-MM-DD]

Nhiệm vụ Kỹ thuật: [mô tả hoặc đường link tới Jira/GitHub Issue]

## Bối cảnh và Phát biểu Bài toán
[Mô tả bối cảnh kỹ thuật trong 2-3 câu. Trọng lực kỹ thuật nào buộc ta phải đưa ra quyết định này?]

## Trọng lực Quyết định (Decision Drivers)
* [driver 1, ví dụ: độ phức tạp vận hành thấp]
* [driver 2, ví dụ: bắt buộc phải có ACID transaction]

## Các Phương án Cân nhắc
* [Phương án 1 - Phương án được chọn]
* [Phương án 2 - Phương án thay thế]
* [Phương án 3 - Phương án thay thế]

## Kết quả Quyết định
Phương án được chọn: "[Phương án 1]", vì [giải trình lý do, ví dụ: đáp ứng trọn vẹn driver 1 và 2].

### Hệ quả Tích cực (Positive Consequences)
* [ví dụ: Đảm bảo tính nhất quán dữ liệu cao mặc định]
* [ví dụ: Thiết lập môi trường local cho dev cực kỳ nhanh chóng]

### Hệ quả Tiêu cực / Đánh đổi (Negative Consequences)
* [ví dụ: Dung lượng RAM chiếm dụng cao hơn một chút trên máy chủ nhỏ]

## Ưu và Nhược điểm của Từng Phương án

### [Phương án 1]
* Tốt, vì [lý do a]
* Chưa tốt, vì [lý do b]

### [Phương án 2]
* Tốt, vì [lý do a]
* Chưa tốt, vì [lý do b - tại sao phương án này bị từ chối]
```

---

## 3. Ví dụ Thực tế: ADR-001 Lựa chọn Kiến trúc Modular Monolith

```markdown
# ADR-001: Lựa chọn Kiến trúc Modular Monolith cho Cổng Thực tập

* Trạng thái: accepted
* Người quyết định: Lead Architect, Tech Lead
* Ngày: 2026-09-15

## Bối cảnh và Phát biểu Bài toán
Hệ thống Cổng Quản lý Thực tập cần phục vụ 2.000 sinh viên và 150 doanh nghiệp đối tác. Đội ngũ kỹ thuật gồm 4 lập trình viên. Chúng ta cần quyết định giữa kiến trúc Microservices phân tán và kiến trúc Modular Monolith.

## Trọng lực Quyết định
* Tốc độ bàn giao sản phẩm ra thị trường nhanh nhất.
* Độ phức tạp vận hành DevOps tối thiểu.
* Đảm bảo tính toàn vẹn giao dịch ACID tuyệt đối khi giữ chỉ tiêu thực tập.

## Các Phương án Cân nhắc
* Phương án 1: Modular Monolith trên Spring Boot 3.3 sử dụng Java package làm ranh giới module.
* Phương án 2: 5 Microservices độc lập triển khai trên Kubernetes kết nối qua Kafka.

## Kết quả Quyết định
Phương án được chọn: "Phương án 1 (Modular Monolith)", vì nó triệt tiêu hoàn toàn độ trễ mạng và độ phức tạp giao dịch phân tán trong khi vẫn giữ ranh giới domain sạch sẽ.

### Hệ quả Tích cực
* 1 file đóng gói duy nhất giúp rút ngắn thời gian pipeline CI/CD xuống dưới 2 phút.
* Giao dịch cơ sở dữ liệu ACID ngăn ngừa hoàn toàn tình trạng race-condition khi phân bổ chỉ tiêu.

### Hệ quả Tiêu cực
* Toàn bộ các module bắt buộc phải dùng chung một phiên bản Java runtime.
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Soạn thảo Bản ghi Quyết định Kiến trúc MADR</div>

```markdown
# TASK: Soạn thảo Bản ghi Quyết định Kiến trúc (ADR) Chuẩn MADR v3.0
Bạn là Chuyên gia Tài liệu Kiến trúc Phần mềm (Software Architecture Documenter).

## Bối cảnh Quyết định Đầu vào:
Bài toán Kỹ thuật: [MÔ TẢ BÀI TOÁN, VÍ DỤ: CHỌN GIỮA POSTGRES VS MONGO, HOẶC JWT VS SESSION]
Các Phương án Ứng viên: [LIỆT KÊ CÁC PHƯƠNG ÁN ĐÃ XEM XÉT]

## Yêu cầu Thực hiện:
1. Soạn thảo bản ADR tuân thủ nghiêm ngặt định dạng MADR v3.0.
2. Xây dựng rõ ràng các Trọng lực Quyết định (Decision Drivers), Phát biểu Bối cảnh, Kết quả Quyết định, Hệ quả Tích cực và Hệ quả Tiêu cực.
3. Cung cấp bảng phân tích Ưu / Nhược điểm chi tiết cho từng phương án.
4. Đặt trạng thái ban đầu là [PROPOSED] và đánh dấu các điểm chưa rõ bằng nhãn [QUESTION].
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Bản ADR có mô tả rõ ràng bối cảnh bài toán trước khi đưa ra lựa chọn không?
- [ ] Có ít nhất hai phương án khả thi được đánh giá trung thực với đầy đủ ưu/nhược điểm không?
- [ ] Các hệ quả tiêu cực và đánh đổi kỹ thuật có được ghi nhận minh bạch không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Đặc tả Chuẩn MADR: <a href="https://adr.github.io/madr/" target="_blank" rel="noopener">https://adr.github.io/madr/</a></li>
  </ul>
</div>
