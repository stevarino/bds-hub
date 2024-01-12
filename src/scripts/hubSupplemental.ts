#!/usr/bin/env node

/**
 * Given a hub.json file, builds out a supplementary addon pack
 * as defined.
 *
 * This is primarily used for generating custom npc's.
 */

import * as lib from './lib.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as util from 'node:util';

import {JSONPath} from 'jsonpath-plus';
import stringify from 'json-stringify-pretty-compact';

const CONFIG_TEMPLATES = {
  npc_bp_man: 'bp/manifest.json',
  npc_bp_entity: 'bp/entities/%s.se.json',
  npc_rp_man: 'rp/manifest.json',
  npc_rp_entity: 'rp/entity/%s.ce.json',
  npc_rp_rc: 'rp/render_controllers/%s.rc.json',
};

interface Override {
  path: string;
  value?: unknown;
  extend?: unknown[];
  merge?: unknown;
  rename?: [from: string, to: string];
}

interface Overrides {
  npc_bp_man?: Override[];
  npc_bp_entity?: Override[];
  npc_rp_man?: Override[];
  npc_rp_entity?: Override[];
  npc_rp_rc?: Override[];
}

type NpcOptions = {
  textures?: string[];
  texture_map?: {[texture_id: string]: string};
} & Overrides;

interface HubSupplemental {
  npc_entities?: {[entity_id: string]: NpcOptions};
}

async function buildSupPack(filename: string) {
  const dir = path.dirname(filename);
  const file = JSON.parse(
    fs.readFileSync(filename, 'utf-8'),
  ) as HubSupplemental;
  for (const [entity_id, options] of Object.entries(file.npc_entities ?? {})) {
    const safe_entity_id = entity_id.replace(':', '__');
    const textureMap = await mergeTextures(dir, safe_entity_id, options);

    const events: {[key: string]: unknown} = {};
    const component_groups: {[key: string]: unknown} = {};
    for (let i = 0; i < Object.keys(textureMap).length; i++) {
      events[`hub:npc_skin_${i}`] = {
        add: {component_groups: [`hub:npc_skin_${i}`]},
      };
      component_groups[`hub:npc_skin_${i}`] = {'minecraft:variant': {value: i}};
    }

    const overrides: Overrides = {
      npc_bp_entity: [
        {path: 'minecraft:entity.description.identifier', value: entity_id},
        {path: 'minecraft:entity.events', merge: events},
        {path: 'minecraft:entity.component_groups', merge: component_groups},
      ],
      npc_rp_entity: [
        {
          path: 'minecraft:client_entity.description.identifier',
          value: entity_id,
        },
        {
          path: 'minecraft:client_entity.description.textures',
          value: textureMap,
        },
        {
          path: 'minecraft:client_entity.description.render_controllers',
          extend: [`controller.render.${safe_entity_id}`],
        },
      ],
      npc_rp_rc: [
        {
          path: 'render_controllers.entity_id.arrays.textures["Array.skins"]',
          value: Object.keys(textureMap).map(v => 'Texture.' + v),
        },
        {
          path: 'render_controllers',
          rename: ['entity_id', `controller.render.${safe_entity_id}`],
        },
      ],
    };

    for (const fileTemplate of Object.keys(CONFIG_TEMPLATES)) {
      const key = fileTemplate as keyof typeof CONFIG_TEMPLATES;
      const template = path.join(
        lib.root,
        'static',
        'lib',
        'hubBuildSup',
        fileTemplate + '.json',
      );
      const json = JSON.parse(fs.readFileSync(template, 'utf-8'));
      performOverrides(json, [options[key], overrides[key]]);
      let filename = CONFIG_TEMPLATES[key];
      if (filename.includes('%s')) {
        filename = util.format(CONFIG_TEMPLATES[key], safe_entity_id);
      }
      fs.mkdirSync(path.join(dir, path.dirname(filename)), {recursive: true});
      fs.writeFileSync(path.join(dir, filename), stringify(json));
    }
  }
}

async function mergeTextures(
  packDir: string,
  safe_entity_id: string,
  options: NpcOptions,
) {
  const textures = options.texture_map ?? {};
  if (options.textures !== undefined) {
    const finalDir = fs.realpathSync(
      path.join(packDir, 'rp', 'textures', 'entity', safe_entity_id),
    );
    fs.mkdirSync(finalDir, {recursive: true});
    for (const configDir of options.textures) {
      const directory = path.join(packDir, configDir);
      const files = await lib.getFiles(directory, /.+\.png$/);

      for (const file of files) {
        const basename = path.basename(file).split('.')[0]!;
        if (fs.realpathSync(file).indexOf(finalDir) === -1) {
          fs.copyFileSync(file, path.join(finalDir, basename + '.png'));
        }
        textures[basename] = `textures/entity/${safe_entity_id}/${basename}`;
      }
    }
  }
  return textures;
}

function performOverrides(json: any, overrides: (Override[] | undefined)[]) {
  for (const override of overrides) {
    for (const rule of override ?? []) {
      let strPath = rule.path;
      // unclear if $ is required for jsonpath, but it is required for jsonpath-plus lib
      if (!strPath.startsWith('$')) strPath = '$.' + strPath;
      const path = JSONPath.toPathArray(strPath);
      const name = path.pop()!;

      let parent = JSONPath({
        path: JSONPath.toPathString(path),
        json: json as object,
        wrap: false,
      });
      if (parent === undefined) {
        let target: Record<string, unknown> = json;
        for (const item of path) {
          if (item === '$') continue;
          // TODO: handle arrays in path (not currently needed)
          if (target[item] === undefined) {
            target[item] = {};
          }
          target = target[item] as Record<string, unknown>;
        }
        parent = target;
      }
      if (rule.value !== undefined) parent[name] = rule.value;
      if (rule.rename !== undefined) {
        if (parent[name] === undefined) parent[name] = {};
        parent[name][rule.rename[1]] = parent[name][rule.rename[0]];
        delete parent[name][rule.rename[0]];
      }
      if (rule.merge !== undefined) {
        if (parent[name] === undefined) parent[name] = {};
        Object.assign(parent[name], rule.merge);
      }
      if (rule.extend !== undefined) {
        if (parent[name] === undefined) parent[name] = [];
        parent[name].push(...rule.extend);
      }
    }
  }
}

if (lib.isScriptRun('hubSupplemental')) {
  const {argv} = lib.parseArgs(`
    Given a hub.json file, builds out a supplementary addon pack as defined.

    This is primarily used for generating custom npc's.

    npx hubSupplemental  "path/to/dir/hub.json"
  `);

  for (const filename of argv) {
    buildSupPack(filename).catch(lib.showErrorTraceback);
  }
}
