import { ServerOptions } from "xypriss";

// Helper utility to safely remove null and undefined
type T<k> = NonNullable<k>;

/**
 * Cleanly unpacks the server configuration to extract the specific
 * Response Manipulation Object structure, filtering out boolean shortcuts.
 */
export type LocalResponseManipulationConfig = Extract<
  T<ServerOptions["responseManipulation"]>,
  object
>;

/**
 * Outbound Data Sanitization & Response Modification Configuration.
 *
 * Configures dynamic rules to scrub, replace, or obscure sensitive fields and values
 * within outgoing JSON data structures before they are sent to the client.
 *
 * Performance Note: This pipeline runs directly within the high-performance Go network engine (XHSC).
 * It intercepts and sanitizes raw payloads with near-zero Node.js event loop overhead,
 * automatically stripping out sensitive environment pathways, exposed credentials, or PII.
 *
 * @see {@link https://xypriss.nehonix.com/docs/security/response-manipulation | XyPriss Response Manipulation Docs}
 *
 * @example
 * ### 1. Strip OS Directory Paths From Error Text (`valuePattern`)
 * Scrub absolute file paths out of runtime errors or system logs.
 * ```ts
 * const config: LocalResponseManipulationConfig = {
 *   enabled: true,
 *   rules: [
 *     {
 *       valuePattern: /(?:[a-zA-Z]:[/\\][a-zA-Z0-9_.-]+(?:[/\\][a-zA-Z0-9_.-]+)*|\/(?:[a-zA-Z0-9_.-]+\/)+[a-zA-Z0-9_.-]*)/g,
 *       replacement: "[REDACTED_PATH]",
 *     }
 *   ]
 * };
 * // Input:  { detail: "Failed to read file at /var/www/internal/config.json" }
 * // Output: { detail: "Failed to read file at [REDACTED_PATH]" }
 * ```
 *
 * @example
 * ### 2. Partial Token Obscurity (`preserve`)
 * Keep the initial characters of a key visible while masking the rest of the string payload.
 * ```ts
 * const config: LocalResponseManipulationConfig = {
 *   enabled: true,
 *   rules: [
 *     {
 *       field: "api_key",
 *       preserve: 4,
 *     }
 *   ]
 * };
 * // Input:  { api_key: "xy_live_998877665544332211" }
 * // Output: { api_key: "xy_l********************" }
 * ```
 *
 * @example
 * ### 3. Absolute Target Overwrite (`replacement`)
 * Completely overwrite deep nested object properties using standard dot-notation pathways.
 * ```ts
 * const config: LocalResponseManipulationConfig = {
 *   enabled: true,
 *   rules: [
 *     {
 *       field: "auth.user.password",
 *       replacement: "########",
 *     }
 *   ]
 * };
 * // Input:  { auth: { user: { password: "superSecretPassword" } } }
 * // Output: { auth: { user: { password: "########" } } }
 * ```
 */
export const responseManipulationConfig: LocalResponseManipulationConfig = {
  enabled: true,
  maxDepth: 10,
  rules: [
    {
      field: "auth.user.password",
      replacement: "########",
    },
    {
      field: "api_key",
      preserve: 4,
    },
    {
      // Intercept and wipe database system definitions and engine types globally across all strings
      valuePattern:
        /(?:PrismaClientKnownRequestError|Invalid .* invocation|PostgreSQL|MySQL|MongoDB|SQLite|driver|datasource)/gi,
      replacement: "[DB_ERROR]",
    },
  ],
};
