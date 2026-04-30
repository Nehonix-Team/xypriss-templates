import { createServer } from "xypriss";
import { serverConfigs } from "./configs/xypriss.configs";

const app = createServer(serverConfigs);



app.start();
