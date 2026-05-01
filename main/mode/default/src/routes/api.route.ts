import { Router } from "xypriss";
import { manifest } from "../configs/manifest";
// xfpm:{{ROUTE_EXTRA_IMPORT}}


/**
 * Default API Router
 * 
 * Manages core application business logic.
 */
const router = Router();

/**
 * API Root Endpoint
 * 
 * Responds with application manifest metadata.
 */
router.get("/", (req, res) => {
  return res.success("Hello World from XyPriss!", {
    mode: "default",
    ...manifest,
  });
});

// xfpm:{{ROUTE_EXTRA_LOGIC}}


export { router as apiRouter };
