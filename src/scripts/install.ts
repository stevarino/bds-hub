#!/usr/bin/env node
/**
 * Installs the add on to a specified minecraft server.
 */

import { copyFileSync, mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { getFiles, parseArgs, readConfig, root } from './lib.js';
import { O } from '../bds_hub_bp/scripts/types.js';

const help = 'npx hubInstall [--dev] [--config="/foo/bar/config.yaml"] {minecraft_server_dir}';
const packName = 'bds_hub_bp';
const addOn = join(root, 'dist', packName);

const {argv, argn} = parseArgs()
if (argv.length === 0) {
  console.error(`Did not receive Minecraft directory: ${JSON.stringify(argv)}\n\n${help}`);
  process.exit(1);
}
if (argv.length > 1) {
  console.error(`Received multiple Minecraft directories: ${JSON.stringify(argv)}\n\n${help}`);
  process.exit(1);
}
let mcDir = argv[0];

async function main() {
  const config = readConfig(argn['config'])
  const manifest = JSON.parse(readFileSync(join(addOn, 'manifest.json'), 'utf-8'));

  // copy bp to behavior_packs dir
  const files = await getFiles(addOn);
  for (const dir of [
      join(mcDir, 'behavior_packs', packName), 
      join(mcDir, 'development_behavior_packs', packName)
  ]) {
    if (existsSync(dir)) {
      console.info('Removing directory ', dir);
      rmSync(dir, { recursive: true, force: true });
    }
  }

  const bp_dir = argn['dev'] === undefined ? 'behavior_packs' : 'development_behavior_packs';
  console.info('Copying to ', join(mcDir, bp_dir, packName));
  for (const f of files) {
    const part = f.slice(addOn.length + 1);
    const target = join(mcDir, bp_dir, packName, part);
    mkdirSync(dirname(target), {recursive: true})
    copyFileSync(f, target);
  }

  // check allowed_modules
  const permissionsFile = join(mcDir, 'config', 'default', 'permissions.json');
  const permissions = JSON.parse(readFileSync(permissionsFile, 'utf-8'));
  if (!(permissions.allowed_modules as string[]).includes('@minecraft/server-net')) {
    console.info('Add net module to allowed_modules');
    permissions.allowed_modules.push('@minecraft/server-net');
    writeFileSync(permissionsFile, JSON.stringify(permissions, undefined, 2));
  }

  // add/update world_behavior_packs.json
  for (const f of readdirSync(join(mcDir, 'worlds'))) {
    const packs = join(mcDir, 'worlds', f, 'world_behavior_packs.json');
    let packContent: {pack_id: string, version: number[]}[] = [];
    if (existsSync(packs)) {
      packContent = JSON.parse(readFileSync(packs, 'utf-8'));
    }
    let found = false;
    let needWrite = true;
    for (const entry of packContent) {
      if (entry.pack_id === manifest.header.uuid) {
        found = true;
        if (JSON.stringify(entry.version) === JSON.stringify(manifest.header.version)) {
          needWrite = false;
          break;
        }
        console.info('Updated in ', packs);
        entry.version = manifest.header.version;
      }
    }
    if (!found) {
      console.info('Added in ', packs);
      packContent.push({
        pack_id: manifest.header.uuid,
        version: manifest.header.version,
      });
    }
    if (needWrite) {
      writeFileSync(packs, JSON.stringify(packContent, undefined, 2));
    }
  }

  const configDir = join(mcDir, 'config', manifest.modules[0].uuid);
  // install permisisons file
  const permFile = join(configDir, 'permissions.json');
  if (!existsSync(permFile)) {
    console.info("Creating permissions file: ", permFile);
    writeFileSync(permFile, JSON.stringify({
      allowed_modules: [
        "@minecraft/server",
        "@minecraft/server-admin",
        "@minecraft/server-net",
      ]
    }))
  }

  // install variables file
  const varFile = join(configDir, 'variables.json');
  let needWrite = false;
  mkdirSync(configDir, {recursive: true});
  let vars: O<unknown> = {};
  if (existsSync(varFile)) {
    vars = JSON.parse(readFileSync(varFile, 'utf-8'));
  }
  const host = config.host ?? `http://localhost:${config.port ?? 8888}/`;
  if (vars.host != host) {
    vars.host = host;
    needWrite = true;
  }
  if (needWrite) {
    console.info('Updating ', varFile);
    writeFileSync(varFile, JSON.stringify(vars));
  }
}

main();
