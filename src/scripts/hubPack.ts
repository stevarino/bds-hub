#!/usr/bin/env node

/**
 * Compiles and assembles the behavior pack code.
 */

import assert from 'assert';
import * as fs from 'fs';
import {dirname, join} from 'path';
import crypto from 'node:crypto';
import {cwd} from 'process';

import archiver from 'archiver';
import {rollup} from 'rollup';

import * as lib from './lib.js';
import {
  ConfigFile,
  Dialogue,
  failValidation,
  Obj,
  readManifest,
  typiaErrorsFormat,
  Version,
} from '../types.js';

import {actionList} from './buildArtifacts.js';
import {
  SceneFile,
  SceneFileScene,
  BuildSettings,
  settingsInit,
} from '../types/gen/config_file.js';

import {PackData} from './pack_lib/pack_data.js';
import {parseAddons} from './pack_lib/addons.js';
import { ID } from '../lib/constants.js';


export async function createPacks(config: ConfigFile, argn?: Obj<string>) {
  const settings = settingsInit(config, argn);

  await fs.rmSync(settings.tempDir, {recursive: true, force: true});
  fs.mkdirSync(settings.srcDir, {recursive: true});
  await lib.recursiveCopy(join(lib.root, 'dist'), settings.srcDir);
  
  createHubPack(settings);
  createStudioResourcePack(settings);
  createStudioBehaviorPack(settings);
  if (settings.argn.preserveTempFiles === undefined) {
    await fs.rmSync(settings.tempDir, {recursive: true, force: true});
  }
  return settings;
}

function saveBuildFile(settings: BuildSettings) {
  lib.write(settings.buildFile, JSON.stringify(settings.build));
}

async function createHubPack(settings: BuildSettings) {
  const packName = 'bds_hub_bp';
  await initPackDir(settings, packName);
  await rollupPack(
    join(settings.srcDir, 'bds_hub', 'index.js'),
    join(settings.tempDir, packName, 'script', 'index.rollup.js'),
  );
  packagePackFiles(settings, packName);
}

async function createStudioResourcePack(settings: BuildSettings) {
  const packName = 'bedrock_studio_rp';
  await initPackDir(settings, packName);
  packagePackFiles(settings, packName);
}

async function createStudioBehaviorPack(settings: BuildSettings) {
  const packName = 'bedrock_studio_bp';
  const packData = new PackData();

  const dir = await initPackDir(settings, packName);
  const sceneData = await parseScriptFiles(settings.config, packData);
  const {transitions, dialogueFile} = assembleScenes(sceneData);
  parseAddons(settings, packData);
  writeDialogue(join(dir, 'dialogue', 'dialogue.json'), dialogueFile);
  writeData(settings, packData, {
    transitions,
    actors: Object.fromEntries(sceneData.actors),
    items: sceneData.items,
    chats: sceneData.chats,
    actions: Object.fromEntries(sceneData.actions),
    variables: Object.fromEntries(sceneData.variables),
  });
  await rollupPack(
    join(settings.srcDir, 'bedrock_studio', 'index.js'),
    join(settings.tempDir, packName, 'script', 'index.rollup.js'),
  );
  packagePackFiles(settings, packName);
}

/** Creates the directory and copies over any data files. */
async function initPackDir(settings: BuildSettings, packName: string) {
  const dir = join(settings.tempDir, packName);
  fs.mkdirSync(dir, {recursive: true});
  const data_dir = join(lib.root, 'data', packName);
  if (fs.existsSync(data_dir)) {
    await lib.recursiveCopy(data_dir, dir);
  }
  return dir;
}

function writeData(settings: BuildSettings, data: PackData, script: unknown) {
  lib.updateConstantsFile(join(settings.srcDir, 'bedrock_studio', 'data.js'), {
    script: script,
    npcSkins: Object.fromEntries(data.npcSkins),
  });
}

/** Write the behavior pack scene file */
function writeDialogue(sceneFile: string, scenes: SceneFileScene[]) {
  const sceneFileFormat: SceneFile = {
    format_version: '1.17',
    'minecraft:npc_dialogue': {
      scenes: scenes,
    },
  };
  lib.write(sceneFile, JSON.stringify(sceneFileFormat, undefined, 2));
}

/** Roll behavior pack into single file */
async function rollupPack(entry: string, output: string) {
  const bundle = await rollup({input: entry, external: /@minecraft/});
  await bundle.write({file: output});
}

