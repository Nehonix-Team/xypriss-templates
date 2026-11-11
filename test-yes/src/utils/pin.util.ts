/**
 * PIN Hashing & Constant-Time Verification Utilities
 *
 * Provides cryptographically secure PIN / short-code hashing and verification
 * powered by `xypriss-security` and the memory-hard Scrypt Key Derivation Function (KDF).
 *
 * ### Security Guarantees:
 * - **Scrypt KDF Hardening**: Designed specifically to thwart hardware-accelerated
 *   attacks (ASIC, FPGA, GPU) against low-entropy secrets such as 4-to-8 digit PINs.
 * - **Unique Cryptographic Salt**: Generates a cryptographically random 16-byte (128-bit)
 *   salt per hash to defend against precomputed rainbow table attacks.
 * - **Constant-Time Verification**: Enforces `timingSafeEqual` comparison to eliminate
 *   timing side-channel vulnerabilities during authentication.
 *
 * @module utils/pin.util
 * @see https://xypriss.nehonix.com/docs/security/crypto
 */

import { getRandomBytes, Keys, timingSafeEqual } from "xypriss-security";

/**
 * Hashes a plaintext numeric or alphanumeric PIN using the Scrypt KDF.
 *
 * Generates an independent 16-byte cryptographic salt and computes a 64-byte
 * derived key. Returns the combined salt and hash serialized as `salt:hash`.
 *
 * @param pin - Plaintext PIN string to hash (e.g., `"1234"` or `"987654"`).
 * @returns Serialized string in `${saltHex}:${hashHex}` format suitable for database persistence.
 *
 * @example
 * ```ts
 * import { hashPin } from "utils/pin.util";
 *
 * const storedPin = hashPin("4829");
 * // Result: "a7c8e9...16bytesHex:f4d2b1...64bytesHex"
 * ```
 */
export function hashPin(pin: string): string {
  const salt = getRandomBytes(16).toString("hex");
  const hash = Keys.scrypt(pin, salt, 64);
  return `${salt}:${hash}`;
}

/**
 * Verifies a candidate PIN against a stored `${salt}:${hash}` Scrypt record.
 *
 * Employs constant-time string comparison (`timingSafeEqual`) to prevent
 * attackers from deducing hash segments via execution timing variations.
 *
 * @param pin - Plaintext candidate PIN provided by the user.
 * @param stored - Stored record previously produced by {@link hashPin} (`salt:hash`).
 * @returns `true` if the candidate PIN matches the stored hash, otherwise `false`.
 *
 * @example
 * ```ts
 * import { verifyPin } from "utils/pin.util";
 *
 * const isValid = verifyPin("4829", storedPinFromDatabase);
 * if (!isValid) {
 *   throw new UnauthorizedException("Invalid PIN code provided");
 * }
 * ```
 */
export function verifyPin(pin: string, stored: string): boolean {
  if (!pin || !stored) return false;
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;

  try {
    const hash = Keys.scrypt(pin, salt, 64);
    return timingSafeEqual(hash, key);
  } catch {
    return false;
  }
}
