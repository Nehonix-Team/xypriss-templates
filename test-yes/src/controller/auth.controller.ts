import { Send, XyPrisResponse } from "xypriss";
import { ReqWithSess } from "../types/all";
import { AuthService } from "../services/auth.service";

export class AuthController {
  /**
   * POST /auth/login
   */
  static async login(req: ReqWithSess, res: XyPrisResponse) {
    const send = new Send(res);
    const { email, password } = (req.body as any) || {};

    if (!email || !password) {
      return send.badRequest("Email and password are required.");
    }

    try {
      const result = await AuthService.login(email, password);
      return send.ok("Login successful", result);
    } catch (err: any) {
      return send.internalError("Authentication failed: " + (err?.message || "Unknown error"));
    }
  }

  /**
   * POST /auth/register
   */
  static async register(req: ReqWithSess, res: XyPrisResponse) {
    const send = new Send(res);
    const { email, name } = (req.body as any) || {};

    if (!email || !name) {
      return send.badRequest("Email and name are required.");
    }

    try {
      const user = await AuthService.register(email, name);
      return send.created("User registered successfully", { user });
    } catch (err: any) {
      return send.internalError("Registration failed: " + (err?.message || "Unknown error"));
    }
  }

  /**
   * GET /auth/me (Protected by authGuard)
   */
  static async me(req: ReqWithSess, res: XyPrisResponse) {
    const send = new Send(res);
    return send.ok("Authenticated user profile", { user: req.user });
  }
}
