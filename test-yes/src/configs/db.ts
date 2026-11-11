import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../db/schema";

const { Pool } = pg;

// =============================================================================
// Database Configuration & Connection Pool (Drizzle ORM)
// =============================================================================
// In XyPriss, direct access to `process.env` is restricted and blocked at the
// OS/runtime level by libXESS (Bipolar Zero-Trust Confinement).
//
// 1. Driver connection variables (`DATABASE_URL`, `PG*`, etc.) must be declared
//    in the environment shield whitelist via `__sys__.__env__.configureShield`
//    to allow the underlying `pg` driver to read its internal options securely.
// 2. Application code must always retrieve variables through `__sys__.__env__.get()`.
// 3. Fallback to `process.env` is strictly reserved for external CLI tooling
//    (e.g., `drizzle-kit push / generate`) running outside the XyPriss sandbox.
// =============================================================================
// @see https://xypriss.nehonix.com/docs/security/environment-shield

if (typeof __sys__ !== "undefined" && __sys__.__env__?.configureShield) {
  __sys__.__env__.configureShield({
    whitelist: [
      "DATABASE_URL",
      "PGPORT",
      "PGBINARY",
      "PGOPTIONS",
      "PGSSLNEGOTIATION",
      "PGCLIENT_ENCODING",
      "PGREPLICATION",
      "PGAPPNAME",
      "PGCONNECT_TIMEOUT",
      "PGUSER",
      "PGDATABASE",
      "PGHOST",
      "PGPASSWORD",
      "PGSSLMODE",
      "NODE_ENV",
    ],
  });
}

const connectionString =
  typeof __sys__ !== "undefined" && __sys__.__env__
    ? __sys__.__env__.get("DATABASE_URL") ||
      __sys__.__env__.getStrict("DATABASE_URL") // which will throw an error if the variable is not found
    : process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  max: 15,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  keepAlive: true,
});

pool.on("error", (err) => {
  console.warn("PostgreSQL pool warning (idle disconnect):", err.message);
});

export const db = drizzle(pool, { schema });
export default db;
