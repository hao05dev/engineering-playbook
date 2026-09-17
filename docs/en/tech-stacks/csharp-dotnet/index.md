# C# .NET Enterprise Engineering Overview

.NET 8 and .NET 9 LTS represent Microsoft's unified, cloud-native, and high-performance development platform. Combined with modern C# language features, **Clean Architecture**, and **Domain-Driven Design (DDD)**, .NET is the gold standard for enterprise backends and mission-critical microservices.

---

## 1. Enterprise Architecture & Clean Onion Model

```
┌─────────────────────────────────────────────────────────────────┐
│               .NET CLEAN ARCHITECTURE ONION MODEL               │
├─────────────────────────────────────────────────────────────────┤
│ [Presentation Layer] (ASP.NET Core Web API / Minimal APIs)      │
│       │                                                         │
│       ▼                                                         │
│ [Application Layer] (MediatR CQRS, FluentValidation, DTOs)      │
│       │                                                         │
│       ▼                                                         │
│ [Domain Layer] (Entities, Value Objects, Domain Events - Zero Dep)│
│       ▲                                                         │
│       │                                                         │
│ [Infrastructure Layer] (EF Core, Dapper, Redis, Message Broker) │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Architectural Tenets for .NET AI Coding Agents

1. **Strict Dependency Inversion**: The Domain layer has zero dependencies on external libraries, frameworks, or database packages.
2. **Result Pattern over Exceptions**: Use `Result<T>` or `OneOf` for predictable business failures (e.g., *NotFound*, *ValidationError*) instead of expensive `try/catch` exception control flows.
3. **Pervasive Cancellation Tokens**: Always propagate `CancellationToken` throughout the entire asynchronous call stack down to database drivers.
4. **Read/Write Query Segregation**: Use Entity Framework Core for rich domain mutations and lightweight Dapper queries for read-heavy DTO projections.

---

## 3. Technology Stack Breakdown

- **Platform**: .NET 8 / .NET 9 (LTS)
- **Language**: C# 12 / 13 (Nullable Reference Types, Records, Pattern Matching)
- **API Framework**: ASP.NET Core (Minimal APIs & Controller endpoints)
- **Data Persistence**: Entity Framework Core 8/9, Dapper Micro-ORM, PostgreSQL / SQL Server
- **Messaging & CQRS**: MediatR / Wolverine, MassTransit
- **Testing**: xUnit, FluentAssertions, NSubstitute, Testcontainers

---

## 4. Chapter Roadmap

- [Clean Architecture & Domain-Driven Design](./clean-architecture-ddd.md) — 4-layer structure, Rich Domain Entities, Value Objects, and the Result Pattern.
- [ASP.NET Core Web API & Middleware](./aspnet-core-webapi.md) — Minimal APIs, Dependency Injection lifetimes, Global Exception Handling with `ProblemDetails`.
- [Entity Framework Core & Dapper Data Access](./efcore-dapper-data.md) — Fluent API configurations, `AsNoTracking`, Split Queries, and high-speed Dapper reads.
- [Async Best Practices, CQRS & Testing](./async-mediatr-testing.md) — `CancellationToken` rules, MediatR pipeline behaviors, xUnit & Testcontainers suite + AI Reviewer prompt.
