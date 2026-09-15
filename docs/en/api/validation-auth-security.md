# Validation, Authentication & Security

APIs are the public frontier of your system. **Validation, Authentication, Authorization, and Rate Limiting** form the multi-layered defense shield protecting backend services from unauthorized access, injection attacks, and resource exhaustion.

---

## 1. Input Validation Architecture

Never trust client payloads. Validate types, formats, ranges, and invariants before data touches business services:

```java
// Java / Jakarta Bean Validation Example
public record SubmitApplicationRequest(
    @NotNull(message = "Student ID is required")
    UUID studentId,

    @NotBlank(message = "Resume URL is required")
    @Pattern(regexp = "^https://.*\\.pdf$", message = "Must be a valid HTTPS PDF URL")
    String resumeUrl,

    @Size(max = 2000, message = "Cover letter must not exceed 2000 characters")
    String coverLetter
) {}
```

---

## 2. Authentication & Authorization (JWT / RBAC)

```
┌─────────────────────────────────────────────────────────────┐
│                 AUTH & PERMISSION PIPELINE                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Client sends: Authorization: Bearer <JWT_TOKEN>          │
│ 2. API Gateway / Filter validates signature & expiration    │
│ 3. Security context extracts: { sub, role: "ADVISOR", dept }│
│ 4. Method interceptor checks: @PreAuthorize("hasRole('...')")│
└─────────────────────────────────────────────────────────────┘
```

- **Authentication (Who are you?)**: Verified via cryptographic signature on the JWT token.
- **Authorization (What can you do?)**: Evaluated via Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC).

---

## 3. Rate Limiting & DoS Protection

Protect endpoints from abuse using the **Token Bucket Algorithm**:

```
Client ──► [ Rate Limiter (e.g. Redis) ] ──► [ Backend API ]
```

### Standard Rate Limit Response Headers:
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1773700000
Retry-After: 45
Content-Type: application/problem+json
```

---

## 4. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: API Security, Auth & Validation Hardening</div>

```markdown
# TASK: API Security Hardening (JWT, RBAC, Validation & Rate Limiting)
You are an expert Application Security Engineer & DevSecOps Specialist.

## Input API Endpoints:
[PASTE TARGET CONTROLLER OR OPENAPI ENDPOINT DEFINITIONS]

## Instructions:
1. Define strict DTO validation rules with localized error messages.
2. Implement Role-Based Access Control (RBAC) annotations on all protected routes.
3. Configure Rate Limiting policies (e.g. 10 requests/min for auth, 100 requests/min for data reads).
4. Implement secure CORS policies and security headers (Content-Security-Policy, HSTS, X-Frame-Options).
5. Output complete security configuration code.
```
</div>

---

## 5. Review Checklist

- [ ] Is input validation enforced via strict DTO schemas before service delegation?
- [ ] Are all private routes protected with explicit role checks (RBAC)?
- [ ] Are brute-force-sensitive endpoints (login, forgot password) protected by rate limits?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OWASP REST Security Cheat Sheet: <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener">https://cheatsheetseries.owasp.org/</a></li>
    <li>IETF RFC 7519 — JSON Web Token (JWT).</li>
  </ul>
</div>
