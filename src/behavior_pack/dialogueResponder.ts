import { system, world, Player } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { dialogueMap } from './dialogueMap.js';
import * as C from './constants.js';
import { Args, Transition } from "./bpTypes.js";
import { strip } from "../functions.js";

const DELAY = 10;
const discussions: Record<string, Discussion> = {};

class Discussion {
  player: Player;
  history: Transition[] = [];
  vars: {[key: string]: unknown} = {};

  constructor(p: Player, tag?: string) {
    this.player = p;
    if (tag === undefined) return;
    let transition = this.findTransition(tag);
    if (transition === undefined) return;
    this.history.push(transition);
  }
  
  set(key: string, value: unknown) {
    this.vars[key] = value;
  }

  get<T=unknown>(key: string, defaultValue?: T): T {
    const value = this.vars[key];
    if (value === undefined && defaultValue !== undefined) {
      this.vars[key] = defaultValue;
      return defaultValue;
    }
    return value as T;
  }

  findTransition(tag: string) {
    const transition = dialogueMap[tag];
    if (transition === undefined) {
      console.warn('Failed to find transition: ', tag);
    }
    return transition;
  }

  go(tag?: string) {
    if (tag === undefined) return;
    const transition = this.findTransition(tag);
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
    if (transition.action !== undefined) {
      this.respondWithAction(transition.action, transition.args ?? {});
    } else if (transition.command !== undefined) {
      this.respondWithCommand(transition.command)
    } else if (transition.scene !== undefined) {
      this.respondWithScene(transition.scene);
    }
  }

  async respondWithAction(action: string, args: Args) {
    const actionFunc = actions[action];
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
    scene = `${C.TAG_PREFIX}_${scene}`;
    system.runTimeout(async () => {
      const command = `/execute as ${this.player.name} run dialogue open @e[type=NPC,c=1] @s ${scene}`
      this.respondWithCommand(command);
    }, DELAY);
  }
}

export function poll() {
  system.runTimeout(poll, 5);
  for (const p of world.getAllPlayers()) {
    // initial scene - create a fresh discussion object
    if (p.hasTag(C.TAG_INIT)) {
      p.removeTag(C.TAG_INIT);
      discussions[p.name] = new Discussion(p, getTag(p));
    }
    // a request from the user, waiting for a response
    if (p.hasTag(C.TAG_PENDING)) {
      p.removeTag(C.TAG_PENDING);
      let discussion = discussions[p.name];
      if (discussion === undefined) {
        discussion = new Discussion(p);
        discussions[p.name] = discussion
      }
      discussion.go(getTag(p));
    }
  }
}

/** Searches for the singular(?) tag from a scene  */
function getTag(p: Player) {
  const tags = [];
  for (const t of p.getTags()) {
    if (t.startsWith(C.TAG_PREFIX)) {
      tags.push(t);
      p.removeTag(t);
    }
  }
  if (tags.length !== 1) {
    // if != 1, something broke, let the player try again
    console.warn(`Unexpected fonnd tag result: ${JSON.stringify(tags)}`);
    return undefined;
  }
  return tags[0];
}

const actions: {[action: string]: (d: Discussion, args: Args) => Promise<void>} = {
  DBSH_Time, Trader
}

async function DBSH_Time(d: Discussion) {
  let cnt = d.get('timeActions', 0) + 1;
  d.set('timeActions', cnt);
  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      The current time is ${new Date().toString()}.

      You have asked me ${cnt} times.

      ---
    `))
    .button('And now?')
    .button('Back.');
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
    if (resp.selection === 0) {
      DBSH_Time(d);
    } else if (resp.selection === 1) {
    }
  }, DELAY);
}

async function Trader(d: Discussion, args: Args) {
  if (!Array.isArray(args.types)) {
    console.error(`Missing types for Trade: ${JSON.stringify(args)}`);
    return;
  }
  for (const t of args.types) {

  }

  for (const component of d.player.getComponents()) {
    console.log(component.typeId, component.isValid)
  }
}
