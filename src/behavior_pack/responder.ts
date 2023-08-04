/**
 * Handles high-level dialogue stuff.
 */

import { system, world, Player } from "@minecraft/server";

import { TAG_INIT, TAG_PENDING, TAG_PREFIX, DIMENSION } from './constants.js';
import { Discussion } from './discussion.js';
import './actions.js';
import './telebot.js';
import { actors, items } from "./transitions.js";
import { SuperItemUse } from "../types/packTypes.js";

const discussions: Record<string, Discussion> = {};

export function poll() {
  system.runTimeout(poll, 5);
  for (const p of world.getAllPlayers()) {
    // initial scene - create a fresh discussion object
    if (p.hasTag(TAG_INIT)) {
      p.removeTag(TAG_INIT);
      discussions[p.name] = new Discussion(p, getTag(p, false));
    }
    // a request from the user, waiting for a response
    if (p.hasTag(TAG_PENDING)) {
      p.removeTag(TAG_PENDING);
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
function getTag(p: Player, alert: boolean=true) {
  const tags = [];
  for (const t of p.getTags()) {
    if (t.startsWith(TAG_PREFIX)) {
      tags.push(t);
      p.removeTag(t);
    }
  }
  if (tags.length !== 1) {
    // if != 1, something broke, let the player try again
    if (alert) console.warn(`Unexpected found tag result: ${JSON.stringify(tags)}`);
    return undefined;
  }
  return tags[0];
}

Object.assign(Discussion.actions, {AssignActors: assignActors});
export async function assignActors() {
  let i = 0;
  for (const actor of actors) {
    let count = 0;
    let selector: string|undefined = undefined;
    if (actor.tag !== undefined) selector = `tag="${actor.tag}"`;
    if (actor.name !== undefined) selector = `name="${actor.name}"`;
    if (actor.selector !== undefined) selector = `"${actor.selector}"`;
    if (selector == undefined) continue;
    for (const dimension of Object.keys(DIMENSION)) {
      const dim = world.getDimension(dimension);
      await new Promise<void>(async (res) => {
        const result = await dim.runCommandAsync(`dialogue change @e[type=minecraft:npc,${selector}] ${TAG_PREFIX}_${actor.scene}`);
        count += result.successCount;
        res();
      });
    }
    i += 1;
  }
}

world.afterEvents.itemUse.subscribe(e => {
  let itemUsed: SuperItemUse|undefined = undefined;
  const names = [
    e.itemStack.nameTag,
    e.itemStack.typeId,
    e.itemStack.typeId.replace('minecraft:', '')
  ];
  for (const item of items) {
    if (( 
        (item.tag !== undefined && e.itemStack.hasTag(item.tag))
        || (item.name !== undefined && names.includes(item.name))
      ) && (
        item.requireOp === undefined || !item.requireOp || e.source.isOp()
    )) {
      itemUsed = item;
      break;
    }
  }
  if (itemUsed === undefined) return;
  discussions[e.source.name] = new Discussion(e.source);
  discussions[e.source.name]?.navigate(itemUsed);
})

assignActors();
