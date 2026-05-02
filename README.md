# XyPriss Rule Unit (.xru)

This repository defines the transformation and orchestration logic for XyPriss templates. To maintain architectural consistency and ease of maintenance, all modification rules are consolidated into [`.xru`](https://github.com/Nehonix-Team/XFPM/blob/master/internal/xru/README.md) files.

## Overview

The `.xru` (XyPriss Rules) format provides a declarative way to patch configuration files and inject source code into TypeScript files during the template instantiation process.

## Supported Initialization Arguments

When initializing a project using this template via `xfpm init`, the following arguments are available to customize the orchestration:

- **`--mode`**: 
    - `default`: Creates a standard monolithic server structure.
    - `xms`: Creates a XyPriss Multi-Server orchestration structure.
- **`--security`**:
    - `api`: Injects configuration optimized for CLI/API tools (`terminalOnly`).
    - `web`: Injects configuration optimized for browser applications with strict CSP.
    - `standard`: Injects balanced security headers and CORS settings.
- **`--guardrails`**:
    - `true`: Enables native XHSC network quality protections and latency limits.
- **`--storage`**:
    - `xems`: Enables the XyPriss Encrypted Memory Store and injects demo session routes.


## Basic Syntax

Rules are organized into scoped blocks targeting specific files within the project structure.

```xru
#BEGIN:path/to/target.file
<actions>
#END:path/to/target.file

#CREATE:path/to/new.file
<content of the new file>
#END:path/to/new.file
```

**Example:**
```xru
#CREATE:src/configs/app.config.ts
export const config = {
    version: "1.0.0",
    debug: true
};
#END:src/configs/app.config.ts
```



---

## Supported Actions

### 1. JSON Patching
These actions allow for precise, non-destructive modification of JSON or JSONC files (e.g., `package.json`, `tsconfig.json`, `xypriss.config.jsonc`).

#### `&rm` (Remove)
Removes specified properties or nested paths.
- **Array Syntax**: For top-level keys.
- **Object Syntax**: For nested paths.

**Example Rule:**
```xru
&rm: ["oldKey"]

&rm: {
    scripts: {
        "legacy:test": ""
    }
}
```

**Before (`target.json`):**
```json
{
  "oldKey": "value",
  "name": "app",
  "scripts": {
    "start": "node index.js",
    "legacy:test": "echo test"
  }
}
```

**After:**
```json
{
  "name": "app",
  "scripts": {
    "start": "node index.js"
  }
}
```

#### `&rp-k` (Replace Key)
Renames a property key while preserving its existing value.
*Alias: `&rp-0`*

**Example Rule:**
```xru
&rp-k: {
    oldName: "newName"
}
```

**Before (`target.json`):**
```json
{
  "oldName": "value123"
}
```

**After:**
```json
{
  "newName": "value123"
}
```

#### `&rp-v` (Replace Value)
Updates the value of an existing property.
*Alias: `&rp-1`*

**Example Rule:**
```xru
&rp-v: {
    version: "1.0.0-managed"
}
```

**Before (`target.json`):**
```json
{
  "version": "0.0.1"
}
```

**After:**
```json
{
  "version": "1.0.0-managed"
}
```

#### `&merge` / `&add`
Performs a deep-merge of the provided object into the target file. This is the preferred method for adding new configuration blocks or dependencies.

**Example Rule:**
```xru
&merge: {
    scripts: {
        "xms:dev": "xfpm run xms"
    }
}
```

**Before (`target.json`):**
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

**After:**
```json
{
  "scripts": {
    "start": "node index.js",
    "xms:dev": "xfpm run xms"
  }
}
```

---

### 2. Special Actions

#### TypeScript Injection (`@TSINJECT`)
The `@TSINJECT` action facilitates dynamic code block insertion into TypeScript files by targeting specific comment markers.

**Injection Logic:**
1. Scans all `*.ts` files in the workspace.
2. Locates lines containing the `// xfpm: {{VARIABLE_NAME}}` directive, regardless of its position on the line (start, middle, or end) or surrounding whitespace.
3. Replaces the entire marker line with the content specified between the injection tags.

**Example Rule:**
```xru
@TSINJECT: {{AUTH_LOGIC}}
const auth = new AuthManager();
console.log("Security layer initialized.");
@END
```

**Corresponding Code Marker:**
```typescript
// xfpm: {{AUTH_LOGIC}}
```

---

## Best Practices

- **Modularity**: Keep `rules.xru` files localized within their respective feature or mode directories.
- **Safety**: Prefer `&merge` over full object replacement to avoid accidental loss of configuration.
- **Naming**: Use clear, uppercase markers for `@TSINJECT` to distinguish them from standard code comments.

---
*Managed by Nehonix-Team*
