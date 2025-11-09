#!/usr/bin/env bash
set -euo pipefail

npm install
npm install --prefix apps/web
npm install --prefix apps/api

echo "Iniciando frontend y backend..."
trap 'kill 0' SIGINT SIGTERM EXIT
npm run dev:api &
npm run dev:web &
wait
