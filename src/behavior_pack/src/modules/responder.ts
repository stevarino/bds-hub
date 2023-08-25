/**
 * Handles low-level dialogue stuff at the Minecraft level (tags, events).
 */

import { system, world, Player } from "@minecraft/server";

import { BOT_ID_PREFIX, ID, TAG_INIT, TAG_PENDING, TAG_PREFIX } from '../lib/constants.js';
import * as lib from '../lib.js'
import { Discussion } from './discussion.js';
import './actions.js';
import './bots.js';
import './locations';
import './trader.js';
import { script } from "../script.js";
import { SuperItemUse } from "../types/packTypes.js";

// lib.StartupEvent.addListener(checkPlayersForEvents);

const discussions: Record<string, Discussion> = {};

// export function checkPlayersForEvents() {
//   system.runTimeout(checkPlayersForEvents, 10);
//   for (const p of world.getAllPlayers()) {
//     const ids = lib.parseIds(p);
//     // initial scene - create a fresh discussion object
//     if (p.hasTag(TAG_INIT)) {
//       p.removeTag(TAG_INIT);
//       const scene = findScene(p, ids, false);
//       const discussion = new Discussion(p, scene);
//       discussion.actor = findActor(p, ids, false);
//       discussions[p.name] = discussion;
//     }
//     // a request from the user, waiting for a response
//     if (p.hasTag(TAG_PENDING)) {
//       p.removeTag(TAG_PENDING);
//       let discussion = discussions[p.name];
//       if (discussion === undefined) {
//         discussion = new Discussion(p);
//         discussions[p.name] = discussion
//       }
//       const btn = findBtn(p, ids);
//       if (btn !== undefined) return discussion.go(btn);
//       const scene = findScene(p, ids);
//       if (scene !== undefined) return discussion.go(scene);
//     }
//   }
// }

// /** Searches for the singular(?) scene from tags  */
// function findScene(player: Player, ids: lib.Tag, alert=false) {
//   return findOneAndClear(player, ids, 'SCENE', alert)?.id();
// }

// /** Searches for the singular(?) button from tags  */
// function findBtn(player: Player, ids: lib.Tag, alert=false) {
//   return findOneAndClear(player, ids, 'BTN', alert)?.id();
// }

// /** Searches for the singular(?) actor from tags  */
// function findActor(player: Player, ids: lib.Tag, alert=false) {
//   return findOneAndClear(player, ids, 'ACTOR', alert)?.path;
// }

// function findOneAndClear(player: Player, ids: lib.Tag, type: string, alert=false) {
//   let tags = findTags(ids, type);
//   if (tags.length !== 1) {
//     if (alert) console.warn(`Unexpected ${type} result: ${JSON.stringify(tags.map(t => t.id()))}`);
//   }
//   for (const tag of tags) {
//     player.removeTag(tag.id());
//   }
//   if (tags.length === 1) {
//     return tags[0];
//   }
// }

// /** Searches for the singular(?) tag from a scene  */
// function findTags(ids: lib.Tag, type: string) {
//   let tags: lib.Tag[] = [];
//   if (ids.has(type)) {
//     tags = ids.get(type).values();
//   }
//   return tags;
// }

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

// lots of crashes with this
// world.afterEvents.dataDrivenEntityTriggerEvent.subscribe(e => {
//   console.info(e.entity.typeId, e.id);
// })

world.beforeEvents.chatSend.subscribe(async e => {
  for (const chat of script.chats) {
    if (chat.require_tag === undefined || e.sender.hasTag(chat.require_tag)) {
      if (chat.equals === e.message) {
        e.cancel = true;
        await lib.timeout(5);
        discussions[e.sender.name] = new Discussion(e.sender);
        await discussions[e.sender.name]?.handleTransition(chat);
      }
    }
  }
});

system.afterEvents.scriptEventReceive.subscribe(e => {
  if (e.id === 'hub:dialogue_start') {
    const player = e.initiator as Player;
    const disc = new Discussion(player, e.message);
    discussions[player.name] = disc;
    disc.bot = e.sourceEntity.getTags().filter(t => t.startsWith(BOT_ID_PREFIX))[0];
  }
  if (e.id === 'hub:dialogue_transition') {
    const player = e.initiator as Player;
    discussions[player.name]?.go(e.message);
  }
});
