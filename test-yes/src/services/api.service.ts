import { __sys__ } from "xypriss";

export class ApiService {
  /**
   * Health check and runtime telemetry
   */
  static getSystemHealth() {
    return {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      platform: process.platform,
      nodeVersion: process.version,
    };
  }

  /**
   * Example demo items fetcher
   */
  static getItems() {
    return [
      { id: "item_1", name: "High-Performance Router", category: "Core" },
      { id: "item_2", name: "XStatic Sandboxing", category: "Storage" },
      { id: "item_3", name: "XyGuard Runner", category: "Security" },
    ];
  }
}
