# Mô hình C4 Model Trực quan hóa Kiến trúc (C4 Model)

Được sáng tạo bởi Simon Brown, **Mô hình C4 (C4 Model)** cung cấp một khung trực quan hóa kiến trúc phần mềm phân tầng, cho phép phóng to/thu nhỏ (zoomable) qua 4 cấp độ trừu tượng: **System Context (Bối cảnh Hệ thống)**, **Containers (Vật chứa/Ứng dụng)**, **Components (Thành phần nội bộ)**, và **Code (Mã nguồn)**.

---

## 1. 4 Cấp độ Trừu tượng của Mô hình C4

```
┌─────────────────────────────────────────────────────────────┐
│                    4 CẤP ĐỘ CỦA MÔ HÌNH C4                  │
├─────────────────────────────────────────────────────────────┤
│ Cấp 1: System Context Diagram ──► Góc nhìn từ trên cao      │
│   (Người dùng, các hệ thống bên ngoài và ranh giới hệ thống)│
│                                                             │
│ Cấp 2: Container Diagram ──► Bản đồ công nghệ mức cao       │
│   (Web app, Mobile app, Backend API service, Database)      │
│                                                             │
│ Cấp 3: Component Diagram ──► Phóng to vào 1 Container       │
│   (Controllers, Services, Repositories, Hợp đồng nội bộ)   │
│                                                             │
│ Cấp 4: Code Diagram ──► Chi tiết cấu trúc mã nguồn          │
│   (Sơ đồ lớp UML, Interface — thường sinh tự động)          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Ví dụ Thực tế: Hành trình 3 Cấp độ C4

### Cấp 1: Sơ đồ Bối cảnh Hệ thống (System Context Diagram)
Thể hiện con người và các hệ thống bên ngoài tương tác với Cổng Quản lý Thực tập.

```
┌─────────────────────────┐               ┌─────────────────────────┐
│   Sinh viên (User)      │               │   Giảng viên (User)     │
└────────────┬────────────┘               └────────────┬────────────┘
             │                                         │
             │ Dùng cổng web                           │ Duyệt hồ sơ
             ▼                                         ▼
┌───────────────────────────────────────────────────────────────────┐
│              Hệ thống Quản lý Thực tập Sinh viên Đại học          │
│       (Cho phép sinh viên nộp đơn và giảng viên duyệt thực tập)   │
└────────────┬─────────────────────────────────────────┬────────────┘
             │ Gửi email xác thực                      │ Đồng bộ lịch phỏng vấn
             ▼                                         ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│     SendGrid API        │               │   Google Calendar API   │
│  (Hệ thống Bên ngoài)   │               │   (Hệ thống Bên ngoài)  │
└─────────────────────────┘               └─────────────────────────┘
```

### Cấp 2: Sơ đồ Container (Container Diagram)
Phóng to vào bên trong ranh giới hệ thống để thấy các ứng dụng deploy độc lập và nơi lưu trữ dữ liệu.

```
┌───────────────────────────────────────────────────────────────────┐
│                 Ranh giới Hệ thống (Containers)                   │
│                                                                   │
│ ┌─────────────────────────┐   HTTPS / REST    ┌─────────────────┐ │
│ │ Single-Page App (Vue 3) ├──────────────────►│ API Application │ │
│ │ (Giao diện người dùng)  │   Cổng 443        │ (Spring Boot)   │ │
│ └─────────────────────────┘                   └────────┬────────┘ │
│                                                        │          │
│                                           JDBC / TCP   │          │
│                                           Cổng 5432    ▼          │
│                                               ┌─────────────────┐ │
│                                               │ PostgreSQL DB   │ │
│                                               │ (Tables, Views) │ │
│                                               └─────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

### Cấp 3: Sơ đồ Thành phần (Component Diagram)
Phóng to vào bên trong Container **API Application**.

```
┌───────────────────────────────────────────────────────────────────┐
│              API Application (Ranh giới Component)                │
│                                                                   │
│ ┌─────────────────────────┐                   ┌─────────────────┐ │
│ │  InternshipController   ├──────────────────►│  AuthService    │ │
│ │  (REST API endpoints)   │                   │  (JWT verify)   │ │
│ └────────────┬────────────┘                   └─────────────────┘ │
│              │ Ủy quyền xử lý                                     │
│              ▼                                                    │
│ ┌─────────────────────────┐                   ┌─────────────────┐ │
│ │    WorkflowService      ├──────────────────►│ PlacementRepo   │ │
│ │  (Logic máy trạng thái) │                   │ (Spring Data JPA│ │
│ └─────────────────────────┘                   └─────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

---

## 3. Nguyên tắc Kiểm duyệt Sơ đồ C4

Mọi sơ đồ C4 bắt buộc phải tuân theo các nguyên tắc về độ rõ ràng:
1. **Mô tả Rõ ràng trong Từng Hộp**: Mỗi hộp container/component phải ghi rõ mục đích và công nghệ (ví dụ: `Spring Boot Application [Java 21]`).
2. **Gắn Nhãn Đầy đủ trên Mũi tên**: Mỗi mũi tên kết nối phải ghi rõ động từ hành động và giao thức mạng (ví dụ: `Đọc/Ghi dữ liệu dùng JDBC/TLS [Cổng 5432]`).
3. **Không dùng Từ Viết tắt Mơ hồ**: Giải thích rõ các từ viết tắt chuyên ngành.

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Sơ đồ Kiến trúc Theo Chuẩn C4 Model</div>

```markdown
# TASK: Sinh Sơ đồ Kiến trúc Hệ thống Theo Chuẩn C4 Model (Cấp 1, 2, 3)
Bạn là Kiến trúc sư Phần mềm chuẩn C4 Model.

## Bối cảnh Đầu vào:
Hệ thống & Yêu cầu: [MÔ TẢ HỆ THỐNG, STACK CÔNG NGHỆ VÀ CÁC TÍCH HỢP BÊN NGOÀI]

## Yêu cầu Thực hiện:
1. Cấp 1 (System Context): Thể hiện người dùng, ranh giới hệ thống và các bên thứ ba.
2. Cấp 2 (Container): Thể hiện các ứng dụng deploy độc lập, cơ sở dữ liệu và giao thức mạng.
3. Cấp 3 (Component): Phóng to vào container backend chính thể hiện các tầng Controller, Service, Repository.
4. Đảm bảo mọi hộp đều có nhãn Công nghệ cụ thể và mọi mũi tên đều có Động từ + Giao thức mạng.
5. Xuất sơ đồ bằng định dạng ASCII / Mermaid chuẩn.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mọi hộp khối có chỉ định rõ ràng stack công nghệ (ví dụ: `[Vue 3 / TypeScript]`, `[PostgreSQL 16]`) không?
- [ ] Mọi mũi tên kết nối có ghi rõ động từ hành động và giao thức truyền thông không?
- [ ] Các hệ thống bên ngoài có được phân biệt tách biệt với các container nội bộ không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Brown, Simon (2018). <em>Visualising Software Architecture with the C4 Model</em>. Leanpub.</li>
    <li>Trang web chính thức của C4 Model: <a href="https://c4model.com/" target="_blank" rel="noopener">https://c4model.com/</a></li>
  </ul>
</div>
