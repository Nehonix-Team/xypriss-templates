import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

// =============================================================================
// Database Configuration & Connection Pool (Prisma ORM v7)
// =============================================================================
// In XyPriss, direct access to `process.env` is restricted and blocked at the
// OS/runtime level by libXESS (Bipolar Zero-Trust Confinement).
//
// 1. Driver connection variables (`DATABASE_URL`, `PG*`, `PRISMA_*`, etc.) must
//    be declared in the environment shield whitelist via `__sys__.__env__.configureShield`
//    so that the underlying `pg` driver and Prisma runtime can operate securely.
// 2. Application code must always retrieve variables through `__sys__.__env__.get()`.
// 3. Fallback to `process.env` is strictly reserved for external CLI tooling
//    (e.g., `prisma db push / generate`) running outside the XyPriss sandbox.
// =============================================================================
// @see https://xypriss.nehonix.com/docs/security/environment-shield

if (typeof __sys__ !== "undefined" && __sys__.__env__?.configureShield) {
  __sys__.__env__.configureShield({
    whitelist: [
      "DATABASE_URL",
      "DIRECT_URL",
      "PGPORT",
      "PGBINARY",
      "PGOPTIONS",
      "PGSSLNEGOTIATION",
      "PGCLIENT_ENCODING",
      "PGREPLICATION",
      "PGAPPNAME",
      "PGCONNECT_TIMEOUT",
      "PRISMA_CLIENT_GET_TIME",
      "PGUSER",
      "PGDATABASE",
      "PGHOST",
      "PGPASSWORD",
      "PGSSLMODE",
      "NO_COLOR",
      "DEBUG_COLORS",
      "NODE_ENV",
    ],
  });
}

const connectionString =
  typeof __sys__ !== "undefined" && __sys__.__env__
    ? __sys__.__env__.get("DATABASE_URL") ||
      __sys__.__env__.getStrict("DATABASE_URL") // which will throw an error if the variable is not found
    : process.env.DATABASE_URL;

// Initialize PostgreSQL driver adapter with connection pooling
const pool = new Pool({
  connectionString,
  max: 15,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  keepAlive: true,
});

pool.on("error", (err) => {
  console.warn("PostgreSQL pool warning (idle disconnect):", err.message);
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

let _prismaInstance: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  if (_prismaInstance) {
    return _prismaInstance;
  }
  if (globalForPrisma.prisma) {
    _prismaInstance = globalForPrisma.prisma;
    return _prismaInstance;
  }
  try {
    _prismaInstance = new PrismaClient({
      adapter,
      log:
        (typeof __sys__ !== "undefined" && __sys__.__env__?.isDevelopment()) ||
        process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
    });
    if (
      (typeof __sys__ !== "undefined" && __sys__.__env__?.isDevelopment()) ||
      process.env.NODE_ENV !== "production"
    ) {
      globalForPrisma.prisma = _prismaInstance;
    }
    return _prismaInstance;
  } catch (err: any) {
    console.error(
      "\n\x1b[31m[DATABASE ERROR]\x1b[0m Prisma Client is not initialized yet.\n" +
        "  → Please run: \x1b[36mxfpm run db:generate\x1b[0m (or \x1b[36mxfpmx prisma generate\x1b[0m)\n",
    );
    throw err;
  }
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

export { prisma as db };
export default prisma;
