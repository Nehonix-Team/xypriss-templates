import { createServer } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";

const app = createServer(serverConfigs);

app.start();
