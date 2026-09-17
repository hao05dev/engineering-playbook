# ASP.NET Core Web API & Middleware Pipeline

ASP.NET Core in .NET 8 and .NET 9 provides an ultra-fast, cross-platform web runtime supporting both **Minimal APIs** and **Controller-based APIs** with native Dependency Injection and a composable Middleware Pipeline.

---

## 1. Minimal APIs vs. Controllers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MINIMAL APIS VS CONTROLLERS                           │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Feature                        │ Minimal APIs (.NET 8/9 Default)            │ Controller-Based APIs           │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Performance & Overhead         │ Highest throughput, zero reflection        │ Slight reflection & MVC routing │
│ Organization                   │ Grouped via Extension Methods (`MapGroup`)| Clustered in Controller classes │
│ Filter Architecture            │ `EndpointFilter` pipeline                  │ `IActionFilter` pipeline        │
│ Best Fit                       │ Microservices, Cloud Functions, Modern APIs│ Large monolithic enterprise apps│
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. Dependency Injection Lifetimes & The Captive Dependency Trap

```
┌─────────────────────────────────────────────────────────────────┐
│               DEPENDENCY INJECTION SERVICE LIFETIMES            │
├─────────────────────────────────────────────────────────────────┤
│ 1. Transient (AddTransient): New instance every single time.    │
│    - Use for lightweight, stateless helper utilities.           │
│                                                                 │
│ 2. Scoped (AddScoped): One instance per incoming HTTP request.  │
│    - Use for `DbContext`, Unit of Work, and Repositories.      │
│                                                                 │
│ 3. Singleton (AddSingleton): Single instance across app life.   │
│    - Use for in-memory caches, thread-safe message publishers.  │
├─────────────────────────────────────────────────────────────────┤
│ ⚠️ THE CAPTIVE DEPENDENCY ANTI-PATTERN:                         │
│ Never inject a `Scoped` service into a `Singleton`! The scoped  │
│ service will be held forever, causing DbContext concurrency bugs│
│ and severe memory leaks.                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Middleware Pipeline Execution Order

The order of middleware in `Program.cs` is strictly sequential for incoming requests and reverse-sequential for outgoing responses:

```
Incoming Request
      │
      ▼
1. Global Exception Handler (RFC 7807 ProblemDetails)
      │
2. HTTPS Redirection & HSTS Security Headers
      │
3. Routing Resolution
      │
4. CORS Policy Enforcement
      │
5. Authentication (Identify Principal)
      │
6. Authorization (Enforce Policies & Scopes)
      │
7. Rate Limiting (Fixed / Token Bucket)
      │
8. Endpoint Execution (Minimal API / Controller)
      │
      ▼
Outgoing Response (Traverses in reverse order)
```

---

## 4. Practical Implementation: Minimal API with Endpoint Filter & RFC 7807

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
                    Title = "Application Submission Failed",
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
// Presentation/Infrastructure/GlobalExceptionHandler.cs (.NET 8 Standard)
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
        logger.LogError(exception, "Unhandled exception occurred: {Message}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected server error occurred.",
            Type = "https://tools.ietf.org/html/rfc7807",
            Detail = "Please contact support with the trace identifier.",
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

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: ASP.NET Core Minimal API & Middleware Generation</div>

```markdown
# TASK: Generate Production-Grade ASP.NET Core 8/9 Minimal API
You are a Staff .NET Backend Architect.

## Endpoint & Feature Spec:
[PASTE API REQUIREMENT, DTOs, OR CQRS COMMAND]

## Instructions:
1. Construct a modular Minimal API endpoint group using `MapGroup` and TypedResults (`Results<Ok<T>, BadRequest<ProblemDetails>, NotFound>`).
2. Require JWT authentication and configure role/scope policies.
3. Accept `CancellationToken` in every handler and pass it down to MediatR / database drivers.
4. Implement RFC 7807 `ProblemDetails` for all error responses.
5. Register services with correct DI lifetimes (verifying zero captive dependencies).
```
</div>

---

## 6. Review Checklist

- [ ] Are DI services registered with correct lifetimes (e.g., `DbContext` as `Scoped`)?
- [ ] Is there zero risk of Captive Dependency (no `Scoped` injected into `Singleton`)?
- [ ] Does `Program.cs` place the Global Exception Handler at the very top of the middleware chain?
- [ ] Are all error payloads compliant with RFC 7807 `ProblemDetails`?
- [ ] Does every endpoint handler accept and propagate `CancellationToken`?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Microsoft Learn — <em>Minimal APIs Overview & Dependency Injection in .NET</em>.</li>
    <li>IETF RFC 7807 — <em>Problem Details for HTTP APIs</em>.</li>
  </ul>
</div>
