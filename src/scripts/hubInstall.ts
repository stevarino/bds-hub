#!/usr/bin/env node

/**
 * Installs the add on to a specified minecraft server.
 */

import * as fs from 'node:fs';
import { basename, join } from 'node:path';

import { isScriptRun, parseArgs, readConfig } from './lib.js';
import { ManifestFile, Obj, readManifest } from '../types.js';
import * as constants from '../constants.js';
import { createPackFiles } from './hubPack.js';

const modules = [
  "@minecraft/server",
  "@minecraft/server-admin",
  "@minecraft/server-net",
  "@minecraft/server-ui",
];

/** Install behavior/resource pack into server */
async function install(mcDir: string, argn: Obj<string|undefined>) {
  const config = readConfig(argn.config);

  // build the pack code
  await createPackFiles(config);

  const mapping = {
    behavior: {
      pack: constants.BP_FILE,
      manifest: readManifest(constants.BP_MAN),
    },
    resource: {
      pack: constants.RP_FILE,
      manifest: readManifest(constants.RP_MAN),
    },
  }

  for (const [name, props] of Object.entries(mapping)) {
    const dir = join(mcDir, `${argn.dev === undefined ? '' : 'development_'}${name}_packs`);
    const packFile = join(dir, basename(props.pack));
    if (fs.existsSync(packFile)) fs.rmSync(packFile);
    console.info(`Copying ${basename(props.pack)} to ${dir}`);
    fs.copyFileSync(props.pack, packFile);

    for (const f of fs.readdirSync(join(mcDir, 'worlds'))) {
      const packList = join(mcDir, 'worlds', f, `world_${name}_packs.json`);
      enablePack(packList, props.manifest);
    }
  }
  
  // check allowed_modules
  const permissionsFile = join(mcDir, 'config', 'default', 'permissions.json');
  const permissions = JSON.parse(fs.readFileSync(permissionsFile, 'utf-8'));
  if (!(permissions.allowed_modules as string[]).includes('@minecraft/server-net')) {
    console.info('Add net module to allowed_modules');
    permissions.allowed_modules.push('@minecraft/server-net');
    fs.writeFileSync(permissionsFile, JSON.stringify(permissions, undefined, 2));
  }

  let script_uuid: string|undefined = undefined;
  for (const mod of mapping.behavior.manifest.modules) {
    if (mod.type === 'script') {
      script_uuid = mod.uuid;
      break;
    }
  }
  if (script_uuid === undefined) throw new Error('Failed to find script uuid');

  const configDir = join(mcDir, 'config', script_uuid);
  fs.mkdirSync(configDir, {recursive: true});
  if (!fs.existsSync(join(configDir, '/readme.txt'))) {
    fs.writeFileSync(join(configDir, '/readme.txt'), `Used by ${basename(mapping.behavior.pack)}`);
  }
  // install permisisons file
  let contents: {allowed_modules?: string[]} = {
    allowed_modules: modules
  };
  let needWrite = false;
  const permFile = join(configDir, 'permissions.json');
  if (!fs.existsSync(permFile)) {
    console.info("Creating permissions file: ", permFile);
    needWrite = true;
  } else {
    contents = JSON.parse(fs.readFileSync(permFile, 'utf-8'));
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
      console.info("Updating permissions file: ", permFile);
      fs.writeFileSync(permFile, JSON.stringify(contents));
    }
  }

  // install variables file
  const varFile = join(configDir, 'variables.json');
  needWrite = false;
  fs.mkdirSync(configDir, {recursive: true});
  let vars: Obj<unknown> = {};
  if (fs.existsSync(varFile)) {
    vars = JSON.parse(fs.readFileSync(varFile, 'utf-8'));
  }
  const host = config.host ?? `http://127.0.0.1:${config.port ?? 8888}`;
  if (vars.host != host) {
    vars.host = host;
    needWrite = true;
  }
  if (needWrite) {
    console.info('Updating ', varFile);
    fs.writeFileSync(varFile, JSON.stringify(vars));
  }
}

function enablePack(packList: string, manifest: ManifestFile) {
  let packContent: {pack_id: string, version: number[]}[] = [];
  if (fs.existsSync(packList)) {
    packContent = JSON.parse(fs.readFileSync(packList, 'utf-8'));
  }

  let found = false;
  let needWrite = true;
  for (const entry of packContent) {
    if (entry.pack_id === manifest.header.uuid) {
      found = true;
      if (JSON.stringify(entry.version) === JSON.stringify(manifest.header.version)) {
        console.info(`${packList} up to date`);
        needWrite = false;
        break;
      }
      console.info('Updating ', packList);
      entry.version = manifest.header.version;
    }
  }
  if (!found) {
    console.info('Added in ', packList);
    packContent.push({
      pack_id: manifest.header.uuid,
      version: manifest.header.version,
    });
  }
  if (needWrite) {
    fs.writeFileSync(packList, JSON.stringify(packContent, undefined, 2));
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
