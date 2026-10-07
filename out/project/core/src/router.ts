import { Router } from "xypriss";
import { apiRouter } from "./routes/api.route";
import { authRouter } from "./routes/auth.route";
import { cdnRouter } from "./routes/cdn.route";
import { mainServer } from "./servers/api.server";
import { authServer } from "./servers/auth.server";
import { cdnServer } from "./servers/cdn.server";

const r = Router();

// ============================== MAIN API SERVER ==============================
r.group({ prefix: ["/api", "/"], serverId: mainServer.id }, (api) => {
  api.use("/", apiRouter);
});

// ============================== AUTH SERVER ==============================
r.group({ prefix: ["/auth", "api"], serverId: authServer.id }, (auth) => {
  auth.use("/", authRouter);
}); 

// ============================== CDN SERVER ==============================
r.group({ prefix: "/cdn", serverId: cdnServer.id }, (cdn) => {
  cdn.use("/", cdnRouter);
});

export { r as router };
export default r;
