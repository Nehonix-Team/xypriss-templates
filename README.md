The `xfpm.rules.json` file is used to configure and patch project files dynamically. It allows modules to define their own modifications to global configurations (like `package.json` or `xypriss.config.jsonc`) without conflict.

## Syntax Overview

The root of the file is an object where each key is a **Target File** (path relative to the project root). The value is an object containing **Actions** or **Literal Merges**.

```json
{
    "targetedFile": {
        "literalKey": "value",
        "&action": { ... }
    }
}
```

## Supported Actions

### `&rm` (Remove)
Removes one or more properties from the target file. Supports deep object traversal.

- **Object syntax**: Removes specific paths.
  ```json
  "&rm": {
      "l1": {
          "l2": "" // Removes l1.l2
      }
  }
  ```
- **Array syntax**: Removes multiple top-level or relative keys.
  ```json
  "&rm": ["oldKey", "deprecatedProp"]
  ```

### `&rp-k` (Replace Key)
Renames a property key while preserving its value. (Alias: `&rp-0`)

- **Example**: Renames `name` to `projectName`.
  ```json
  "&rp-k": {
      "name": "projectName"
  }
  ```

### `&rp-v` (Replace Value)
Strictly replaces the content of a property. (Alias: `&rp-1`)

- **Example**: Updates the `version` value.
  ```json
  "&rp-v": {
      "version": "1.0.0-managed"
  }
  ```

### `&add` / `&merge`
Deep-merges the provided object into the target file. This is useful for adding scripts or configuration blocks without overwriting the entire section.

- **Example**:
  ```json
  "&merge": {
      "scripts": {
          "xms:dev": "xfpm run xms"
      }
  }
  ```

### `&array` (Array Manipulation)
Provides specific operations for array-type properties.

- **`&push`**: Appends items to the end.
- **`&unshift`**: Prepends items to the beginning.
- **`&filter`**: Removes items matching a value.

- **Example**:
  ```json
  "&array": {
      "keywords": {
          "&push": ["xypriss", "module"],
          "&filter": "legacy"
      }
  }
  ```