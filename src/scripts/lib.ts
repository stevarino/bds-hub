

import { existsSync, promises, readFileSync } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml'
import { ConfigFile, O } from '../bds_hub_bp/scripts/types';

export const root = fileURLToPath(import.meta.url).replace(/[/\\]dist[/\\].*$/, '');

// https://stackoverflow.com/a/45130990
export async function getFiles(dir: string) {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  const files: (string[]|string)[] = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files) as string[];
}

export function readConfig(path?: string): ConfigFile  {
  let configPath = path ?? './bedrock_stats.config.yaml';
  if (!isAbsolute(configPath)) {
    configPath = resolve(process.cwd(), configPath);
  }
  if (!existsSync(configPath)) {
    throw new Error(`Unable to find config file ${configPath}`);
  }
  return parse(readFileSync(configPath, 'utf8'));
}

export function parseArgs() {
  console.info('argv: ', process.argv);
  const argArray = process.argv.slice(2);
  const args: {
    /** named args */
    argn: O<string>, 
    /** unnamed args */
    argv: string[]
  } = {argn: {}, argv: []}
  for (const arg of argArray) {
    if (arg.startsWith('-')) {
      const m = arg.match(/([^=]+)=?(.*)/);
      if (m === null) continue;  // won't happen
      args.argn[m[1].replace(/^-+/, '')] = m[2];
    } else {
      args.argv.push(arg);
    }
  }
  return args;
}
