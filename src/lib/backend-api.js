const DEFAULT_BACKEND_PATH = "/wsrs";

export function getBackendUrl() {
  const raw = String(process.env.NEXT_PUBLIC_BACKEND_PATH || DEFAULT_BACKEND_PATH).trim();
  if (raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("?") && !raw.includes("#")) {
    return raw.replace(/\/+$/, "") || DEFAULT_BACKEND_PATH;
  }
  console.warn("Invalid NEXT_PUBLIC_BACKEND_PATH. Falling back to secured same-origin routing.");
  return DEFAULT_BACKEND_PATH;
}

export function backendApi(path) {
  const cleanPath = String(path || "").startsWith("/")
    ? path
    : `/${path}`;
  return `${getBackendUrl()}${cleanPath}`;
}
