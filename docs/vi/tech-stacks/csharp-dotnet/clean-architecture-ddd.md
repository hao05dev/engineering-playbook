# Kiến trúc Sạch & Thiết kế Hướng miền trong .NET (Clean Architecture & DDD)

Kiến trúc Sạch (Clean Architecture) và Thiết kế Hướng miền (Domain-Driven Design - DDD) giúp cô lập logic nghiệp vụ cốt lõi khỏi chi tiết cơ sở dữ liệu, giao diện người dùng và các framework bên thứ ba, đảm bảo hệ thống doanh nghiệp luôn dễ bảo trì và dễ viết kiểm thử.

---

## 1. Trách nhiệm của Các Tầng trong Clean Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 CLEAN ARCHITECTURE RESPONSIBILITIES             │
├─────────────────────────────────────────────────────────────────┤
│ 1. Tầng Domain (Lõi - Tuyệt đối 0 phụ thuộc bên ngoài)         │
│    - Các Thực thể (Entities) đóng gói bất biến & setter private.│
│    - Đối tượng Giá trị (Value Objects) kiểu `record` bất biến.  │
│    - Sự kiện Miền (Domain Events) & Gốc Kết tập (Aggregate Root)│
│                                                                 │
│ 2. Tầng Application (Điều phối Nghiệp vụ)                       │
│    - Các xử lý Command & Query CQRS (MediatR).                  │
│    - Kiểm tra tính hợp lệ dữ liệu (FluentValidation).           │
│    - Các Interface định nghĩa Repository & Dịch vụ bên ngoài.   │
│                                                                 │
│ 3. Tầng Infrastructure (Thi công Chi tiết)                      │
│    - EF Core `DbContext`, Migrations & Repository Dapper.       │
│    - Lưu trữ đám mây (AWS S3 / Azure Blob) & Gửi email.         │
│                                                                 │
│ 4. Tầng Presentation (Cổng Tiếp nhận)                           │
│    - ASP.NET Core Minimal APIs / Controllers.                   │
│    - Pipeline Middleware, Bộ lọc Auth, Chuẩn `ProblemDetails`.  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Rich Domain Entity vs. Anemic Domain Model

Tránh tạo các class thực thể rỗng chỉ chứa getter/setter public (Anemic Model). Hãy đóng gói các bất biến nghiệp vụ trực tiếp bên trong Thực thể Domain:

```csharp
// Domain/Entities/InternshipApplication.cs
namespace Enterprise.Domain.Entities;

using Enterprise.Domain.Common;
using Enterprise.Domain.Events;
using Enterprise.Domain.ValueObjects;

public sealed class InternshipApplication : AggregateRoot<Guid>
{
    private InternshipApplication() { } // Constructor private không tham số cho EF Core

    public Guid StudentId { get; private set; }
    public Guid JobPostingId { get; private set; }
    public ApplicationStatus Status { get; private set; }
    public CoverLetter CoverLetter { get; private set; }
    public DateTime SubmittedAtUtc { get; private set; }

    public static Result<InternshipApplication> Create(
        Guid studentId, 
        Guid jobPostingId, 
        CoverLetter coverLetter)
    {
        if (studentId == Guid.Empty)
            return Result.Failure<InternshipApplication>(DomainErrors.Application.InvalidStudentId);

        var application = new InternshipApplication
        {
            Id = Guid.NewGuid(),
            StudentId = studentId,
            JobPostingId = jobPostingId,
            CoverLetter = coverLetter,
            Status = ApplicationStatus.Submitted,
            SubmittedAtUtc = DateTime.UtcNow
        };

        application.RaiseDomainEvent(new ApplicationSubmittedDomainEvent(application.Id, studentId, jobPostingId));
        return Result.Success(application);
    }

    public Result Accept()
    {
        if (Status != ApplicationStatus.UnderReview)
            return Result.Failure(DomainErrors.Application.CannotAcceptInCurrentState);

        Status = ApplicationStatus.Accepted;
        RaiseDomainEvent(new ApplicationAcceptedDomainEvent(Id, StudentId));
        return Result.Success();
    }
}
```

---

## 3. Đối tượng Giá trị (Value Objects) với C# Records

```csharp
// Domain/ValueObjects/CoverLetter.cs
namespace Enterprise.Domain.ValueObjects;

public sealed record CoverLetter
{
    public string Value { get; }

    private CoverLetter(string value) => Value = value;

    public static Result<CoverLetter> Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value) || value.Length < 20 || value.Length > 2000)
            return Result.Failure<CoverLetter>(DomainErrors.Application.InvalidCoverLetterLength);

        return Result.Success(new CoverLetter(value.Trim()));
    }
}
```

---

## 4. Mẫu Result Pattern Hàm hóa (`Result<T>`)

Thay vì lạm dụng việc ném ngoại lệ (`throw new Exception`) tốn kém chi phí bộ nhớ cho các vi phạm quy tắc thông thường, hãy trả về đối tượng `Result` có kiểu rõ ràng:

```csharp
// Domain/Common/Result.cs
public class Result
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }

    protected Result(bool isSuccess, Error error)
    {
        if (isSuccess && error != Error.None || !isSuccess && error == Error.None)
            throw new InvalidOperationException("Trạng thái kết quả không hợp lệ.");

        IsSuccess = isSuccess;
        Error = error;
    }

    public static Result Success() => new(true, Error.None);
    public static Result Failure(Error error) => new(false, error);
    public static Result<TValue> Success<TValue>(TValue value) => new(value, true, Error.None);
    public static Result<TValue> Failure<TValue>(Error error) => new(default, false, error);
}
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Tái cấu trúc Domain Model Chuẩn Clean Architecture & DDD</div>

```markdown
# TASK: Tái cấu trúc Domain Model .NET theo Chuẩn Clean Architecture & DDD
Bạn là một Principal .NET Enterprise Architect.

## Input Code / Entity Draft:
[DÁN CLASS C#, SCHEMA CSDL HOẶC YÊU CẦU NGHIỆP VỤ TẠI ĐÂY]

## Instructions:
1. Tái cấu trúc entity thành Rich Domain Model với các setter private và phương thức khởi tạo tĩnh (`Create`).
2. Đóng gói logic validate vào các Value Objects kiểu `record` bất biến.
3. Thay thế việc ném ngoại lệ (exceptions) bằng mẫu `Result<T>` pattern.
4. Bắn các Domain Events cho các thay đổi trạng thái cần kích hoạt tác vụ phụ bất đồng bộ.
5. Đảm bảo project Domain TUYỆT ĐỐI không chứa dependency NuGet nào tới EF Core, ASP.NET hoặc thư viện bên ngoài.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Project Domain có hoàn toàn không chứa dependency vào EF Core, ASP.NET hay hạ tầng không?
- [ ] Toàn bộ thuộc tính của thực thể có được bảo vệ bằng private setter không?
- [ ] Các vi phạm quy tắc nghiệp vụ có trả về qua `Result<T>` thay vì throw exception không?
- [ ] Các value objects có được triển khai bằng kiểu C# `record` bất biến không?
- [ ] Các chuyển đổi trạng thái có được bảo vệ bởi bất biến nghiệp vụ không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Tackling Complexity in the Heart of Software</em>. Addison-Wesley.</li>
    <li>Martin, Robert C. (2017). <em>Clean Architecture: A Craftsman's Guide to Software Structure and Design</em>. Prentice Hall.</li>
  </ul>
</div>
