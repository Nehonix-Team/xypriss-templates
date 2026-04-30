import { Request, Response, NextFunction } from "xypriss";

/**
 * Custom Security Middleware
 * 
 * This is an example of how to extend XyPriss security with custom logic.
 * Note: Core security (CSRF, Helmet, RateLimit) is handled via xypriss.config.jsonc.
 */
export function customSecurityGuard(req: Request, res: Response, next: NextFunction) {
    // Example: Block specific user agents or implement custom headers
    const userAgent = req.get("User-Agent") || "";
    
    if (userAgent.includes("MaliciousBot")) {
        return res.status(403).send("Access Denied");
    }

    next();
}
