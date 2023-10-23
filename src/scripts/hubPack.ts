#!/usr/bin/env node

/**
 * Compiles and assembles the behavior pack code.
 */

import assert from 'assert';
import * as fs from 'fs';
import { dirname, join } from 'path';
import crypto from 'node:crypto'
import { cwd } from 'process';

import archiver from 'archiver';
import { rollup } from 'rollup';

import * as Constants from '../constants.js';
import * as lib from './lib.js';
import { BuildFile, ConfigFile, Dialogue, failValidation, Obj, readManifest, typiaErrorsFormat, Version } from '../types.js';

import { actionList } from './buildArtifacts.js';
import { readBuildFile, SceneFile, SceneFileScene } from '../types/configFile.js';

import { PackData } from './pack_lib/pack_data.js';
import { parseAddons } from './pack_lib/addons.js';

const COPY_DIRS: [string, string][] = [
  [join(lib.root, 'static/behavior_pack/static'), Constants.BP_OUTPUT],
  [join(lib.root, 'static/resource_pack/static'), Constants.RP_OUTPUT],
  [join(lib.root, 'dist/behavior_pack/src'), Constants.ADDON_TEMP],
]

let BUILD_INFO: BuildFile;

/** Assemble all the files for the add-on pack */
export async function createPackFiles(config: ConfigFile, argn?: Obj<string>) {
  loadBuildFile();
  const packData = new PackData();
  if (argn === undefined) argn = {};
  await fs.rmSync(Constants.BP_OUTPUT, { recursive: true, force: true });
  await fs.rmSync(Constants.RP_OUTPUT, { recursive: true, force: true });
  await copyStatic();
  await parseAddons(config, packData);
  const sceneData = await parseScriptFiles(config, packData);
  // WIP.
  // trimScriptData(sceneData);
  const { transitions, sceneFile } = assembleScenes(sceneData);
  writeSceneFile(sceneFile);
  writeScriptFile(config, packData, {
    transitions,
    actors: Object.fromEntries(sceneData.actors),
    items: sceneData.items,
    chats: sceneData.chats,
    actions: Object.fromEntries(sceneData.actions),
    variables: Object.fromEntries(sceneData.variables),
  });
  await rollupPack();
  await createZipFiles();
  if (argn['preserveTempFiles'] === undefined) {
    fs.rmSync(Constants.ADDON_TEMP, { force: true, recursive: true });
  } else {
    console.info('Preserving temp files.');
  }
}

function loadBuildFile() {
  if (fs.existsSync(Constants.BUILD_INFO)) {
    BUILD_INFO = readBuildFile(Constants.BUILD_INFO);
  } else {
    BUILD_INFO = {
      bp_version: [1, 0, versionNumber()],
      bp_hash: '',
      rp_version: [1, 0, versionNumber()],
      rp_hash: ''
    };
    lib.write(Constants.BUILD_INFO, JSON.stringify(BUILD_INFO));
  }
}

async function copyStatic() {
  const manifests: string[] = [];
  for (const [src_d, dest_d] of COPY_DIRS) {
    await lib.recursiveCopy(src_d, dest_d);
  }
}

function writeScriptFile(config: ConfigFile, data: PackData, script: unknown) {
  const manifest = readManifest(Constants.BP_MAN);
  lib.updateConstantsFile(Constants.ADDON_SCRIPT, {
    script: script,
    host: config.host,
    version: manifest.header.version.join('.'),
    npcSkins: Object.fromEntries(data.npcSkins),
  });
}

/** Write the behavior pack scene file */
function writeSceneFile(scenes: SceneFileScene[]) {
  const sceneFileFormat: SceneFile = {
    "format_version": "1.17",
    "minecraft:npc_dialogue": {
      "scenes": scenes
    }
  };
  lib.write(Constants.BP_SCENES, JSON.stringify(sceneFileFormat, undefined, 2));
}

/** Roll behavior pack into single file */
async function rollupPack() {
  console.info('Rolling up behavior pack script');
  const bundle = await rollup({
    input: Constants.ADDON_ENTRY,
    external: /@minecraft/,
  });
  await bundle.write({ file: Constants.BP_ROLLUP });
}

