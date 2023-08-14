

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml'

import { validateConfigFile, ConfigFile, Obj } from '../types.js';

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
  const result = validateConfigFile(config);
  if (!result.success) {
    console.error('Invalid config file: \n - ' + result.errors.map(
      e => `${e.path}: expected (${JSON.stringify(e.expected)}), received (${JSON.stringify(e.value)})`
    ).join('\n - '));
    process.exit(1);
  } 
  return config;
}

export function isScriptRun(name: string) {
  return (process.argv[1] as string).includes(name);
}

export function parseArgs(help?: string) {
  const argArray = process.argv.slice(2);
  const args: {
    /** named args */
    argn: Obj<string>, 
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
    // console.info('Copying ', part);
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

export function updateConstantsFile(filename: string, values: {[key: string]: unknown}) {
  let content = fs.readFileSync(filename, 'utf-8');
  const regex = /(@overwrite.*?)(\w+)(\s*=\s*)([^;]+)/sg
  content = content.replace(regex, (m, marker, name, eq, _) => {
    if (values[name] === undefined) throw new Error('Unrecognized constant: ' + name);
    const vals = [marker, name, eq, JSON.stringify(values[name], undefined, 2)];
    delete values[name];
    return vals.join('');
  });
  const keys = Array.from(Object.keys(values));
  if (keys.length !== 0) {
    throw new Error(`Unused keys: ${JSON.stringify(keys)}`)
  }
  fs.writeFileSync(filename, content);
}

export type validators = {[field: string]: (val: unknown) => string[]}
export function validateDeep(obj: unknown, validators: validators) {
  const errors: [path: string, msg: string][] = [];
  const stack: [path: string[], value: unknown][] = [[['$'], obj]];
  while (stack.length > 0) {
    const [path, value] = stack.pop() as [string[], unknown];

    if (typeof value === 'object' && value !== null) {
      for (const [key, validator] of Object.entries(validators)) {
        if ((value as Obj<unknown>)[key] !== undefined) {
          errors.push(...validator((value as Obj<unknown>)).map(
            e => [path.join('.'), e] as [string, string]
          ));
        }
      }
      for (const [key, val] of Object.entries(value)) {
        stack.push([[...path, key], val]);
      }
    }

    if (Array.isArray(value)) {
      for (const [index, val] of value.entries()) {
        stack.push([[...path, String(index)], val]);
      }
    }
  }
  return errors;
}

