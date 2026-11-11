import { corsOrigins } from "./corsOrigins";

type T<N> = NonNullable<N>;

export type csrfTypes = Extract<T<ServerOptions["security"]>["csrf"], object>;

/**
 * Cross-Site Request Forgery (CSRF) Protection Configuration.
 *
 * Configures the built-in Double-Submit Cookie pipeline protection.
 * Note: A `secret` property must be provided via your environment variables when enabling this in production.
 *
 * @see {@link https://xypriss.nehonix.com/docs/security/csrf | XyPriss CSRF Documentation}
 */
export const csrfConfig: csrfTypes = {
  /**
   * Toggles the CSRF protection middleware pipeline.
   * @type {boolean}
   * @default true
   * @warning Setting this to `false` disables all CSRF protection! Ensure this is only done intentionally (e.g., in testing).
   */
  enabled: false,

  /**
   * Array of cross-origin domains or RegExp patterns permitted to bypass the CSRF check.
   * Useful for accommodating local development ports or microservice subdomains.
   * @type {(string | RegExp)[]}
   * @default []
   */
  trustedOrigins: corsOrigins,

  /**
   * The key name used for the incoming/outgoing CSRF session cookie.
   * @type {string}
   * @default "__Host-csrf-token"
   */
  cookieName: "csrf-token",

  /**
   * Enables automatic XSRF-TOKEN cookie injection.
   * When true, it automatically exposes a non-HttpOnly token to front-end HTTP clients (like Axios)
   * so they can seamlessly read and attach it to subsequent state-mutating requests.
   * @type {boolean | object}
   * @default true
   */
  doubleSubmitCookie: true,

  /**
   * Settings controlling the tracking behavior, network lifecycle, and security profile of the CSRF cookie.
   */
  cookieOptions: {
    /**
     * Restricts cookie transmission exclusively over encrypted (HTTPS) connections.
     * @type {boolean}
     * @default true (in production environments)
     * @warning `false` should strictly be used in local development over HTTP.
     */
    secure: false,

    /**
     * Controls whether cookies are sent with cross-site requests.
     * `lax` protects users while balancing cross-site navigation convenience.
     * @type {"strict" | "lax" | "none" | boolean}
     * @default "strict"
     */
    sameSite: "lax",

    /**
     * Prevents client-side scripts from reading this particular session cookie.
     * @type {boolean}
     * @default true
     * @warning `false` allows client-side JavaScript access. Ensure your architecture requires this before keeping it disabled.
     */
    httpOnly: false,
  },
};
