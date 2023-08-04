/**
 * Copies files during build.
 */

import { copyFileSync, mkdirSync, lstatSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { getFiles, root } from '../lib.js';

const files: [string, string][] = [
  [join(root, 'static'), join(root, 'dist')], 
];

function copy(filename: string, destination: string) {
  mkdirSync(dirname(destination), {recursive: true})
  copyFileSync(filename, destination);
}

function bumpManifest(path: string) {
  console.info('Updating manifest UUIDs');
  const manifest = JSON.parse(readFileSync(path, 'utf-8'));
  manifest.header.version[2] += 1;
  for (const module of manifest.modules) {
    module.version[2] += 1;
  }
  
  writeFileSync(path, JSON.stringify(manifest, undefined, 2));
}

(async () => {
  // copy static files
  for (const [from, to] of files) {
    if (lstatSync(from).isDirectory()) {
      const files = await getFiles(from);
      for (const f of files) {
        const part = f.slice(from.length + 1);
        const dest = join(to, part);
        if (dest.endsWith('manifest.json') && existsSync(dest)) {
          bumpManifest(dest);
          continue;
        }
        console.info('Copying ', part);
        copy(f, dest);
      }
    } else {
      const part = basename(from);
      console.info('Copying ', part);
      copy(from, join(to, part));
    }
  }
})();
