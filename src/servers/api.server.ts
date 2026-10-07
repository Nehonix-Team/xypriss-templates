import { MultiServerConfig } from "xypriss";
import { servers } from "../configs/servers.config";

/**
 * Main API Server Definition (REST API)
 */
export const mainServer: MultiServerConfig = {
  id: servers.main.id,
  port: servers.main.port,
  routePrefix: "/api",
};
