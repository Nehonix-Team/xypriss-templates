import { Send, XyPrisRequest, XyPrisResponse } from "xypriss";
import { CdnService } from "../services/cdn.service";

export class CdnController {
  /**
   * GET /cdn/files
   */
  static listFiles(_req: XyPrisRequest, res: XyPrisResponse) {
    const send = new Send(res);
    const files = CdnService.listPermanentFiles();
    return send.ok("Permanent assets retrieved", { files });
  }

  /**
   * POST /cdn/upload
   */
  static upload(req: any, res: XyPrisResponse) {
    const send = new Send(res);
    const uploadedFile = req.file || (req.files && req.files[0]);

    if (!uploadedFile) {
      return send.badRequest("No file uploaded.");
    }

    return send.created("File uploaded successfully", {
      filename: uploadedFile.filename || uploadedFile.name,
      size: uploadedFile.size,
      url: CdnService.getFileUrl(uploadedFile.filename || uploadedFile.name),
    });
  }
}
