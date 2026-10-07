import { createServer, XStatic } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";
import { router } from "./router";
import { guardsRunner } from "./guards/index.guard";
import {
  permanentCdnPath,
  publicCdnPath,
  publicCdnTmpPath,
} from "./const/cdnPaths";
import { getRandomBytes } from "xypriss-security";

/**
 * XyPriss Server Instance
 *
 * Initializes the server engine using declarative enterprise configurations.
 */
const app = createServer(serverConfigs);
// 1. Start security and validation guards
guardsRunner();

// 2. Mount global application router
app.use("/", router);

// 3. Configure secure static asset sandboxing with XStatic
const xs = new XStatic(app, __sys__);

// Sandboxed temporary uploads (confined in XyPriss tmpUserDir)
xs.define(publicCdnTmpPath, __sys__.path.tmpUserDir, {
  allowOutsideRoot: true, // Allows targeting /tmp/nehonix.xypriss.data/xuser/
  allowOutsideDir: false, // Prevents any directory traversal outside tmpUserDir
});

// Permanent production assets
xs.define(publicCdnPath, permanentCdnPath, {
  allowOutsideRoot: false,
  allowOutsideDir: false,
});

// 4. Start the server lifecycle
app.start();
