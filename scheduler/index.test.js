import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "./index.js";

const hookUrl = "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/test-hook";

test("the daily cron runs at 08:00 Beijing time", () => {
  const config = readFileSync(new URL("./wrangler.toml", import.meta.url), "utf8");
  assert.match(config, /\[triggers\]\s+crons\s*=\s*\["0 0 \* \* \*"\]/);

  const beijingTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date("2026-01-01T00:00:00Z"));
  assert.equal(beijingTime, "08:00");
});

test("a scheduled event sends one POST request to the deploy hook", async (t) => {
  const request = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 202 }));

  await worker.scheduled({}, { CLOUDFLARE_PAGES_DEPLOY_HOOK: hookUrl });

  assert.equal(request.mock.callCount(), 1);
  assert.deepEqual(request.mock.calls[0].arguments, [hookUrl, { method: "POST" }]);
});

test("a missing deploy hook fails before making a request", async (t) => {
  const request = t.mock.method(globalThis, "fetch", async () => new Response());

  await assert.rejects(worker.scheduled({}, {}), /CLOUDFLARE_PAGES_DEPLOY_HOOK is not configured/);

  assert.equal(request.mock.callCount(), 0);
});

test("a rejected deploy hook is reported as a failed scheduled event", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 503 }));

  await assert.rejects(worker.scheduled({}, { CLOUDFLARE_PAGES_DEPLOY_HOOK: hookUrl }), /HTTP 503/);
});

test("a network failure is reported as a failed scheduled event", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Network unavailable");
  });

  await assert.rejects(worker.scheduled({}, { CLOUDFLARE_PAGES_DEPLOY_HOOK: hookUrl }), /Network unavailable/);
});
