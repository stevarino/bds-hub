/**
 * Handles low-level dialogue stuff at the Minecraft level (tags, events).
 */

import { system, world, Player } from "@minecraft/server";

import * as lib from '../lib.js'
import { Discussion } from './discussion.js';
import './settings.js';
import './actions.js';
import './npc.js';
import './locations';
import './trader.js';
import './telebot.js';
import './itemDurability.js';
import { script } from "../script.js";
import { SuperItemUse, Transition } from "../types/packTypes.js";

const discussions: Record<string, Discussion> = {};

function getDiscussion(player: Player, npcid?: string) {
  let d = discussions[player.name];
  if (d !== undefined) return d;
  d = new Discussion(player);
  d.npc = npcid;
  discussions[player.name] = d;
  return d;
}

function newDiscussion(player: Player, npcid?: string) {
  delete discussions[player.name];
  return getDiscussion(player, npcid);
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
  if (e.id === 'hub:dialogue_transition') {
    getDiscussion(e.initiator as Player).go(e.message);
  }

  if (e.id === 'hub:npc_interact') {
    const index = e.message.indexOf('|');
    if (index === -1) {
      console.error('Invalid interact message: ', e.message);
      return;
    }
    const playerName = e.message.slice(index + 1).replace(/^\s+/, '');
    const players = world.getAllPlayers().filter(p => p.name === playerName);
    if (players.length !== 1) {
      console.error(`Unable to find singular player for "${playerName}" : `,
        JSON.stringify(players.map(p=>p.name)));
      return;
    }
    const player = players[0]!;
    const tags = new lib.TagMap(e.sourceEntity);

    let npcid = tags.getTag('npcid');
    if (npcid === undefined) {
      console.error('Entity tag npcid not found');
      return;
    }

    const actor = tags.get('actor');
    if (actor === undefined) {
      console.error('Scene actor tag not found on npc: ', npcid);
      return;
    }
    const actorDef = script.actors[actor];
    if (actorDef === undefined) {
      console.error('Unable to find scene tag for actor: ', actor);
      return;
    }
    let transition = { scene: actorDef.scene } as Transition;
    if (actorDef.scene.endsWith(':_dummy')) {
      transition = Object.assign({}, actorDef);
      delete transition['scene'];
    }
    newDiscussion(player, npcid).navigate(transition);
  }

  if (e.id === 'hub:log') {
    const player = e.initiator as Player;
    console.info(e.message, JSON.stringify({
      initiator: player?.name ?? e.initiator?.nameTag ?? e.initiator?.typeId ?? null,
      sourceType: e.sourceType,
      sourceEntity: e.sourceEntity?.nameTag ?? e.sourceEntity?.typeId ?? null,
    }, undefined, 2));
  }
});
