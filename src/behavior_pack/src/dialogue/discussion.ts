/**
 * Discussion - the grammar of the transitions
 */

import * as mc from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { script } from './script.js';
import * as types from '../types/packTypes.js';
import { DELAY, TAG_PREFIX } from "../lib/constants.js";
import { getFormResponse, showErrorMessage, timeout } from "../lib.js";


export class Discussion {
  static actions: {[action: string]: (d: Discussion, args: types.Args) => Promise<void>} = {};

  player: mc.Player;
  history: types.Transition[] = [];
  vars: {[key: string]: unknown} = {};

  constructor(p: mc.Player, tag?: string) {
    this.player = p;
    if (tag === undefined) return;
    let transition = this.findTransition(tag);
    if (transition === undefined) return;
    this.history.push(transition);
  }
  
  /** Set a variable needed for this discussion */
  set(key: string, value: unknown) {
    this.vars[key] = value;
  }

  /** Retrieve a variable for this discussion */
  get<T=unknown>(key: string, defaultValue?: T): T {
    const value = this.vars[key];
    if (value === undefined && defaultValue !== undefined) {
      this.vars[key] = defaultValue;
      return defaultValue;
    }
    return value as T;
  }

  /** Lookup a transition from transitions.ts */
  findTransition(tag: string): types.Transition|undefined {
    const transition = script.actions[tag];
    if (transition === undefined) {
      console.warn('Failed to find transition: ', tag);
    }
    return transition;
  }

  go(tag?: string) {
    if (tag === undefined) return;
    this.navigate(this.findTransition(tag));
  }

  navigate(transition?: types.Transition) {
    if (transition === undefined) return;
    this.history.push(transition);
    this.respond();
  }

  respond() {
    const transition = this.history[this.history.length-1];
    if (transition === undefined) return;
    this.handleTransition(transition)
  }

  async handleTransition(transition: types.Transition) {
    await findAndRunTransition(this, transition);
  }

  async respondWithAction(action: string, args: types.Args) {
    const actionFunc = Discussion.actions[action];
    if (actionFunc === undefined) {
      return console.warn(`Missing action: ${action}`);
    }
    actionFunc(this, args);
  }

  async respondWithCommand(command: string) {
    command = command.replace(/\b@p\b/, this.player.name);
    this.player.dimension.runCommandAsync(command);    
  }

  async respondWithScene(scene: string) {
    scene = `${TAG_PREFIX}_${scene}`;
    await timeout(DELAY);
    const command = `/execute as ${this.player.name} run dialogue open @e[type=NPC,c=1] @s ${scene}`
    await this.respondWithCommand(command);
  }
}

/** transition field to transition handler mapping */
const handlers = {
  action: respondAction,
  command: respondCommand,
  scene: respondScene,
  if_has_tag: respondIfTagged,
  if_has_item: respondIfItem,
  menu: respondMenu,
  wait: respondWait,
  sequence: respondSequence,
  random: handleRandom,
  sound: respondSound,
  apply_tag: applyTag,
  remove_tag: removeTag,
}

/** Iterates through all transition handlers, running the first that matches */
async function findAndRunTransition(d: Discussion, t: types.Transition) {
  for (const [field, handler] of Object.entries(handlers)) {
    //@ts-ignore -- can't get the types to work here but i swear it makes sense
    if (await check(d, t, field, handler)) break;
  }
}

/** Checks if a given transition has a key field defined, and if so, handles it */
async function check<T>(d: Discussion, transition: types.Transition, type: keyof types.Transition, handler: (d: Discussion, action: T) => void|Promise<void>) {
  if (transition[type] !== undefined) {
    await handler(d, transition as T);
    return true;
  }
  return false;
}

async function respondAction(d: Discussion, args: types.Action) {
  const builtinAction = Discussion.actions[args.action];
  if (builtinAction !== undefined) {
    return await builtinAction(d, args.args ?? {});
  }
  const customAction = script.actions[args.action];
  if (customAction !== undefined) {
    return await d.handleTransition(customAction);
  }
  await showErrorMessage(d.player, `Unable to find action: "${args.action}"`)
}

async function respondCommand(d: Discussion, action: types.Command) {
  await d.player.dimension.runCommandAsync(
    action.command.replace(/\b@p\b/, d.player.name)
  );
}

async function respondScene(d: Discussion, action: types.Scene) {
  await timeout(DELAY);
  const command = `/execute as ${d.player.name} run dialogue open @e[type=NPC,c=1] @s ${TAG_PREFIX}_${action.scene}`
  await d.respondWithCommand(command);
}

async function respondIfTagged(d: Discussion, action: types.HasTag) {
  if (d.player.hasTag(action.if_has_tag)) {
    await d.handleTransition(action.then);
  } else {
    await d.handleTransition(action.else);
  }
}

async function respondIfItem(d: Discussion, args: types.HasItem) {
  const component = d.player.getComponent('minecraft:inventory') as mc.EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    if (item === undefined) {
      continue;
    }
    let thisItem = true;
    if (args.if_has_item.item_type !== undefined) {
      thisItem = thisItem && args.if_has_item.item_type === item.typeId;
    }
    if (args.if_has_item.name !== undefined) {
      thisItem = thisItem && args.if_has_item.name === item.nameTag;
    }
    if (args.if_has_item.lore !== undefined) {
      const lore = item.getLore();
      for (let i=0; i<args.if_has_item.lore.length; i++) {
        if (args.if_has_item.lore[i] !== null) {
          thisItem = thisItem && args.if_has_item.lore[i] === lore[i];
        }
      }
    }
    if (thisItem) {
      await d.handleTransition(args.then);
      return;
    }
  }
  await d.handleTransition(args.else);
}

async function respondMenu(d: Discussion, action: types.Menu) {
  const form = new ActionFormData().title(action.menu.title);
  if (action.menu.body !== undefined) form.body(action.menu.body);
  const transitions: types.Transition[] = [];
  for (const btn of action.menu.buttons) {
    if (btn.require_tag !== undefined && !d.player.hasTag(btn.require_tag)) continue;
    form.button(btn.text);
    transitions.push(btn as types.SuperButton);
  }

  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  await d.handleTransition(transitions[res.selection] as types.Transition)
}

async function applyTag(d: Discussion, args: types.ApplyTag) {
  d.player.addTag(args.apply_tag);
}

async function removeTag(d: Discussion, args: types.RemoveTag) {
  d.player.addTag(args.remove_tag);
}

async function respondWait(d: Discussion, args: types.Wait) {
  await timeout(args.wait);
}

async function respondSequence(d: Discussion, args: types.Sequence) {
  for (const transition of args.sequence) {
    await d.handleTransition(transition);
    await timeout(1);
  }
}

async function respondSound(d: Discussion, args: types.Sound) {
  await respondCommand(
    d, { command: `playsound ${args.sound} @p ~ ~ ~ ${ 
      args.volume ?? 1} ${args.pitch ?? 1} ${args.minVolume ?? 1}` }
    ); 
}

async function handleRandom(d: Discussion, args: types.Random) {
  const weights: number[] = args.weights ?? []
  const map: [number, types.Transition][] = []
  let total = 0;
  for (let i=0; i<args.random.length; i++) {
    total += weights[i] ?? 1;
    map.push([total, args.random[i] as types.Transition]);
  }
  const rand = Math.floor(Math.random() * total);
  let ceil = 0;
  let transition = undefined;
  for ([ceil, transition] of map) {
    if (ceil > rand) break;
  }
  if (transition !== undefined) {
    await d.handleTransition(transition);
  }
}
