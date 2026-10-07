import { XyGuard } from "xypriss";
import { authGuard } from "./auth.guard";
import { rolesGuard } from "./roles.guard";

/**
 * XyPriss Guards Runner
 * 
 * Registers all declared guards into the global XyGuard registry at server boot.
 * Once defined, guards can be attached directly to route definitions:
 * 
 * @example
 * router.get("/admin", { guards: { authenticated: true, roles: ["admin"] } }, handler);
 */
export function guardsRunner() {
  XyGuard.define("authenticated", authGuard);
  XyGuard.define("roles", rolesGuard);
}
