import { date } from "utils/date";
import { __sys__, XemsTypes } from "xypriss";

export interface XemsCustomConfigOptions {
  cookieName: string;
  path: string;
  sandbox?: string;
  attachTo?: string;
  ttl?: string;
  autoRotation?: boolean | string;
  gracePeriod?: number;
  secret?: string;
  cookieOptions?: {
    domain?: string;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
    httpOnly?: boolean;
    expires?: Date;
    signed?: boolean;
    path?: string;
  };
}

/**
 * Centralized generator for XEMS (XyPriss Encrypted Memory Store) configuration.
 * Enforces global security policies (AES-256-GCM, 1m rotation, 60s grace period, strict cookies).
 */
export function xemsConfig(options: XemsCustomConfigOptions): XemsTypes {
  const isDev = __sys__.__env__.isDevelopment();

  return {
    cookieName: options.cookieName,
    sandbox: options.sandbox,
    attachTo: options.attachTo,
    cookieOptions: {
      domain: isDev ? undefined : ".yourdomain.com", // change "yourdomain.com" with your production domain
      sameSite: isDev ? "Lax" : "None",
      secure: !isDev,
      httpOnly: true,
      expires: date.from("7d"), // 7 days
      signed: true,
      ...options.cookieOptions,
    },
    ttl: options.ttl || "7d", // 7 days
    autoRotation: options.autoRotation ?? "1m",
    gracePeriod: options.gracePeriod ?? 60 * 1000, // 1 minute in ms
    enable: true,
    path: options.path,
    secret:
      options.secret ||
      __sys__.__env__.get("XEMS_SECRET") ||
      __sys__.__env__.getStrict("XEMS_SECRET"),
  };
}
