/**
 * Handles high-level dialogue stuff.
 */

import { system, world, Player } from "@minecraft/server";

import { TAG_INIT, TAG_PENDING, TAG_PREFIX, DIMENSION } from '../lib/constants.js';
import * as lib from '../lib.js'
import { Discussion } from './discussion.js';
import './actions.js';
import '../bots.js';
import { script } from "./script.js";
import { SuperItemUse } from "../types/packTypes.js";

lib.StartupEvent.addListener(checkPlayersForEvents);

const discussions: Record<string, Discussion> = {};

export function checkPlayersForEvents() {
  system.runTimeout(checkPlayersForEvents, 10);
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
  for (const actor of script.actors) {
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
  for (const item of script.items) {
    let loreSet = false;
    if (item.lore !== undefined) {
      const itemLore = e.itemStack.getLore();
      for (let i=0; i<item.lore.length; i++) {
        if (item.lore[i] !== undefined && itemLore[i] === item.lore[i]) {
          loreSet = true;
        }
      }
    }
    if (( 
        (item.name !== undefined && names.includes(item.name)) || loreSet
      ) && (
        item.require_tag === undefined || e.source.hasTag(item.require_tag)
    )) {
      itemUsed = item;
      break;
    }
  }
  if (itemUsed === undefined) return;
  discussions[e.source.name] = new Discussion(e.source);
  discussions[e.source.name]?.navigate(itemUsed);
});

world.afterEvents.chatSend.subscribe(e => {
  for (const chat of script.chats) {
    if (chat.require_tag === undefined || e.sender.hasTag(chat.require_tag)) {
      if (chat.equals === e.message) {
        discussions[e.sender.name] = new Discussion(e.sender);
        discussions[e.sender.name]?.handleTransition(chat)
      }
    }
  }
})

assignActors();
