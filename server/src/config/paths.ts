import path from "path";

// __dirname at runtime:
// - ts-node: <repo>/server/src/config
// - compiled: <repo>/server/dist/config
const SERVER_DIR = path.resolve(__dirname, "..", "..");
export const REPO_ROOT_DIR = path.resolve(SERVER_DIR, "..");

export const UPLOADS_DIR = path.join(REPO_ROOT_DIR, "uploads");

export function toPosixPath(p: string) {
  return p.split(path.sep).join("/");
}

export function resolveFromRepo(relativeOrAbsolutePath: string) {
  return path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.resolve(REPO_ROOT_DIR, relativeOrAbsolutePath);
}
