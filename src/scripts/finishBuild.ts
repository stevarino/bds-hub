/**
 * Copies files during build.
 */

import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { getFiles, root } from './lib.js';

const files = [
  [join(root, 'static'), join(root, 'dist')], 
]

async function main() {
  // copy static files
  for (const [from, to] of files) {
    const files = await getFiles(from);
    for (const f of files) {
      const part = f.slice(from.length + 1);
      console.info('Copying ', part);
      const target = join(to, part);
      mkdirSync(dirname(target), {recursive: true})
      copyFileSync(f, target);
    }
  }
}

main();
