import { obj } from "helpers/obj";
import { __sys__ } from "xypriss";

/**
 * XyPriss Multi-Server (XMS) Topology Configuration
 *
 * Dynamically resolves port and node identity from xypriss.config.jsonc ($vars.servers).
 */
const S = obj.of(__sys__.vars.get("servers"));

export const servers: IServers = S.value();

if (!S.isAllEmpty()) {
  for (const srv of S.keys()) {
    servers[srv as keyof IServers].port = Number(
      servers[srv as keyof IServers].port,
    );
  }
}

export interface IServers {
  // Auth server authentification
  auth: {
    port: number;
    id: string;
  };
  main: {
    port: number;
    id: string;
  };
  cdn: {
    port: number;
    id: string;
  };
}