/** Parse and validate dialogue files */
export async function parseScriptFiles(config: ConfigFile, data: PackData) {
  const referencedScenes = new Set<string>();

  const scenes_dir = join(lib.root, 'data/scenes');

  const globalScenes = await lib.getFiles(scenes_dir, /\.(yaml|yml|json)$/);

  const scriptFiles: Obj<Dialogue.ScriptFile> = {};
  for (const df of [...globalScenes, ...(config.script_files ?? [])]) {
    const script = lib.loadScriptFile(df);
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
    const sceneId = actor.scene;
    const scene = data.scenes.get(actor.scene)!;
    if (scene.is_dummy === true) continue;
    const mergedId = `hub:${actor.id}:${sceneId}`;
    data.scenes.set(
      mergedId,
      Object.assign({}, scene, {
        id: mergedId,
        npc_name: actor.name,
      }),
    );
    actor.scene = mergedId;
  }

  const missing: string[] = [];
  for (const id of referencedScenes) {
    if (!data.scenes.has(id)) missing.push(id);
  }
  assert(missing.length === 0, `Missing scenes: ${JSON.stringify(missing)}`);

  const errors: Obj<string[]> = {};
  for (const [filename, script] of Object.entries(scriptFiles)) {
    Object.assign(errors, validateScript(filename, script, actionList));
  }

  if (Object.keys(errors).length !== 0) {
    failValidation(errors);
  }

  console.info(`Loaded ${data.scenes.size} scenes...`);

  return data;
}

function parseScriptFile(script: Dialogue.ScriptFile, data: PackData) {
  data.items.push(...(script.items ?? []));
  data.chats.push(...(script.chats ?? []));
  parseVariables(script, data);
  return parseActors(script, data);
}

