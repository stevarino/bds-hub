import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {parse} from 'yaml';

import {validateConfigFile, ConfigFile, Obj, Dialogue} from '../types.js';

export const root = fileURLToPath(import.meta.url).replace(
  /[/\\]dist[/\\].*$/,
  '',
);

// https://stackoverflow.com/a/45130990
/** Recursive directory search */
export async function getFiles(dir: string, pattern?: RegExp) {
  const dirents = await fs.promises.readdir(dir, {withFileTypes: true});
  const files: (string[] | string)[] = await Promise.all(
    dirents.map(dirent => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return getFiles(res);
      }
      if (pattern !== undefined && !res.match(pattern)) {
        return [];
      }
      return res;
    }),
  );
  return Array.prototype.concat(...files) as string[];
}

export function configPath(filePath?: string): string {
  let newPath = filePath ?? './bds_hub.config.yaml';
  if (!path.isAbsolute(newPath)) {
    newPath = path.resolve(process.cwd(), newPath);
  }
  return newPath;
}

export function readConfig(filePath?: string): ConfigFile {
  const p = configPath(filePath);
  console.info('Loading config: ', p);
  if (!fs.existsSync(p)) {
    throw new Error(`Unable to find config file ${p}`);
  }
  const config = parse(fs.readFileSync(p, 'utf8'));
  const result = validateConfigFile(config);
  if (!result.success) {
    throw new Error(
      'Invalid config file: \n - ' +
        result.errors
          .map(
            e =>
              `${e.path}: expected (${JSON.stringify(
                e.expected,
              )}), received (${JSON.stringify(e.value)})`,
          )
          .join('\n - '),
    );
  }
  config.host = config.host ?? `http://127.0.0.1:${config.port ?? 8888}`;
  return config;
}

export function isScriptRun(name: string) {
  return (process.argv[1] as string).includes(name);
}

export function parseArgs(help?: string) {
  const argArray = process.argv.slice(2);
  const args: {
    /** named args */
    argn: Obj<string>;
    /** unnamed args */
    argv: string[];
  } = {argn: {}, argv: []};
  for (const arg of argArray) {
    if (arg.startsWith('-')) {
      // will always match something
      const [, lhv, rhv] = arg.match(/([^=]+)=?(.*)/) as [
        string,
        string,
        string,
      ];
      args.argn[lhv.replace(/^-+/, '')] = rhv;
    } else {
      args.argv.push(arg);
    }
  }

  if (
    help !== undefined &&
    (args.argn.h !== undefined || args.argn.help !== undefined)
  ) {
    console.info(strip(help));
    throw new Error();
  }

  return args;
}

export function write(filename: string, contents: string) {
  fs.mkdirSync(path.dirname(filename), {recursive: true});
  fs.writeFileSync(filename, contents);
}

export async function recursiveCopy(
  from: string,
  to: string,
  filter?: (from: string, to: string) => boolean,
) {
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
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(filename, destination);
}

export function strip(s: string) {
  return s
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .replace(/^[ \t]+/m, '');
}

const OverwriteRegex = /(@overwrite.*?)(\w+)(\s*=\s*)[^;]+/gs;
export function updateConstantsFile(
  filename: string,
  values: {[key: string]: unknown},
) {
  let content = fs.readFileSync(filename, 'utf-8');
  content = content.replaceAll(OverwriteRegex, (_, marker, name, eq) => {
    if (!Object.keys(values).includes(name))
      throw new Error('Unrecognized constant: ' + name);
    const vals = [marker, name, eq, JSON.stringify(values[name], undefined, 2)];
    delete values[name];
    return vals.join('');
  });
  const keys = Object.keys(values);
  if (keys.length !== 0) {
    throw new Error(`Unused keys: ${JSON.stringify(keys)}`);
  }
  fs.writeFileSync(filename, content);
}

export function loadScriptFile(filename: string) {
  console.info(`Parsing ${filename}`);
  let script: Dialogue.ScriptFile;
  if (filename.endsWith('.json')) {
    script = JSON.parse(
      fs.readFileSync(filename, 'utf-8'),
    ) as Dialogue.ScriptFile;
  } else if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
    script = parse(fs.readFileSync(filename, 'utf-8'));
  } else {
    throw new Error('Unrecognized file type: ' + filename);
  }

  return script;
}

export function showErrorTraceback(error: unknown) {
  console.error(error);
  if ((error as Error).stack !== undefined)
    console.error((error as Error).stack);
}
