/**
 * Central Routing Gateway & Topology Dispatcher
 *
 * Directs incoming HTTP requests to dedicated sub-routers scoped by:
 * - URL path prefixes (e.g., `/api`, `/auth`, `/cdn`).
 * - XMS server node IDs (`mainServer.id`, `authServer.id`, `cdnServer.id`).
 *
 * In multi-server mode, requests arriving at individual server ports
 * are filtered and handled by the matching router group.
 *
 * @module router
 * @see https://xypriss.nehonix.com/docs/routing/router
 */

import { Router } from "xypriss";
import { apiRouter } from "./routes/api.route";
import { authRouter } from "./routes/auth.route";
import { cdnRouter } from "./routes/cdn.route";
import { mainServer } from "./servers/api.server";
import { authServer } from "./servers/auth.server";
import { cdnServer } from "./servers/cdn.server";

const r = Router();

// ============================== MAIN API SERVER ==============================
/**
 * Primary REST API gateway handling business logic and core services.
 *
 * Mapped to `mainServer.id` with dual prefix capability `["/api", "/"]`.
 * - If `mainServer.routePrefix: "/api"` is active in `api.server.ts`,
 *   only `/api` requests reach this group (`/` yields 404).
 * - If `mainServer.routePrefix` is commented out / omitted,
 *   both `/api` and `/` resolve to `apiRouter`.
 */
r.group({ prefix: ["/api", "/"], serverId: mainServer.id }, (api) => {
  api.use("/", apiRouter);
});

// ============================== AUTH SERVER ==============================
/** Dedicated authentication server handling login, registration, and tokens. */
r.group({ prefix: ["/auth", "/api"], serverId: authServer.id }, (auth) => {
  auth.use("/", authRouter);
});

// ============================== CDN SERVER ==============================
/** Content Delivery Network (CDN) server handling media and asset delivery. */
r.group({ prefix: "/cdn", serverId: cdnServer.id }, (cdn) => {
  cdn.use("/", cdnRouter);
});

export { r as router };

export default r;
