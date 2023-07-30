#!/usr/bin/env node
/**
 * Starts the companion server
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { configPath, isMain, parseArgs, root } from '../lib.js';

function main() {
  const { argv, argn } = parseArgs();
  console.log({argn, argv})
  if (argn['h'] !== undefined || argn['help'] !== undefined) {
    console.info('npx hubConfig  [--config="bds_hub.config.yaml"]');
    process.exit(1);
  }
  let path = configPath(argn['config']);
  if (existsSync(path) && argn['force'] === undefined) {
    console.error('File already exists. Use --force to overwrite it.');
    process.exit(1);
  }
  writeFileSync(path, readFileSync(join(root, 'bds_hub.config.example.yaml')))
}

if (isMain(import.meta.url)) {
  main();
}
