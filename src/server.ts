/**
 * XyPriss Application Bootstrap & Server Lifecycle
 *
 * Primary entry point responsible for:
 * 1. Initializing the XyPriss server instance with declarative configuration.
 * 2. Mounting global security and validation guards.
 * 3. Registering the multi-server router gateway.
 * 4. Establishing sandboxed static asset delivery routes via `XStatic`.
 * 5. Commencing network listening on configured ports.
 *
 * @module server
 * @see https://xypriss.nehonix.com/docs/getting-started/server-lifecycle
 */

import { createServer, XStatic } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";
import { router } from "./router";
import { guardsRunner } from "./guards/index.guard";
import {
  permanentCdnPath,
  publicCdnPath,
  publicCdnTmpPath,
} from "./const/cdnPaths";
import { hashPassword } from "./utils/crypto";

/**
 * Global XyPriss Server Instance configured with multi-server topology.
 */
const app = createServer(serverConfigs);

// 1. Initialize security, authentication, and role guards
guardsRunner();

// 2. Mount central multi-server routing topology
app.use("/", router);

// 3. Configure secure static asset sandboxing with XStatic
const xs = new XStatic(app, __sys__);

// Sandboxed temporary uploads (confined within XyPriss tmpUserDir)
xs.define(publicCdnTmpPath, __sys__.path.tmpUserDir, {
  allowOutsideRoot: true, // Allows targeting /tmp/nehonix.xypriss.data/xuser/
  allowOutsideDir: false, // Prevents any directory traversal outside tmpUserDir
});

// Permanent production assets
xs.define(publicCdnPath, permanentCdnPath, {
  allowOutsideRoot: false,
  allowOutsideDir: false,
});

// 4. Start the server listener and event loop
app.start();
