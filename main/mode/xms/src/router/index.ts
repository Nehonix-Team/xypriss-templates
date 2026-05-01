import { Router } from "xypriss";
import { authRouter } from "../routes/auth.route";
import { mainRouter } from "../routes/main.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/api", mainRouter);

export default router;
