# OpenAPI (OAS 3.1) & API Review Checklist

The **OpenAPI Specification (OAS v3.1.0)** is the universally adopted standard for defining machine-readable REST API contracts. This guide documents OpenAPI specification authoring and provides the exhaustive **10-Point API Design Review Checklist**.

---

## 1. OpenAPI 3.1 Specification Structure

```yaml
openapi: 3.1.0
info:
  title: University Internship Management API
  version: 1.0.0
  description: RESTful API contracts for student placements and evaluations.
paths:
  /api/v1/internships/{id}/applications:
    post:
      summary: Submit student internship application
      operationId: submitApplication
      tags: [Applications]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitApplicationRequest'
      responses:
        '201':
          description: Application successfully submitted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplicationResponse'
        '400':
          $ref: '#/components/responses/400BadRequest'
        '422':
          $ref: '#/components/responses/422ValidationError'
```

---

## 2. The 10-Point API Design Review Checklist

Audit any proposed API contract against this checklist:

- [ ] **1. Plural Noun URIs**: Are all resource paths plural nouns using kebab-case (no verbs)?
- [ ] **2. Correct HTTP Verbs**: Is GET strictly read-only and safe? Are POST/PATCH/DELETE mapped accurately?
- [ ] **3. Semantic Status Codes**: Are `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429` used correctly?
- [ ] **4. Standardized Error Envelopes**: Do all failure responses conform to RFC 7807 Problem Details?
- [ ] **5. Authorization Annotations**: Is every sensitive route guarded with explicit role requirements (RBAC)?
- [ ] **6. Strict Input Validation**: Are DTOs validated for required fields, string lengths, ranges, and formats?
- [ ] **7. Pagination Caps**: Do list endpoints enforce maximum page size limits (e.g. max `size=100`)?
- [ ] **8. Idempotency Support**: Do mutating financial or quota reservation endpoints validate `Idempotency-Key` headers?
- [ ] **9. Rate Limiting**: Are public and authentication endpoints protected by rate limiting policies?
- [ ] **10. OpenAPI 3.1 Compliance**: Is there an interactive, validated OpenAPI contract published for client consumption?

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: OpenAPI 3.1 Contract Generation & 10-Point API Audit</div>

```markdown
# TASK: Generate OpenAPI 3.1 Specification & Conduct 10-Point API Audit
You are a Principal API Architect and OpenAPI Specification Specialist.

## Input API Endpoints / DTOs:
[PASTE API ENDPOINTS, CONTROLLERS, OR DTOS]

## Instructions:
1. Generate an OAS 3.1 compliant YAML contract defining Paths, Parameters, RequestBodies, Schemas, and Standard Responses (200, 201, 400, 401, 403, 404, 422).
2. Include full JSON Schema validation types (UUID, regex patterns, min/max).
3. Audit the API against the 10-Point API Design Review Checklist and output a compliance report.
```
</div>

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OpenAPI Specification v3.1.0: <a href="https://spec.openapis.org/oas/v3.1.0" target="_blank" rel="noopener">https://spec.openapis.org/oas/v3.1.0</a></li>
  </ul>
</div>
