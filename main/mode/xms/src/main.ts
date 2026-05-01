import { createServer } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";
import router from "./router";

const app = createServer(serverConfigs);

// XyPriss router is a powerfull tool that let's you create a
// powerfull router for your server. To learn more how to use it properly,
// check the documentation at:
// https://github.com/Nehonix-Team/XyPriss/tree/master/docs/routing
app.use("/", router);

app.start();
