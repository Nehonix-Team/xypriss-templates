/**
 * Filesystem Operations & File Management Utilities
 *
 * Exposes XyPriss's native, high-performance filesystem engine (`__sys__.fs`).
 * Provides an all-in-one, cross-platform interface for atomic file I/O, recursive directory
 * traversal, JSON persistence, file metadata inspection, archiving, and streaming watchers.
 *
 * @module utils/fs
 * @see https://xypriss.nehonix.com/docs/system/filesystem
 */

import "xypriss";

type TFs = typeof __sys__.fs;

/**
 * XyPriss Native Filesystem API Instance.
 *
 * Unified, high-throughput filesystem client bridging TypeScript directly to
 * native system calls. Modularized internally across specialized operational layers
 * while exposing a single cohesive, high-performance API.
 *
 * ### Architecture:
 * - **FSCore**: Fundamental atomic I/O operations (`read`, `write`, `append`, `move`, `copy`, `remove`).
 * - **FSHelpers**: Rapid serialization & assertions (`readJson`, `writeJson`, `exists`, `isFile`, `isDir`, `size`).
 * - **FSDirectory**: Hierarchy & traversal operations (`ls`, `ensureDir`, `readDirRecursive`).
 * - **FSSearch**: Pattern-based file discovery and regex grep utilities.
 * - **FSArchive**: Archival handling and stream compression (TAR / GZ pipelines).
 * - **FSWatch**: Real-time event streaming and filesystem change monitoring.
 *
 * ### Key Operations:
 * - `fs.read(path, encoding?)`: Reads and returns file content as string or buffer.
 * - `fs.write(path, data)`: Writes or overwrites file content atomically.
 * - `fs.append(path, data)`: Appends data to target file.
 * - `fs.exists(path)`: Checks if a file or directory exists on disk.
 * - `fs.ls(dirPath)`: Lists contents of a target directory.
 * - `fs.ensureDir(dirPath)`: Creates directory recursively if missing.
 * - `fs.remove(path)`: Safely deletes a file or directory tree.
 * - `fs.copy(src, dest)` / `fs.move(src, dest)`: High-speed file or tree migration.
 *
 * @example
 * ```ts
 * import { fs } from "utils/fs";
 *
 * // Verify and create missing directory structures
 * fs.ensureDir("/var/data/uploads");
 *
 * // Read and write configuration / JSON payloads
 * if (fs.exists("config.json")) {
 *   const content = fs.readJson("config.json");
 *   console.log("Config loaded:", content);
 * }
 *
 * // Directory listing
 * const files = fs.ls("/var/data/uploads");
 *
 * // Atomic file operations
 * fs.write("output.log", "Process initialized\n");
 * fs.append("output.log", "Task completed successfully\n");
 * ```
 * @see https://xypriss.nehonix.com/docs/system/filesystem
 */
export const fs = __sys__.fs as TFs;