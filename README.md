# XyPriss Rule Unit (.xru)

[XRU](https://github.com/Nehonix-Team/xru) is a Domain-Specific Language (DSL) designed for **Structured Text Transformation**. It operates as a **Structured Text Patcher (STP)**, applying complex mutations to configuration files and TypeScript source code while preserving formatting, comments, and non-standard syntaxes.

This repository defines the transformation and orchestration logic for XyPriss templates. All modification rules are consolidated into [`.xru`](https://github.com/Nehonix-Team/xru) files to maintain architectural consistency and ease of maintenance.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Best Practices](#best-practices)
4. [Documentation](#documentation)

---

## Overview

XyPriss is an **Enterprise-Grade Hybrid Web Framework** that combines the raw performance of compiled native binaries with the productivity and flexibility of TypeScript. It is designed for teams that require both operational speed and developer velocity, without compromise.

**Security Briefing:** XyPriss enforces a "Secure by Default" architecture. Core variables are protected by a native Environment Security Shield that blocks direct `process.env` access to prevent leakage. This is complemented by a built-in, zero-dependency storage system (XEMS), high-speed Go-powered networking (XHSC), and a Zero-Trust Plugin Security layer.

---

## Key Features

- **Structured Text Patching** — Applies mutations while preserving formatting, comments, and non-standard syntaxes.
- **Declarative Rule Files** — Define patching operations in `.xru` files for reproducible and auditable transformations.
- **Scoping Directives** — Target specific files or directories using `#SELECT` and `#BEGIN`/`#END` blocks.
- **Variable Interpolation** — Declare variables with `let` and reference them throughout the rule file.
- **Code Injection** — Inject source code directly into TypeScript files during template instantiation.
- **Log Colorization** — Built-in colored output support via `#LOG` directives.
- **CLI Integration** — Simple command-line interface for applying patches in any workflow.

---

## Syntax Overview

XRU syntax is organized around five core concepts:

1. **Syntax Overview** — General rules and log colorization.
2. **Directives** — Scoping (`#BEGIN`, `#SELECT`) and utility (`#LOG`, `#EXEC`) directives.
3. **Actions** — Patching operations, symbols (`++`, `>>`), and code injections.
4. **Variables** — Scoping rules, declarations, and interpolation.
5. **CLI Usage** — Command-line options and examples.

Full syntax documentation is available at [xru/doc/syntax.md](https://github.com/Nehonix-Team/xru).

---

## Best Practices

- **Modularity** — Keep `rules.xru` files localized within their respective feature or mode directories. Avoid global rule files that span unrelated concerns.
- **Versioning** — Commit `.xru` files alongside the source they patch for full traceability.
- **Naming Conventions** — Use descriptive names for rule files (e.g., `init.xru`, `upgrade-v2.xru`) to communicate intent clearly.

---

## Documentation

For full documentation, refer to the following resources:

- [XRU Repository](https://github.com/Nehonix-Team/xru)
- [XyPriss Repository](https://github.com/Nehonix-Team/XyPriss)
- [Syntax Reference](https://github.com/Nehonix-Team/xru/doc/syntax.md)

---

_Copyright (c) 2026 Nehonix-Team. All rights reserved._
