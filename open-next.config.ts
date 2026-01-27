import { defineCloudflareConfig } from '@opennextjs/cloudflare'

export default defineCloudflareConfig({
  // R2 incremental cache is optional but recommended for better performance
  // Uncomment and configure if you set up R2 bucket in wrangler.jsonc
  // incrementalCache: r2IncrementalCache,
})
