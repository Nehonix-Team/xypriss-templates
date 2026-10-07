import { Router, Send } from "xypriss";
import { CdnController } from "../controller/cdn.controller";

const r = Router();

r.get("/", (_req, res) => {
  const send = new Send(res);
  return send.ok("CDN Service is running", {
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

r.get("/files", CdnController.listFiles);
r.post("/upload", CdnController.upload);

export const cdnRouter = r;
export default r;
