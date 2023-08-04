import { system, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { transitions, menus } from './transitions.js';
import * as types from '../types/packTypes.js';
import { DELAY, TAG_PREFIX } from "./constants.js";
import { getFormResponse, showErrorMessage } from "./lib.js";


export class Discussion {
  static actions: {[action: string]: (d: Discussion, args: types.Args) => Promise<void>} = {};

  player: Player;
  history: types.Transition[] = [];
  vars: {[key: string]: unknown} = {};

  constructor(p: Player, tag?: string) {
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
    const transition = transitions[tag];
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

  back() {
    this.history.pop();
    this.respond();
  }

  respond() {
    const transition = this.history[this.history.length-1];
    if (transition === undefined) return;
    this.handleTransition(transition)
  }

  handleTransition(transition: types.Transition) {
    findAndRunTransition(this, transition);
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
    system.runTimeout(async () => {
      const command = `/execute as ${this.player.name} run dialogue open @e[type=NPC,c=1] @s ${scene}`
      this.respondWithCommand(command);
    }, DELAY);
  }
}

/** transition field to transition handler mapping */
const handlers = {
  action: respondAction,
  command: respondCommand,
  scene: respondScene,
  ifIsOp: respondIfIsOp,
  menu: respondMenu,
  menuRef: respondMenuRef,
}

/** Iterates through all transition handlers, running the first that matches */
function findAndRunTransition(d: Discussion, t: types.Transition) {
  for (const [field, handler] of Object.entries(handlers)) {
    //@ts-ignore -- can't get the types to work here but i swear it makes sense
    if (check(d, t, field, handler)) break;
  }
}

/** Checks if a given transition has a key field defined, and if so, handles it */
function check<T>(d: Discussion, transition: types.Transition, type: keyof types.Transition, handler: (d: Discussion, action: T) => void|Promise<void>) {
  if (transition[type] !== undefined) {
    handler(d, transition as T);
    return true;
  }
  return false;
}

async function respondAction(d: Discussion, action: types.Action) {
  const actionFunc = Discussion.actions[action.action];
  if (actionFunc === undefined) {
    return console.warn(`Missing action: ${action.action}`);
  }
  actionFunc(d, action.args ?? {});
}

async function respondCommand(d: Discussion, action: types.Command) {
  d.player.dimension.runCommandAsync(
    action.command.replace(/\b@p\b/, d.player.name)
  );
}

async function respondScene(d: Discussion, action: types.Scene) {
  system.runTimeout(async () => {
    const command = `/execute as ${d.player.name} run dialogue open @e[type=NPC,c=1] @s ${TAG_PREFIX}_${action.scene}`
    d.respondWithCommand(command);
  }, DELAY);
}

function respondIfIsOp(d: Discussion, action: types.IsOp) {
  if (d.player.isOp()) {
    d.handleTransition(action.ifIsOp.then);
  } else {
    d.handleTransition(action.ifIsOp.else);
  }
}

async function respondMenu(d: Discussion, action: types.Menu) {
  const form = new ActionFormData().title(action.menu.title);
  if (action.menu.body !== undefined) form.body(action.menu.body);
  const transitions: types.Transition[] = [];
  for (const btn of action.menu.buttons) {
    if (btn.requireOp === true && !d.player.isOp()) continue
    form.button(btn.text);
    transitions.push(btn as types.SuperButton);
  }

  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  d.handleTransition(transitions[res.selection] as types.Transition)
}

async function respondMenuRef(d: Discussion, action: types.MenuRef) {
  const menuDetails = menus[action.menuRef];
  if (menuDetails === undefined) {
    return showErrorMessage(d.player, `Menu "${action.menuRef}" not found.`);
  }
  const menu: types.Menu = { menu: menuDetails };
  d.handleTransition(menu);
}
