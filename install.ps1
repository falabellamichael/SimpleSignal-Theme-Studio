# SimpleTheme One-Click Clean Installer
# Automatically uninstalls old version and installs latest VSIX cleanly

$ErrorActionPreference = "SilentlyContinue"

Write-Host "Removing old SimpleTheme extension..." -ForegroundColor Cyan
code --uninstall-extension falabella.simpletheme
Start-Sleep -Seconds 1

$vsix = Get-ChildItem -Path $PSScriptRoot -Filter "simpletheme-*.vsix" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($vsix) {
    Write-Host "Installing latest: $($vsix.Name)..." -ForegroundColor Cyan
    code --install-extension $vsix.FullName --force
    Write-Host ""
    Write-Host "Successfully installed $($vsix.Name)!" -ForegroundColor Green
    Write-Host "In VS Code, press Ctrl+Shift+P and run Developer: Reload Window to apply." -ForegroundColor Yellow
} else {
    Write-Host "No VSIX file found in $PSScriptRoot" -ForegroundColor Red
}
