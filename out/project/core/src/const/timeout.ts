import { __sys__ } from "xypriss";

/**
 * Global Request Timeout Configuration
 */
export const timeoutCfg = Number(
  __sys__.__env__.get("SERVER_TIMEOUT", "30000")
);
