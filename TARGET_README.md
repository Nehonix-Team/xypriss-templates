# XyPriss Project Template

Welcome to your new **XyPriss** project. This project has been initialized using the high-performance XHSC engine and is designed with a **Zero-Trust** security model in mind.

## Overview

This template provides a modular foundation for building secure, scalable, and high-performance server-side applications. It leverages native networking capabilities{{ORCHESTRATION_DESC}} to deliver robust isolation and developer efficiency.

## Project Architecture

The project is organized into modular layers to ensure strict separation of concerns:

- **Core Entry Point**: The main server instance (typically `src/server.ts`) orchestrates subsystems and boot cycles.
- **Configuration Store**: Managed via the **Environment Security Shield**, ensuring no secrets leak globally.
- **Traffic Management**: Uses the native Radix-Trie router for efficient request distribution.
- **Business Logic**: Isolated service layers for simplified maintenance and testing.
- **Server Definitions**: (XMS Mode) Multiple isolated server instances (e.g., API, Auth, Admin) running on distinct ports.

## CLI Options

When initializing via `xfpm init`, you can customize your project with the following arguments:

- **`--mode`**: `default` (monolith) or `xms` (multi-server orchestration).
- **`--security`**: `api` (restricted access for CLI/API tools) or `web` (restricted access for browsers with strict CSP).
- **`--guardrails`**: `true` to enable native XHSC network protections.

## Getting Started

1. **Install Dependencies**:
   ```bash
   xfpm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your secrets.

3. **Run in Development**:
   ```bash
   xfpm run dev
   ```

4. **Run Audit**:
   ```bash
   xfpm run audit
   ```

---
*Project initialized by {{AUTHOR}} using XFPM & XyPriss*
