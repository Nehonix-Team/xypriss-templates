/**
 * XyPriss Enterprise Server Configuration
 */
import { Configs, Send, ServerOptions } from "xypriss";
import { manifest } from "./manifest";
import { timeoutCfg } from "../const/timeout";
import { authServer } from "../servers/auth.server";
import { mainServer } from "../servers/api.server";
import { cdnServer } from "../servers/cdn.server";
import { xemsConfig } from "./xemsConfigs";
import { corsOrigins } from "const/corsOrigins";
import { csrfConfig } from "const/csrfCfg";
import { responseManipulationConfig } from "const/responseC";

export const serverConfigs: ServerOptions = {
  cluster: {
    enabled: false,
  },

  network: {
    connection: {
      http2: {
        enabled: true,
      },
    },
  },
  conversion: {
    enabled: true,
  },
  responseManipulation: responseManipulationConfig,
  env: __sys__.__env__.mode as any,
  requestManagement: {
    timeout: {
      defaultTimeout: timeoutCfg,
      onTimeout(_req, res) {
        const send = new Send(res);
        send.requestTimeout(
          "ETIMOUT::The request took longer than expected to process. Please retry.",
        );
        return;
      },
    },
  },
  security: {
    rateLimit: {
      max: 120,
      windowMs: 1000,
      /**
       * XyPriss Temporal Rate Shield (XTRS)
       *
       * XTRS is an enterprise-grade security module for the XyPriss web framework
       * that executes multi-window rate limiting directly at the native XHSC Go engine layer.
       * The module features concurrent sliding window evaluation,
       * human-readable temporal expression configurations, custom lock durations,
       * and granular response controls across global or route-specific scopes.
       * You can read the full documentation at https://xypriss.nehonix.com/docs/security/xtrs-rate-limiting.
       */
      xtrs: {},
    },
    cors: {
      origin: corsOrigins,
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
      ],
    },
    csrf: csrfConfig,
  },
  server: {
    autoKillConflict: true,
    port: Number(__sys__.__env__.get("PORT")),
    serviceName: manifest.name,
    // This will attach `res.xLink` of "mainServer" to "session" -> Accessible via `req.session`
    // learn more at:  https://xypriss.nehonix.com/docs/security/xems/tutorial
    xems: xemsConfig({
      path: "data/server.xems",
      cookieName: `${manifest.name}.xems`,
      attachTo: "session",
    }),
  },
  multiServer: {
    enabled: true,
    servers: [authServer, mainServer, cdnServer],
    quietStartup: true, // silence server startup logs
  },
};
