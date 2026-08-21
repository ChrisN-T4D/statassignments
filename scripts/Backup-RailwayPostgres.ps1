# Backup Methods Market Postgres before a backend deploy / alembic upgrade.
#
# Usage:
#   .\scripts\Backup-RailwayPostgres.ps1 -DatabaseUrl "postgresql://..."
#   $env:DATABASE_PUBLIC_URL = "..."; .\scripts\Backup-RailwayPostgres.ps1
#
# Get DATABASE_PUBLIC_URL from Railway → Methods Market → Postgres → Variables.

param(
    [string]$DatabaseUrl = "",
    [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not $DatabaseUrl) {
    $DatabaseUrl = $env:DATABASE_PUBLIC_URL
}
if (-not $DatabaseUrl) {
    $DatabaseUrl = $env:DATABASE_URL
}
if (-not $DatabaseUrl) {
    Write-Error @"
DATABASE_URL / DATABASE_PUBLIC_URL not set.

Copy DATABASE_PUBLIC_URL from Railway (Postgres service → Variables), then:

  `$env:DATABASE_PUBLIC_URL = 'postgresql://...'
  .\scripts\Backup-RailwayPostgres.ps1
"@
}

if (-not $OutDir) {
    $OutDir = Join-Path $repoRoot "backups\postgres"
}

$env:DATABASE_URL = $DatabaseUrl
$env:BACKUP_DIR = $OutDir

Write-Host "Backing up Methods Market Postgres to $OutDir ..."
python (Join-Path $repoRoot "backend\scripts\backup_postgres.py") --out $OutDir
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
Write-Host "Done. Keep this folder until you confirm the deploy is healthy."
