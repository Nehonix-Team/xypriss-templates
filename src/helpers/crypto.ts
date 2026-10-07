/**
 * Cryptographic & Password Management Utilities
 *
 * Provides enterprise-grade, OWASP-aligned password hashing and verification
 * powered by `xypriss-security` and the Argon2id memory-hard algorithm.
 *
 * Key Security Features:
 * - **Argon2id Hybrid Algorithm**: Defends against GPU/ASIC brute-force cracking
 *   via enforced memory consumption (64 MB per hash) and resists side-channel attacks.
 * - **Pepper Defense Layer**: Integrates server-level secrets via `PASSWORD_PEPPER`
 *   to mitigate database leak vulnerabilities.
 * - **Constant-Time Verification**: Prevents timing attacks during credential validation.
 *
 * @see https://xypriss.nehonix.com/docs/security/password-manager
 */

import { PasswordManager } from "xypriss-security";

/**
 * Global PasswordManager instance configured with production-grade Argon2id parameters.
 *
 * Tuning Parameters:
 * - `memoryCost`: 65536 KB (64 MB of RAM per hash to defeat GPU/ASIC attacks)
 * - `parallelism`: 4 execution lanes
 * - `iterations`: 3 computational passes
 * - `pepper`: Optional server-side secret injected from `PASSWORD_PEPPER`
 * - `strength`: Minimum 8 characters with built-in dictionary attack prevention
 */
export const pwd = new PasswordManager({
  algorithm: "argon2id",
  memoryCost: 65536, // 64 MB of RAM
  parallelism: 4,    // 4 threads
  iterations: 3,     // 3 passes
  pepper: __sys__.__env__.get("PASSWORD_PEPPER"),
  strength: {
    minLength: 8,
    checkDictionary: true,
  },
});

/**
 * Securely hashes a plaintext password using Argon2id with a unique 16-byte salt.
 *
 * Enforces memory hardness and password complexity rules before computing the hash.
 *
 * @param password - The plaintext password to hash. Must meet minimum strength requirements.
 * @returns A promise resolving to the PHC-formatted Argon2id hash string (e.g., `$xypriss$argon2id$...`).
 * @throws {Error} If the password does not satisfy minimum length or security constraints.
 *
 * @example
 * ```ts
 * const hash = await hashPassword("UserP@ssw0rd!2026");
 * // Save `hash` directly to your database (contains salt, parameters, and digest)
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  const hash = await pwd.hash(password);
  return hash;
}

/**
 * Verifies a plaintext password candidate against a stored Argon2id hash.
 *
 * Utilizes constant-time comparison to prevent side-channel timing attacks.
 * Automatically parses embedded algorithm parameters, salt, and iterations from the stored hash.
 *
 * @param password - The plaintext password candidate supplied by the user.
 * @param stored - The serialized Argon2id hash retrieved from persistent storage.
 * @returns A promise resolving to `true` if the candidate matches, otherwise `false`.
 *
 * @example
 * ```ts
 * const isValid = await verifyPassword(submittedPassword, user.passwordHash);
 * if (!isValid) {
 *   throw new Error("Invalid credentials");
 * }
 * ```
 */
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const verified = await pwd.verify(password, stored);
  return verified;
}
