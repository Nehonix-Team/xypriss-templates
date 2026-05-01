import { MultiServerConfig } from "xypriss";
import { xmsc } from "../configs/xms.config";

/**
 * Main API Server Configuration
 * 
 * Defines the operational parameters for the primary API service instance.
 * Includes advanced security configurations such as honeypot tarpits to 
 * mitigate automated scanning and bot activity.
 */
export const mainServer: MultiServerConfig = {
  /** Unique identifier for the main service instance */
  id: xmsc.main.id,
  /** Network port assignment */
  port: xmsc.main.port,
  /** URL path scope for this server instance */
  routePrefix: "/api",
  /** Security middleware configuration */
  security: {
    /** 
     * Activates a tarpit mechanism for suspected bot traffic.
     * Intentionally slows down response times for identified malicious actors 
     * to consume their resources and discourage further attacks.
     */
    honeypotTarpit: true,
  },
  /** Horizontal scaling configuration */
  cluster: {
    /** 
     * Indicates whether the server should run in a multi-process cluster mode.
     * Recommendation: Enable in production environments for high availability. 
     */
    enabled: false,
  },
};
