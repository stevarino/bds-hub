

import { existsSync, mkdirSync, promises, readFileSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml'
import { strip } from './functions.js';

import { assertConfigFile, ConfigFile, O } from './types.js';

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

export function configPath(path?: string): string {
  let newPath = path ?? './bds_hub.config.yaml';
  if (!isAbsolute(newPath)) {
    newPath = resolve(process.cwd(), newPath);
  }
  return newPath;
}

export function readConfig(path?: string): ConfigFile  {
  let p = configPath(path)
  if (!existsSync(p)) {
    throw new Error(`Unable to find config file ${p}`);
  }
  const config = parse(readFileSync(p, 'utf8'));
  assertConfigFile(config);
  return config;
}

export function isScriptRun(name: string) {
  return (process.argv[1] as string).includes(name);
}

export function parseArgs(help?: string) {
  const argArray = process.argv.slice(2);
  const args: {
    /** named args */
    argn: O<string>, 
    /** unnamed args */
    argv: string[]
  } = {argn: {}, argv: []}
  for (const arg of argArray) {
    if (arg.startsWith('-')) {
      // will always match something
      const [_, lhv, rhv] = arg.match(/([^=]+)=?(.*)/) as [string, string, string];
      args.argn[lhv.replace(/^-+/, '')] = rhv;
    } else {
      args.argv.push(arg);
    }
  }

  if (help !== undefined && (args.argn.h !== undefined || args.argn.help !== undefined)) {
    console.info(strip(help));
    process.exit(1);
  }

  return args;
}

export function write(filename: string, contents: string) {
  mkdirSync(dirname(filename), {recursive: true});
  writeFileSync(filename, contents);
}
