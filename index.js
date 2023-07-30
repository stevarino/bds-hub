
import { readFileSync } from 'fs';
import { getServer } from './dist/server/server.js';
import { isAbsolute, resolve } from 'path';
import { parse } from 'yaml'

let configPath = './bedrock_stats.config.yaml';
if (process.argv.length > 2) {
  configPath = process.argv[2];
}
if (!isAbsolute(configPath)) {
  configPath = resolve(process.cwd(), configPath);
}

const config = readFileSync(configPath, 'utf8');

getServer(parse(config)).then(server => server.start());
