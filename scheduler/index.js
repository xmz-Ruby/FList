export default {
  async scheduled(_controller, env) {
    if (!env.CLOUDFLARE_PAGES_DEPLOY_HOOK) {
      throw new Error("CLOUDFLARE_PAGES_DEPLOY_HOOK is not configured");
    }

    const response = await fetch(env.CLOUDFLARE_PAGES_DEPLOY_HOOK, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Cloudflare build trigger failed (HTTP ${response.status})`);
    }

    console.log("Cloudflare Pages deployment triggered; check the project's deployment history.");
  },
};
