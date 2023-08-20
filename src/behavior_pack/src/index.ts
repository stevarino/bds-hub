/**
 * Entry point for script
 */

import { system, world, Entity } from "@minecraft/server";

import { StartupEvent, request, setup, timeout, HOST, STATE } from "./lib.js";
import  './modules/responder.js';
import * as types from './types/packTypes.js';

(async function start() {
  await timeout(10);
  await setup();
  StartupEvent.emit(null);
  if (HOST !== undefined) {
    poll();
  } else {
    throw new Error('Missing variable "host" - did you run the install script?');
  }  
})()

const playerIdToName = new Map<string, string>();
const playerNameToId = new Map<string, string>();
const playerStartTime = new Map<string, number>();
let ticksPerPoll = 20;

const PAYLOAD: types.Update = {
  time: 0,
  weather: types.Constants.weatherClear,
  players: {},
  messages: [],
};

async function poll() {
  system.runTimeout(poll, ticksPerPoll);
  ticksPerPoll = Math.min(1.2 * ticksPerPoll, 20 * 60 * 5);
  PAYLOAD.time = world.getTimeOfDay();
	for (const p of world.getAllPlayers()) {
    const update = getPlayerUpdate(p.name);
    update.pos = [p.dimension.id, Math.round(p.location.x), Math.round(p.location.y), Math.round(p.location.z)];
  }
  let body;
  try {
    body = JSON.stringify(PAYLOAD);
  } catch {
    console.error(`Invalid payload? ${body}}`);
    return;
  }
  PAYLOAD.players = {};
  PAYLOAD.messages = [];
  let res;
  try {
    res = await request<types.UpdateResponse>('/update', body);
  } catch(e) {
    console.error('Failed to poll: ', e);
    return;
  }
  if (res === undefined) {  // 2147954429 on error?
    console.error(`Unable to contact ${HOST}, sleeping for ${(Math.round(10 * ticksPerPoll / 20) / 10)}s`);
    return;
  }
  ticksPerPoll = 20;
  for (const msg of res.messages) {
    world.sendMessage(msg);
  }
}

function getEntityName(entity: Entity) {
  let name = playerIdToName.get(entity.id) ?? entity.nameTag;
  if (name === '') {
    name = entity.typeId;
  }
  return name;
}

/** Retrieves the update record for a given player */
function getPlayerUpdate(name: string) {
  let update = PAYLOAD.players[name];
  if (update === undefined) {
    update = {events: []};
    PAYLOAD.players[name] = update;
  }
  return update;
}

/** Adds a particular entity event */
function addEntityEvent(name: string, event: types.PlayerEvent) {
  const update = getPlayerUpdate(name);
  for (const e of update.events) {
    if (e.action === event.action && e.extra === event.extra && e.object === event.extra) {
      e.qty = (e.qty ?? 1) + (event.qty ?? 1);
      return;
    }
  }
  update.events.push(event);
}

// update player cache
world.afterEvents.playerSpawn.subscribe(e => {
  STATE.addPlayers([e.player.name]);
  playerIdToName.set(e.player.id, e.player.name);
  playerNameToId.set(e.player.name, e.player.id);
  if (!playerStartTime.has(e.player.name)) {
    playerStartTime.set(e.player.name, new Date().getTime());
  }
});

// clean player cache
world.afterEvents.playerLeave.subscribe(e => {
  const now = new Date().getTime();
  const active = new Set<string>();
  for (const p of world.getAllPlayers()) {
    active.add(p.name);
  }
  for (const [name, id] of Array.from(playerNameToId.entries())) {
    if (!active.has(name)) {
      playerNameToId.delete(name);
      playerIdToName.delete(id);
      addEntityEvent(name, {
        action: types.Actions.online,
        qty: now - (playerStartTime.get(name) ?? now)
      });
      playerStartTime.delete(name);
    }
  }
});

world.afterEvents.blockBreak.subscribe(e => {
  addEntityEvent(e.player.name, {
    action: types.Actions.breakBlock,
    object: e.brokenBlockPermutation.type.id,
  });
});

world.afterEvents.blockPlace.subscribe(e => {
  addEntityEvent(e.player.name, {
    action: types.Actions.placeBlock,
    object: e.block.typeId,
  });
});

world.afterEvents.entityDie.subscribe(e => {
  const dead = playerIdToName.has(e.deadEntity.id);
  const killer = playerIdToName.has(e.damageSource.damagingEntity?.id ?? '');
  if (dead === false && killer === false) return;
  const event: types.PlayerEvent = {
    action: types.Actions.killed,
    extra: e.damageSource.cause,
  };
  if (e.damageSource.damagingEntity !== undefined) {
    event.object = getEntityName(e.damageSource.damagingEntity);
  }
  addEntityEvent(getEntityName(e.deadEntity), event);
});

// world.afterEvents.entityHurt.subscribe(e => {
//   const hurtee = playerIdToName.has(e.hurtEntity?.id ?? '');
//   const hurter = playerIdToName.has(e.damageSource?.damagingEntity?.id ?? '');
//   if (hurtee === false && hurter === false) return;
//   const event: types.PlayerEvent = {
//     action: types.Actions.hurt,
//     extra: e.damageSource.cause,
//     qty: e.damage,
//   };
//   if (e.damageSource.damagingEntity !== undefined) {
//     event.object = getEntityName(e.damageSource.damagingEntity);
//   }
//   addEntityEvent(getEntityName(e.hurtEntity), event);
// });

world.afterEvents.itemUse.subscribe(e => {
  if (!e.itemStack.hasTag('minecraft:is_tool')) return;
  addEntityEvent(e.source.name, {
    action: types.Actions.use,
    object: e.itemStack.typeId,
  })
});

world.afterEvents.weatherChange.subscribe(e => {
  PAYLOAD.weather = e.lightning ? types.Constants.weatherLightning 
  : e.raining ? types.Constants.weatherRain : types.Constants.weatherClear;
});

world.afterEvents.chatSend.subscribe(e => {
  if (e.sendToTargets) return;
  PAYLOAD.messages.push(`**<${e.sender.name}>** ${e.message}`)
});
