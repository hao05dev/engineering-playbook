# ASP.NET Core Web API & Pipeline Middleware

ASP.NET Core trong .NET 8 và .NET 9 cung cấp một môi trường thực thi web đa nền tảng tốc độ cao, hỗ trợ cả **Minimal APIs** và **Controller-based APIs** với hệ thống Dependency Injection tự nhiên và Pipeline Middleware dạng module có thể lắp ghép linh hoạt.

---

## 1. So sánh Minimal APIs vs. Controllers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MINIMAL APIS VS CONTROLLERS                           │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Đặc tính                       │ Minimal APIs (Mặc định .NET 8/9)           │ Controller-Based APIs           │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Hiệu năng & Overhead           │ Thông lượng tối đa, không dùng reflection  │ Tốn chút reflection & MVC routing│
│ Tổ chức mã nguồn               │ Gom nhóm qua Extension Methods (`MapGroup`)| Đóng gói trong class Controller  │
│ Kiến trúc Filter               │ Pipeline `EndpointFilter`                  │ Pipeline `IActionFilter`        │
│ Ứng dụng phù hợp nhất          │ Microservices, Cloud Native, API hiện đại  │ Hệ thống monolith doanh nghiệp  │
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. Vòng đời Dependency Injection & Cạm bẫy Captive Dependency

```
┌─────────────────────────────────────────────────────────────────┐
│               DEPENDENCY INJECTION SERVICE LIFETIMES            │
├─────────────────────────────────────────────────────────────────┤
│ 1. Transient (AddTransient): Tạo instance mới mỗi lần yêu cầu.  │
│    - Dùng cho các service xử lý tiện ích nhẹ, không lưu state.  │
│                                                                 │
│ 2. Scoped (AddScoped): Một instance duy nhất cho mỗi HTTP req. │
│    - Dùng cho `DbContext`, Unit of Work, và các Repositories.   │
│                                                                 │
│ 3. Singleton (AddSingleton): Duy nhất 1 instance toàn app.      │
│    - Dùng cho bộ nhớ đệm in-memory cache, message bus client.   │
├─────────────────────────────────────────────────────────────────┤
│ ⚠️ CẠM BẪY CAPTIVE DEPENDENCY (LỖI NGUY HIỂM):                   │
│ Tuyệt đối không inject một `Scoped` service vào một `Singleton`!│
│ Service Scoped sẽ bị giữ vĩnh viễn trong RAM, gây lỗi tranh     │
│ chấp luồng DbContext và rò rỉ bộ nhớ (memory leaks) nghiêm trọng│
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Thứ tự Thực thi Pipeline Middleware

Thứ tự đăng ký middleware trong `Program.cs` có tính tuần tự nghiêm ngặt khi nhận request và đảo ngược lại khi trả response:

```
Request gửi đến
      │
      ▼
1. Bộ Xử lý Ngoại lệ Toàn cục (RFC 7807 ProblemDetails)
      │
2. Chuyển hướng HTTPS & Bảo mật HSTS
      │
3. Định tuyến (Routing Resolution)
      │
4. Thực thi Chính sách CORS
      │
5. Xác thực Danh tính (Authentication)
      │
6. Phân quyền & Kiểm tra Scope (Authorization)
      │
7. Giới hạn Tần suất (Rate Limiting)
      │
8. Thực thi Endpoint (Minimal API / Controller)
      │
      ▼
Response trả về (Chạy qua middleware theo thứ tự ngược lại)
```

---

## 4. Ví dụ Triển khai: Minimal API với Endpoint Filter & Chuẩn RFC 7807

```csharp
// Presentation/Endpoints/ApplicationsEndpoints.cs
namespace Enterprise.Presentation.Endpoints;

using Enterprise.Application.Applications.Commands;
using Enterprise.Domain.Common;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;

public static class ApplicationsEndpoints
{
    public static RouteGroupBuilder MapApplicationsEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/v1/applications")
            .WithTags("Applications")
            .RequireAuthorization();

        group.MapPost("/", async Task<Results<Created<Guid>, BadRequest<ProblemDetails>>> (
            SubmitApplicationCommand command,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            Result<Guid> result = await sender.Send(command, cancellationToken);

            if (result.IsFailure)
            {
                return TypedResults.BadRequest(new ProblemDetails
                {
                    Title = "Nộp đơn ứng tuyển thất bại",
                    Detail = result.Error.Description,
                    Status = StatusCodes.Status400BadRequest,
                    Type = "https://tools.ietf.org/html/rfc7807"
                });
            }

            return TypedResults.Created($"/api/v1/applications/{result.Value}", result.Value);
        });

        return group;
    }
}
```

```csharp
// Presentation/Infrastructure/GlobalExceptionHandler.cs (Chuẩn .NET 8)
namespace Enterprise.Presentation.Infrastructure;

using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext, 
        Exception exception, 
        CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Ngoại lệ unhandled phát sinh: {Message}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "Đã xảy ra lỗi máy chủ không mong muốn.",
            Type = "https://tools.ietf.org/html/rfc7807",
            Detail = "Vui lòng liên hệ bộ phận hỗ trợ kèm theo mã trace identifier bên dưới.",
            Instance = httpContext.Request.Path
        };

        problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Xây dựng ASP.NET Core Minimal API & Pipeline Middleware</div>

```markdown
# TASK: Xây dựng ASP.NET Core 8/9 Minimal API Chuẩn Production
Bạn là một Staff .NET Backend Architect.

## Endpoint & Feature Spec:
[DÁN ĐẶC TẢ API, CÁC DTOs HOẶC CQRS COMMAND TẠI ĐÂY]

## Instructions:
1. Xây dựng nhóm Minimal API endpoint dạng module sử dụng `MapGroup` và TypedResults (`Results<Ok<T>, BadRequest<ProblemDetails>, NotFound>`).
2. Yêu cầu xác thực JWT Bearer và cấu hình phân quyền theo Role/Policy.
3. Nhận `CancellationToken` trong mọi hàm xử lý và truyền xuyên suốt xuống MediatR / database drivers.
4. Trả về định dạng chuẩn RFC 7807 `ProblemDetails` cho toàn bộ các phản hồi lỗi.
5. Đăng ký DI với đúng vòng đời (đảm bảo không mắc lỗi captive dependencies).
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Các service DI có được đăng ký đúng vòng đời (VD: `DbContext` là `Scoped`) không?
- [ ] Đã kiểm tra không có lỗi Captive Dependency (không inject `Scoped` vào `Singleton`) chưa?
- [ ] `Program.cs` có đặt Global Exception Handler ở vị trí đầu tiên trong chuỗi middleware không?
- [ ] Mọi phản hồi lỗi có tuân thủ đúng chuẩn RFC 7807 `ProblemDetails` không?
- [ ] Toàn bộ các hàm endpoint có tiếp nhận và truyền `CancellationToken` không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Microsoft Learn — <em>Minimal APIs Overview & Dependency Injection in .NET</em>.</li>
    <li>IETF RFC 7807 — <em>Problem Details for HTTP APIs</em>.</li>
  </ul>
</div>
