#!/usr/bin/env node
/**
 * Starts the companion server
 */

import { getServer } from '../server/server.js';
import { readConfig, parseArgs } from '../lib.js';


if (process.argv[1].includes('hubStart')) {
  const { argv, argn } = parseArgs(`
    Runs the hub server.

    npx hubStart  [--config="bds_hub.config.yaml"]
  `);

  getServer(readConfig(argn.config)).then(server => server.start());
}
