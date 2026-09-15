# Trạng thái Tương tác & Khả năng Tiếp cận Web (WCAG 2.2 AA)

Giao diện người dùng (UI) mạnh mẽ phải có khả năng chống chịu trước mạng chậm, thiếu dữ liệu, lỗi thao tác của người dùng và đáp ứng tốt các công nghệ hỗ trợ (assistive technologies). Việc chỉ thiết kế cho luồng lý tưởng ("happy path") sẽ dẫn đến phần mềm mong manh và dễ gãy vỡ.

---

## 1. 4 Trạng thái UI Cốt lõi (The 4 Essential UI States)

Mọi màn hình tương tác và component bất đồng bộ (asynchronous) đều phải định nghĩa rõ ràng 4 trạng thái:

```
┌─────────────────────────────────────────────────────────────────┐
│                     THE 4 ESSENTIAL UI STATES                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. Trạng thái Đang tải (Loading State)                          │
│    - Skeleton / Shimmer loaders giữ nguyên khung hình bố cục.   │
│    - Vô hiệu hóa nút bấm và kèm spinner xoay nội dòng.          │
│    - Ngăn ngừa hiện tượng giật cục bố cục (Layout Shift - CLS). │
│                                                                 │
│ 2. Trạng thái Trống (Empty State)                               │
│    - Minh họa trực quan thân thiện & lời giải thích rõ ràng.    │
│    - Lời kêu gọi hành động trực tiếp (VD: "Tạo bài viết đầu").  │
│    - Hướng dẫn onboarding theo ngữ cảnh thay vì bảng trống trơn.│
│                                                                 │
│ 3. Trạng thái Lỗi (Error State)                                 │
│    - Lỗi tại từng ô nhập liệu liên kết qua `aria-describedby`.  │
│    - Banner lỗi toàn cục kèm nút Thử lại (Retry) rõ ràng.       │
│    - Giữ nguyên dữ liệu người dùng nhập; không bao giờ xóa form.│
│                                                                 │
│ 4. Trạng thái Thành công (Success State)                        │
│    - Thông báo xác nhận rõ ràng hoặc toast thông báo tinh tế.   │
│    - Hành động tiếp theo mạch lạc (VD: "Xem tiến độ hồ sơ").    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Nguyên tắc UX Form nhập liệu (Form UX Best Practices)

```
┌─────────────────────────────────────────────────────────────┐
│                    FORM DESIGN PRINCIPLES                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Nhãn cố định (Persistent Labels): Không bao giờ thay thế │
│    `<label>` bằng placeholder (biến mất khi gõ, mất a11y).  │
│                                                             │
│ 2. Xác thực nội dòng theo thời gian thực (Inline Validation)│
│    Xác thực khi blur/change sau lần submit đầu tiên.        │
│                                                             │
│ 3. Bố cục cột đơn (Single Column): Giảm tải nhận thức và    │
│    chuyển động mắt so với form chia nhiều cột phức tạp.     │
│                                                             │
│ 4. Phân cấp nút bấm (Action Hierarchy): Nút chính nổi bật; │
│    nút hủy hoặc hành động phụ có trọng lượng thị giác nhẹ.  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Chuẩn Khả năng Tiếp cận Web (WCAG 2.2 Level AA)

Các công nghệ trợ năng (screen reader, điều hướng bàn phím, phóng to màn hình) dựa vào cấu trúc ngữ nghĩa chuẩn:

### A. Semantic HTML & Điều hướng Bàn phím (Keyboard Navigation)
- Dùng `<button>` cho hành động và `<a>` có `href` hợp lệ cho điều hướng liên kết.
- Đảm bảo mọi phần tử tương tác đều focus được và có vòng viền `:focus-visible` rõ ràng với tỷ lệ tương phản tối thiểu 3:1 so với nền.
- Hỗ trợ phím tắt tiêu chuẩn: `Tab` / `Shift+Tab` để di chuyển, `Enter` / `Space` để kích hoạt, và `Escape` để đóng modal/drawer đang mở.

### B. ARIA Roles & Live Regions
- Liên kết thông báo lỗi với input bằng thuộc tính `aria-invalid="true"` và `aria-describedby="field-error-id"`.
- Dùng `aria-live="polite"` cho thông báo bất đồng bộ hoặc toast để screen reader đọc cập nhật mà không cắt ngang tác vụ hiện tại.
- Đối với hộp thoại modal, giữ tiêu điểm bàn phím (focus trap) bên trong modal với `aria-modal="true"` và `role="dialog"`.

