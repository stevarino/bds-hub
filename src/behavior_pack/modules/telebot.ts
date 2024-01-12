import * as mc from '@minecraft/server';

import {defineActions, Discussion} from './discussion.js';
import * as formLib from '../lib/form.js';

import {NpcState} from '../types/packTypes.js';
import {showErrorMessage, STATE, timeout} from '../lib.js';
import {script} from '../script.js';
import {FormFields} from './npc.js';

defineActions({NpcTravel});

FormFields.telebot = {
  x: formLib.slider(-5, 5, {
    displayName: 'X Offset',
    defaultValue: 0,
  }),
  y: formLib.slider(-5, 5, {
    displayName: 'Y Offset',
    defaultValue: 0,
  }),
  z: formLib.slider(-5, 5, {
    displayName: 'Z Offset',
    defaultValue: 0,
  }),
  w: formLib.slider(0, 10, {
    displayName: 'Teleport Area Size',
    defaultValue: 1,
  }),
};

/** Shows user a list of NPCs to select from for teleporting */
async function NpcTravel(d: Discussion) {
  const buttons: formLib.ActionButton[] = [];
  for (const npc of STATE.getNpcs()) {
    const actor = script.actors[npc.role];
    if (actor === undefined) {
      console.warn('Unable to determine actor: ', npc.role);
      continue;
    }
    if (actor.roles.includes('telebot')) {
      buttons.push({
        text: npc.description === '' ? actor.name : npc.description,
        action: async () => await TeleportUserToNpc(d, npc),
      });
    }
  }
  if (buttons.length === 0) {
    return await showErrorMessage(
      d.player,
      'Oh no! Could not load any telebots...',
      'BOT 404 NOT FOUND',
    );
  }
  await formLib.ActionForm(d.player, 'Destination?', '', buttons);
}

async function TeleportUserToNpc(d: Discussion, npc: NpcState) {
  const settings = (npc.extra ?? {})['telebot'] ?? {};
  let x = npc.location[1] + ((settings.x as number) ?? 0);
  const y = npc.location[2] + ((settings.y as number) ?? 0);
  let z = npc.location[3] + ((settings.z as number) ?? 0);
  const radius = ((settings.w as number) ?? 1) / 2;
  const dimension = mc.world.getDimension(npc.location[0]);
  if (radius > 0) {
    x += 2 * radius * Math.random() - radius;
    z += 2 * radius * Math.random() - radius;
  }
  d.player.teleport({x, y, z}, {dimension});
  await timeout(5);
  await d.handleTransition({
    sound: 'beacon.power',
    pitch: 2,
    x,
    y,
    z,
    dimension: dimension.id,
  });
  for (let i = 5; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const [dx, dy, dz] = [
        Math.random() * 2 - 1,
        Math.random() * 2,
        Math.random() * 2 - 1,
      ];
      const newLocation = {x: x + dx, y: y + dy, z: z + dz};
      dimension.spawnParticle(
        'minecraft:endrod',
        newLocation,
        new mc.MolangVariableMap(),
      );
    }
    await timeout(5);
  }
}
