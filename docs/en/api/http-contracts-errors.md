# HTTP Contracts & Standard Error Models

A predictable, well-engineered API communicates success and failure using standard **HTTP Status Codes** and machine-readable **Error Envelopes (RFC 7807 Problem Details)**.

---

## 1. HTTP Status Code Selection Matrix

```
┌─────────────────────────────────────────────────────────────┐
│                 HTTP STATUS CODE TAXONOMY                   │
├─────────────────────────────────────────────────────────────┤
│ 2xx Success: 200 (OK), 201 (Created), 202 (Accepted), 204   │
│ 4xx Client Errors: 400, 401, 403, 404, 409, 422, 429        │
│ 5xx Server Errors: 500 (Internal), 502 (Bad GW), 503, 504   │
└─────────────────────────────────────────────────────────────┘
```

| HTTP Status | Name | Meaning | Common Usage Scenario |
| :--- | :--- | :--- | :--- |
| **200** | `OK` | Request succeeded | Standard `GET`, `PUT`, `PATCH` responses. |
| **201** | `Created` | New resource created | `POST` application submission (includes `Location` header). |
| **204** | `No Content` | Request succeeded, no body | Successful `DELETE` operation. |
| **400** | `Bad Request` | Malformed JSON syntax | Syntax errors or unparseable payloads. |
| **401** | `Unauthorized`| Missing or invalid auth token | Missing Bearer token or expired JWT. |
| **403** | `Forbidden` | Authenticated, but lacks permission | Student attempting to access Advisor admin endpoints. |
| **404** | `Not Found` | Resource does not exist | `GET /applications/999` with invalid ID. |
| **409** | `Conflict` | Business invariant conflict | Duplicate application submission, quota exhausted. |
| **422** | `Unprocessable`| Semantic validation failure | Invalid email format, GPA out of 0.00-4.00 range. |
| **429** | `Too Many Requests`| Rate limit exceeded | User exceeding 60 requests/minute quota. |

---

## 2. The Standard RFC 7807 Error Envelope

Never return unstructured error strings like `{"error": "Something went wrong"}`. Adopt the IETF standard **RFC 7807 Problem Details**:

```json
{
  "type": "https://api.university.edu/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The payload contains 2 semantic validation errors.",
  "instance": "/api/v1/internships/12/applications",
  "code": "VALIDATION_FAILED",
  "timestamp": "2026-09-15T10:30:00Z",
  "invalidParams": [
    {
      "field": "resumeUrl",
      "rejectedValue": "ftp://bad-link",
      "reason": "Must be a valid HTTPS URL ending in .pdf"
    },
    {
      "field": "gpa",
      "rejectedValue": 5.2,
      "reason": "Must be between 0.00 and 4.00"
    }
  ]
}
```

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: HTTP Error Handling & RFC 7807 Implementation</div>

```markdown
# TASK: Standardize HTTP Error Handling & Problem Details (RFC 7807)
You are an expert REST API Engineer.

## Input Controller / Service Logic:
[PASTE BACKEND API CONTROLLER OR EXCEPTION HANDLER CODE]

## Instructions:
1. Map every domain exception to the appropriate HTTP status code (400, 401, 403, 404, 409, 422, 500).
2. Implement a global exception handler (e.g. `@RestControllerAdvice` in Spring Boot or Fastify/Express error middleware) formatting responses to RFC 7807 Problem Details.
3. Ensure detailed parameter validation arrays (`invalidParams`) are populated for bean validation failures.
4. Mask internal database stack traces and infrastructure secrets from client error payloads.
```
</div>

---

## 4. Review Checklist

- [ ] Does the API use `401 Unauthorized` for authentication failures and `403 Forbidden` for permission failures?
- [ ] Are error responses standardized across all endpoints using RFC 7807 structure?
- [ ] Are internal database exceptions and stack traces stripped from production responses?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>IETF RFC 7807 — Problem Details for HTTP APIs: <a href="https://datatracker.ietf.org/doc/html/rfc7807" target="_blank" rel="noopener">https://datatracker.ietf.org/doc/html/rfc7807</a></li>
  </ul>
</div>
