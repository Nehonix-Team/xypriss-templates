import { Router } from "xypriss";
import { apiRouter } from "../routes/api.route";
// xfpm:{{ROUTERS_IMPORT}}


/**
 * Main Application Router
 * 
 * Manages traffic distribution for the default server instance.
 */
const router = Router();

/** API scope mapping */
router.use("/api", apiRouter);


export default router;
