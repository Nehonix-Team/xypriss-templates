#!/bin/bash

# XyPriss Template Build Script
# This script packages the template into a distribution ZIP file.

DIST_DIR="dist"
VERSION=$(date +%Y%m%d)
OUTPUT_FILE="xypriss-template-$VERSION.zip"
TEMP_DIR=".build_temp"

echo "Building XyPriss Template..."

# Cleanup old temp dir
rm -rf "$TEMP_DIR"
rm -rf "$DIST_DIR"
mkdir -p "$TEMP_DIR"

# Ensure dist directory exists
mkdir -p "$DIST_DIR"


# Copy files using a more robust method to avoid recursive copy
# We'll use rsync if available, otherwise fallback to cp
if command -v rsync >/dev/null 2>&1; then
    rsync -a . "$TEMP_DIR/" \
        --exclude "$TEMP_DIR" \
        --exclude "$DIST_DIR" \
        --exclude ".git" \
        --exclude "node_modules" \
        --exclude "*.zip" \
        --exclude "xypriss-template-*"
else
    # Fallback to cp
    cp -R . "$TEMP_DIR/" 2>/dev/null
    rm -rf "$TEMP_DIR/$TEMP_DIR"
    rm -rf "$TEMP_DIR/$DIST_DIR"
    rm -rf "$TEMP_DIR/.git"
    rm -rf "$TEMP_DIR/node_modules"
    rm -f "$TEMP_DIR"/*.zip
fi

# Remove ignored files/folders from build.ignore
IGNORE_FILE="build.ignore"
if [ -f "$IGNORE_FILE" ]; then
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" == \#* ]] && continue
        
        echo "Excluding: $line"
        # Use subshell to expand globs relative to TEMP_DIR
        (cd "$TEMP_DIR" && rm -rf $line)
    done < "$IGNORE_FILE"

fi

# Rename TARGET_README.md to README.md in the package
if [ -f "$TEMP_DIR/TARGET_README.md" ]; then
    mv "$TEMP_DIR/TARGET_README.md" "$TEMP_DIR/README.md"
fi

# Create the ZIP in the dist folder
cd "$TEMP_DIR" || exit
zip -r "../$DIST_DIR/$OUTPUT_FILE" . > /dev/null
cd ..

# Cleanup
rm -rf "$TEMP_DIR"

echo "--------------------------------------"
echo "Build complete: $DIST_DIR/$OUTPUT_FILE"
echo "--------------------------------------"
