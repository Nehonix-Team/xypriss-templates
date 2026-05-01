import { Router } from "xypriss";
import { manifest } from "../configs/manifest";
// xfpm:{{ROUTE_EXTRA_IMPORT}}


/**
 * Authentication Router
 * 
 * Manages identity-related traffic within the isolated `/auth` scope.
 */
const router = Router();

/**
 * Authentication Root Endpoint
 * 
 * Responds with server identity and application manifest metadata.
 */
router.get("/", (req, res) => {
  return res.success("Hello World from XyPriss!", {
    serverType: "auth",
    ...manifest,
  });
});

// xfpm:{{ROUTE_EXTRA_LOGIC}}


export { router as authRouter };
