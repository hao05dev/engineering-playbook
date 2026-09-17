# Async Best Practices, MediatR CQRS & Testing

Modern enterprise .NET applications achieve scale, maintainability, and high test coverage through disciplined **asynchronous programming**, **CQRS with MediatR pipeline behaviors**, and **Testcontainers integration testing**.

---

## 1. Asynchronous Best Practices & Thread Pool Safety

```
┌─────────────────────────────────────────────────────────────────┐
│                 ASYNC / AWAIT SURVIVAL RULES                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Never Block Asynchronous Code (Anti-Pattern)                 │
│    ✗ `task.Result` / `task.Wait()` ──> Causes Thread Pool       │
│      Starvation and deadlocks under production load.            │
│    ✓ Always use `await task;` throughout the call stack.        │
│                                                                 │
│ 2. Pervasive CancellationToken Propagation                      │
│    Pass `CancellationToken` from ASP.NET Core endpoints down to │
│    MediatR handlers, EF Core `SaveChangesAsync`, and HTTP calls.│
│                                                                 │
│ 3. ValueTask for High-Frequency Hot Paths                       │
│    Use `ValueTask<T>` when results are frequently completed     │
│    synchronously (e.g., in-memory cache hits) to avoid GC allocs│
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. CQRS Pattern & Pipeline Behaviors with MediatR

```
Incoming Command ──> [Logging Behavior] ──> [Validation Behavior] ──> [Handler] ──> Db Mutation
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

## 3. Automated Testing Suite: xUnit & Testcontainers

Integration tests should run against real disposable PostgreSQL/SQL Server instances using **Testcontainers**:

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
            .WithWebHostBuilder(builder => { /* Configure Testcontainer ConnectionString */ });
        using var client = factory.CreateClient();

        var payload = new { JobPostingId = Guid.NewGuid(), CoverLetter = "Experienced C# .NET developer applying for internship." };

        // Act
        var response = await client.PostAsJsonAsync("/api/v1/applications", payload);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}
```

---

## 4. Architecture Tests with NetArchTest

Ensure architectural boundaries are never violated by developers or AI agents:

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

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: C# .NET Enterprise Architecture & Code Review</div>

```markdown
# TASK: Conduct C# .NET 8/9 Enterprise Code Review & CQRS Test Suite
You are a Staff .NET Architect and QA Automation Engineer.

## Input .NET Solution / Code:
[PASTE C# HANDLERS, ENDPOINTS, OR ARCHITECTURE CODE]

## Instructions:
1. Audit for Thread Pool hazards: Verify zero usage of `.Result` or `.Wait()`, and ensure `CancellationToken` is propagated.
2. Verify Clean Architecture boundaries: Domain must not depend on EF Core or ASP.NET.
3. Verify MediatR CQRS commands/queries are encapsulated with FluentValidation behaviors.
4. Generate comprehensive unit tests (xUnit + FluentAssertions + NSubstitute) and Testcontainers integration tests.
5. Provide a prioritized table of **P0 Threading/Security Blockers**, **P1 Architecture Warnings**, and **P2 Suggestions**.
```
</div>

---

## 6. Review Checklist

- [ ] Is asynchronous code 100% non-blocking (zero `.Result`, `.Wait()`)?
- [ ] Is `CancellationToken` accepted and passed to every database and network call?
- [ ] Are cross-cutting validation rules executed automatically in a MediatR Pipeline Behavior?
- [ ] Are integration tests validated against real databases using Testcontainers?
- [ ] Are architectural boundaries enforced via automated NetArchTest rules?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>T规范, Stephen Cleary (2020). <em>Concurrency in C# Cookbook (2nd Edition)</em>. O'Reilly Media.</li>
    <li>Bogard, Jimmy — <em>CQRS with MediatR & Vertical Slice Architecture</em>.</li>
  </ul>
</div>
