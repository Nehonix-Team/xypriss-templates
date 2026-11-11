# {{SERVER_NAME}}

{{DESCRIPTION}}

---

## 🏛️ Project Architecture

This project is built on **XyPriss** with an Enterprise Modular design, implementing strict Separation of Concerns (SoC) and a **Zero-Trust** security model:

```
src/
├── server.ts              # Master boot sequence (Guards, XStatic, Router, Start)
├── router.ts              # Centralized route registry (XMS prefix / server binding)
│
├── configs/               # Declarative framework configurations
│   ├── xypriss.config.ts  # Engine options (HTTP/2, Rate-Limit, CORS, Concurrency)
│   ├── servers.config.ts  # XMS multi-server port and identity topology
│   └── manifest.ts        # Service identity metadata
│
├── servers/               # Multi-server instance definitions (XMS Mode)
│   ├── api.server.ts      # REST API server
│   ├── auth.server.ts     # Authentication & Identity server
│   └── cdn.server.ts      # Media & asset distribution server
│
├── routes/                # Endpoint declarations by functional domain
│   ├── api.route.ts       # Health checks and business endpoints
│   ├── auth.route.ts      # Login, registration, and protected profile
│   └── cdn.route.ts       # File upload and static asset queries
│
├── controller/            # HTTP request/response orchestrators (using Send)
│   ├── api.controller.ts
│   ├── auth.controller.ts
│   └── cdn.controller.ts
│
├── services/              # Pure business logic & data access layer
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── cdn.service.ts
│
├── guards/                # Pre-flight security & RBAC validation
│   ├── index.guard.ts     # Global XyGuard registry runner
│   ├── auth.guard.ts      # Token and session verification
│   └── roles.guard.ts     # Role-based access control
│
├── schemas/               # Request validation schemas
├── types/                 # Unified TypeScript interfaces and contracts
├── const/                 # Immutable application constants (paths, timeouts)
└── utils/                 # Native and cryptographic helper utilities
```

---

## 🔒 Security & Confinement Features

1. **Declarative Guards (`XyGuard`)**  
   Guards are registered globally at startup in `src/guards/index.guard.ts` and attached directly to routes:
   ```typescript
   router.get("/me", { guards: { authenticated: true } }, AuthController.me);
   ```

2. **XStatic Storage Confinement**  
   Temporary file uploads are strictly sandboxed inside XyPriss's `tmpUserDir`:
   ```typescript
   xs.define(publicCdnTmpPath, __sys__.path.tmpUserDir, {
     allowOutsideRoot: true,  // Mounts sandboxed temp storage
     allowOutsideDir: false,  // Strictly prevents directory traversal
   });
   ```

3. **Zero-Trust Environment Shield**  
   All accessible environment variables are whitelisted in `xypriss.config.jsonc` (`$env.whitelist`).

4. **Native TypeScript Path Aliases**  
   Clean imports from anywhere via `"*": ["./src/*"]` without relative `../../..` paths.

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   xfpm install
   ```

2. **Run in Development (with Fileonix hot-reload)**:
   ```bash
   xfpm run dev
   ```

3. **Build TypeScript**:
   ```bash
   xfpm run build
   ```

4. **Security Audit**:
   ```bash
   xfpm run audit
   ```

---
*Project initialized by {{AUTHOR}} using XFPM and XyPriss.*
