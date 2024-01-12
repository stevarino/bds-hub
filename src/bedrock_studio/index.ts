/**
 * Entry point for script
 */

import * as lib from '../lib/lib.js';
import * as sync from './modules/sync.js';
import * as router from './router.js';
import './modules/responder.js';

(async function start() {
  await lib.timeout(10);
  router.install();
  await sync.setup();
  lib.StartupEvent.emit(null);
})().catch(lib.showErrorTraceback);
