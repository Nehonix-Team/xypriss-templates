#!/bin/bash

# XyPriss Template Build Script
# Packages the template into out/project.xpack and standalone out/init.xru

rm -rf out dist

xru pack -v && xru build init.xru out/init.xru

echo "--------------------------------------"
echo            "Build complete: "
echo "--------------------------------------"
