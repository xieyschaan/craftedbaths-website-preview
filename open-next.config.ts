import { defineCloudflareConfig } from '@opennextjs/cloudflare'
// Optional: Import R2 incremental cache if you're using R2 for caching
// import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default defineCloudflareConfig({
  // Optional: Enable R2 incremental cache if you've configured it in wrangler.jsonc
  // incrementalCache: r2IncrementalCache,
})
