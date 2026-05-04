/**
 * XyPriss Default Server Configuration
 *
 * Configured for a standard, single-instance server operation.
 */

import { __sys__ } from "xypriss";
import { manifest } from "./manifest";

export const serverConfigs: ServerOptions = {
  /**
   * Server instance configuration.
   * Defines the port and primary identification for this server.
   */
  server: {
    autoKillConflict: true,
    port: Number(__sys__.vars.__PORT__),
    serviceName: manifest.name,
    version: manifest.version,
  },
};