/** Parse and validate dialogue files */
export async function parseScriptFiles(config: ConfigFile, data: PackData) {
  const referencedScenes = new Set<string>();
  
  const scenes_dir = join(lib.root, 'static/scenes');
  
  const globalScenes = await lib.getFiles(scenes_dir, /\.(yaml|yml|json)$/);

  const scriptFiles: Obj<Dialogue.ScriptFile> = {};
  for (const df of [...globalScenes, ...(config.script_files ?? [])]) {
    let script = lib.loadScriptFile(df);
    scriptFiles[df] = script;

    const refScenes = parseScriptFile(script, data);
    for (const ref of refScenes) referencedScenes.add(ref);

    for (const [id, menu] of Object.entries(script.actions ?? {})) {
      data.actions.set(id, menu);
      actionList.push(id);
    }

    for (const scene of script.scenes ?? []) {
      data.scenes.set(scene.id, scene);

      let button: Dialogue.SuperButton;
      for (button of scene.buttons ?? []) {
        if (button.scene !== undefined) {
          referencedScenes.add(button.scene);
        }
      }
    }
  }

  // scene-actor mapping - creates an actor-specific scene.
  for (const actor of data.actors.values()) {
    let sceneId = actor.scene;
    let scene = data.scenes.get(actor.scene)!;
    if (scene.is_dummy === true) continue;
    const mergedId = `hub:${actor.id}:${sceneId}`;
    data.scenes.set(mergedId, Object.assign({}, scene, {
      id: mergedId,
      npc_name: actor.name,
    }));
    actor.scene = mergedId;
  }

  const missing: string[] = [];
  for (const id of referencedScenes) {
    if (!data.scenes.has(id)) missing.push(id);
  }
  assert(missing.length === 0,  `Missing scenes: ${JSON.stringify(missing)}`);

  const errors: Obj<string[]> = {};
  for (const [filename, script] of Object.entries(scriptFiles)) {
    Object.assign(errors, validateScript(filename, script, actionList));
  }

  if (Object.keys(errors).length !== 0) {
    failValidation(errors);
  }

  console.info(`Loaded ${data.scenes.size} scenes...`)

  return data;
}

function parseScriptFile(script: Dialogue.ScriptFile, data: PackData) {
  data.items.push(...(script.items ?? []));
  data.chats.push(...(script.chats ?? []));
  parseVariables(script, data);
  return parseActors(script, data);;
}

function parseActors(script: Dialogue.ScriptFile, data: PackData) {
  const referencedScenes = new Set<string>();

  for (const actor of script.actors ?? []) {
    const extra: {skin?: number, scene: string, roles: string[], events: string[]} = {
      scene: actor.scene ?? '',
      roles: [actor.id, ...(actor.roles ?? [])],
      events: actor.events ?? [],
    };
    if (actor.scene === undefined) {
      extra.scene = `hub:${actor.id}:_dummy`
      data.scenes.set(extra.scene, {
        id: extra.scene,
        text: '',
        buttons: [],
        is_dummy: true,
        npc_name: actor.name,
      });
    }

    if (actor.entityId === undefined) actor.entityId = 'hub:npc';
    if (data.npcSkins.get(actor.entityId) === undefined) {
      const ids = JSON.stringify(Array.from(data.npcSkins.keys()));
      throw new Error(
        `NPC entity ID not found: "${actor.entityId}"; availalbe ids: ${ids}`
      );
    }

    if (actor.skin !== undefined) {
      const skins = data.npcSkins.get(actor.entityId);
      if (skins === undefined || skins.length === 0) {
        throw new Error(`[Actor ${actor.id}]: No skins defined for entity "${actor.entityId}"`);
      }
      extra.skin = skins.indexOf(actor.skin);
      if (extra.skin === -1) {
        const all = JSON.stringify(skins);
        throw new Error(
          `[Actor ${actor.id}]: Skin "${actor.skin}" not found for entity "${actor.entityId}"; available skins: ${all}`
        );
      }
    }

    data.actors.set(actor.id, Object.assign({}, actor, extra));
    referencedScenes.add(extra.scene);
  }
  return referencedScenes;
}

function parseVariables(script: Dialogue.ScriptFile, data: PackData) {
  for (const [vScope, variables] of Object.entries(script.variables ?? {})) {
    for (const [vType, varFields] of Object.entries(variables)) {
      for (const [vIndex, vName] of Object.entries(varFields)) {
        const index = parseInt(vIndex);
        try {
          data.variables.set(vName as string, [vScope, vType, index]);
        } catch (e) {
          throw new Error(`Duplicate variable key defined: ${vName}`);
        }
        try {
          data.variableTypes.get(`${vScope}_${vType}`).set(index, vName as string);
        } catch (e) {
          throw new Error(`Duplicate variable index for [${vScope} ${vType}]: ${index}`);
        }
      }
    }
  }
}

