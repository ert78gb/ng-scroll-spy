#!/usr/bin/env bash

# Clean up previous distributions
rm -rf dist
rm -rf build

# Variable pointing to NGC
NGC="node node_modules/.bin/ngc"
# Variable pointing to ROLLUP
ROLLUP="node node_modules/.bin/rollup"

# Run Angular Compile
$NGC -p src/tsconfig-build.json
$ROLLUP build/ng-scroll-spy.js -o dist/ng-scroll-spy.js

$NGC -p src/tsconfig-es5.json
$ROLLUP build/ng-scroll-spy.js -o dist/ng-scroll-spy.es5.js

# Copy all non js file from build -> dist directory
rsync -a --exclude=*.js build/ dist

# Copy the release package.json file
cp src/package.json dist/package.json

# Copy the readme.md file
cp readme.md dist/readme.md
