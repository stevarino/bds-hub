#!/usr/bin/env node

/**
 * Installs the add on to a specified minecraft server.
 */

import { copyFileSync, mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { dirname, join } from 'path';

import { getFiles, isScriptRun, parseArgs, readConfig } from './lib.js';
import { Obj } from '../types.js';
import { ADDON_NAME, ADDON_OUTPUT } from '../constants.js';
import { createPackFiles } from './hubPack.js';

const modules = [
  "@minecraft/server",
  "@minecraft/server-admin",
  "@minecraft/server-net",
  "@minecraft/server-ui",
];

/** Install behavior pack into server */
async function install(mcDir: string, argn: Obj<string|undefined>) {
  const config = readConfig(argn.config);
  const packName = ADDON_NAME + '.mcaddon';

  // build the pack code
  await createPackFiles(config);
  
  const manifest = JSON.parse(readFileSync(join(ADDON_OUTPUT, 'manifest.json'), 'utf-8'));

  // clean up old packs
  for (const dir of [
    join(mcDir, 'behavior_packs', ADDON_NAME), 
    join(mcDir, 'development_behavior_packs', ADDON_NAME)
  ]) {
    if (existsSync(dir)) {
      console.info('Removing directory ', dir);
      rmSync(dir, { recursive: true, force: true });
    }
    if (existsSync(packName)) {
      rmSync(packName);
    }
  }

  // copy bp to behavior_packs server dir
  const files = await getFiles(ADDON_OUTPUT);
  const bpDir = argn.dev === undefined ? 'behavior_packs' : 'development_behavior_packs';
  const mcBpDir = join(mcDir, bpDir, packName);
  console.info('Copying to ', mcBpDir);
  copyFileSync(join(dirname(ADDON_OUTPUT), packName), mcBpDir)

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
          console.info('world_behavior_pack up to date: ', packs)
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
  mkdirSync(configDir, {recursive: true});
  if (!existsSync(join(configDir, '/readme.txt'))) {
    writeFileSync(join(configDir, '/readme.txt'), `Used by ${packName}`)
  }
  // install permisisons file
  let contents: {allowed_modules?: string[]} = {
    allowed_modules: modules
  };
  let needWrite = false;
  const permFile = join(configDir, 'permissions.json');
  if (!existsSync(permFile)) {
    console.info("Creating permissions file: ", permFile);
    needWrite = true;
  } else {
    contents = JSON.parse(readFileSync(permFile, 'utf-8'));
    if (contents.allowed_modules === undefined) {
      needWrite = true;
      contents.allowed_modules = modules;
    } else {
      for (const m of modules) {
        if (!contents.allowed_modules.includes(m)) {
          contents.allowed_modules.push(m);
          needWrite = true;
        }
      }
    }
    if (needWrite) {
      writeFileSync(permFile, JSON.stringify(contents));
    }
  }

  // install variables file
  const varFile = join(configDir, 'variables.json');
  needWrite = false;
  mkdirSync(configDir, {recursive: true});
  let vars: Obj<unknown> = {};
  if (existsSync(varFile)) {
    vars = JSON.parse(readFileSync(varFile, 'utf-8'));
  }
  const host = config.host ?? `http://127.0.0.1:${config.port ?? 8888}`;
  if (vars.host != host) {
    vars.host = host;
    needWrite = true;
  }
  if (needWrite) {
    console.info('Updating ', varFile);
    writeFileSync(varFile, JSON.stringify(vars));
  }
}

if (isScriptRun('hubInstall')) {

  const help = 'npx hubInstall [--dev] [--config="/foo/bar/config.yaml"] {minecraft_server_dir}';

  const {argv, argn} = parseArgs(`
    Installs the behavior pack in the specified server directory.

    ${help}
  `)

  if (argv[0] === undefined) {
    console.error(`Did not receive Minecraft directory: ${JSON.stringify(argv)}\n\n${help}`);
    process.exit(1);
  }
  if (argv.length > 1) {
    console.error(`Received multiple Minecraft directories: ${JSON.stringify(argv)}\n\n${help}`);
    process.exit(1);
  }
  install(argv[0], argn);
}
