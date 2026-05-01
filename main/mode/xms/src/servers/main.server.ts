import { MultiServerConfig } from "xypriss";
import { xmsc } from "../configs/xms.config";

export const mainServer: MultiServerConfig = {
  id: xmsc.main.id,
  port: xmsc.main.port,
  routePrefix: "/api",
  security: {
    // for security reason to prevent bots from accessing the server
    // it will block it
    honeypotTarpit: true,
  },
  cluster: {
    enabled: false, // you can enable it on production if you want
  },
};
