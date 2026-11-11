import { MultiServerConfig } from "xypriss";
import { servers } from "../configs/servers.config";

// console.log("servers: ", servers);

/**
 * Authentication Server Definition
 */
export const authServer: MultiServerConfig = {
  id: servers.auth.id,
  port: servers.auth.port,

  /**
   * Server-level route prefix restriction.
   *
   * Overrides and restricts the broader prefix list defined in `router.ts`
   * (`r.group({ prefix: ["/auth", "/api"], serverId: authServer.id })`):
   *
   * - Active (`routePrefix: "/auth"`):
   *   Strictly confines this server instance to the `/auth` namespace.
   *   Any request to other router group prefixes (e.g., `/api`) will bypass
   *   this server and return a 404 Not Found:
   *     - curl http://localhost:2761/auth ➜ 200 OK (Handled by authRouter)
   *     - curl http://localhost:2761/api  ➜ 404 Not Found (Rejected by server scope)
   *
   * - Disabled / Commented out:
   *   Inherits all matching prefixes configured in `router.ts` (`["/auth", "/api"]`):
   *     - curl http://localhost:2761/auth ➜ 200 OK (Handled by authRouter)
   *     - curl http://localhost:2761/api  ➜ 200 OK (Handled by authRouter)
   */
  // routePrefix: "/auth",
};