/** Trim any unused scenes */
function trimScriptData(data: PackData) {
  let cnt = 0;
  const scenes = new Set<string>();
  const stack: string[] = [];

  /** recursively seaarch through an object to find scenes */
  const findScenes = (haystack: any, needles?: Set<string>) => {
    if (needles === undefined) needles = new Set<string>();
    if (Array.isArray(haystack)) {
      for (const item of haystack) findScenes(item, needles);
    }
    if (typeof haystack === 'object' && haystack !== null) {
      for (const [key, val] of Object.entries(haystack))  {
        if (key === 'scene' && typeof val === 'string') {
          needles.add(val);
        } else {
          if (Array.isArray(val) || typeof val === 'object') {
            findScenes(val, needles);
          }
        }
      }
    }
    return needles;
  };

  for (const actor of data.actors.values()) {
    stack.push(actor.scene);
  }
  // TODO: stack needs to account for actions and other scene sources
  while (stack.length > 0) {
    const sceneId = stack.pop() as string;
    if (scenes.has(sceneId)) continue;
    scenes.add(sceneId);
    const scene = data.scenes.get(sceneId);
    if (scene === undefined) throw new Error(`Unable to find scene: ${sceneId}`);
    stack.push(...findScenes('scene'));
  }
  for (const key in Array.from(data.scenes.keys())) {
    if (!scenes.has(key)) {
      cnt += 1;
      data.scenes.delete(key);
    }
  }
  console.info(`Trimmed ${cnt} scenes`)
  return data;
}

/** Construct behavior pack dialogue file */
export function assembleScenes(data: PackData) {
  const sceneFile: SceneFileScene[] = [];
  const transitions: Dialogue.TransitionMap = {};

  for (const scene of data.scenes.values()) {
    const scn: SceneFileScene = {
      scene_tag: scene.id,
      text: { rawtext: [ { text: scene.text } ] },
      buttons: [],
    }
    if (scene.npc_name !== undefined) {
      scn.npc_name = scene.npc_name
    }
    sceneFile.push(scn);
    transitions[scn.scene_tag] = { scene: scene.id };

    let button: Dialogue.SuperButton;
    for (button of scene.buttons ?? []) {
      const btnId = `${Constants.ID('btn', md5sum(button))}`;

      const transition: Dialogue.Transition = Object.assign({}, button);
      //@ts-ignore -- text exists on button
      delete transition.text;
      transitions[btnId] = transition;

      scn.buttons.push({
        name: button.text,
        commands: [`/scriptevent hub:dialogue_transition ${btnId}`]
      });
    }
  }

  return { transitions, sceneFile };
}

/** Create the mcaddon files, optionally updating the verison number if changed */
async function createZipFiles() {
  console.info('Checking bp: ', JSON.stringify(BUILD_INFO.rp_version));
  updateManifest(Constants.RP_MAN, BUILD_INFO.rp_version, BUILD_INFO.bp_version);
  let hash = await zipPack(Constants.RP_OUTPUT, Constants.RP_NAME + '.mcaddon');
  if (hash !== BUILD_INFO.rp_hash) {
    BUILD_INFO.rp_version[2] = versionNumber();
    const outPath = join(dirname(Constants.RP_OUTPUT), Constants.RP_NAME + '.mcaddon');
    console.info(`Bumping RP version to ${JSON.stringify(BUILD_INFO.rp_version)}`);
    updateManifest(Constants.RP_MAN, BUILD_INFO.rp_version, BUILD_INFO.bp_version);
    BUILD_INFO.rp_hash = await zipPack(Constants.RP_OUTPUT, Constants.RP_NAME + '.mcaddon');
  } else {
    console.info('RP unchanged.');
  }
  updateManifest(Constants.BP_MAN, BUILD_INFO.bp_version, BUILD_INFO.rp_version);
  hash = await zipPack(Constants.BP_OUTPUT, Constants.BP_NAME + '.mcaddon');
  if (hash !== BUILD_INFO.bp_hash) {
    BUILD_INFO.bp_version[2] = versionNumber();
    console.info('Bumping BP version to ', JSON.stringify(BUILD_INFO.bp_version));
    updateManifest(Constants.BP_MAN, BUILD_INFO.bp_version, BUILD_INFO.rp_version);
    BUILD_INFO.bp_hash = await zipPack(Constants.BP_OUTPUT, Constants.BP_NAME + '.mcaddon');
  } else {
    console.info('BP unchanged.');
  }
  fs.writeFileSync(Constants.BUILD_INFO, JSON.stringify(BUILD_INFO));
}

