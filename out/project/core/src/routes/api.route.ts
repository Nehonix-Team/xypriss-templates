import { Router, Send } from "xypriss";
import { ApiController } from "../controller/api.controller";

const r = Router();

r.get("/", (_req, res) => {
  const send = new Send(res);
  return send.ok("API Service is running", {
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

r.get("/health", ApiController.health);
r.get("/items", ApiController.listItems);

export const apiRouter = r;
export default r;
