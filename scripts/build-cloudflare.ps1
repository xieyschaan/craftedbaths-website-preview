# PowerShell build script for Cloudflare Pages
$ErrorActionPreference = "Stop"

Write-Host "Building with OpenNext Cloudflare..." -ForegroundColor Cyan

# Build with OpenNext
npx opennextjs-cloudflare build

# Copy public assets to build output
if (Test-Path "public") {
    Write-Host "Copying public assets..." -ForegroundColor Cyan
    Copy-Item -Path "public\*" -Destination ".open-next\assets\" -Recurse -Force -ErrorAction SilentlyContinue
}

# Prepare Pages build output
Write-Host "Preparing Pages build output..." -ForegroundColor Cyan
# Copy all assets to root
Copy-Item -Path ".open-next\assets\*" -Destination ".open-next\" -Recurse -Force -ErrorAction SilentlyContinue

# Copy worker.js as _worker.js
Copy-Item -Path ".open-next\worker.js" -Destination ".open-next\_worker.js" -Force

# Copy all dependencies
Copy-Item -Path ".open-next\cloudflare" -Destination ".open-next\" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path ".open-next\middleware" -Destination ".open-next\" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path ".open-next\.build" -Destination ".open-next\" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path ".open-next\server-functions" -Destination ".open-next\" -Recurse -Force -ErrorAction SilentlyContinue

# Create _routes.json
Write-Host "Creating _routes.json..." -ForegroundColor Cyan
$routesJson = @{
    version = 1
    include = @('/*')
    exclude = @(
        '/_next/static/*',
        '/_next/data/*',
        '/assets/*',
        '/favicon.ico',
        '/robots.txt',
        '/sitemap.xml',
        '/404.html'
    )
} | ConvertTo-Json -Depth 10
Set-Content -Path ".open-next\_routes.json" -Value $routesJson

Write-Host "Build complete! Output directory: .open-next/" -ForegroundColor Green
