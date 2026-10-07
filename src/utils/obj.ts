/**
 * Deep Object & Collection Utilities
 *
 * Exposes XyPriss's native, high-performance object manipulation suite.
 * Provides safe property access, immutable transformations, deep cloning,
 * key filtering (pick/omit), dot-notation flattening, and fluent wrapping.
 *
 * @module utils/obj
 * @see https://xypriss.nehonix.com/docs/system/utils/data
 */

import "xypriss";

type TObj = typeof __sys__.utils.obj;

/**
 * XyPriss Native Object Utilities Instance.
 *
 * Features a high-speed fluent wrapper (`obj.of(...)`) and direct utility methods
 * designed for immutable state management, DTO sanitization, and data transformations.
 *
 * ### Key Operations:
 * - `obj.of(data).pick(keys)`: Selects specified keys into a new object.
 * - `obj.of(data).omit(keys)`: Excludes specified keys from a new object.
 * - `obj.of(data).clone()`: Performs a fast, cycle-safe deep clone.
 * - `obj.of(data).flatten()`: Flattens nested structures into dot-notation keys (`"user.address.city"`).
 * - `obj.of(data).unflatten()`: Expands dot-notation keys back into deeply nested objects.
 * - `obj.of(data).filterClean()`: Strips out `null`, `undefined`, and empty strings.
 * - `obj.of(data).isEmpty()` / `.isAllEmpty()`: Validates object population.
 * - `obj.of(data).mapValues(fn)`: Transforms values while retaining object structure.
 *
 * @example
 * ```ts
 * import { obj } from "utils/obj";
 *
 * const user = { id: "123", name: "Alice", passwordHash: "secret", role: "admin" };
 *
 * // Safe DTO serialization (remove sensitive credentials)
 * const publicProfile = obj.of(user).omit(["passwordHash"]).value();
 *
 * // Selective property extraction
 * const credentials = obj.of(user).pick(["id", "role"]).value();
 *
 * // Clean payload from empty form inputs
 * const cleanPayload = obj.of({ name: "Bob", notes: "", phone: null }).filterClean().value();
 * // Result: { name: "Bob" }
 * ```
 */
export const obj = __sys__.utils.obj as TObj;
