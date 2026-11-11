import { ServerOptions } from "xypriss";

type T<k> = NonNullable<k>;

type SecurityConfig = T<ServerOptions["security"]>;
type CorsConfigOnly = Extract<T<SecurityConfig["cors"]>, object>;

// Extract ONLY the array portion from the origin union
type CorsOriginType = Extract<CorsConfigOnly["origin"], any[]>;

// This forces corsOrigins to strictly be an array structure
export const corsOrigins: CorsOriginType = [
  "localhost:*", // Allow any localhost port
  "127.0.0.1:*", // Allow any 127.0.0.1 port
  "*.myapp.com", // Allow any subdomain
  "https://app.prod.com", // Exact production URL
  // Learn more at: https://xypriss.nehonix.com/docs/security/cors
];
