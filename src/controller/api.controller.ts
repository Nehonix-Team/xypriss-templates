import { Send, XyPrisRequest, XyPrisResponse } from "xypriss";
import { ApiService } from "../services/api.service";

export class ApiController {
  /**
   * GET /api/health
   */
  static health(_req: XyPrisRequest, res: XyPrisResponse) {
    const send = new Send(res);
    const health = ApiService.getSystemHealth();
    return send.ok("System healthy", health);
  }

  /**
   * GET /api/items
   */
  static listItems(_req: XyPrisRequest, res: XyPrisResponse) {
    const send = new Send(res);
    const items = ApiService.getItems();
    return send.ok("Items retrieved successfully", { items });
  }
}
