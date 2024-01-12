/**
 * Data about the server state
 */

import * as mc from '@minecraft/server';

export const PLAYERS = new Map<string, mc.Player>();

mc.world.afterEvents.playerSpawn.subscribe(e => {
  PLAYERS.set(e.player.id, e.player);
});

mc.world.afterEvents.playerLeave.subscribe(e => {
  PLAYERS.delete(e.playerId);
});
