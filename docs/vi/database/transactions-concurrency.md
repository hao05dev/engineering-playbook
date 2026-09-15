# Giao dịch, Đồng thời & Khóa Dữ liệu (Transactions & Concurrency)

Trong các hệ thống phần mềm có nhiều người dùng đồng thời, các thao tác cơ sở dữ liệu rất dễ va chạm lẫn nhau. **Giao dịch (Transactions), Kiểm soát Đồng thời và Chiến lược Khóa (Locking)** đảm bảo tính toàn vẹn dữ liệu khi nhiều người cùng lúc trừ tiền tài khoản, đặt giữ chỉ tiêu thực tập hay mua hàng tồn kho.

---

## 1. 4 Thuộc tính Bất biến ACID

```
┌─────────────────────────────────────────────────────────────┐
│                       THUỘC TÍNH ACID                       │
├─────────────────────────────────────────────────────────────┤
│ • Nguyên tử (Atomicity): Toàn bộ thành công hoặc Rollback(0/1)│
│ • Nhất quán (Consistency): Dữ liệu chuyển giữa các trạng thái│
│ • Cô lập (Isolation): Các giao dịch không xâm phạm lẫn nhau  │
│ • Bền vững (Durability): Dữ liệu đã commit không bị mất khi sập│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Các Cấp độ Cô lập (Isolation Levels) & Hiện tượng Bất thường

| Cấp độ Cô lập | Đọc rác (Dirty Read) | Đọc không lặp lại | Đọc bóng ma (Phantom) | Bất thường tuần tự |
| :--- | :--- | :--- | :--- | :--- |
| **Read Uncommitted** | ⚠️ Bị dính | ⚠️ Bị dính | ⚠️ Bị dính | ⚠️ Bị dính |
| **Read Committed** (Mặc định) | 🛡️ Chặn được | ⚠️ Bị dính | ⚠️ Bị dính | ⚠️ Bị dính |
| **Repeatable Read** | 🛡️ Chặn được | 🛡️ Chặn được | 🛡️ Chặn được (PG)| ⚠️ Bị dính |
| **Serializable** | 🛡️ Chặn được | 🛡️ Chặn được | 🛡️ Chặn được | 🛡️ Chặn được |

---

## 3. Chiến lược Khóa: Khóa Bi quan vs. Khóa Lạc quan

```
┌─────────────────────────────────────────────────────────────┐
│                 SO SÁNH CHIẾN LƯỢC KHÓA DỮ LIỆU             │
├─────────────────────────────────────────────────────────────┤
│ 1. Khóa Bi quan (Pessimistic: SELECT FOR UPDATE)            │
│    - Khóa chặt dòng dữ liệu ngay từ khi SELECT.             │
│    - Các transaction khác bắt buộc phải xếp hàng chờ.       │
│    - Tốt nhất cho: Tranh chấp cao, tài nguyên hữu hạn (tiền)│
│                                                             │
│ 2. Khóa Lạc quan (Optimistic: Cột Version)                  │
│    - Không khóa dòng khi đọc.                               │
│    - Kiểm tra số version khi UPDATE: WHERE version = :ver   │
│    - Ném OptimisticLockException nếu bị ghi đè.             │
│    - Tốt nhất cho: Đọc nhiều, ít tranh chấp ghi đồng thời.  │
└─────────────────────────────────────────────────────────────┘
```

### Triển khai Khóa Bi quan Chuẩn (PostgreSQL & Spring Data):

```java
public interface InternshipPostingRepository extends JpaRepository<InternshipPosting, UUID> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM InternshipPosting p WHERE p.id = :id")
    Optional<InternshipPosting> findByIdForUpdate(@Param("id") UUID id);
}

@Service
public class QuotaReservationService {
    
    @Transactional
    public void reservePlacementQuota(UUID postingId) {
        InternshipPosting posting = postingRepository.findByIdForUpdate(postingId)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tin tuyển dụng"));

        if (posting.getRemainingQuota() <= 0) {
            throw new QuotaExhaustedException("Đã hết chỉ tiêu cho vị trí: " + postingId);
        }

        posting.setRemainingQuota(posting.getRemainingQuota() - 1);
        postingRepository.save(posting);
    }
}
```

---

## 4. Mẫu Prompt AI Chuẩn hóa

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kiểm toán Xử lý Đồng thời & Khóa Dữ liệu</div>

```markdown
# TASK: Kiểm toán Xử lý Đồng thời & Thiết lập Khóa Giao dịch
Bạn là Kiến trúc sư Cơ sở Dữ liệu Phân tán (Distributed Database Architect).

## Thao tác Nhạy cảm Đầu vào:
[MÔ TẢ THAO TÁC CÓ NGUY CƠ TRANH CHẤP ĐỒNG THỜI, VÍ DỤ: TRỪ TIỀN, ĐẶT CHỈ TIÊU, MUA HÀNG]

## Yêu cầu Thực hiện:
1. Chỉ ra toàn bộ các nguy cơ Race Condition (Lost Update, Overbooking, Phantom Read).
2. Đề xuất Cấp độ Cô lập Transaction và Chiến lược Khóa phù hợp (Bi quan vs Lạc quan).
3. Viết mã nguồn Java/Spring Boot hoặc SQL hoàn chỉnh với ranh giới Transaction chặt chẽ.
4. Đưa ra hướng dẫn chống Bế tắc (Deadlock Prevention) qua thứ tự khóa và cấu hình lock timeout.
```
</div>

---

## 5. Checklist Kiểm duyệt (Review Checklist)

- [ ] Toàn bộ các thao tác ghi dữ liệu nhạy cảm đều có ranh giới `@Transactional` không?
- [ ] Các tài nguyên hữu hạn dùng chung có được bảo vệ bằng `SELECT FOR UPDATE` hoặc `@Version` không?
- [ ] Tham số Lock Timeout có được cấu hình phòng thủ để chống deadlock không?

<div class="ref-box">
  <strong>Tài liệu Tham khảo:</strong>
  <ul>
    <li>Gray, Jim & Reuter, Andreas (1992). <em>Transaction Processing: Concepts and Techniques</em>. Morgan Kaufmann.</li>
    <li>Kleppmann, Martin (2017). <em>Designing Data-Intensive Applications: Chapter 7. Transactions</em>.</li>
  </ul>
</div>
