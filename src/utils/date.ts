/**
 * Date & Time Utilities
 *
 * Exposes XyPriss's native, high-performance DateUtils suite for unified date
 * parsing, relative time calculation, duration formatting, and boundary arithmetic.
 *
 * @module utils/date
 * @see https://xypriss.nehonix.com/docs/system/utils/dates
 */

import "xypriss";

type TDate = typeof __sys__.utils.date;

/**
 * XyPriss Native Date Utilities Instance.
 *
 * Provides optimized date calculations and automatic timestamp resolution:
 *
 * ### Automatic Unit Detection (Seconds vs Milliseconds)
 * Bridges XHSC native Go runtimes (which typically use Unix epoch seconds)
 * and JavaScript runtimes (which use milliseconds):
 * - If a timestamp is `< 100,000,000,000` (1e11), it is automatically treated
 *   as seconds and converted to milliseconds.
 * - This heuristic remains mathematically sound until the year **2286**.
 *
 * ### Common Methods:
 * - `dateUtils.format(date, formatStr?)`: Formats dates with locale support.
 * - `dateUtils.timeAgo(date, locale?)`: Returns localized relative time (e.g., `"2 minutes ago"`).
 * - `dateUtils.formatDuration(ms, unit?)`: Formats duration into human-readable strings (e.g., `"1h 30m"`).
 * - `dateUtils.startOf(unit)` / `endOf(unit)`: Computes boundary timestamps (e.g., start of month/day).
 * - `dateUtils.add(date, amount, unit)` / `subtract(date, amount, unit)`: Date arithmetic.
 * - `dateUtils.diff(a, b, unit?)`: Computes difference between two dates.
 *
 * @example
 * ```ts
 * import { dateUtils } from "utils/date";
 *
 * // Relative human-friendly timestamps
 * const relative = dateUtils.timeAgo(Date.now() - 90_000); // "2 minutes ago"
 *
 * // Compact duration formatting
 * const duration = dateUtils.formatDuration(3_661_000);     // "1h 1m 1s"
 *
 * // Period boundaries
 * const monthStart = dateUtils.startOf("month");           // 2026-09-01T00:00:00.000Z
 * ```
 */
export const dateUtils = __sys__.utils.date as TDate;

/**
 * Convenient shorthand alias for `dateUtils`.
 *
 * @example
 * ```ts
 * import { date } from "utils/date";
 * console.log(date.formatDuration(120, "s")); // "2m"
 * ```
 */
export { dateUtils as date };
