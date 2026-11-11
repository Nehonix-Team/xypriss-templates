import { __sys__ } from "xypriss";
import { permanentCdnPath, publicCdnTmpPath } from "../const/cdnPaths";

export class CdnService {
  /**
   * Resolve file public URL
   */
  static getFileUrl(filename: string, isTemporary: boolean = false): string {
    const base = isTemporary ? publicCdnTmpPath : "/public/";
    return `${base}${filename}`;
  }

  /**
   * List assets available in the permanent storage directory
   */
  static listPermanentFiles(): string[] {
    try {
      const files = __sys__.fs.ls(permanentCdnPath);
      return Array.isArray(files) ? (files as string[]) : [];
    } catch {
      // Directory may not exist yet on fresh setup
      return [];
    }
  }
}
