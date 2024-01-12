#!/usr/bin/env node

/**
 * Generates a set of config files.
 */

import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

import {configPath, isScriptRun, parseArgs, root} from './lib.js';

function main() {
  const {argn} = parseArgs(`
    Generates a set of config files.

    npx hubConfig  [--config="bds_hub.config.yaml"]
  `);
  const path = configPath(argn['config'] ?? 'bds_hub.config.yaml');
  const dPath = join(dirname(path), 'script.config.yaml');
  if ((existsSync(path) || existsSync(dPath)) && argn['force'] === undefined) {
    throw new Error('File already exists. Use --force to overwrite it.');
  }
  writeFileSync(path, readFileSync(join(root, 'bds_hub.example.yaml')));
  writeFileSync(dPath, readFileSync(join(root, 'script.example.yaml')));
}

if (isScriptRun('hubConfig')) {
  main();
}
