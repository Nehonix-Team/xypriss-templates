/**
 * Role-Based Access Control (RBAC) Guard
 *
 * Verifies that the authenticated user possesses at least one of the authorized
 * roles required by the targeted route or operation.
 *
 * @module guards/roles.guard
 * @see https://xypriss.nehonix.com/docs/security/rbac
 */

import { ReqWithSess } from "../types/all";

/**
 * Role-Based Access Control Validator.
 *
 * Inspects `req.user.role` against an array of allowed roles.
 *
 * @param req - Request object containing the populated `req.user` context.
 * @param requiredRoles - Array of role strings allowed to access the route (e.g., `["admin", "moderator"]`).
 * @returns `true` if authorization succeeds, or an error description string on rejection.
 *
 * @example
 * ```ts
 * // Route-level RBAC guard invocation
 * router.delete("/users/:id", (req, res) => {
 *   const check = rolesGuard(req, ["admin", "superadmin"]);
 *   if (check !== true) {
 *     return res.status(403).json({ error: check });
 *   }
 *   // Proceed with user deletion...
 * });
 * ```
 */
export const rolesGuard = (req: ReqWithSess, requiredRoles: string[]) => {
  const user = req?.user;
  if (!user) {
    return "EAUTH::User context missing. Authentication required before role check.";
  }

  const role = user.role || "guest";
  if (requiredRoles.includes(role)) {
    return true;
  }

  return "Access denied: insufficient permissions to perform this operation.";
};
