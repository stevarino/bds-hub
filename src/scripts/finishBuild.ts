/**
 * Copies files during build.
 */

import { join } from 'path';
import { recursiveCopy, root } from './lib.js';

const files: [string, string][] = [
  [join(root, 'static'), join(root, 'dist')], 
];

(async () => {
  // copy static files
  for (const [from, to] of files) {
    await recursiveCopy(from, to, (from: string, target: string) => {
      console.info('Copying ', target.slice(to.length + 1));
      return false;
    });
  }
})();
