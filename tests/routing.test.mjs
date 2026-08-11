import test from "node:test";
import assert from "node:assert/strict";

import { backendApi, getBackendUrl } from "../src/lib/backend-api.js";
import { getEnv, getExplorerConfig } from "../src/lib/env.js";

test("backend routing defaults to the secured same-origin path", () => {
  delete process.env.NEXT_PUBLIC_BACKEND_PATH;
  assert.equal(getBackendUrl(), "/wsrs");
  assert.equal(backendApi("api/status"), "/wsrs/api/status");
});

test("absolute, protocol-relative, query, and fragment backend overrides fail closed", () => {
  for (const hostile of ["https://origin.invalid", "//origin.invalid", "/wsrs?bypass=1", "/wsrs#origin"]) {
    process.env.NEXT_PUBLIC_BACKEND_PATH = hostile;
    assert.equal(getBackendUrl(), "/wsrs");
  }
  delete process.env.NEXT_PUBLIC_BACKEND_PATH;
});

test("placeholder credentials are rejected and chain configuration remains disabled", () => {
  process.env.ETHERSCAN_FAMILY_API_KEY = "YOUR_API_KEY_HERE";
  assert.equal(getEnv("ETHERSCAN_FAMILY_API_KEY"), "");
  const config = getExplorerConfig("ethereum");
  assert.equal(config.enabled, false);
  assert.equal(config.chainId, 1);
  delete process.env.ETHERSCAN_FAMILY_API_KEY;
});
