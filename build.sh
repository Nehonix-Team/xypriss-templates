#!/bin/bash
set -e

# XyPriss Template Build Script
# Packages the template into out/project.xpack and standalone out/init.xru

rm -rf out dist
mkdir -p out

XRU_BIN="xru"
if ! command -v xru >/dev/null 2>&1; then
    if [ -x "./mods/xru/xru" ]; then
        XRU_BIN="./mods/xru/xru"
    fi
fi

$XRU_BIN pack -v && $XRU_BIN build init.xru out/init.xru

echo "--------------------------------------"
echo            "Build complete: "
echo "--------------------------------------"

