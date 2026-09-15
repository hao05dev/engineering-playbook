# Component & Deployment Diagrams

While class diagrams represent code-level object models, **Component Diagrams** and **Deployment Diagrams** model the higher-level structural modules, interface boundaries, and physical infrastructure topology of the system.

---

## 1. Component Diagrams (Modular Boundaries)

A Component Diagram models the organization and dependencies among software modules (services, libraries, JARs, micro-frontends).

```
┌─────────────────────────────────────────────────────────────┐
│                 COMPONENT NOTATION ESSENTIALS               │
├─────────────────────────────────────────────────────────────┤
│ • Component: Rectangle with component icon or «component»   │
│ • Provided Interface: Ball / Lollipop notation (○─)        │
│   (The API/contract this component offers to consumers)     │
│ • Required Interface: Socket notation (─()                 │
│   (The API/contract this component needs from others)       │
│ • Assembly Connector: Ball-and-socket mating (○─()          │
│ • Port: Small square on component boundary for I/O routing  │
└─────────────────────────────────────────────────────────────┘
```

### Practical Example: University Internship System Components

```
┌───────────────────────────┐                 ┌───────────────────────────┐
│   «component» WebApp      │                 │ «component» AuthService   │
│       (Vue 3 SPA)         │                 │    (OAuth2 / OIDC)        │
└─────────────┬─────────────┘                 └─────────────┬─────────────┘
              │                                             │
             ─( AuthAPI                                    ○─ AuthAPI
              │                                             │
              └───────────────────────┬─────────────────────┘
                                      │
                                     ─( RestAPI
                                      │
                       ┌──────────────┴──────────────┐
                       │    «component» ApiGateway   │
                       └──────────────┬──────────────┘
                                      │
                                     ○─ RestAPI
                                      │
                       ┌──────────────┴──────────────┐
                       │ «component» PlacementEngine │
                       └─────────────────────────────┘
```

---

## 2. Deployment Diagrams (Physical Infrastructure & Topology)

A Deployment Diagram shows the hardware nodes, virtual machines, container runtimes, and communication protocols where software artifacts execute.

### Core Elements:
- **Node**: 3D box representing physical hardware (`«device»`) or virtual runtime (`«executionEnvironment»` e.g., Docker, JVM, K8s Pod).
- **Artifact**: Document with folded corner representing physical files (`.jar`, `.war`, `.js`, Docker image).
- **Communication Path**: Labeled solid line specifying the protocol (e.g., `HTTPS / TLS 1.3`, `JDBC`, `gRPC`).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     KUBERNETES DEPLOYMENT TOPOLOGY                      │
├─────────────────────────────────────────────────────────────────────────┤
│ «device» Client Device (Browser)                                        │
│   └── «artifact» SinglePageApp.bundle.js                                │
│                            │                                            │
│                            │ HTTPS / TLS 1.3 (Port 443)                 │
│                            ▼                                            │
│ «executionEnvironment» AWS EKS Cluster                                  │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ «executionEnvironment» Backend Pod                              │   │
│   │   └── «artifact» app-service.jar (Spring Boot 3.3)              │   │
│   └────────────────────────────────┬────────────────────────────────┘   │
│                                    │ JDBC / TCP (Port 5432)             │
│                                    ▼                                    │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ «executionEnvironment» Managed DB (AWS RDS PostgreSQL 16)       │   │
│   │   └── «artifact» internship_db_schema                           │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Copyable AI Prompt Template

<div class="ai-prompt-box">
  <div class="ai-prompt-header">🤖 AI Prompt Template: Component & Deployment Diagram Synthesis</div>

```markdown
# TASK: Generate OMG UML Component & Deployment Diagrams
You are an expert Cloud & Software Architecture Engineer.

## Input Context:
System Topology & Modules: [DESCRIBE APPLICATION MODULES, APIS, AND HOSTING ENVIRONMENT]

## Instructions:
1. Construct a Component Diagram identifying all software components, Provided Interfaces (lollipop), Required Interfaces (socket), and Ports.
2. Construct a Deployment Diagram modeling execution environments (Nodes, Containers, VMs), deployed artifacts (.jar, .bundle.js), and communication protocols (HTTPS, gRPC, JDBC).
3. Output clean ASCII / Mermaid diagrams.
4. Provide a network security review highlighting ports, encryption in transit, and boundary isolation.
```
</div>

---

## 4. Review Checklist

- [ ] Does every component dependency explicitly specify whether it is a provided or required interface?
- [ ] Are all communication paths on the deployment diagram annotated with protocol and port numbers?
- [ ] Are database nodes, cache layers, and external third-party SaaS services properly modeled?

<div class="ref-box">
  <strong>References:</strong>
  <ul>
    <li>OMG UML v2.5.1 — Section 12: Packages and Components, Section 19: Deployments.</li>
  </ul>
</div>
