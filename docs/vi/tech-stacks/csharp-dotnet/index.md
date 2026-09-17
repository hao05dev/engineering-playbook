# Tổng quan Kỹ thuật Doanh nghiệp C# .NET (.NET Enterprise Engineering)

.NET 8 và .NET 9 LTS là nền tảng phát triển ứng dụng cloud-native thống nhất, hiệu năng vượt trội của Microsoft. Khi kết hợp cùng các tính năng hiện đại của ngôn ngữ C#, **Kiến trúc Sạch (Clean Architecture)** và **Thiết kế Hướng miền (Domain-Driven Design - DDD)**, .NET trở thành chuẩn mực vàng cho hệ thống backend doanh nghiệp và microservices trọng yếu.

---

## 1. Kiến trúc Doanh nghiệp & Mô hình Củ hành (Clean Onion Model)

```
┌─────────────────────────────────────────────────────────────────┐
│               .NET CLEAN ARCHITECTURE ONION MODEL               │
├─────────────────────────────────────────────────────────────────┤
│ [Tầng Presentation] (ASP.NET Core Web API / Minimal APIs)       │
│       │                                                         │
│       ▼                                                         │
│ [Tầng Application] (MediatR CQRS, FluentValidation, DTOs)       │
│       │                                                         │
│       ▼                                                         │
│ [Tầng Domain] (Entities, Value Objects, Domain Events - 0 Dep)  │
│       ▲                                                         │
│       │                                                         │
│ [Tầng Infrastructure] (EF Core, Dapper, Redis, Message Broker)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Các Nguyên lý Kiến trúc dành cho AI Agent & Lập trình viên

1. **Đảo ngược Phụ thuộc Nghiêm ngặt (Dependency Inversion)**: Tầng Domain tuyệt đối không phụ thuộc vào bất kỳ thư viện bên ngoài, framework hay package CSDL nào.
2. **Mẫu Result Pattern thay cho Exception**: Sử dụng `Result<T>` hoặc `OneOf` để trả về các lỗi nghiệp vụ dự đoán được (như *NotFound*, *ValidationError*) thay vì lạm dụng `throw new Exception` tốn kém hiệu năng.
3. **Lan truyền Cancellation Token Bắt buộc**: Luôn truyền `CancellationToken` xuyên suốt chuỗi gọi bất đồng bộ từ controller xuống tận driver CSDL.
4. **Phân tách Đọc/Ghi (Read/Write Segregation)**: Dùng Entity Framework Core cho các thao tác ghi nghiệp vụ phức tạp và dùng Dapper Micro-ORM siêu nhẹ cho các truy vấn đọc dữ liệu tốc độ cao.

---

## 3. Thành phần Công nghệ Chuẩn

- **Nền tảng**: .NET 8 / .NET 9 (LTS)
- **Ngôn ngữ**: C# 12 / 13 (Nullable Reference Types, Records, Pattern Matching)
- **API Framework**: ASP.NET Core (Minimal APIs & Controllers)
- **Truy cập CSDL**: Entity Framework Core 8/9, Dapper Micro-ORM, PostgreSQL / SQL Server
- **Messaging & CQRS**: MediatR / Wolverine, MassTransit
- **Kiểm thử**: xUnit, FluentAssertions, NSubstitute, Testcontainers

---

## 4. Lộ trình Nội dung

- [Kiến trúc Sạch & Thiết kế Hướng miền](./clean-architecture-ddd.md) — Cấu trúc 4 tầng, Rich Domain Entities, Value Objects và Result Pattern.
- [ASP.NET Core Web API & Pipeline Middleware](./aspnet-core-webapi.md) — Minimal APIs, Vòng đời Dependency Injection, Xử lý ngoại lệ toàn cục chuẩn `ProblemDetails`.
- [Truy xuất Dữ liệu với EF Core & Dapper](./efcore-dapper-data.md) — Cấu hình Fluent API, `AsNoTracking`, Split Queries và tối ưu truy vấn Dapper.
- [Thực tiễn Bất đồng bộ, CQRS & Kiểm thử](./async-mediatr-testing.md) — Quy tắc `CancellationToken`, Pipeline Behaviors của MediatR, bộ test xUnit & Testcontainers + Prompt AI Reviewer.
