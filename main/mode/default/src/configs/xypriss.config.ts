/**
 * XyPriss Default Server Configuration
 * 
 * This configuration is dynamically built using system variables defined
 * in xypriss.config.jsonc. This allows xfpm init to toggle features
 * without directly modifying the source code.
 */

export const serverConfigs: ServerOptions = {
  // -->{{SECURITY_CONFIG}}

  // -->{{GUARDRAILS_CONFIG}}
};
