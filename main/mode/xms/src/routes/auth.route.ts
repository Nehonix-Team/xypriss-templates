import { Router } from "xypriss";
import { manifest } from "../configs/manifest";

const router = Router();

router.get("/", (req, res) => {
  return res.success("Hello World from XyPriss!", {
    serverType: "auth",
    ...manifest,
  });
});

export { router as authRouter };
