#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <assa-intranet-aca-version> <assa-intranet-content-app-version>"
  exit 1
fi

ACA_VERSION="$1"
CONTENT_VERSION="$2"

echo "Running npm run build before Docker image builds..."
npm run build

build_and_push() {
  local image_name="$1"
  local version="$2"
  local platform="${3:-}"

  if [[ -n "${platform}" ]]; then
    docker buildx build \
      --platform "${platform}" \
      -t "${image_name}:${version}" \
      --push \
      "${ROOT_DIR}"
  else
    docker buildx build \
      -t "${image_name}:${version}" \
      --push \
      "${ROOT_DIR}"
  fi
}

docker login

build_and_push "facuv/assa-intranet-aca-amd64" "${ACA_VERSION}" "linux/amd64"
build_and_push "facuv/assa-intranet-aca-amd64" "latest" "linux/amd64"

build_and_push "facuv/assa-intranet-content-app" "${CONTENT_VERSION}"
build_and_push "facuv/assa-intranet-content-app" "latest"