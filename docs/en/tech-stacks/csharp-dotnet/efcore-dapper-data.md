# Data Access with EF Core & Dapper

Enterprise .NET architectures benefit from a **Hybrid Data Strategy**: using **Entity Framework Core 8/9** for state-mutating domain workflows and **Dapper Micro-ORM** for high-throughput, raw SQL read queries.

---

## 1. EF Core vs. Dapper: The Hybrid Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       HYBRID DATA ACCESS ARCHITECTURE                       │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Concern                        │ Entity Framework Core (Write Path)         │ Dapper Micro-ORM (Read Path)   │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Change Tracking                │ Automatic via ChangeTracker                │ None (Zero overhead)            │
│ Query Formulation              │ LINQ to SQL Expressions                    │ Raw SQL queries with parameters │
│ Domain Entity Hydration        │ Supports private setters & encapsulation   │ Fast DTO object mapping         │
│ Migration Engine               │ Code-first migrations with schema drift    │ Manual SQL scripts or Flyway    │
│ Best For                       │ Complex Aggregate mutations & ACID writes  │ Read models, reports, dashboards│
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. EF Core Fluent API Entity Configuration

Avoid cluttering domain entities with data annotations. Keep configurations cleanly segregated inside Infrastructure:

```csharp
// Infrastructure/Configurations/InternshipApplicationConfiguration.cs
namespace Enterprise.Infrastructure.Configurations;

using Enterprise.Domain.Entities;
using Enterprise.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class InternshipApplicationConfiguration : IEntityTypeConfiguration<InternshipApplication>
{
    public void Configure(EntityTypeBuilder<InternshipApplication> builder)
    {
        builder.ToTable("internship_applications");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).ValueGeneratedNever();

        builder.Property(a => a.StudentId).IsRequired();
        builder.Property(a => a.JobPostingId).IsRequired();
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(a => a.SubmittedAtUtc).IsRequired();

        // Configure Value Object as Owned Entity or Value Converter
        builder.OwnsOne(a => a.CoverLetter, coverLetterBuilder =>
        {
            coverLetterBuilder.Property(c => c.Value)
                .HasColumnName("cover_letter")
                .HasMaxLength(2000)
                .IsRequired();
        });

        // B-Tree Indexes for fast query lookup
        builder.HasIndex(a => new { a.StudentId, a.JobPostingId }).IsUnique();
        builder.HasIndex(a => a.Status);
    }
}
```

---

## 3. High-Performance EF Core Query Tuning

```csharp
// 1. AsNoTracking: Skips ChangeTracker allocation (~3x faster read)
// 2. Select projection: Fetches only required columns (no SELECT *)
// 3. AsSplitQuery: Eliminates Cartesian Explosion on multiple joins
public async Task<List<PostingDto>> GetActivePostingsAsync(CancellationToken ct)
{
    return await dbContext.JobPostings
        .AsNoTracking()
        .AsSplitQuery()
        .Where(p => p.IsActive)
        .Select(p => new PostingDto(p.Id, p.Title, p.Company.Name, p.AvailableSlots))
        .ToListAsync(ct);
}
```

---

## 4. High-Throughput Reads with Dapper

```csharp
// Infrastructure/Repositories/DapperApplicationQueryRepository.cs
namespace Enterprise.Infrastructure.Repositories;

using Dapper;
using Enterprise.Application.Applications.Queries;
using Npgsql;

public sealed class DapperApplicationQueryRepository(string connectionString) : IApplicationQueryRepository
{
    public async Task<IReadOnlyList<ApplicationSummaryDto>> GetApplicationsByStudentAsync(
        Guid studentId, 
        CancellationToken ct)
    {
        const string sql = """
            SELECT 
                a.id AS Id,
                a.status AS Status,
                a.submitted_at_utc AS SubmittedAtUtc,
                jp.title AS JobTitle,
                c.name AS CompanyName
            FROM internship_applications a
            INNER JOIN job_postings jp ON a.job_posting_id = jp.id
            INNER JOIN companies c ON jp.company_id = c.id
            WHERE a.student_id = @StudentId
            ORDER BY a.submitted_at_utc DESC;
            """;

        await using var connection = new NpgsqlConnection(connectionString);
        var command = new CommandDefinition(sql, new { StudentId = studentId }, cancellationToken: ct);

        IEnumerable<ApplicationSummaryDto> results = await connection.QueryAsync<ApplicationSummaryDto>(command);
        return results.ToList();
    }
}
```

---

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: EF Core Fluent Configuration & Dapper Query Optimization</div>

```markdown
# TASK: Implement EF Core 8/9 Configuration & Dapper CQRS Query Path
You are a Principal Database & .NET ORM Performance Specialist.

## Entity & Query Requirements:
[PASTE DOMAIN MODEL OR DATABASE TABLE SPECIFICATION]

## Instructions:
1. Write a clean `IEntityTypeConfiguration<T>` using EF Core Fluent API with explicit column types, constraints, and composite B-Tree indexes.
2. Ensure Value Objects are mapped via `OwnsOne` or Value Converters.
3. Write high-performance EF Core query methods applying `AsNoTracking()` and explicit projection.
4. Implement the CQRS Read Model using Dapper with parameterized raw SQL and `CommandDefinition` carrying `CancellationToken`.
```
</div>

---

## 6. Review Checklist

- [ ] Are EF Core configurations organized in separate `IEntityTypeConfiguration<T>` classes?
- [ ] Are read-only queries configured with `.AsNoTracking()` and explicit `.Select()` projections?
- [ ] Are one-to-many relationship queries protected from Cartesian explosion using `.AsSplitQuery()`?
- [ ] Does Dapper use parameterized SQL queries preventing SQL Injection?
- [ ] Does every database operation accept and forward `CancellationToken`?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>Microsoft Learn — <em>Entity Framework Core Performance & Indexing Best Practices</em>.</li>
    <li>Dapper .NET Documentation — <em>High Performance Micro-ORM for ADO.NET</em>.</li>
  </ul>
</div>
