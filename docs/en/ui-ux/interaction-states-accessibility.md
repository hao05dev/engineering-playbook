# Interaction States & Web Accessibility (WCAG 2.2 AA)

Robust user interfaces must be resilient to slow networks, missing data, user errors, and assistive technology requirements. Designing for the "happy path" alone leads to fragile software.

---

## 1. The 4 Essential UI Component States

Every interactive view and asynchronous component must explicitly define four core states:

```
┌─────────────────────────────────────────────────────────────────┐
│                     THE 4 ESSENTIAL UI STATES                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. Loading State                                                │
│    - Skeleton / Shimmer loaders preserving layout geometry.     │
│    - Disabled action triggers with inline spinners.             │
│    - Prevents Layout Shift (CLS) during data fetching.          │
│                                                                 │
│ 2. Empty State                                                  │
│    - Friendly visual illustration & clear explanatory copy.     │
│    - Direct Call-to-Action (e.g., "Create Your First Post").    │
│    - Contextual onboarding guidance instead of a blank table.   │
│                                                                 │
│ 3. Error State                                                  │
│    - Inline field errors tied via `aria-describedby`.           │
│    - Global network banner with explicit Retry action.          │
│    - Preserves user input; never wipes form fields on failure.  │
│                                                                 │
│ 4. Success State                                                │
│    - Clear confirmation message or subtle toast notification.   │
│    - Obvious next step (e.g., "View Application Status").       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Form UX Best Practices

```
┌─────────────────────────────────────────────────────────────┐
│                    FORM DESIGN PRINCIPLES                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Persistent Labels: Never replace `<label>` with          │
│    placeholder text (disappears on typing, breaks a11y).    │
│                                                             │
│ 2. Inline Real-Time Validation: Validate on blur/change     │
│    after first submit, not aggressively on initial focus.   │
│                                                             │
│ 3. Single Column Flow: Reduces cognitive load and eye-track │
│    jumping compared to complex multi-column layouts.        │
│                                                             │
│ 4. Action Hierarchy: One prominent primary button; cancel   │
│    or secondary actions styled with lower visual weight.    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Web Accessibility Standards (WCAG 2.2 Level AA)

Assistive technologies (screen readers, keyboard navigators, screen magnifiers) rely on semantic structure:

### A. Semantic HTML & Keyboard Navigation
- Use `<button>` for actions and `<a>` with valid `href` for navigation.
- Ensure all interactive elements are focusable and possess a visible `:focus-visible` ring with at least 3:1 contrast against the background.
- Support standard keyboard shortcuts: `Tab` / `Shift+Tab` to traverse, `Enter` / `Space` to activate, and `Escape` to dismiss open modals or drawers.

### B. ARIA Roles & Live Regions
- Link error messages to inputs using `aria-invalid="true"` and `aria-describedby="field-error-id"`.
- Use `aria-live="polite"` for asynchronous notifications or toasts so screen readers announce dynamic updates without interrupting current tasks.
- For dialog modals, trap keyboard focus within the modal container using `aria-modal="true"` and `role="dialog"`.

### C. Color Contrast & Visual Indicators
- Maintain minimum contrast ratio of **4.5:1** for normal text (under 18pt / 24px) and **3:1** for large text, icons, and UI boundaries.
- **Never rely on color alone** to convey meaning (e.g., accompany red error outlines with an error icon and descriptive text).

---

## 4. Practical Implementation Example: Accessible Form Input (Vue 3)

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

## 5. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: UI State & Accessibility (a11y) Audit</div>

```markdown
# TASK: UI States & WCAG 2.2 AA Accessibility Specification
You are a Principal UI/UX Engineer and Web Accessibility Specialist.

## Component / Feature Context:
[PASTE COMPONENT CODE, WIREFRAME, OR SPECIFICATION]

## Instructions:
1. Specify explicit behavior for all 4 UI States:
   - Loading (skeleton layout, aria-busy)
   - Empty (helpful onboarding message, CTA)
   - Error (retry mechanism, form input preservation, error message positioning)
   - Success (confirmation feedback, next action)
2. Verify WCAG 2.2 AA compliance:
   - Semantic HTML elements (`<button>`, `<dialog>`, `<nav>`, `<main>`)
   - ARIA linkages (`aria-invalid`, `aria-describedby`, `aria-live`, `aria-expanded`)
   - Keyboard interaction rules (Tab order, Focus trapping, Escape handling)
   - Color contrast checks (minimum 4.5:1 text, 3:1 UI borders)
3. Generate production-ready frontend template code implementing these states.
```
</div>

---

## 6. Review Checklist

- [ ] Does the UI handle Loading, Empty, Error, and Success states gracefully?
- [ ] Are form labels explicitly tied to inputs using `for` and `id`?
- [ ] Are error messages announced by screen readers via `aria-describedby` or `role="alert"`?
- [ ] Is keyboard focus visible and trapped within active modals?
- [ ] Does all text meet the 4.5:1 contrast requirement?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>W3C (2023). <em>Web Content Accessibility Guidelines (WCAG) 2.2</em>. W3C Recommendation.</li>
    <li>Nielsen Norman Group — Four States of UI Design & Form Usability.</li>
  </ul>
</div>
