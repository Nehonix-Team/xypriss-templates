import { authServer } from "../servers/auth.server";
import { mainServer } from "../servers/main.server";


export const serverConfigs: ServerOptions = {
  multiServer: {
    enabled: true,
    servers: [authServer, mainServer],
  },
};
