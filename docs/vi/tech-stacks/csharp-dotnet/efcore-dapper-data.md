# Truy xuất Dữ liệu với EF Core & Dapper (Data Access)

Kiến trúc .NET doanh nghiệp gặt hái hiệu quả cao nhất khi áp dụng **Chiến lược Dữ liệu Lai (Hybrid Data Strategy)**: sử dụng **Entity Framework Core 8/9** cho các luồng nghiệp vụ ghi dữ liệu phức tạp và **Dapper Micro-ORM** cho các truy vấn đọc dữ liệu tốc độ cao.

---

## 1. So sánh EF Core vs. Dapper: Chiến lược Lai

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       HYBRID DATA ACCESS ARCHITECTURE                       │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Tiêu chí                       │ Entity Framework Core (Luồng Ghi)          │ Dapper Micro-ORM (Luồng Đọc)   │
├────────────────────────────────┼────────────────────────────────────────────┼─────────────────────────────────┤
│ Theo dõi Thay đổi (Tracking)   │ Tự động qua ChangeTracker                  │ Không có (Zero overhead bộ nhớ) │
│ Viết Truy vấn                  │ Biểu thức LINQ to SQL                      │ Viết câu lệnh SQL thuần         │
│ Ánh xạ Thực thể Domain         │ Hỗ trợ setter private & tính đóng gói      │ Ánh xạ nhanh vào DTO phẳng      │
│ Quản lý Schema Migration       │ Migration theo cơ chế Code-first           │ Viết script SQL thủ công/Flyway │
│ Ứng dụng Phù hợp               │ Giao dịch ACID & đột biến Aggregate        │ Báo cáo, dashboard, đọc dữ liệu│
└────────────────────────────────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. Cấu hình Fluent API trong EF Core

Tránh làm bẩn các thực thể Domain bằng Data Annotations. Hãy tách biệt cấu hình vào tầng Infrastructure:

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

        // Cấu hình Value Object dưới dạng Owned Entity
        builder.OwnsOne(a => a.CoverLetter, coverLetterBuilder =>
        {
            coverLetterBuilder.Property(c => c.Value)
                .HasColumnName("cover_letter")
                .HasMaxLength(2000)
                .IsRequired();
        });

        // Đánh B-Tree Indexes để tối ưu tốc độ truy vấn
        builder.HasIndex(a => new { a.StudentId, a.JobPostingId }).IsUnique();
        builder.HasIndex(a => a.Status);
    }
}
```

---

## 3. Tinh chỉnh Hiệu năng Truy vấn trong EF Core

```csharp
// 1. AsNoTracking: Bỏ qua ChangeTracker (nhanh hơn ~3 lần khi đọc)
// 2. Select projection: Chỉ lấy đúng các cột cần thiết (tránh SELECT *)
// 3. AsSplitQuery: Loại bỏ hiện tượng bùng nổ Cartesian khi join nhiều bảng
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

## 4. Truy vấn Đọc Dữ liệu Tốc độ Cao với Dapper

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

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Cấu hình Fluent API EF Core & Tối ưu Truy vấn Dapper</div>

```markdown
# TASK: Xây dựng Cấu hình EF Core 8/9 & Luồng Truy vấn Đọc Dapper
Bạn là một Principal Database & .NET ORM Performance Specialist.

## Entity & Query Requirements:
[DÁN MODEL DOMAIN HOẶC ĐẶC TẢ BẢNG CSDL TẠI ĐÂY]

## Instructions:
1. Viết cấu hình `IEntityTypeConfiguration<T>` bằng Fluent API EF Core với kiểu cột rõ ràng và index B-Tree.
2. Ánh xạ Value Objects qua `OwnsOne` hoặc Value Converters.
3. Viết phương thức truy vấn EF Core hiệu năng cao áp dụng `AsNoTracking()` và chiếu dữ liệu qua `.Select()`.
4. Viết Repository Đọc theo CQRS bằng Dapper với câu lệnh SQL tham số hóa an toàn và nhận `CancellationToken`.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Cấu hình EF Core có được tách riêng thành các class `IEntityTypeConfiguration<T>` không?
- [ ] Các truy vấn chỉ đọc có được gắn `.AsNoTracking()` và `.Select()` rõ ràng không?
- [ ] Truy vấn quan hệ 1-Nhiều có được chống tràn tích đề-các bằng `.AsSplitQuery()` không?
- [ ] Dapper có sử dụng câu lệnh SQL tham số hóa chống SQL Injection không?
- [ ] Mọi thao tác truy cập CSDL có nhận và truyền `CancellationToken` không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>Microsoft Learn — <em>Entity Framework Core Performance & Indexing Best Practices</em>.</li>
    <li>Dapper .NET Documentation — <em>High Performance Micro-ORM for ADO.NET</em>.</li>
  </ul>
</div>
