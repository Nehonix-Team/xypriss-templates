/**
 * XyPriss Multi-Server (XMS) Topology Configuration
 *
 * Dynamically resolves port bindings and node identities from `xypriss.config.jsonc` (`$vars.servers`).
 * In XMS multi-node architecture, the application is split into discrete server processes:
 * - **Auth Node**: Dedicated authentication, token issuance, and credential validation.
 * - **Main Node**: Primary business logic, REST APIs, and transactional workflows.
 * - **CDN Node**: Static assets, file streaming, public upload pipelines, and caching.
 *
 * @module configs/servers.config
 * @see https://xypriss.nehonix.com/docs/architecture#multi-overview
 */

import { obj } from "../utils/obj";
import { __sys__, Configs } from "xypriss";

/**
 * Fluent object wrapper over configuration variables.
 */
const S = obj.of(__sys__.vars.get("servers"));

console.log("S: ", __sys__.vars.get("manifest"));

if (!S) {
  throw new Error("Servers configuration is not defined.");
}

/**
 * Resolved Multi-Server Topology Map.
 *
 * Contains configured port numbers and node IDs for each server in the cluster.
 * Ensures all port values are strongly coerced to primitive numbers.
 */
export const servers: IServers = S.value();

if (!S.isAllEmpty()) {
  for (const srv of S.keys()) {
    servers[srv as keyof IServers].port = Number(
      servers[srv as keyof IServers].port,
    );
  }
}

/**
 * Node descriptor defining network binding port and unique server identifier.
 */
export interface IServerNode {
  /** Network TCP port where the server node listens. */
  port: number;
  /** Unique cluster-wide server identity string. */
  id: string;
}

/**
 * Multi-Server Cluster Topology Interface.
 */
export interface IServers {
  /** Authentication server node handling logins, sessions, and token issuance. */
  auth: IServerNode;
  /** Primary business logic and API gateway server node. */
  main: IServerNode;
  /** Content Delivery Network (CDN) server node handling static files and media. */
  cdn: IServerNode;
}
