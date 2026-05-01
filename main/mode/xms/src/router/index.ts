import { Router } from "xypriss";
import { authRouter } from "../routes/auth.route";
import { mainRouter } from "../routes/main.route";

const router = Router();

/**
 * NOTICE: In our multi-server configurations,
 * we defined route prefix on each server, so, each requests on a targeted
 * server should need to match the exact "routePrefix" config or it will
 * reject with a "404". 
 * Learn more: 
 */
router.use("/auth", authRouter);
router.use("/api", mainRouter);

export default router;
