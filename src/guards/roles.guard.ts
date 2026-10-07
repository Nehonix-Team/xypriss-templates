import { ReqWithSess } from "types/all";

/**
 * XyPriss Role-Based Access Control (RBAC) Guard
 * 
 * Verifies that the authenticated user possesses one of the required roles.
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