function updateManifest(path: string, version: Version, dep_version: Version) {
  console.info('Updating manifest: ', path.slice(cwd().length + 1));
  const man = readManifest(path);
  man.header.version = version;
  for (const mod of man.modules) {
    mod.version = version;
  }
  for (const dep of man.dependencies ?? []) {
    if (dep.uuid !== undefined) {
      dep.version = dep_version;
    }
  }
  fs.writeFileSync(path, JSON.stringify(man, undefined, 2));
}


export type validators = {[field: string]: (val: unknown) => string[]}
export function validateDeep(obj: unknown, validators: validators) {
  const errors: [path: string, msg: string][] = [];
  const stack: [path: string[], value: unknown][] = [[['$'], obj]];
  while (stack.length > 0) {
    const [path, value] = stack.pop() as [string[], unknown];

    if (typeof value === 'object' && value !== null) {
      for (const [key, validator] of Object.entries(validators)) {
        if ((value as Obj<unknown>)[key] !== undefined) {
          errors.push(...validator((value as Obj<unknown>)).map(
            e => [path.join('.'), e] as [string, string]
          ));
        }
      }
      for (const [key, val] of Object.entries(value)) {
        stack.push([[...path, key], val]);
      }
    }

    if (Array.isArray(value)) {
      for (const [index, val] of value.entries()) {
        stack.push([[...path, String(index)], val]);
      }
    }
  }
  return errors;
}

export function validateScript(filename: string, script: Dialogue.ScriptFile, actionList: string[]) {
  const errors: string[] = []
  const result = Dialogue.validateScript(script);
  errors.push(...typiaErrorsFormat(result));

  for (const validator of Object.keys(Dialogue.ActionArgs)) {
    if (!actionList.includes(validator)) throw new Error(
      `Unrecognized ActionArg validator: ${validator}`
    )
  }

  validateDeep(script, {
    action: obj => {
      const errors: string[] = [];
      const actionName = (obj as Dialogue.Action).action;
      if (!actionList.includes(actionName)) {
        errors.push(`Unrecognized action: ${actionName}`);
      }
      const argValidator = Dialogue.ActionArgs[actionName];
      if (argValidator !== undefined) {
        errors.push(...typiaErrorsFormat(
          argValidator((obj as Dialogue.Action).args)));
      }
      return errors;
    },
  }).forEach(([path, msg]) => {
    errors.push(`${path} : ${msg}`)
  });
  const errorObj: Obj<string[]> = {};
  if (errors.length !== 0) errorObj[filename] = errors;
  return errorObj;
}

async function zipPack(dir: string, filename: string) {
  const outPath = join(dirname(dir), filename);

  // file metadata seems to throw this off when hashing the zip file itself
  const hashes = [];
  const files = await lib.getFiles(dir);
  for (const f of files) {
    hashes.push(_md5sum(fs.readFileSync(f)));
  }

  console.info('Creating Add-On: ', outPath.slice(cwd().length + 1));
  const zipper = archiver('zip');
  zipper.on('error', (err: unknown) => {throw err});

  const stream = fs.createWriteStream(outPath);
  const streamIsClosed = new Promise<void>(res => stream.on('close', res));

  zipper.pipe(stream);
  zipper.directory(dir, false);
  await zipper.finalize();
  await streamIsClosed;
  return md5sum(hashes);
}

/** Returns the MD5 Sum of a string or json encoded object */
export function md5sum(input: string|any) {
  if (typeof input !== 'string') {
    input = JSON.stringify(input);
  }
  return _md5sum(input);
}

function _md5sum(input: string|Buffer) {
  return crypto.createHash('md5').update(input).digest('hex')
}

if (lib.isScriptRun('hubPack')) {
  const { argn } = lib.parseArgs(`
    Compiles and assembles the behavior pack code.

    npx hubPack [--config="/foo/bar/config.yaml] [--preserveTempFiles]
  `);
  createPackFiles(lib.readConfig(argn.config), argn);
}

function versionNumber() {
  return Math.floor(new Date().getTime() / 1000);
}
