import { system, world, Player, EntityInventoryComponent, ItemEnchantsComponent, ItemStack } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { transitions } from './transitions.js';
import * as C from './constants.js';
import * as types from '../types/packTypes.js';
import { strip } from "../functions.js";
import { padToWidth, request } from "./lib.js";

const DELAY = 10;
const discussions: Record<string, Discussion> = {};

class Discussion {
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
  findTransition(tag: string) {
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
    }
  }

  async respondWithAction(action: string, args: types.Args) {
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
    console.warn(`Unexpected found tag result: ${JSON.stringify(tags)}`);
    return undefined;
  }
  return tags[0];
}

const actions: {[action: string]: (d: Discussion, args: types.Args) => Promise<void>} = {
  DBSH_Time, Trader, Trader2, DBSH_Broken, DBSH_Placed,
}

async function DBSH_Time(d: Discussion) {
  let cnt = d.get('timeActions', 0) + 1;
  d.set('timeActions', cnt);
  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      The current time is ${new Date().toString()}.

      You have asked me ${cnt} times.

      ${d.player.getComponents().map(c => c.typeId).join('\n')}
      ---
    `))
    .button('And now?')
    .button('Back.');
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
    if (resp.selection === 0) {
      DBSH_Time(d);
    } else if (resp.selection === 1) {
      d.back();
    }
  }, DELAY);
}

async function Trader(d: Discussion, args: types.Args) {
  // if (!Array.isArray(args.types)) {
  //   return console.error(`Missing types for Trade: ${JSON.stringify(args)}`);
  // }

  const component = d.player.getComponent('minecraft:inventory') as EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      containerType: ${component.containerType}
      invenorySize: ${component.inventorySize}
      private: ${component.private}
      restrictToOwner: ${component.restrictToOwner}

      emptySlotsCount: ${component.container.emptySlotsCount}
      size: ${component.container.size}
    `))
    .button('Get items?')
    .button('Back.');
    system.runTimeout(async () => {
      const resp = await form.show(d.player);
      if (resp.selection === 0) {
        d.navigate({action: 'Trader2'})
      } else if (resp.selection === 1) {
        d.back();
      }
    }, DELAY);
}


async function Trader2(d: Discussion, args: types.Args) {
  const component = d.player.getComponent('minecraft:inventory') as EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const test = new ItemStack('minecraft:red_mushroom_block', 1);

  const items: string[] = [];
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    items.push(`${i}: ${item?.typeId} (${item?.nameTag}) ${item?.amount} ${JSON.stringify(item?.getTags())} ${
      item?.getComponents().map(c => c.typeId).join(';')
    }  {${
      //@ts-ignore
      item?.isStackableWith(test)}}`);
  }

  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(items.join('\n\n')))
    .button('Get items?')
    .button('Back.');
    system.runTimeout(async () => {
      const resp = await form.show(d.player);
      if (resp.selection === 0) {
        d.navigate({action: 'Trader2'})
      } else if (resp.selection === 1) {
        d.back();
      }
    }, DELAY);  
}

function getLines(result?: Partial<types.Event>[]) {
  const lines: string[] = [];
  for (const row of result ?? []) {
    const label = padToWidth((row.object ?? 'error').replace('minecraft:', '') + ' ', 146, '.');
    const qty = padToWidth(' ' + String(row.qty), 48, '.', true)
    lines.push(label + qty);
  }
  return lines;
}

async function DBSH_Broken(d: Discussion) {
  const query: types.EventRequest = {
    select: ['object', 'qty'],
    where: {
      entity: d.player.name,
      action: String(types.Actions.breakBlock),
    },
    order: ['object'],
  };
  const res = await request<types.Event[]>('/events', query);
  const form = new ui.ActionFormData()
    .title('Broken Bocks')
    .body(getLines(res).join('\n') + '\n')
    .button('Sorted by block');
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
  }, DELAY);
}

async function DBSH_Placed(d: Discussion) {
  const query: types.EventRequest = {
    select: ['object', 'qty'],
    where: {
      entity: d.player.name,
      action: String(types.Actions.placeBlock),
    },
    order: ['object'],
  };
  const res = await request<types.Event[]>('/events', query);
  const form = new ui.ActionFormData()
    .title('Placed Bocks')
    .body(getLines(res).join('\n'))
    .button('Sorted by block');
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
  }, DELAY);  
}