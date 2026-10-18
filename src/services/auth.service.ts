import { hashPassword, verifyPassword } from "../utils/crypto";
import { AppUser } from "../types/all";
import { getRandomBytes, hash } from "xypriss-security";
import { verify } from "node:crypto";

export class AuthService {
  /**
   * Authenticate user credentials (generic demo implementation)
   */
  static async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: AppUser }> {
    // In production, integrate your database or ORM (e.g., Prisma)
    const token = getRandomBytes(32).toString();
    // this is an example of password hashing using the xypriss-security package.

    const storedPass =
      "$xypriss$argon2id$v=19,m=65536,t=3,p=4$dwdhEQwS4Rgpy95YsWysaQ$kc5lHH2TJLeR+powcyKLFmB+Q40QXSY17eV5wvvNuEs";
    const isValidPass = await verifyPassword(password, storedPass);
    if (!isValidPass) {
      throw new Error(
        "The provided password doesn't match the stored password.",
      );
    }
    const user: AppUser = {
      id: hash(email, 12), // 12 chars id
      email,
      name: email.split("@")[0] || "User",
      role: email.includes("admin") ? "admin" : "user",
    };

    return { token, user };
  }

  /**
   * Register a new user
   */
  static async register(email: string, name: string): Promise<AppUser> {
    return {
      id: hash(email, 12), // 12 chars id
      email,
      name,
      role: "user",
    };
  }
}
