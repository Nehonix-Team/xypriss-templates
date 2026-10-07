import { XyGuardContext, XyPrisResponse } from "xypriss";
import { ReqWithSess } from "types/all";

/**
 * XyPriss Authentication Guard
 * 
 * Verifies the presence of a bearer token or active session.
 * Injects the authenticated user into `req.user`.
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
