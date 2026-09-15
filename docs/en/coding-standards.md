# Coding Standards & Conventions

To ensure AI-generated code seamlessly integrates into your existing codebase, you must establish unambiguous coding standards. AI agents adhere closely to pattern examples; providing concrete code patterns yields significantly cleaner outputs.

---

## 1. Type Safety & Strict Typing

Never allow the AI to introduce loose types, `any`, or unvalidated casts.

### TypeScript / Frontend Rules:
- Enforce `strict: true` in `tsconfig.json`.
- Avoid `any` — use `unknown` with runtime type guards (e.g. Zod, Valibot) for external inputs.
- Prefer explicit interfaces and disciminated unions for complex state models.

```typescript
// ❌ BAD: Loose typing with any
export async function fetchUserProfile(userId: any): Promise<any> {
  const res = await api.get(`/users/${userId}`);
  return res.data;
}

// ✅ GOOD: Strict typed domain models & DTOs
export interface UserProfileDTO {
  id: string;
  email: string;
  role: 'ADMIN' | 'ENGINEER' | 'VIEWER';
  createdAt: string;
}

export async function fetchUserProfile(userId: string): Promise<UserProfileDTO> {
  const response = await api.get<UserProfileDTO>(`/users/${encodeURIComponent(userId)}`);
  return response.data;
}
```

---

## 2. Robust Error Handling & Logging

AI often defaults to silencing exceptions or logging generic strings. Mandate structured exception handling.

### Backend Rules (Java / Spring Boot Example):
- Never use empty `catch` blocks or `e.printStackTrace()`.
- Use domain-specific custom exceptions with clear HTTP status mappings.
- Use structured logging with contextual metadata (trace IDs, user IDs).

```java
// ❌ BAD: Silent failure & swallowed exception
try {
    paymentGateway.charge(order);
} catch (Exception e) {
    System.out.println("Charge failed");
}

// ✅ GOOD: Explicit domain exception with structured logging
@Service
public class PaymentProcessingService {
    private static final Logger log = LoggerFactory.getLogger(PaymentProcessingService.class);

    @Transactional
    public PaymentResult processOrderPayment(Order order, PaymentDetails details) {
        try {
            return paymentGateway.charge(order.getId(), details.getAmount());
        } catch (GatewayTimeoutException ex) {
            log.error("Payment gateway timed out for orderId={}", order.getId(), ex);
            throw new PaymentProcessingException(ErrorCode.PAYMENT_TIMEOUT, "Gateway unresponsive", ex);
        } catch (InsufficientFundsException ex) {
            log.warn("Insufficient funds for orderId={}, customerId={}", order.getId(), order.getCustomerId());
            throw new DomainValidationException(ErrorCode.INSUFFICIENT_FUNDS, "Payment declined");
        }
    }
}
```

---

## 3. Immutability & Pure Functions

- Default to `const` in JavaScript/TypeScript and `final` / `record` in Java.
- Keep business calculations inside pure, side-effect-free helper functions.
- Pure functions are trivial to unit test and verify.

```typescript
// ✅ Pure calculation function: 100% testable
export function calculateTierDiscount(
  orderSubtotal: number,
  tier: 'SILVER' | 'GOLD' | 'PLATINUM'
): number {
  if (orderSubtotal <= 0) return 0;
  
  const discountRateMap: Record<'SILVER' | 'GOLD' | 'PLATINUM', number> = {
    SILVER: 0.05,
    GOLD: 0.10,
    PLATINUM: 0.15,
  };

  return Math.round(orderSubtotal * (discountRateMap[tier] ?? 0) * 100) / 100;
}
```

---

## 4. Layer Boundary Hygiene

Enforce separation of concerns:
1. **Controllers / API Handlers**: Validate HTTP inputs, authenticate session, delegate to Service, format HTTP response.
2. **Services / Use Cases**: Business logic, transactional boundaries, domain entity manipulation.
3. **Repositories / Data Access**: Query generation, entity mapping, persistence mechanics.

> [!IMPORTANT]
> **No Business Logic in Controllers**
> Instruct AI agents to never perform database queries or raw business calculations inside HTTP Controller classes.
