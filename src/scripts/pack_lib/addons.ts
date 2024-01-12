/**
 * addons.ts - Finds, parses, and loads additional optional addons.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs';
import {basename, relative, join, dirname} from 'node:path';

import {ConfigFile, readManifest, MinecraftAssetFiles} from '../../types.js';
import {PackData} from './pack_data.js';
import * as constants from './../../constants.js';
import * as lib from './../lib.js';
import {DefaultMap} from '../../lib/default_map.js';

const rpModuleTypes = ['resources'];
const bpModuleTypes = ['data', 'script'];

type AddonAssets = {
  /** general collision lookup table for filenames, entities, etc */
  assets: DefaultMap<string, Map<string, string>>;
  /** set of entities with hub_npc family (from bp entity def) */
  npcTypes: Set<string>;
  /** map of entities to render controllers (from rp client entity def) */
  entityRcs: Map<string, string[]>;
  /** map of render controllers to skin arrays (from rc) */
  rcSkins: Map<string, string[]>;
};

/** Load addons specified in your configuration file */
export async function parseAddons(config: ConfigFile, data: PackData) {
  const assets: AddonAssets = {
    assets: new DefaultMap(() => new Map<string, string>()),
    rcSkins: new Map<string, string[]>(),
    entityRcs: new Map<string, string[]>(),
    npcTypes: new Set<string>(),
  };

  const addons = ['default', ...(config.addons ?? [])];
  for (const addon of addons) {
    let path = addon;
    if (!addon.includes('/')) {
      path = join(lib.root, 'static', 'addons', addon);
    }
    if (!(await loadAddon(data, addon, path, assets))) {
      throw new Error(`No manifest found for addon: ${addon}`);
    }
  }

  for (const npcType of assets.npcTypes) {
    data.npcSkins.set(npcType, []);
    for (const rcId of assets.entityRcs.get(npcType) ?? []) {
      const rc = assets.rcSkins.get(rcId);
      if (rc === undefined) continue;
      data.npcSkins.set(npcType, rc);
    }
  }
}

/** Attempts to find the requested addon (may load multiple) */
async function loadAddon(
  data: PackData,
  name: string,
  path: string,
  assets: AddonAssets,
): Promise<boolean> {
  if (!existsSync(path)) throw new Error(`Addon not found: ${name}`);
  const contents = readdirSync(path);
  let success = false;
  if (contents.includes('manifest.json')) {
    const manifest = readManifest(join(path, 'manifest.json'));
    let isBp = false;
    let isRp = false;
    const types: string[] = [];
    for (const module of manifest.modules) {
      types.push(module.type);
      isBp = isBp || bpModuleTypes.includes(module.type);
      isRp = isRp || rpModuleTypes.includes(module.type);
    }
    // either both or none were set
    if (isBp === isRp) {
      throw new Error(
        `[${name}: ${path}] Unable to determine pack type: ${JSON.stringify(
          types,
        )}`,
      );
    }
    if (isBp) await readBp(assets, name, path);
    if (isRp) await readRp(assets, name, path);
    return true;
  }
  for (const part of contents) {
    const newPath = join(path, part);
    const stat = statSync(newPath);
    if (stat.isDirectory()) {
      success = (await loadAddon(data, name, newPath, assets)) || success;
    } else {
      if (part.endsWith('.mcaddon') || part.endsWith('.zip')) {
        continue;
        // success = (await unzipAddon(data, name, newPath, assets)) || success;
      }
    }
  }
  return success;
}

// async function unzipAddon(
//   data: PackData,
//   name: string,
//   path: string,
//   assets: AddonAssets,
// ) {
//   throw new Error('Function not implemented.');
//   return false;
// }

function checkAssetCollisions(
  assets: AddonAssets,
  assetName: string,
  ns: string,
  assetId: string,
) {
  const exists = assets.assets.get(ns).get(assetId);
  if (exists !== undefined) {
    throw new Error(
      `Collision found between addons (${exists} and ${assetName}) for ${ns}: ${assetId}`,
    );
  }
  assets.assets.get(ns).set(assetId, assetName);
}

/** Parse behavior packs, looking for entities */
async function readBp(assetss: AddonAssets, name: string, path: string) {
  for (const file of await lib.getFiles(path)) {
    if (basename(file) === 'manifest.json') continue;
    const rel = relative(path, file);

    console.info(name, 'Evaluating addon file: ', rel);
    checkAssetCollisions(assetss, name, 'filename', rel);
    if (file.endsWith('.json')) {
      const record = JSON.parse(readFileSync(file, 'utf-8'));
      for (const [key, val] of Object.entries(record)) {
        if (key === 'minecraft:entity') {
          const entity = val as MinecraftAssetFiles.Entity;
          const id = entity.description.identifier;
          checkAssetCollisions(assetss, name, key, id);
          const families = entity.components?.['minecraft:type_family']?.family;
          if (families?.includes('hub_npc')) assetss.npcTypes.add(id);
        }

        if (key === 'animation_controllers') {
          // pass - no checks or extraction at this time
        }
      }
    }
    mkdirSync(dirname(join(constants.BP_OUTPUT, rel)), {recursive: true});
    copyFileSync(file, join(constants.BP_OUTPUT, rel));
  }
}

/** Parse resource packs, looking for client entities and render controllers */
async function readRp(assets: AddonAssets, name: string, path: string) {
  for (const file of await lib.getFiles(path)) {
    if (basename(file) === 'manifest.json') continue;
    const rel = relative(path, file);
    console.info(name, 'Evaluating addon file: ', rel);
    checkAssetCollisions(assets, name, 'filename', rel);
    if (file.endsWith('.json')) {
      const record = JSON.parse(readFileSync(file, 'utf-8'));
      for (const [key, val] of Object.entries(record)) {
        if (key === 'minecraft:client_entity') {
          const entity = val as MinecraftAssetFiles.ClientEntity;
          const id = entity.description.identifier;
          checkAssetCollisions(assets, name, key, id);
          assets.entityRcs.set(id, entity.description.render_controllers);
        }

        if (key === 'render_controllers') {
          const controllers = record as MinecraftAssetFiles.RenderContoller;
          for (const [controllerId, controller] of Object.entries(
            controllers.render_controllers,
          )) {
            checkAssetCollisions(assets, name, key, controllerId);
            const skins = controller.arrays?.textures?.['Array.skins'];
            if (skins !== undefined) {
              assets.rcSkins.set(controllerId, skins);
            }
          }
        }
      }
    }
    mkdirSync(dirname(join(constants.RP_OUTPUT, rel)), {recursive: true});
    copyFileSync(file, join(constants.RP_OUTPUT, rel));
  }
}
