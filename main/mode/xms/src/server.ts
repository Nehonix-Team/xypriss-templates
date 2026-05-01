import { createServer } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";
import router from "./router";

/**
 * XyPriss Server Instance
 * 
 * This is the main entry point for the XyPriss application. It initializes the 
 * server using the provided configurations and sets up the global routing 
 * architecture. 
 * 
 * The orchestration mode is determined by the `serverConfigs`, which in this 
 * template is configured for Multi-Server (XMS) operation.
 */
const app = createServer(serverConfigs);

/**
 * Global Router Integration
 * 
 * Mounts the main application router to the root path. The router manages
 * traffic distribution across multiple isolated server scopes.
 * 
 * @see https://github.com/Nehonix-Team/XyPriss/tree/master/docs/routing
 */
app.use("/", router);

/**
 * Server Lifecycle Initialization
 * 
 * Starts the server engine, binding defined instances to their respective 
 * ports and activating security middleware and orchestration logic.
 */
app.start();
