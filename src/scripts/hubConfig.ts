#!/usr/bin/env node

/**
 * Generates a set of config files.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { configPath, parseArgs, root } from '../lib.js';

function main() {
  const { argv, argn } = parseArgs(`
    Generates a set of config files.

    npx hubConfig  [--config="bds_hub.config.yaml
  `);
  let path = configPath(argn['config']);
  const dPath = join(dirname(path), 'dialogue.config.yaml');
  if ((existsSync(path) || existsSync(dPath)) && argn['force'] === undefined) {
    console.error('File already exists. Use --force to overwrite it.');
    process.exit(1);
  }
  writeFileSync(path, readFileSync(join(root, 'bds_hub.example.yaml')))
  writeFileSync(dPath, readFileSync(join(root, 'dialogue.example.yaml')))
}

if (process.argv[1].includes('hubConfig')) {
  main();
}
