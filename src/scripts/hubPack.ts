#!/usr/bin/env node

/**
 * Compiles and assembles the behavior pack code.
 */

import assert from 'assert';
import * as fs from 'fs';
import { dirname, join } from 'path';
import crypto from 'node:crypto'
import { cwd } from 'process';

import yaml from 'yaml';
import archiver from 'archiver';
import { rollup } from 'rollup';

import * as Constants from '../constants.js';
import * as lib from './lib.js';
import { ConfigFile, Dialogue, failValidation, Obj, typiaErrorsFormat } from '../types.js';

import { actionList } from './buildArtifacts.js';

const DIRS: [string, string][] = [
  [join(lib.root, 'dist/behavior_pack/static'), Constants.ADDON_OUTPUT],
  [join(lib.root, 'dist/behavior_pack/src'), Constants.ADDON_TEMP],
]

/** Assemble all the files for the add-on pack */
export async function createPackFiles(config: ConfigFile) {
  await copyStatic();
  const { actors, scenes, items, chats, actions } = await parseDialogueFiles(config);
  const { transitions, packScenes } = assembleScenes(actors, scenes);
  writeSceneFile(packScenes);
  writeTransitionsFile({
    transitions,
    actors,
    items,
    chats,
    actions,
  });
  await rollupPack();
  await zipPack();
  // fs.rmSync(Constants.ADDON_TEMP, { force: true, recursive: true });
}

async function copyStatic() {
  for (const [src, dest] of DIRS)
  await lib.recursiveCopy(src, dest, (from: string, to: string) => {
    const part = to.slice(cwd().length + 1);
    if (to.endsWith('manifest.json') && fs.existsSync(to)) {
      console.info('Updating manifest: ', part)
      bumpManifest(to);
      return true;
    }
    // console.info('Copying ', part);
    return false;
  });
}

function updateUuid(obj: {uuid?: string}) {
  if (obj.uuid === '' || obj.uuid === undefined) {
    obj.uuid = crypto.randomUUID();
    return true;
  }
  return false;
}

function bumpManifest(path: string) {
  const manifest = JSON.parse(fs.readFileSync(path, 'utf-8'));
  manifest.header.version[2] += 1;
  console.info('Bumped version to ', manifest.header.version);
  if (updateUuid(manifest.header)) {
    console.info('Updating manifest UUIDs');
  }
  for (const module of manifest.modules) {
    module.version = manifest.header.version;
    updateUuid(module);
  }
  fs.writeFileSync(path, JSON.stringify(manifest, undefined, 2));
}

function writeTransitionsFile(script: unknown) {
  lib.updateConstantsFile(Constants.ADDON_SCRIPT, {
    script: script
  });
}

/** Write the behavior pack scene file */
function writeSceneFile(scenes: any[]) {
  const sceneFileFormat: any = {
    "format_version": "1.17",
    "minecraft:npc_dialogue": {
      "scenes": scenes
    }
  };
  lib.write(Constants.ADDON_SCENES, JSON.stringify(sceneFileFormat, undefined, 2));
}

/** Roll behavior pack into single file */
async function rollupPack() {
  console.info('Rolling up behavior pack script');
  const bundle = await rollup({
    input: Constants.ADDON_ENTRY,
    external: /@minecraft/,
  });
  await bundle.write({ file: Constants.ADDON_ROLLUP });
}

function loadScriptFile(filename: string) {
  console.info(`Parsing ${filename}`);
  let script : Dialogue.ScriptFile;
  if (filename.endsWith('.json')) {
    script = JSON.parse(
      fs.readFileSync(filename, 'utf-8')) as Dialogue.ScriptFile;
  } else if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
    script = yaml.parse(fs.readFileSync(filename, 'utf-8'));
  } else {
    throw new Error('Unrecognized file type: ' + filename);
  }

  return script;
}

