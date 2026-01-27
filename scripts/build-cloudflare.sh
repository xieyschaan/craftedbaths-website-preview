#!/bin/bash
set -e

echo "Building with OpenNext Cloudflare..."

# Build with OpenNext
npx opennextjs-cloudflare build

# Copy public assets to build output
if [ -d "public" ]; then
  echo "Copying public assets..."
  cp -r public/* .open-next/assets/ || true
fi

# Prepare Pages build output
echo "Preparing Pages build output..."
# Copy all assets to root (this moves _next/static/ to the correct location)
cp -r .open-next/assets/* .open-next/ || true

# Copy worker.js as _worker.js
cp .open-next/worker.js .open-next/_worker.js

# Copy all dependencies that _worker.js imports
cp -r .open-next/cloudflare .open-next/ || true
cp -r .open-next/middleware .open-next/ || true
cp -r .open-next/.build .open-next/ || true
cp -r .open-next/server-functions .open-next/ || true

# Create _routes.json to exclude static assets from Worker processing
echo "Creating _routes.json..."
node -e "require('fs').writeFileSync('.open-next/_routes.json', JSON.stringify({version:1,include:['/*'],exclude:['/_next/static/*','/_next/data/*','/assets/*','/favicon.ico','/robots.txt','/sitemap.xml','/404.html']},null,2))"

echo "Build complete! Output directory: .open-next/"
