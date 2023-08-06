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
import { ConfigFile, Dialogue, O } from '../types.js';

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
    console.info('Copying ', part);
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
  const template = lib.strip(`
      /** Automatically generated file - do not edit */

      export const script = %;
  `).split('%');
  const inputs = [
    JSON.stringify(script, undefined, 2),
  ];
  const output = [];
  for (let i=0; i<template.length; i++) {
    output.push(template[i], inputs[i] ?? '');
  }
  lib.write(Constants.ADDON_SCRIPT, output.join(''));
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


/** Parse and validate dialogue files */
export async function parseDialogueFiles(config: ConfigFile) {
  const referencedIds = new Set<string>();
  const definedIds = new Set<string>();
  const scenes: Dialogue.Scene[] = [];
  const actors: Dialogue.Actor[] = [];
  const items: Dialogue.ItemUse[] = [];
  const actorEntrys = new Set<string>();
  const chats: Dialogue.Chat[] = [];
  const actions: Dialogue.TransitionMap = {};
  
  const scenes_dir = join(lib.root, 'dist/behavior_pack/scenes');
  
  const globalScenes = await lib.getFiles(scenes_dir);

  for (const df of [...globalScenes, ...(config.dialogues ?? [])]) {
    console.info(`Parsing ${df}`);
    let dialogueSet : Dialogue.DialogueFile;
    if (df.endsWith('.json')) {
      dialogueSet = Dialogue.parseDialogueFile(
        fs.readFileSync(df, 'utf-8')) as Dialogue.DialogueFile;
    } else if (df.endsWith('.yaml') || df.endsWith('.yml')) {
      dialogueSet = yaml.parse(fs.readFileSync(df, 'utf-8'));
      Dialogue.assertDialogueFile(dialogueSet);
    } else {
      throw new Error('Unrecognized file type: ' + df);
    }
  
    for (const actor of dialogueSet.actors ?? []) {
      actors.push(actor);
      referencedIds.add(actor.scene);
      actorEntrys.add(actor.scene);
    }
  
    for (const item of dialogueSet.items ?? []) {
      items.push(item);
    }
  
    for (const chat of dialogueSet.chats ?? []) {
      chats.push(chat);
    }
  
    for (const [ref, menu] of Object.entries(dialogueSet.actions ?? {})) {
      actions[ref] = menu;
    }

    for (const scene of dialogueSet.scenes ?? []) {
      assert(!definedIds.has(scene.id),
        `Duplicate scene id\'s defiined: ${scene.id}`);
      definedIds.add(scene.id);
      scenes.push(scene);
      scene._entrayPoint = actorEntrys.has(scene.id);

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
  }

  console.info(`Loaded ${scenes.length} scenes...`)

  return { actors, scenes, items, chats, actions };
}

/** Construct behavior pack dialogue file */
export function assembleScenes(actors: Dialogue.Actor[], scenes: Dialogue.Scene[]) {
  const packScenes: any[] = [];
  const transitions: Dialogue.TransitionMap = {};

  for (const scene of scenes) {
    const scn: O<any> = {
      scene_tag: `${Constants.TAG_PREFIX}_${scene.id}`,
      text: scene.text,
      buttons: [],
    }
    if (scene.npc_name !== undefined) {
      scn.npc_name = scene.npc_name
    }
    if (scene._entrayPoint === true) {
      scn.on_open_commands = [
        `/tag @initiator add ${Constants.TAG_INIT}`,
      ];
    }
    packScenes.push(scn);
    let button: Dialogue.SuperButton;
    for (button of scene.buttons ?? []) {
      const btnId = `${Constants.TAG_PREFIX}_${md5sum(button)}`;
      assert(transitions[btnId] === undefined, 'Bad build (!?!)');

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
