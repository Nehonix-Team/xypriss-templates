import { ServerOptions } from "xypriss";

/**
 * XyPriss Server Configuration
 * 
 * This object is merged with the base configuration from xypriss.config.jsonc
 */
export const serverConfigs: ServerOptions = {
    server: {
        trustProxy: true,
    },
    security: {
        enabled: true,
        level: "standard"
    }
};
