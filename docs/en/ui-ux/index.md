# 09 — UI / UX Engineering (NN/g)

Even the most robust backend architecture fails if users cannot understand, navigate, or operate the frontend interface. **UI/UX Engineering** applies cognitive psychology, information architecture, and the **Nielsen Norman Group (NN/g)** usability principles to craft intuitive, accessible, and resilient digital interfaces.

---

## The UI/UX Progression Workflow

In the AI-SDLC, frontend interfaces are never generated as random visual layouts. They follow an 8-step user-centered progression:

```
[ Requirement ] ──► [ User Goal ] ──► [ User Journey ] ──► [ User Flow ]
                                                                   │
                                                                   ▼
[ Usability Validation ] ◄── [ Prototype ] ◄── [ Mockup ] ◄── [ Wireframe & IA ]
```

---

## Key Modules in this Section

1. [User Goals, Journeys & Flows](./nng-fundamentals-journeys): Mapping user psychology, emotional touchpoints, and navigational paths.
2. [Information Architecture & Wireframes](./ia-wireframes-mockups): Screen inventory, visual hierarchy, low-fidelity wireframes, and high-fidelity mockups.
3. [Interaction Design, Form UX & State Design](./interaction-states-accessibility): Form validations, accessibility (WCAG 2.1 AA), and the 4 Core UI States (Loading, Empty, Error, Success).
4. [Usability Testing & Review Checklist](./usability-review): The 10 Usability Heuristics (Jakob Nielsen) and UI/UX review checklists.

---

## The 4 Invariant UI/UX Rules

1. **Every Screen Has a Single Primary Goal**: Avoid cluttering screens with competing primary call-to-action buttons.
2. **Always Design the 4 States**: Never build only the "happy populated" view. Design for **Loading**, **Empty (zero-data)**, **Partial/Error**, and **Success** states.
3. **Validate Inline and Defensively**: Validate form fields on blur with human-friendly messages rather than failing only after form submission.
4. **Accessibility (a11y) by Default**: Ensure keyboard navigability (`Tab`/`Enter`/`Esc`), visible focus rings, and WCAG AA color contrast.

<div class="ref-box">
  <strong>Primary Official References:</strong>
  <ul>
    <li><a href="https://www.nngroup.com/articles/" target="_blank" rel="noopener">Nielsen Norman Group (NN/g) — Research-Based UX Guidance</a></li>
    <li>Nielsen, Jakob (1994). <em>10 Usability Heuristics for User Interface Design</em>. NN/g.</li>
    <li>W3C Web Content Accessibility Guidelines (WCAG) v2.1 (Level AA).</li>
  </ul>
</div>
