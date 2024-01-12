#!/usr/bin/env node
/**
 * Starts the companion server
 */

import {getServer} from '../server/server.js';
import {readConfig, parseArgs, isScriptRun, showErrorTraceback} from './lib.js';

if (isScriptRun('hubStart')) {
  const {argn} = parseArgs(`
    Runs the hub server.

    npx hubStart  [--config="bds_hub.config.yaml"]
  `);

  getServer(readConfig(argn.config))
    .then(server => server.start())
    .catch(showErrorTraceback);
}
