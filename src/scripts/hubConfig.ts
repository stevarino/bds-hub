#!/usr/bin/env node

/**
 * Generates a set of config files.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { configPath, isScriptRun, parseArgs, root } from './lib.js';

function main() {
  const { argv, argn } = parseArgs(`
    Generates a set of config files.

    npx hubConfig  [--config="bds_hub.config.yaml"]
  `);
  let path = configPath(argn['config'] ?? 'bds_hub.config.yaml');
  const dPath = join(dirname(path), 'script.config.yaml');
  if ((existsSync(path) || existsSync(dPath)) && argn['force'] === undefined) {
    console.error('File already exists. Use --force to overwrite it.');
    process.exit(1);
  }
  writeFileSync(path, readFileSync(join(root, 'bds_hub.example.yaml')))
  writeFileSync(dPath, readFileSync(join(root, 'script.example.yaml')))
}

if (isScriptRun('hubConfig')) {
  main();
}
