import { MultiServerConfig } from "xypriss";
import { servers } from "../configs/servers.config";
import { permanentCdnPath } from "../const/cdnPaths";

/**
 * CDN / Media Distribution Server Definition
 */
export const cdnServer: MultiServerConfig = {
  id: servers.cdn.id,
  port: servers.cdn.port,
  routePrefix: "/cdn",
  fileUpload: {
    enabled: true,
    maxFileSize: 1024 * 1024 * 15, // 15MB
    allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"],
    destination: permanentCdnPath,
  },
};
