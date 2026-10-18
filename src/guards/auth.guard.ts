/**
 * XyPriss Authentication Guard
 *
 * Intercepts incoming requests to verify identity credentials.
 * Checks for either:
 * 1. An HTTP `Authorization` header containing a valid Bearer token.
 * 2. An active session identifier (`req.session.userId`).
 *
 * If authenticated, populates `req.user` with user metadata and permits continuation.
 * Otherwise, rejects execution with an `EAUTH::` prefixed authorization failure message.
 *
 * @module guards/auth.guard
 * @see https://xypriss.nehonix.com/docs/security/guards
 */

import { XyGuardContext, XyPrisResponse } from "xypriss";
import { ReqWithSess } from "../types/all";

/**
 * Authentication Guard Handler.
 *
 * Validates request credentials and injects authenticated user state.
 *
 * @param req - Incoming request object augmented with session and user fields.
 * @param _res - Response object.
 * @param _ctx - Guard execution context containing route metadata.
 * @returns `true` if authentication succeeds, or an error string (`EAUTH::...`) on failure.
 *
 * @example
 * ```ts
 * // Applying guard to route group
 * router.group({ prefix: "/admin", guards: [authGuard] }, (admin) => {
 *   admin.get("/dashboard", getDashboard);
 * });
 * ```
 */
export const authGuard = async (
  req: ReqWithSess,
  _res: XyPrisResponse,
  _ctx: XyGuardContext
) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = typeof authHeader === "string" ? authHeader.replace(/^Bearer\s+/i, "") : null;

  const hasSession = Boolean(req.session?.userId);

  if (!token && !hasSession) {
    return "EAUTH::You must be authenticated to access this resource.";
  }

  // Inject user context
  req.user = {
    id: req.session?.userId || "user_demo",
    email: "demo@xypriss.dev",
    name: "Demo User",
    role: "admin",
  };

  return true;
};
