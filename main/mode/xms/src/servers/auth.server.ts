import { MultiServerConfig } from "xypriss";
import { xmsc } from "../configs/xms.config";

export const authServer: MultiServerConfig = {
  id: xmsc.auth.id,
  port: xmsc.auth.port,
  routePrefix: "/auth",
  cluster: {
    enabled: false, // you can enable it on production if you want
  },
};
