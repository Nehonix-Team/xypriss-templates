# XFPM Template Rule Specification

This document defines the syntax and behavior for the XyPriss Template Engine (XFPM). It allows developers to define dynamic modifications to project files during initialization without creating complex conditional logic in the source code.

## 1. File Formats

The engine supports two primary rule formats:
- **`xfpm.rules.json`**: Optimized for structured JSON/JSONC patching.
- **`rules.xfpm`**: Optimized for code injection and text replacement using the XFPM Declarative Language.

---

## 2. JSON Patching (`xfpm.rules.json`)

Used for modifying structured files like `package.json` or `xypriss.config.jsonc`.

### Actions

- **`&merge`**: Deep-merges an object into the target file. Useful for adding dependencies or scripts.
- **`&rm`**: Removes properties from a JSON object. Supports deep paths.
- **`&rp-k` / `&rp-v`**: Replaces keys or values.
- **`&array`**: Performs array operations (`&push`, `&filter`, `&unshift`).

---

## 3. Code Injection (`.xfpm`)

The `.xfpm` format is designed for modifying source code files (`.ts`, `.js`, `.md`). It uses clear action blocks to manage code injection based on markers.

### Syntax

```xfpm
# Define the target file
TARGET: path/to/file.ts

# Action: REPLACE
# The marker is treated as a Regular Expression by default to ensure 
# robustness against whitespace variations.
[REPLACE] // -->\s*{{HOOK_NAME}}
  const x = 10;
  console.log(x);
[END]

# Action: REMOVE
# Deletes lines or blocks
[REMOVE] // -->{{OBSOLETE_MARKER}}
[END]

# Action: MERGE (for JSON files within an .xfpm file)
[MERGE] xypriss.config.jsonc
{
  "$vars": { "debug": true }
}
[END]
```

### Why use `.xfpm`?
- **Clean Source Code**: Final projects contain pure code without template-specific conditions.
- **Multiline Support**: No need to escape newlines or quotes like in JSON strings.
- **Readability**: High indentation preservation and native code look.

---

## 4. Simple Text Patching (`&patch`)

Available within `xfpm.rules.json` for simple string replacements in non-JSON files. 

> [!NOTE]
> For complex code injection, use the `.xfpm` format instead of `&patch`.

```json
"README.md": {
    "&patch": {
        "{{PLACEHOLDER}}": "Replacement Value"
    }
}
```

---
*Documentation version 1.1.0 - English First Policy*