/**
 * Copies files during build.
 */

import { copyFileSync, mkdirSync, lstatSync } from 'fs';
import { basename, dirname, join } from 'path';
import { getFiles, root } from '../lib.js';

const files = [
  [join(root, 'static'), join(root, 'dist')], 
];

function copy(filename: string, destination: string) {
  mkdirSync(dirname(destination), {recursive: true})
  copyFileSync(filename, destination);
}

(async () => {
  // copy static files
  for (const [from, to] of files) {
    if (lstatSync(from).isDirectory()) {
      const files = await getFiles(from);
      for (const f of files) {
        const part = f.slice(from.length + 1);
        console.info('Copying ', part);
        copy(f, join(to, part));
      }
    } else {
      const part = basename(from);
      console.info('Copying ', part);
      copy(from, join(to, part));
    }
  }
})();
