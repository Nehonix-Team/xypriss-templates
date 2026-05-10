# XyPriss Framework Template

Official blueprint for initializing high-performance XyPriss projects via `xfpm init`.

---

## Overview

XyPriss is an **Enterprise-Grade Hybrid Web Framework** that combines the raw performance of compiled native binaries with the productivity and flexibility of TypeScript. This repository serves as the foundational template, providing a secure, modular, and scalable architecture out of the box.

It is designed for teams that require operational speed, developer velocity, and a "Secure by Default" architecture.

---

## Core Features

- **Native Performance** — Powered by the XHSC engine for low-latency request handling and high-speed Go networking.
- **Zero-Trust Security** — Built-in environment security shield that prevents direct `process.env` access and protects core variables.
- **Modular Design** — Strict separation of concerns between core entry points, configuration stores, and business logic.
- **XFPM Integrated** — Seamlessly optimized for the XyPriss Package Manager ecosystem for streamlined dependency management.

---

## Dynamic Orchestration (XRU)

This template utilizes **[XyPriss Rule Units (.xru)](https://github.com/Nehonix-Team/xru)** to perform dynamic project transformation during initialization. Rather than providing static boilerplate, XRU acts as a **Structured Text Patcher (STP)** to customize the project in real-time.

### How it works:

1.  **Metadata Injection** — Dynamically updates `package.json` and project documentation with user-provided details (Name, Version, Author).
2.  **Modular Logic** — Orchestrates different project modes (e.g., Default vs. XMS) using declarative rules.
3.  **Format Preservation** — Applies mutations while strictly preserving code formatting, comments, and non-standard syntaxes.
4.  **Self-Cleanup** — The orchestration logic residing in the `rules/` directory is automatically executed and removed after initialization.

The entry point for this logic is [rules/orchestrate.xru](./rules/orchestrate.xru).

---

## Project Structure

- `src/` — Core source code, server instances, and service layers.
- `rules/` — XRU transformation logic and orchestration scripts.
- `xypriss.config.jsonc` — Framework-level configuration and security settings.
- `TARGET_README.md` — The template used to generate the final project documentation.

---

## Usage

To bootstrap a new project using this template, execute the following command:

```bash
xfpm init <project-name>
```

This command fetches the template and runs the orchestration engine to finalize the local setup.

---

## Documentation

For further technical details, refer to the following resources:

- [XyPriss Repository](https://github.com/Nehonix-Team/XyPriss)
- [XRU Syntax Reference](https://github.com/Nehonix-Team/xru/blob/master/doc/syntax.md)
- [XFPM Init Documentation](https://github.com/Nehonix-Team/XFPM/blob/master/docs/commands/init.md)

---

*Copyright (c) 2026 Nehonix-Team. All rights reserved.*
