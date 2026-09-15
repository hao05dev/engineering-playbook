---
layout: home

hero:
  name: "AI-SDLC Engineering Playbook"
  text: "Quy trình Kỹ thuật Phần mềm Chuẩn mực cùng AI"
  tagline: "Quy trình kỹ thuật thực chiến để xây dựng phần mềm với AI — từ yêu cầu sản phẩm, thiết kế kỹ thuật đến triển khai mã nguồn, kiểm thử, review và bàn giao."
  image:
    src: /logo.svg
    alt: AI-SDLC Engineering Playbook
  actions:
    - theme: brand
      text: Bắt đầu (Giới thiệu)
      link: /vi/introduction
    - theme: alt
      text: Quy trình 11 bước
      link: /vi/domain-exploration
    - theme: alt
      text: Read in English
      link: /en/

features:
  - icon: 📐
    title: 1. Giai đoạn Thiết kế (Design Phase)
    details: Khám phá domain & ý tưởng, đặc tả yêu cầu sản phẩm (PRD), thiết kế kiến trúc kỹ thuật và phân rã task chi tiết.
  - icon: ⚡
    title: 2. Giai đoạn Thực thi (Execution Phase)
    details: Lập kế hoạch triển khai, kỹ thuật prompt S.C.O.P.E, sinh code có kiểm soát, chạy test tự động và chẩn đoán bug.
  - icon: 🔒
    title: 3. Chất lượng & Quản trị (Governance)
    details: Quy tắc Zero-trust review, cổng kiểm soát chất lượng (Quality Gates), chuẩn mực lập trình và ràng buộc agent.
---

## Tổng quan Quy trình 11 bước AI-SDLC

Phương pháp luận AI-SDLC chia quy trình phát triển phần mềm thành hai giai đoạn cốt lõi: **Thiết kế (Design)** và **Thực thi (Execution)**.

```
  [01 Khám phá Domain & Ý tưởng]
               │
               ▼
  [02 Định nghĩa Yêu cầu Sản phẩm]
               │
               ▼
  [03 Thiết kế Kỹ thuật (Technical Design)]
               │
               ▼
  [04 Phân kỳ & Phân rã Task]
               │
               ▼
  [05 Kế hoạch Thực thi (Planning)]
               │
               ▼
  [06 Prompt & AI Thực thi] ──► [07 Sinh Mã nguồn (AI Code Gen)]
                                            │
                                            ▼
                                   [08 Tự động Chạy Tests]
                                            │
                                            ▼
  [11 Commit & Push] ◄── [10 Sửa Bug] ◄── [09 Review & Phê duyệt]
```

### Nguyên tắc Cốt lõi

> **"AI là trợ lý phát triển phần mềm, không phải là chủ sở hữu mã nguồn."**
> 
> Kỹ sư phần mềm chịu trách nhiệm hoàn toàn về kiến trúc hệ thống, tính đúng đắn của nghiệp vụ, bảo mật và khả năng bảo trì. AI đóng vai trò là động cơ tăng tốc nghiên cứu, phác thảo và sinh code theo chỉ dẫn.

<div class="workflow-stepper">
  <div class="workflow-card">
    <div class="step-heading"><span class="badge-step">Giai đoạn 1</span> Giai đoạn Thiết kế (Bước 01 - 04)</div>
    <p class="step-desc">Xác lập bối cảnh nghiệp vụ, viết đặc tả yêu cầu rõ ràng, xây dựng mô hình dữ liệu/kiến trúc và chia nhỏ phạm vi thành các task có thể kiểm chứng độc lập.</p>
  </div>
  <div class="workflow-card">
    <div class="step-heading"><span class="badge-step">Giai đoạn 2</span> Giai đoạn Thực thi (Bước 05 - 11)</div>
    <p class="step-desc">Lập implementation plan, viết prompt cấu trúc, sinh code theo ngữ cảnh hẹp, chạy automated test suite, review nghiêm ngặt bởi con người, xử lý bug và commit thay đổi sạch sẽ.</p>
  </div>
</div>
