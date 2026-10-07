import { MultiServerConfig } from "xypriss";
import { servers } from "../configs/servers.config";

// console.log("servers: ", servers);

/**
 * Authentication Server Definition
 */
export const authServer: MultiServerConfig = {
  id: servers.auth.id,
  port: servers.auth.port,
  routePrefix: "/auth",
};
