

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml'

import { assertConfigFile, ConfigFile, O } from '../types.js';

export const root = fileURLToPath(import.meta.url).replace(/[/\\]dist[/\\].*$/, '');

// https://stackoverflow.com/a/45130990
export async function getFiles(dir: string) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files: (string[]|string)[] = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files) as string[];
}

export function configPath(filePath?: string): string {
  let newPath = filePath ?? './bds_hub.config.yaml';
  if (!path.isAbsolute(newPath)) {
    newPath = path.resolve(process.cwd(), newPath);
  }
  return newPath;
}

export function readConfig(filePath?: string): ConfigFile  {
  let p = configPath(filePath)
  if (!fs.existsSync(p)) {
    throw new Error(`Unable to find config file ${p}`);
  }
  const config = parse(fs.readFileSync(p, 'utf8'));
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
  fs.mkdirSync(path.dirname(filename), {recursive: true});
  fs.writeFileSync(filename, contents);
}

export async function recursiveCopy(from: string, to: string,
      filter?: (from: string, to: string) => boolean) {
  if (fs.lstatSync(from).isDirectory()) {
    const files = await getFiles(from);
    for (const f of files) {
      const part = f.slice(from.length + 1);
      const dest = path.join(to, part);
      if (filter !== undefined && filter(f, dest)) continue;
      copy(f, dest);
    }
  } else {
    const part = path.basename(from);
    console.info('Copying ', part);
    copy(from, path.join(to, part));
  }
}

export function copy(filename: string, destination: string) {
  fs.mkdirSync(path.dirname(destination), {recursive: true})
  fs.copyFileSync(filename, destination);
}

export function strip(s: string) {
  return s.replace(/^\s+/, '').replace(/\s+$/, '').replace(/^[ \t]+/m, '');
}

