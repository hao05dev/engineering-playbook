# Sơ đồ Thành phần & Triển khai (Component & Deployment)

Trong khi sơ đồ lớp thể hiện mô hình đối tượng ở mức mã nguồn, **Sơ đồ Thành phần (Component Diagram)** và **Sơ đồ Triển khai (Deployment Diagram)** mô hình hóa các module kiến trúc cấp cao, ranh giới giao diện và cấu trúc hạ tầng vật lý của hệ thống.

---

## 1. Sơ đồ Thành phần (Component Diagrams)

Sơ đồ Thành phần mô hình hóa tổ chức và sự phụ thuộc giữa các module phần mềm (services, libraries, file JAR, micro-frontends).

```
┌─────────────────────────────────────────────────────────────┐
│                 KÝ HIỆU SƠ ĐỒ THÀNH PHẦN                    │
├─────────────────────────────────────────────────────────────┤
│ • Component: Hộp chữ nhật có icon thành phần hoặc «component»│
│ • Provided Interface: Ký hiệu Cây kẹo mút (Lollipop ○─)     │
│   (Giao diện/API mà component này cung cấp cho bên ngoài)   │
│ • Required Interface: Ký hiệu Ổ cắm (Socket ─()             │
│   (Giao diện/API mà component này cần từ bên ngoài)         │
│ • Khớp nối Ghép nối (Assembly): Cắm kẹo mút vào ổ cắm (○─() │
│ • Cổng (Port): Ô vuông nhỏ trên biên để định tuyến I/O      │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ Thực tế: Các Thành phần Hệ thống Quản lý Thực tập

```
┌───────────────────────────┐                 ┌───────────────────────────┐
│   «component» WebApp      │                 │ «component» AuthService   │
│       (Vue 3 SPA)         │                 │    (OAuth2 / OIDC)        │
└─────────────┬─────────────┘                 └─────────────┬─────────────┘
              │                                             │
             ─( AuthAPI                                    ○─ AuthAPI
              │                                             │
              └───────────────────────┬─────────────────────┘
                                      │
                                     ─( RestAPI
                                      │
                       ┌──────────────┴──────────────┐
                       │    «component» ApiGateway   │
                       └──────────────┬──────────────┘
                                      │
                                     ○─ RestAPI
                                      │
                       ┌──────────────┴──────────────┐
                       │ «component» PlacementEngine │
                       └─────────────────────────────┘
```

---

## 2. Sơ đồ Triển khai (Deployment Diagrams)

Sơ đồ Triển khai thể hiện các nút phần cứng, máy ảo, container runtime và các giao thức mạng nơi các file artifact phần mềm thực sự chạy.

### Các Phần tử Cốt lõi:
- **Nút (Node)**: Hộp 3D đại diện cho thiết bị vật lý (`«device»`) hoặc môi trường runtime (`«executionEnvironment»` như Docker, JVM, K8s Pod).
- **Artifact**: Biểu tượng trang giấy gấp góc đại diện cho tệp thực thi vật lý (`.jar`, `.war`, `.js`, Docker image).
- **Đường Truyền thông (Communication Path)**: Đường thẳng có nhãn giao thức (ví dụ: `HTTPS / TLS 1.3`, `JDBC`, `gRPC`).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 CẤU TRÚC TRIỂN KHAI KUBERNETES                          │
├─────────────────────────────────────────────────────────────────────────┤
│ «device» Thiết bị Người dùng (Browser)                                  │
│   └── «artifact» SinglePageApp.bundle.js                                │
│                            │                                            │
│                            │ HTTPS / TLS 1.3 (Port 443)                 │
│                            ▼                                            │
│ «executionEnvironment» Cụm AWS EKS Cluster                              │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ «executionEnvironment» Backend Pod                              │   │
│   │   └── «artifact» app-service.jar (Spring Boot 3.3)              │   │
│   └────────────────────────────────┬────────────────────────────────┘   │
│                                    │ JDBC / TCP (Port 5432)             │
│                                    ▼                                    │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ «executionEnvironment» Managed DB (AWS RDS PostgreSQL 16)       │   │
│   │   └── «artifact» internship_db_schema                           │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Sinh Sơ đồ Thành phần & Triển khai</div>

```markdown
# TASK: Sinh Sơ đồ Thành phần & Triển khai Chuẩn OMG UML
Bạn là Kỹ sư Kiến trúc Đám mây và Phần mềm (Cloud Architecture Engineer).

## Bối cảnh Đầu vào:
Module & Hạ tầng: [MÔ TẢ CÁC MODULE ỨNG DỤNG, API VÀ MÔI TRƯỜNG HOSTING]

## Yêu cầu Thực hiện:
1. Xây dựng Sơ đồ Thành phần thể hiện toàn bộ components, Provided Interfaces (Lollipop), Required Interfaces (Socket) và Ports.
2. Xây dựng Sơ đồ Triển khai mô hình hóa môi trường thực thi (Nodes, Container, VM), các artifacts deploy (.jar, .bundle.js) và giao thức mạng (HTTPS, gRPC, JDBC).
3. Trình bày bằng cú pháp ASCII / Mermaid sạch sẽ.
4. Cung cấp đánh giá an toàn mạng (Network Security Review) về cổng mở, mã hóa trên đường truyền và ranh giới cô lập.
```
</div>

---

## 4. Checklist Kiểm duyệt (Review Checklist)

- [ ] Mọi quan hệ giữa các component có chỉ rõ là Provided hay Required Interface không?
- [ ] Toàn bộ các đường kết nối trong sơ đồ triển khai có ghi rõ giao thức và cổng (port) không?
- [ ] Các thành phần cơ sở dữ liệu, cache và dịch vụ bên thứ ba có được mô hình hóa đầy đủ không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 12: Packages and Components, Section 19: Deployments.</li>
  </ul>
</div>
