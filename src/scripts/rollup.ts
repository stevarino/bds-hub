import { resolve } from 'path';
import * as rollup from 'rollup';

console.info('Rolling up behavior pack script');

(async () => {
  const bundle = await rollup.rollup({
    input: resolve('./dist/behavior_pack/script.js'),
    external: [
      '@minecraft/server',
      '@minecraft/server-admin',
      '@minecraft/server-net',
    ],
  });
  await bundle.write({
    file: './dist/bds_hub_bp/scripts/script.rollup.js',
  })
})();