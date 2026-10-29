/**
 * Path Manipulation & Resolution Utilities
 *
 * Exposes XyPriss's native, platform-independent path processing engine (`__sys__.path`).
 * Bridges directly to native binaries to guarantee POSIX and Windows compliance,
 * path traversal protection, normalization, and system path resolution.
 *
 * @module utils/path
 * @see https://xypriss.nehonix.com/docs/system/path
 */

import "xypriss";

type TPath = typeof __sys__.path;

/**
 * XyPriss Native Path API Instance.
 *
 * Comprehensive suite of platform-agnostic utilities for handling filesystem paths.
 * Enforces cross-platform parity across Linux, macOS, and Windows while mitigating
 * security risks like directory traversal and malformed URI segments.
 *
 * ### Key Capabilities:
 * - **Cross-Platform Consistency**: Seamlessly handles separator discrepancies (`/` vs `\`).
 * - **Path Normalization & Sanitization**: Resolves relative segments (`.`, `..`) and duplicate slashes.
 * - **System Directories**: Direct access to OS-level directories (e.g. `tmpUserDir`).
 * - **Security Enforcements**: Shields backend endpoints against traversal injection attacks.
 *
 * ### Common Methods:
 * - `path.join(...paths)`: Joins all given segments using the platform-specific delimiter.
 * - `path.resolve(...paths)`: Resolves a sequence of paths into an absolute path.
 * - `path.dirname(filePath)`: Returns directory name of a path.
 * - `path.basename(filePath, ext?)`: Returns the last portion of a path.
 * - `path.extname(filePath)`: Returns the extension of the path (including the leading dot).
 * - `path.normalize(filePath)`: Normalizes a string path, resolving `..` and `.` segments.
 * - `path.isAbsolute(filePath)`: Determines if a path is absolute.
 * - `path.relative(from, to)`: Solves relative path from one location to another.
 *
 * @example
 * ```ts
 * import { path } from "utils/path";
 *
 * // Resolve absolute target path safely
 * const uploadDir = path.resolve(__dirname, "../uploads");
 *
 * // Segment concatenation & normalization
 * const configPath = path.join("/app", "src", "config", "settings.json");
 * // Result: "/app/src/config/settings.json"
 *
 * // File dissection
 * path.basename("/app/src/main.ts");         // "main.ts"
 * path.dirname("/app/src/main.ts");          // "/app/src"
 * path.extname("archive.tar.gz");            // ".gz"
 *
 * // Relative distance calculation
 * path.relative("/app", "/app/src/main.ts");   // "src/main.ts"
 *
 * // Access runtime system paths
 * console.log(path.tmpUserDir);
 * ```
 * @see https://xypriss.nehonix.com/docs/system/path
 */
export const path = __sys__.path as TPath;
