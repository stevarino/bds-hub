
import { getServer } from '../server/server.js';
import { readConfig, parseArgs } from './lib.js';

const { argv, argn } = parseArgs();
if (argn['h'] !== undefined || argn['help'] !== undefined) {
  console.info('npx bdsHubInstall  [--config="/foo/bar/config.yaml"]');
  process.exit(1);
}
let configPath = argn['config'];

getServer(readConfig(configPath)).then(server => server.start());