function parseActors(script: Dialogue.ScriptFile, data: PackData) {
  const referencedScenes = new Set<string>();

  for (const actor of script.actors ?? []) {
    const extra: {
      skin?: number;
      scene: string;
      roles: string[];
      events: string[];
    } = {
      scene: actor.scene ?? '',
      roles: [actor.id, ...(actor.roles ?? [])],
      events: actor.events ?? [],
    };
    if (actor.scene === undefined) {
      extra.scene = `hub:${actor.id}:_dummy`;
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
        `NPC entity ID not found: "${actor.entityId}"; availalbe ids: ${ids}`,
      );
    }

    if (actor.skin !== undefined) {
      const skins = data.npcSkins.get(actor.entityId);
      if (skins === undefined || skins.length === 0) {
        throw new Error(
          `[Actor ${actor.id}]: No skins defined for entity "${actor.entityId}"`,
        );
      }
      extra.skin = skins.indexOf(actor.skin);
      if (extra.skin === -1) {
        const all = JSON.stringify(skins);
        throw new Error(
          `[Actor ${actor.id}]: Skin "${actor.skin}" not found for entity "${actor.entityId}"; available skins: ${all}`,
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
          data.variableTypes
            .get(`${vScope}_${vType}`)
            .set(index, vName as string);
        } catch (e) {
          throw new Error(
            `Duplicate variable index for [${vScope} ${vType}]: ${index}`,
          );
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
  const findScenes = (haystack: unknown, needles?: Set<string>) => {
    if (needles === undefined) needles = new Set<string>();
    if (Array.isArray(haystack)) {
      for (const item of haystack) {
        findScenes(item, needles);
      }
    }
    if (typeof haystack === 'object' && haystack !== null) {
      for (const [key, val] of Object.entries(haystack)) {
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
    if (scene === undefined)
      throw new Error(`Unable to find scene: ${sceneId}`);
    stack.push(...findScenes(scene));
  }
  for (const key in Array.from(data.scenes.keys())) {
    if (!scenes.has(key)) {
      cnt += 1;
      data.scenes.delete(key);
    }
  }
  console.info(`Trimmed ${cnt} scenes`);
  return data;
}

/** Construct behavior pack dialogue file */
export function assembleScenes(data: PackData) {
  const dialogueFile: SceneFileScene[] = [];
  const transitions: Dialogue.TransitionMap = {};

  for (const scene of data.scenes.values()) {
    const scn: SceneFileScene = {
      scene_tag: scene.id,
      text: {rawtext: [{text: scene.text}]},
      buttons: [],
    };
    if (scene.npc_name !== undefined) {
      scn.npc_name = scene.npc_name;
    }
    dialogueFile.push(scn);
    transitions[scn.scene_tag] = {scene: scene.id};

    let button: Dialogue.SuperButton;
    for (button of scene.buttons ?? []) {
      const btnId = `${ID('btn', md5sum(button))}`;

      const transition: Dialogue.Transition = Object.assign({}, button);
      //@ts-ignore -- text exists on button
      delete transition.text;
      transitions[btnId] = transition;

      scn.buttons.push({
        name: button.text,
        commands: [`/scriptevent hub:dialogue_transition ${btnId}`],
      });
    }
  }

  return {transitions, dialogueFile};
}

async function packagePackFiles(
    settings: BuildSettings, packName: string, packDep?: string
) {
  if (settings.build.packs === undefined) settings.build.packs = {};
  let packBuild = settings.build.packs[packName];
  if (packBuild === undefined) {
    packBuild = { version: defaultVersion(), hash: '' };
    settings.build.packs[packName] = packBuild;
  }

  console.info(`Packaging ${packName}: `, JSON.stringify(packBuild));
  const buildDir = join(settings.tempDir, packName);
  const defVersion = defaultVersion();
  const version = settings.build.packs?.[packName]?.version ?? defVersion;
  const depVersion = settings.build.packs?.[packDep ?? '']?.version ?? defVersion;
  const manifest = join(buildDir, 'manifest.json');

  updateManifest(manifest, version, depVersion);
  let hash = await zipPack(buildDir, join(settings.buildDir, packName) +  '.mcaddon');
  if (hash === packBuild.hash) {
    console.log(`Pack ${packName} unchanged.`);
    return;
  }
  version[2] = versionNumber();
  console.info(`Bumping ${packName} version to ${JSON.stringify(version)}`);
  updateManifest(manifest, version, depVersion);
  hash = await zipPack(buildDir, join(settings.buildDir, packName) +  '.mcaddon');
  saveBuildFile(settings);
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

function defaultVersion(): Version {
  return [1, 0, versionNumber()];
}

export type validators = {[field: string]: (val: unknown) => string[]};
export function validateDeep(obj: unknown, validators: validators) {
  const errors: [path: string, msg: string][] = [];
  const stack: [path: string[], value: unknown][] = [[['$'], obj]];
  while (stack.length > 0) {
    const [path, value] = stack.pop() as [string[], unknown];

    if (typeof value === 'object' && value !== null) {
      for (const [key, validator] of Object.entries(validators)) {
        if ((value as Obj<unknown>)[key] !== undefined) {
          errors.push(
            ...validator(value as Obj<unknown>).map(
              e => [path.join('.'), e] as [string, string],
            ),
          );
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

export function validateScript(
  filename: string,
  script: Dialogue.ScriptFile,
  actionList: string[],
) {
  const errors: string[] = [];
  const result = Dialogue.validateScript(script);
  errors.push(...typiaErrorsFormat(result));

  for (const validator of Object.keys(Dialogue.ActionArgs)) {
    if (!actionList.includes(validator))
      throw new Error(`Unrecognized ActionArg validator: ${validator}`);
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
        errors.push(
          ...typiaErrorsFormat(argValidator((obj as Dialogue.Action).args)),
        );
      }
      return errors;
    },
  }).forEach(([path, msg]) => {
    errors.push(`${path} : ${msg}`);
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
  zipper.on('error', (err: unknown) => {
    throw err;
  });

  const stream = fs.createWriteStream(outPath);
  const streamIsClosed = new Promise<void>(res => stream.on('close', res));

  zipper.pipe(stream);
  zipper.directory(dir, false);
  await zipper.finalize();
  await streamIsClosed;
  return md5sum(hashes);
}

/** Returns the MD5 Sum of a string or json encoded object */
export function md5sum(input: string | unknown) {
  if (typeof input !== 'string') {
    return _md5sum(JSON.stringify(input));
  }
  return _md5sum(input);
}

function _md5sum(input: string | Buffer) {
  return crypto.createHash('md5').update(input).digest('hex');
}

function versionNumber() {
  return Math.floor(new Date().getTime() / 1000);
}

if (lib.isScriptRun('hubPack')) {
  const {argn} = lib.parseArgs(`
    Compiles and assembles the behavior pack code.

    npx hubPack [--config="/foo/bar/config.yaml] [--preserveTempFiles]
  `);
  createPacks(lib.readConfig(argn.config), argn).catch(
    lib.showErrorTraceback,
  );
}