function validateScript(filename: string, script: Dialogue.ScriptFile) {
  const errors: string[] = []
  const result = Dialogue.validateScript(script);
  errors.push(...typiaErrorsFormat(result));

  lib.validateDeep(script, {
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


/** Parse and validate dialogue files */
export async function parseDialogueFiles(config: ConfigFile) {
  const referencedIds = new Set<string>();
  const definedIds = new Set<string>();
  const scenes: Dialogue.ScriptScene[] = [];
  const actors: Dialogue.Actor[] = [];
  const items: Dialogue.ItemUse[] = [];
  const chats: Dialogue.Chat[] = [];
  const actions: Dialogue.TransitionMap = {};
  
  const scenes_dir = join(lib.root, 'dist/behavior_pack/scenes');
  
  const globalScenes = await lib.getFiles(scenes_dir);

  const scriptFiles: Obj<Dialogue.ScriptFile> = {};
  for (const df of [...globalScenes, ...(config.script_files ?? [])]) {
    let script = loadScriptFile(df);
    scriptFiles[df] = script;
    items.push(...(script.items ?? []));
    chats.push(...(script.chats ?? []));
  
    for (const actor of script.actors ?? []) {
      actors.push(actor);
      const hash = md5sum(actor);
      actor._hash = hash;
      referencedIds.add(actor.scene);
    }
  
    for (const [ref, menu] of Object.entries(script.actions ?? {})) {
      actions[ref] = menu;
      actionList.push(ref);
    }

    for (const scene of script.scenes ?? []) {
      assert(!definedIds.has(scene.id),
        `Duplicate scene id\'s defiined: ${scene.id}`);
      definedIds.add(scene.id);
      scenes.push(scene);

      let button: Dialogue.SuperButton;
      for (button of scene.buttons ?? []) {
        if (button.scene !== undefined) {
          referencedIds.add(button.scene);
        }
      }
    }

    const missing: string[] = [];
    for (const id of referencedIds) {
      if (!definedIds.has(id)) {
        missing.push(id);
      }
    }
    assert(missing.length === 0,  `Missing scenes: ${JSON.stringify(missing)}`);

    // scene-actor mapping - creates an actor-specific scene.
    for (const actor of actors) {
      for (const scene of scenes) {
        if (scene._actor !== undefined) {
          continue;
        }
        if (scene.id === actor.scene) {
          const newScene = Object.assign({}, scene);
          newScene._actor = actor._hash;
          newScene.id = actor._hash as string;
          actor.scene = newScene.id; 
          if (actor.npc_name !== undefined) {
            newScene.npc_name = actor.npc_name;
          }
          scenes.push(newScene);
          break;
        }
      }
    }
  }

  const errors: Obj<string[]> = {};
  for (const [filename, script] of Object.entries(scriptFiles)) {
    Object.assign(errors, validateScript(filename, script));
  }

  if (Object.keys(errors).length !== 0) {
    failValidation(errors);
  }

  console.info(`Loaded ${scenes.length} scenes...`)

  return { actors, scenes, items, chats, actions };
}

type AssembledScene = {
  scene_tag: string,
  text: string,
  npc_name?: string,
  on_open_commands?: string[],
  buttons: {
    name: string,
    commands: string[]
  }[],
}

/** Construct behavior pack dialogue file */
export function assembleScenes(actors: Dialogue.Actor[], scenes: Dialogue.ScriptScene[]) {
  const packScenes: any[] = [];
  const transitions: Dialogue.TransitionMap = {};

  for (const scene of scenes) {
    const scn: AssembledScene = {
      scene_tag: Constants.ID('SCENE', scene.id),
      text: scene.text,
      buttons: [],
    }
    if (scene.npc_name !== undefined) {
      scn.npc_name = scene.npc_name
    }
    if (scene._actor !== undefined) {
      scn.on_open_commands = [
        `/tag @initiator add ${Constants.ID('ACTOR', scene._actor)}`,
        `/tag @initiator add ${scn.scene_tag}`,
        `/tag @initiator add ${Constants.TAG_INIT}`,
      ];
    }
    packScenes.push(scn);
    transitions[scn.scene_tag] = { scene: scene.id };

    let button: Dialogue.SuperButton;
    for (button of scene.buttons ?? []) {
      const btnId = `${Constants.ID('BTN', md5sum(button))}`;

      const transition: Dialogue.Transition = Object.assign({}, button);
      //@ts-ignore -- text exists on button
      delete transition.text;
      transitions[btnId] = transition;

      scn.buttons.push({
        name: button.text,
        commands: [
          `/tag @initiator add ${btnId}`,
          `/tag @initiator add ${Constants.TAG_PENDING}`,
        ]
      });
    }
  }

  return { transitions, packScenes };
}

async function zipPack() {
  const outPath = join(dirname(Constants.ADDON_OUTPUT), Constants.ADDON_NAME + '.mcaddon');
  console.info('Creating Add-On: ', outPath.slice(cwd().length + 1));
  const zipper = archiver('zip');
  zipper.on('error', (err: unknown) => {throw err});
  zipper.pipe(fs.createWriteStream(outPath));
  zipper.directory(Constants.ADDON_OUTPUT, false);
  await zipper.finalize();
}

/** Returns the MD5 Sum of a string or json encoded object */
function md5sum(input: string|any) {
  if (typeof input !== 'string') {
    input = JSON.stringify(input);
  }
  return crypto.createHash('md5').update(input).digest('hex');
}

if (lib.isScriptRun('hubPack')) {
  const { argn } = lib.parseArgs(`
    Compiles and assembles the behavior pack code.

    npx hubPack [--config="/foo/bar/config.yaml]
  `);
  createPackFiles(lib.readConfig(argn.config));
}
