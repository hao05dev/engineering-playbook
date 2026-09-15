# 11 — Commit & Push

The final phase of the AI-SDLC is **Commit & Push**. In this step, verified changes are packaged into clean, atomic commits following standard conventions, pushed to the remote repository, and submitted as a Pull Request (PR) for CI/CD pipeline validation.

---

## 1. Conventional Commits Standard

Every commit message must follow the Conventional Commits specification to maintain a searchable, automated changelog.

```
<type>(<scope>): <short imperative description>

[optional body explaining 'why', context, and trade-offs]

[optional footer with issue tracker references]
```

### Supported Commit Types:
- `feat`: A new user-facing feature.
- `fix`: A bug fix for an existing capability.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `test`: Adding missing tests or correcting existing tests.
- `docs`: Documentation-only changes.
- `chore`: Build tooling, dependency updates, or CI configuration.

---

## Example Conventional Commit

```
feat(internship): implement application state machine transitions

- Add transitionStatus method in ApplicationWorkflowService
- Enforce valid state transition matrix and emit audit logs
- Add unit tests for valid and rejected application transitions

Closes #142
```

---

## 2. Pull Request Generation Template

Leverage AI to synthesize the changes into a comprehensive Pull Request summary:

```markdown
## Summary of Changes
- Implemented `ApplicationWorkflowService` to manage internship application states.
- Added database constraints and state transition validation.
- Added unit tests covering 100% of state branch conditions.

## Verification
- [x] `./mvnw clean test` passed (28 tests, 0 failures).
- [x] `./mvnw spotless:check` passed.
- [x] Tested valid transition: SUBMITTED -> FACULTY_APPROVED.
- [x] Tested invalid transition rejection.

## Related Documents
- PRD: [Internship Application PRD](/en/product-requirements)
- Technical Design: [Internship Architecture](/en/technical-design)
```

---

## 3. CI/CD Pipeline & Merge Protocols

Once pushed:
1. **GitHub Actions / CI** runs the automated build, linter, unit tests, and security scans.
2. **Peer Review**: At least one human team member reviews and approves the PR.
3. **Squash and Merge**: Merge into the `main` branch to keep Git history linear and clean.
