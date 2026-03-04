#!/bin/bash
set -e
cd "$(dirname "$0")/.."
npm run build
cd packages/vscode
npx @vscode/vsce package --no-dependencies
echo ""
echo "Done! VSIX created:"
ls -lh *.vsix
