import { authServer } from "../servers/auth.server";
import { mainServer } from "../servers/main.server";

/**
 * XyPriss Multi-Server (XMS) Orchestration Configuration
 * 
 * In XMS mode, security and guardrail settings are applied globally 
 * and inherited by all server instances unless overridden in specific 
 * server definitions.
 */

export const serverConfigs: ServerOptions = {
  // XMS Orchestration
  multiServer: {
    enabled: true,
    servers: [authServer, mainServer],
  },

  // -->{{SECURITY_CONFIG}}

  // -->{{GUARDRAILS_CONFIG}}
};