### C. Độ tương phản Màu sắc & Chỉ báo Thị giác
- Duy trì tỷ lệ tương phản tối thiểu **4.5:1** cho văn bản thông thường (dưới 18pt / 24px) và **3:1** cho chữ lớn, biểu tượng và viền UI.
- **Không bao giờ dùng màu sắc đơn thuần** để truyền tải thông điệp (luôn kết hợp màu đỏ báo lỗi với icon cảnh báo và văn bản mô tả cụ thể).

---

## 4. Ví dụ Triển khai Thực tế: Accessible Form Input (Vue 3)

```vue
<template>
  <div class="form-group" :class="{ 'has-error': hasError }">
    <label :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="required-indicator" aria-hidden="true">*</span>
    </label>
    
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :required="required"
      :aria-invalid="hasError"
      :aria-describedby="hasError ? errorId : helpId"
      class="form-input"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />

    <p v-if="helpText && !hasError" :id="helpId" class="help-text">
      {{ helpText }}
    </p>

    <p v-if="hasError" :id="errorId" class="error-message" role="alert">
      <svg class="error-icon" aria-hidden="true"><!-- Icon --></svg>
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: string
  type?: string
  required?: boolean
  helpText?: string
  errorMessage?: string
}>()

defineEmits(['update:modelValue', 'blur'])

const inputId = computed(() => `input-${props.id}`)
const helpId = computed(() => `help-${props.id}`)
const errorId = computed(() => `error-${props.id}`)
const hasError = computed(() => Boolean(props.errorMessage))
</script>
```

---

## 5. Mẫu Prompt AI có thể sao chép (AI Prompt Template)

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Kiểm thử UI State & Khả năng Tiếp cận (a11y)</div>

```markdown
# TASK: Đặc tả Trạng thái UI & Chuẩn Tiếp cận WCAG 2.2 AA
Bạn là một Principal UI/UX Engineer và Chuyên gia Khả năng Tiếp cận Web (a11y).

## Component / Feature Context:
[DÁN CODE COMPONENT, WIREFRAME HOẶC BẢN ĐẶC TẢ TẠI ĐÂY]

## Instructions:
1. Đặc tả hành vi chi tiết cho toàn bộ 4 Trạng thái UI:
   - Loading (khung skeleton, aria-busy)
   - Empty (thông điệp hướng dẫn, nút kêu gọi hành động CTA)
   - Error (cơ chế retry, giữ nguyên input người dùng nhập, vị trí hiển thị lỗi)
   - Success (phản hồi xác nhận, định hướng bước tiếp theo)
2. Kiểm tra tính tuân thủ WCAG 2.2 AA:
   - Thẻ ngữ nghĩa HTML (`<button>`, `<dialog>`, `<nav>`, `<main>`)
   - Liên kết ARIA (`aria-invalid`, `aria-describedby`, `aria-live`, `aria-expanded`)
   - Tương tác bàn phím (Thứ tự Tab, Bẫy focus trong modal, Phím Escape)
   - Kiểm tra tương phản màu (tối thiểu 4.5:1 cho text, 3:1 cho viền UI)
3. Sinh code template frontend sẵn sàng cho production áp dụng chuẩn này.
```
</div>

---

## 6. Danh mục kiểm tra đánh giá (Review Checklist)

- [ ] Giao diện có xử lý trơn tru cả 4 trạng thái: Loading, Empty, Error, Success không?
- [ ] Nhãn form `<label>` có được gắn kết chặt chẽ với input qua `for` và `id` không?
- [ ] Thông báo lỗi có được screen reader đọc thông qua `aria-describedby` hoặc `role="alert"` không?
- [ ] Tiêu điểm bàn phím (focus) có hiển thị rõ ràng và bị khóa bên trong modal khi mở không?
- [ ] Mọi văn bản có đạt độ tương phản màu tối thiểu 4.5:1 không?

<div class="ref-box">
  <strong>Tài liệu tham khảo:</strong>
  <ul>
    <li>W3C (2023). <em>Web Content Accessibility Guidelines (WCAG) 2.2</em>. W3C Recommendation.</li>
    <li>Nielsen Norman Group — Four States of UI Design & Form Usability.</li>
  </ul>
</div>
