import { Cipher, getRandomBytes, timingSafeEqual } from "xypriss-security";

export function hashPin(pin: string): string {
  const salt = getRandomBytes(16).toString("hex");
  const hash = Cipher.crypto.scrypt(pin, salt, 64);
  return `${salt}:${hash}`;
}

export function verifyPin(pin: string, stored: string): boolean {
  if (!pin || !stored) return false;
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;

  try {
    const hash = Cipher.crypto.scrypt(pin, salt, 64);
    return timingSafeEqual(hash, key);
  } catch {
    return false;
  }
}
