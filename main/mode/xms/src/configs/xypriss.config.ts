import { authServer } from "../servers/auth.server";
import { mainServer } from "../servers/main.server";

/**
 * XyPriss Multi-Server (XMS) Orchestration Configuration
 * 
 * XMS is a high-performance orchestration mode enabling the execution of 
 * multiple isolated server instances within a single Node.js process. 
 * This architecture facilitates resource sharing while maintaining 
 * strict isolation for security policies, caching, and routing scopes.
 * 
 * @see https://github.com/Nehonix-Team/XyPriss/blob/master/docs/config/multi-server.md
 */

/**
 * Global Server Options
 * 
 * Defines the operational parameters for the XyPriss engine, including 
 * multi-server activation and registration of managed server instances.
 */
export const serverConfigs: ServerOptions = {
  multiServer: {
    enabled: true,
    servers: [authServer, mainServer],
  },
};
