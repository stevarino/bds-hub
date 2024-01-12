/**
 * minigames/minigames.ts - Single player minigames (for now)
 **/

import * as mc from '@minecraft/server';

import * as storage from '../storage.js';
import * as mgt from './types.js';
import * as regions from '../regions.js';
import {Context} from './context.js';
import {StartupEvent} from '../../lib.js';

import './editor.js';

export const MG_BY_ID = new Map<string, Context>();
export const MG_BY_REGION = new Map<number, Context>();
export const MG_BY_PLAYER = new Map<string, Context>();

export const MG_STORAGE = storage.WORLD.getMap('minigames');

const REGION_SOURCE = '__MINIGAMES__';

regions.onEnter.addListener(onEnterGame);
regions.onExit.addListener(onExitGame);

StartupEvent.addListener(() => {
  for (const mg of MG_STORAGE.keys()) {
    const json = MG_STORAGE.getJSON(mg) as mgt.Minigame;
    const reg = regions.registerRegion(
      Object.assign(
        {source: REGION_SOURCE, children: json.regions},
        json.region,
      ),
    );
    const ctx = new Context(json, reg);
    MG_BY_ID.set(json.id, ctx);
    MG_BY_REGION.set(reg.regionIndex, ctx);

    mc.system.runInterval(onTick, 1);
  }
});

/** The game officially starts here */
function onEnterGame(event: regions.OnRegionChangeEvent) {
  if (event.source !== REGION_SOURCE) return;
  const ctx = MG_BY_REGION.get(event.region.regionIndex);
  if (ctx === undefined || !ctx.game.active) return;

  MG_BY_PLAYER.set(event.player.id, ctx);
  if (ctx.game.adventureMode) {
    event.player.runCommand('gamemode a');
  }

  mc.world.sendMessage(
    `Player entered game ${event.player.name}: ${ctx.game.id}`,
  );
  ctx.addPlayer(event.player);
}

/** The game officially ends here */
function onExitGame(event: regions.OnRegionChangeEvent) {
  if (event.source !== REGION_SOURCE) return;
  const ctx = MG_BY_PLAYER.get(event.player.id);
  if (ctx === undefined) return;
  if (ctx.game.region.name !== event.region.name) return;
  MG_BY_PLAYER.delete(event.player.id);
  ctx.removePlayer(event.player);
  event.player.camera.clear();
  ctx.setPlayer(event.player).per(true, true);
  if (ctx.game.adventureMode) {
    event.player.runCommand('gamemode s');
  }

  mc.world.sendMessage(`Player left game ${event.player.name}: ${ctx.game.id}`);
}

function onTick() {
  for (const ctx of MG_BY_ID.values()) {
    ctx.onTick();
  }
}
