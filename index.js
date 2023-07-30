
import { readFileSync } from 'fs';
import { getServer } from './dist/scripts/start.js';
import { isAbsolute, resolve } from 'path';
import { parse } from 'yaml'

let configPath = './bds_hub.config.yaml';
if (process.argv.length > 2) {
  configPath = process.argv[2];
}
if (!isAbsolute(configPath)) {
  configPath = resolve(process.cwd(), configPath);
}

const config = readFileSync(configPath, 'utf8');

getServer(parse(config)).then(server => server.start());
