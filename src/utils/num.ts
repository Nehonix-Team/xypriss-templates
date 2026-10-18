/**
 * Number & Mathematical Calculation Utilities
 *
 * Exposes XyPriss's native, high-performance NumberUtils suite for storage
 * conversions, rates, bounds, statistical aggregates, and localized formatting.
 *
 * @module utils/num
 * @see https://xypriss.nehonix.com/docs/system/utils/numbers
 */

import "xypriss";

type TNum = typeof __sys__.utils.num;

/**
 * XyPriss Native Number Utilities Instance.
 *
 * A comprehensive suite of everyday numeric utilities:
 * - **File & Storage Calculations**: `formatBytes`, `parseBytes`, `toMB`, `toGB`, `transferRate`, `transferETA`.
 * - **Percentages & Rates**: `percentage`, `percentageOf`, `percentageChange`, `progress`.
 * - **Pagination & Division**: `paginate`, `divmod`.
 * - **Rounding & Precision**: `round`, `ceil`, `floor`, `roundToStep`, `toPrecision`.
 * - **Bounds & Mapping**: `clamp`, `lerp`, `inRange`, `normalize`, `mapRange`.
 * - **Statistics & Aggregates**: `sum`, `average`, `median`, `min`, `max`.
 * - **Formatting & Localization**: `formatNumber`, `formatCompact`, `formatCurrency`, `formatPercent`, `ordinal`.
 * - **Cryptographic Randomness**: `randomInt`, `randomFloat`, `randomChoice`.
 *
 * @example
 * ```ts
 * import { num } from "utils/num";
 *
 * // Storage conversion
 * num.formatBytes(15_728_640);       // "15 MB"
 * num.parseBytes("25MB");           // 26214400
 *
 * // Rate calculation
 * num.percentage(25, 200);          // 12.5
 *
 * // Data pagination
 * num.paginate(154, 20, 2);         // { currentPage: 2, totalPages: 8, offset: 20, ... }
 *
 * // Precision rounding
 * num.round(1.005, 2);              // 1.01
 *
 * // Bounding
 * num.clamp(150, 0, 100);           // 100
 * ```
 */
export const num = __sys__.utils.num as TNum;
