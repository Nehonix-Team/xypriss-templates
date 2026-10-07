/**
 * String Manipulation & Formatting Utilities
 *
 * Exposes XyPriss's native, high-performance string manipulation engine.
 * Provides optimized routines for slugification, padding, truncation, case conversions,
 * secure random generation, and data sanitization.
 *
 * @module utils/str
 * @see https://xypriss.nehonix.com/docs/system/utils/strings
 */

import "xypriss";

type TStr = typeof __sys__.utils.str;

/**
 * XyPriss Native String Utilities Instance.
 *
 * Supports both direct static helper invocations and fluent chainable transformations
 * via `str.of(...)`.
 *
 * ### Key Operations:
 * - `str.slugify(text)` / `str.of(text).slugify().value()`: Generates URL-safe, accent-free slugs.
 * - `str.pad(val, length, char?, position?)`: Aligns text or numbers with padding (start, end, both).
 * - `str.truncate(text, length, suffix?)`: Truncates long text gracefully with ellipsis.
 * - `str.randomString(length, charset?)`: Generates cryptographically safe alphanumeric strings.
 * - `str.of(text).toTitleCase()` / `.toCamelCase()` / `.toSnakeCase()` / `.toKebabCase()`:
 *   Standardized naming convention conversions.
 * - `str.of(text).mask(options)`: Masks sensitive values (e.g., emails, phone numbers, API keys).
 *
 * @example
 * ```ts
 * import { str } from "utils/str";
 *
 * // URL Slug Generation
 * const slug = str.slugify("XyPriss Framework — Architecture & Guide 2026!");
 * // Result: "xypriss-framework-architecture-guide-2026"
 *
 * // Fixed-length sequence padding (e.g., Invoice #00042)
 * const invoiceId = str.pad(42, 5, "0"); // "00042"
 *
 * // Text Truncation for summaries
 * const summary = str.truncate("A very long article preview description...", 20); // "A very long artic..."
 *
 * // Random token or nonce generation
 * const nonce = str.randomString(16); // "x9F2mK81aBc73LpQ"
 * ```
 */
export const str = __sys__.utils.str as TStr;
