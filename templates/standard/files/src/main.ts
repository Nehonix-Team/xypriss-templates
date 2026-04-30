import { createServer } from "xypriss";
import { serverConfigs } from "./configs/xypriss.configs";

/**
 * XyPriss Enterprise-Grade Backend
 * 
 * Secure by Default Architecture — Powered by XHSC
 */
async function startFortress() {
    // Initialize unified server instance
    const app = createServer(serverConfigs);

    // Root endpoint with success response
    app.get("/", (req, res) => {
        res.success("XyPriss Fortress is Operational", {
            status: "Secure",
            engine: "XHSC Native"
        });
    });

    // Start the high-performance engine
    await app.start();
}

startFortress().catch(err => {
    console.error("[XyPriss] Bootstrap Error:", err);
    process.exit(1);
});
