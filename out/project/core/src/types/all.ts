import { LoginOrRegisterRequestSchema } from "schemas/auth.schema";
import { XyPrisRequest } from "xypriss";

export type LoginOrRegisterRequest = typeof LoginOrRegisterRequestSchema.types;

export type AppUser = LoginOrRegisterRequest & {
  role: "admin" | "user" | "guest";
  id: string;
};

export interface ISessData {
  userId: string;
  sessionId: string;
  role?: string;
  [key: string]: any;
}

/**
 * XyPriss Request enriched with authenticated user and session context
 */
export type ReqWithSess = Omit<XyPrisRequest, "user" | "session"> & {
  session?: ISessData;
  user?: AppUser;
};

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  data?: T;
  timestamp: string;
}
