import { MultiServerConfig } from "xypriss";
import { servers } from "../configs/servers.config";

/**
 * Main API Server Definition (REST API)
 */
export const mainServer: MultiServerConfig = {
  id: servers.main.id,
  port: servers.main.port,
  /**
   * Server-level route prefix restriction.
   *
   * Controls the admitted URL namespaces defined in `router.ts`
   * (`r.group({ prefix: ["/api", "/"], serverId: mainServer.id })`):
   *
   * - Active (`routePrefix: "/api"`):
   *   Confines this server instance strictly to the `/api` namespace.
   *   Requests to the root `/` will be rejected by this server:
   *     - curl http://localhost:1209/api ➜ 200 OK (Handled by apiRouter)
   *     - curl http://localhost:1209/    ➜ 404 Not Found (Rejected by server scope)
   *
   * - Disabled / Commented out:
   *   Inherits all prefixes declared for `mainServer.id` in `router.ts` (`["/api", "/"]`):
   *     - curl http://localhost:1209/api ➜ 200 OK (Handled by apiRouter)
   *     - curl http://localhost:1209/    ➜ 200 OK (Handled by apiRouter on root)
   */
  routePrefix: "/api",
};
