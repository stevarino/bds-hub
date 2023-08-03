#!/usr/bin/env node

/**
 * Compiles and assembles the behavior pack code.
 */

import { readFileSync, readdirSync } from 'fs';
import crypto from 'node:crypto'
import yaml from 'yaml';

import { rollup } from 'rollup';
import * as C from '../constants.js';
import { isScriptRun, parseArgs, readConfig, root, write } from '../lib.js';
import { ConfigFile, Dialogue, O } from '../types.js';
import assert from 'assert';
import { join } from 'path';
import { strip } from '../functions.js';

export async function createPackFiles(config: ConfigFile) {
  // assemble all the json/javascript files for the pack
  const { actors, scenes } = parseDialogues(config);
  const { transitions, packScenes } = assembleScenes(actors, scenes);
  writeBehaviorPackScenes(packScenes);
  writeTransitionsFile(transitions, actors);
  await rollupPack();
}

function writeTransitionsFile(transitions: Dialogue.TransitionMap, actors: Dialogue.Actor[]) {
  const transitionStr = JSON.stringify(transitions, undefined, 2);
  const actorStr = JSON.stringify(actors, undefined, 2);
  const fmt = strip(`
    /** Automatically generated file - do not edit */

    export const transitions = %1;
    
    export const actors = %2;`);
  write(C.ADDON_TRANSITIONS, fmt.replace('%1', transitionStr).replace('%2', actorStr));
}

/** Write the behavior pack scene file */
function writeBehaviorPackScenes(scenes: any[]) {
  const sceneFileFormat: any = {
    "format_version": "1.17",
    "minecraft:npc_dialogue": {
      "scenes": scenes
    }
  };
  write(C.ADDON_SCENES, JSON.stringify(sceneFileFormat, undefined, 2));
}

/** Roll behavior pack into single file */
async function rollupPack() {
  console.info('Rolling up behavior pack script');
  const bundle = await rollup({
    input: C.ADDON_SCRIPT,
    external: /@minecraft/,
  });
  await bundle.write({ file: C.ADDON_ROLLUP });
}


/** Parse and validate dialogue files */
export function parseDialogues(config: ConfigFile) {
  const referencedIds = new Set<string>();
  const definedIds = new Set<string>();
  const scenes: Dialogue.Scene[] = [];
  const actors: Dialogue.Actor[] = [];
  const actorEntrys = new Set<string>();
  
  const scenes_dir = join(root, 'dist/behavior_pack/scenes');
  const globalScenes = readdirSync(scenes_dir).map(f => join(scenes_dir, f));

  for (const df of [...globalScenes, ...(config.dialogues ?? [])]) {
    console.info(`Parsing ${df}`);
    let dialogueSet : Dialogue.DialogueFile;
    if (df.endsWith('.json')) {
      dialogueSet = Dialogue.parseDialogueFile(
        readFileSync(df, 'utf-8'));
    } else if (df.endsWith('.yaml') || df.endsWith('.yml')) {
      dialogueSet = yaml.parse(readFileSync(df, 'utf-8'));
      Dialogue.assertDialogueFile(dialogueSet);
    } else {
      throw new Error('Unrecognized file type: ' + df);
    }
  
    for (const actor of dialogueSet.actors ?? []) {
      actors.push(actor);
      referencedIds.add(actor.scene);
      actorEntrys.add(actor.scene);
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
    assert(
      missing.length === 0, 
      `Missing scenes: ${JSON.stringify(missing)}`);
  }

  console.info(`Loaded ${scenes.length} scenes...`)

  return { actors, scenes };
}

/** Construct behavior pack dialogue file */
export function assembleScenes(actors: Dialogue.Actor[], scenes: Dialogue.Scene[]) {
  const packScenes: any[] = [];
  const transitions: Dialogue.TransitionMap = {};

  for (const scene of scenes) {
    const scn: O<any> = {
      scene_tag: `${C.TAG_PREFIX}_${scene.id}`,
      text: scene.text,
      buttons: [],
    }
    if (scene._entrayPoint === true) {
      scn.on_open_commands = [
        `/tag @initiator add ${C.TAG_INIT}`,
      ];
    }
    packScenes.push(scn);
    let button: Dialogue.SuperButton;
    for (button of scene.buttons ?? []) {
      const btnId = `${C.TAG_PREFIX}_${md5sum(button)}`;
      assert(transitions[btnId] === undefined, 'Bad build (!?!)');

      const transition: Dialogue.Transition = Object.assign(
        {}, button);
      delete transition.text;
      transitions[btnId] = transition;

      scn.buttons.push({
        name: button.text,
        commands: [
          `/tag @initiator add ${btnId}`,
          `/tag @initiator add ${C.TAG_PENDING}`,
        ]
      });
    }
  }

  return { transitions, packScenes };
}

/** Returns the MD5 Sum of a string or json encoded object */
function md5sum(input: string|any) {
  if (typeof input !== 'string') {
    input = JSON.stringify(input);
  }
  return crypto.createHash('md5').update(input).digest('hex');
}

if (isScriptRun('hubPack')) {
  const { argn } = parseArgs(`
    Compiles and assembles the behavior pack code.

    npx hubPack [--config="/foo/bar/config.yaml]
  `)
  createPackFiles(readConfig(argn.config));
}
