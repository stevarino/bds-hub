/**
 * Deprecated - See storage.ts
 */

import * as mc from '@minecraft/server';
import * as types from '../../types/common.js';
import * as reqTypes from '../../types/requests.js';
import * as storage from '../../lib/storage.js';
import * as state from './state.js'
import * as npcs from './npc.js';

export let STATE: State;

const NPCS = 'npcs';

export async function setup() {
  STATE = new State();

  const npcs = storage.WORLD.getJSON(NPCS);
  if (npcs === undefined) {
    await STATE.sync();
  }
}

class State {
  async sync() {
    const state = await reqTypes.ReadState.request();
    if (state === undefined) {
      // failed to get state
      console.warn('Unable to query server for state.');
      mc.system.runTimeout(() => this.sync(), 5 * 60 * 20);
    } else {
      await this.addNpcs(state.npcs ?? []);
      console.info('State synced from Hub Server');
    }
  }

  getPlayers() {
    return [...state.PLAYERS.getAll().map(p => p.gamertag)];
  }

  getNpcs() {
    return npcs.NPCs.getAll();
  }

  async addNpcs(states: types.NpcState[]) {
    npcs.NPCs.add(...states);
  }
}

