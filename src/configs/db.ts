import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

// Configure environment shield for PostgreSQL connection variables
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
    ],
  });
}

const connectionString =
  (typeof __sys__ !== "undefined" && __sys__.__env__?.get("DATABASE_URL")) ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/my_xypriss_app?schema=public";

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

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
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
  globalForPrisma.prisma = prisma;
}

export { prisma as db };
export default prisma;
