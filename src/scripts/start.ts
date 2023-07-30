#!/usr/bin/env node
/**
 * Starts the companion server
 */

import { getServer } from '../server/server.js';
import { readConfig, parseArgs, isMain } from '../lib.js';

export function start() {
  const { argv, argn } = parseArgs();
  if (argn['h'] !== undefined || argn['help'] !== undefined) {
    console.info('npx hubStart  [--config="bds_hub.config.yaml"]');
    process.exit(1);
  }
  let configPath = argn['config'];

  getServer(readConfig(configPath)).then(server => server.start());
}

if (isMain(import.meta.url)) {
  start();
}
