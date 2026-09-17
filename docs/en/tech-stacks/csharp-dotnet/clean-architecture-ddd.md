# Clean Architecture & Domain-Driven Design (DDD) in .NET

Clean Architecture and Domain-Driven Design (DDD) isolate business logic from database, UI, and third-party framework details, ensuring enterprise systems remain maintainable and easily testable.

---

## 1. Clean Architecture Layer Responsibilities

```
┌─────────────────────────────────────────────────────────────────┐
│                 CLEAN ARCHITECTURE RESPONSIBILITIES             │
├─────────────────────────────────────────────────────────────────┤
│ 1. Domain Layer (Core - Zero Dependencies)                      │
│    - Entities with encapsulated invariants & private setters.   │
│    - Value Objects (`record` types with structural equality).   │
│    - Domain Events (`IDomainEvent`) & Aggregate Roots.          │
│                                                                 │
│ 2. Application Layer (Orchestration)                            │
│    - CQRS Command & Query handlers (MediatR).                   │
│    - Business validation (FluentValidation).                    │
│    - Interfaces for repositories & external services.           │
│                                                                 │
│ 3. Infrastructure Layer (Implementation)                        │
│    - EF Core `DbContext`, Migrations & Dapper repositories.     │
│    - Cloud storage (AWS S3 / Azure Blob) & Email clients.       │
│                                                                 │
│ 4. Presentation Layer (Entry Point)                             │
│    - ASP.NET Core Minimal APIs / Controllers.                   │
│    - Middleware pipeline, Auth filters, `ProblemDetails`.       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Rich Domain Entity vs. Anemic Domain Model

Avoid anemic data bags with public getters and setters. Encapsulate business invariants directly inside Domain Entities:

```csharp
// Domain/Entities/InternshipApplication.cs
namespace Enterprise.Domain.Entities;

using Enterprise.Domain.Common;
using Enterprise.Domain.Events;
using Enterprise.Domain.ValueObjects;

public sealed class InternshipApplication : AggregateRoot<Guid>
{
    private InternshipApplication() { } // EF Core private parameterless constructor

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

## 3. Value Objects with C# Records

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

## 4. The Functional Result Pattern (`Result<T>`)

Instead of throwing expensive exceptions for expected domain rule violations, return typed `Result` objects:

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
            throw new InvalidOperationException("Invalid result state.");

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

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Clean Architecture & DDD Entity Refactoring in .NET</div>

```markdown
# TASK: Refactor .NET Domain Model using Clean Architecture & DDD
You are a Principal .NET Enterprise Architect.

## Input Code / Entity Draft:
[PASTE C# CLASS, DB SCHEMA, OR BUSINESS REQUIREMENTS]

## Instructions:
1. Refactor the entity into a Rich Domain Model with private setters and factory methods (`Create`).
2. Encapsulate validation into strongly typed Value Objects (`record`).
3. Replace exception throwing for business violations with the `Result<T>` pattern.
4. Raise Domain Events for state changes requiring asynchronous side-effects.
5. Guarantee the Domain project has ZERO NuGet package dependencies on EF Core, ASP.NET, or external libraries.
```
</div>

---

## 6. Review Checklist

- [ ] Does the Domain project contain zero dependencies on EF Core, ASP.NET, or external infrastructure?
- [ ] Are all entity properties equipped with private setters?
- [ ] Are business rule violations returned via `Result<T>` rather than throwing exceptions?
- [ ] Are value objects implemented using immutable C# `record` types?
- [ ] Are state transitions protected by domain invariants?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Evans, Eric (2003). <em>Domain-Driven Design: Tackling Complexity in the Heart of Software</em>. Addison-Wesley.</li>
    <li>Martin, Robert C. (2017). <em>Clean Architecture: A Craftsman's Guide to Software Structure and Design</em>. Prentice Hall.</li>
  </ul>
</div>
