import { Router } from "xypriss";
import { authRouter } from "../routes/auth.route";
import { mainRouter } from "../routes/main.route";
// xfpm:{{ROUTERS_IMPORT}}


/**
 * XyPriss Orchestration Router
 * 
 * Initialized as a high-performance router instance to manage traffic distribution.
 */
const router = Router();

/**
 * Route-to-Server Mapping Logic
 * 
 * In a XMS (XyPriss Multi-Server) environment, routes are isolated by server-specific prefixes.
 * Incoming requests must match the defined `routePrefix` of the target server 
 * instance. Failure to match these prefixes within the allocated server scope 
 * will result in a 404 (Not Found) response.
 * 
 * @see https://github.com/Nehonix-Team/XyPriss/blob/master/docs/routing/README.md
 */

/** Authentication scope mapping */
router.use("/auth", authRouter);

/** Main API scope mapping */
router.use("/api", mainRouter);
// xfpm:{{ROUTERS_USE}}


export default router;
