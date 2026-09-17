# Thực tiễn Bất đồng bộ, CQRS & Kiểm thử (.NET Async & Testing)

Các ứng dụng .NET doanh nghiệp hiện đại đạt được khả năng chịu tải cao, dễ bảo trì và độ phủ kiểm thử vượt trội nhờ vào lập trình **bất đồng bộ có kỷ luật**, **mô hình CQRS với MediatR Pipeline Behaviors**, và **kiểm thử tích hợp với Testcontainers**.

---

## 1. Thực tiễn Lập trình Bất đồng bộ & An toàn Thread Pool

```
┌─────────────────────────────────────────────────────────────────┐
│                 ASYNC / AWAIT SURVIVAL RULES                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Tuyệt đối Không Chặn Luồng (Block Asynchronous Code)         │
│    ✗ Dùng `task.Result` / `task.Wait()` ──> Gây hiện tượng      │
│      Thread Pool Starvation và Deadlock chết đứng hệ thống.     │
│    ✓ Luôn dùng `await task;` xuyên suốt toàn bộ chuỗi gọi hàm.  │
│                                                                 │
│ 2. Lan truyền CancellationToken Bắt buộc                        │
│    Truyền `CancellationToken` từ ASP.NET Core endpoint xuống    │
│    MediatR handler, EF Core `SaveChangesAsync` và HTTP client.  │
│                                                                 │
│ 3. Dùng ValueTask cho các Hot Path Tần suất Cao                 │
│    Dùng `ValueTask<T>` khi kết quả thường đã hoàn thành đồng bộ │
│    (như hit in-memory cache) để giảm thiểu áp lực cấp phát GC.  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Mô hình CQRS & Pipeline Behaviors với MediatR

```
Command gửi đến ──> [Logging Behavior] ──> [Validation Behavior] ──> [Handler] ──> Ghi CSDL
```

```csharp
// Application/Behaviors/ValidationPipelineBehavior.cs
namespace Enterprise.Application.Behaviors;

using Enterprise.Domain.Common;
using FluentValidation;
using MediatR;

public sealed class ValidationPipelineBehavior<TRequest, TResponse>(
    IEnumerable<IValidator<TRequest>> validators) 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TResponse : Result
{
    public async Task<TResponse> Handle(
        TRequest request, 
        RequestHandlerDelegate<TResponse> next, 
        CancellationToken cancellationToken)
    {
        if (!validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);
        var validationResults = await Task.WhenAll(
            validators.Select(v => v.ValidateAsync(context, cancellationToken)));

        var failures = validationResults
            .SelectMany(r => r.Errors)
            .Where(f => f != null)
            .ToList();

        if (failures.Count != 0)
        {
            var errorMessage = string.Join("; ", failures.Select(f => f.ErrorMessage));
            return (TResponse)Result.Failure(Error.Validation("ValidationError", errorMessage));
        }

        return await next();
    }
}
```

---

## 3. Bộ Kiểm thử Tự động: xUnit & Testcontainers

Các bài kiểm thử tích hợp (Integration Tests) nên chạy trên các container PostgreSQL/SQL Server thực tế bằng **Testcontainers**:

```csharp
// Tests/Integration/ApplicationsEndpointTests.cs
namespace Enterprise.Tests.Integration;

using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Testcontainers.PostgreSql;
using Xunit;

public sealed class ApplicationsEndpointTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _dbContainer = new PostgreSqlBuilder()
        .WithImage("postgres:16-alpine")
        .Build();

    public async Task InitializeAsync() => await _dbContainer.StartAsync();
    public async Task DisposeAsync() => await _dbContainer.DisposeAsync();

    [Fact]
    public async Task SubmitApplication_WithValidData_ReturnsCreated()
    {
        // Arrange
        using var factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder => { /* Cấu hình chuỗi kết nối của Testcontainer */ });
        using var client = factory.CreateClient();

        var payload = new { JobPostingId = Guid.NewGuid(), CoverLetter = "Lập trình viên C# .NET ứng tuyển thực tập backend." };

        // Act
        var response = await client.PostAsJsonAsync("/api/v1/applications", payload);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}
```

---

## 4. Kiểm thử Ranh giới Kiến trúc với NetArchTest

Đảm bảo các ranh giới kiến trúc Clean Architecture không bao giờ bị vi phạm bởi lập trình viên hoặc AI:

```csharp
[Fact]
public void DomainLayer_ShouldNotHaveDependencyOnOtherProjects()
{
    var result = Types.InAssembly(typeof(AggregateRoot<>).Assembly)
        .ShouldNot()
        .HaveDependencyOnAny("Enterprise.Application", "Enterprise.Infrastructure", "Enterprise.Presentation")
        .GetResult();

    result.IsSuccessful.Should().BeTrue();
}
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Đánh giá Mã nguồn C# .NET & Bộ Test CQRS</div>

```markdown
# TASK: Đánh giá Mã nguồn C# .NET 8/9 & Xây dựng Bộ Kiểm thử CQRS
Bạn là một Staff .NET Architect và Kỹ sư Tự động hóa Kiểm thử (QA Automation Engineer).

## Input .NET Solution / Code:
[DÁN C# HANDLERS, ENDPOINTS, HOẶC CODE KIẾN TRÚC TẠI ĐÂY]

## Instructions:
1. Thẩm định rủi ro Thread Pool: Đảm bảo không sử dụng `.Result` hay `.Wait()`, và kiểm tra lan truyền `CancellationToken`.
2. Kiểm tra ranh giới Clean Architecture: Tầng Domain tuyệt đối không phụ thuộc EF Core hay ASP.NET.
3. Xác thực các Command/Query MediatR CQRS có gắn kèm Pipeline Behavior kiểm duyệt FluentValidation.
4. Sinh bộ unit test toàn diện (xUnit + FluentAssertions + NSubstitute) và test tích hợp với Testcontainers.
5. Xuất bảng phân loại gồm **P0 Lỗi Nghẽn Luồng/Bảo mật**, **P1 Cảnh báo Kiến trúc**, và **P2 Đề xuất Tối ưu**.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Mã nguồn bất đồng bộ có hoàn toàn non-blocking (không chứa `.Result`, `.Wait()`) không?
- [ ] Tham số `CancellationToken` có được tiếp nhận và truyền vào mọi lệnh gọi CSDL/mạng không?
- [ ] Logic validate xuyên suốt có được tự động thực thi trong MediatR Pipeline Behavior không?
- [ ] Các bài test tích hợp có được xác thực với CSDL thực qua Testcontainers không?
- [ ] Ranh giới các tầng kiến trúc có được bảo vệ bằng bài test tự động NetArchTest không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Stephen Cleary (2020). <em>Concurrency in C# Cookbook (2nd Edition)</em>. O'Reilly Media.</li>
    <li>Bogard, Jimmy — <em>CQRS with MediatR & Vertical Slice Architecture</em>.</li>
  </ul>
</div>
