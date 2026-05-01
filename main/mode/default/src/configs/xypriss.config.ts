/**
 * XyPriss Default Server Configuration
 *
 * Configured for a standard, single-instance server operation.
 */

import { manifest } from "./manifest";

export const serverConfigs: ServerOptions = {
  /**
   * Server instance configuration.
   * Defines the port and primary identification for this server.
   */
  server: {
    autoKillConflict: true,
    port: __sys__.vars.__PORT__,
    serviceName: manifest.name,
    // xfpm:{{SERVER_EXTRA_CONFIG}}
  },


  // xfpm:{{SECURITY_CONFIG}}

  // xfpm:{{GUARDRAILS_CONFIG}}

  // xfpm:{{STORAGE_CONFIG}}
};

