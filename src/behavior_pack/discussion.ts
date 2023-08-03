import { system, Player } from "@minecraft/server";

import { transitions } from './transitions.js';
import * as types from '../types/packTypes.js';
import { DELAY, TAG_PREFIX } from "./constants.js";


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

    if (transition.action !== undefined) {
      this.respondWithAction(transition.action, transition.args ?? {});
    } else if (transition.command !== undefined) {
      this.respondWithCommand(transition.command)
    } else if (transition.scene !== undefined) {
      this.respondWithScene(transition.scene);
    } else if (transition.menu !== undefined) {
      this.respondWithAction('DBSH_Menu', transition.menu as unknown as types.Args)
    }
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

