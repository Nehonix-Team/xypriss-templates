import { __sys__ } from "xypriss";

/**
 * CDN and Static File Paths
 */
export const publicCdnPath = "/public/";
export const publicCdnTmpPath = "/static/tmp/";
export const permanentCdnPath = __sys__.path.resolve(
  "uploads",
  "public",
  "assets"
);
