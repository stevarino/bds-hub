#!/usr/bin/env node
/**
 * Starts the companion server
 */

import { getServer } from '../server/server.js';
import { readConfig, parseArgs, isMain } from '../lib.js';

export function start() {
  const { argv, argn } = parseArgs(`
    Runs the hub server.

    npx hubStart  [--config="bds_hub.config.yaml"]
  `);

  getServer(readConfig(argn.config)).then(server => server.start());
}

if (isMain(import.meta.url)) {
  start();
}
