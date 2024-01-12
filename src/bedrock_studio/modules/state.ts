/**
 * Deprecated - See storage.ts
 */

import * as mc from '@minecraft/server';
import * as types from '../../types/common.js';
import {ReadState} from '../../types/requests.js';
import * as storage from '../../lib/storage.js';
import { NPCs } from './npc.js';

export interface PlayerState {
  id: string
  gamertag: string
}

class PlayerCollection extends storage.Collection<PlayerState> {
  sortedPlayers: string[];
  
  constructor(key: string) {
    super(key);
    this.sortedPlayers = this.sortPlayers();
  }

  sortPlayers() {
    const players = new Set<string>();
    for (const p of PLAYERS.getAll()) {
      players.add(p.gamertag);
    }
    return Array.from(players).sort();
  }

  save() {
    super.save();
    this.sortedPlayers = this.sortPlayers();
  }
}

export const PLAYERS = new PlayerCollection('players');

export function getPlayers() {
  return PLAYERS.sortedPlayers;
}

// update player list
mc.world.afterEvents.playerSpawn.subscribe(e => {
  if (PLAYERS.get(e.player.id) === undefined) {
    // new player
    PLAYERS.add({
      id: e.player.id,
      gamertag: e.player.name,
    });
  } else {
    PLAYERS.set({
      id: e.player.id,
      gamertag: e.player.name,
    });
  }
});

// player leaving
mc.world.afterEvents.playerLeave.subscribe(() => {
  // TODO
});
