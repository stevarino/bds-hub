import * as mc from '@minecraft/server';
import * as types from '../types/packTypes.js';
import {ReadState, WriteState} from './network.js';
import { WORLD } from '../modules/storage.js';

export let STATE: State;

const ACCOUNTS = 'accounts';
const NPCS = 'npcs';

export async function setup() {
  STATE = new State();

  const npcs = WORLD.getJSON(NPCS);
  if (npcs === undefined) {
    await STATE.sync();
  } else {
    STATE.isInitialSync = false;
    STATE.npcs = npcs;
    STATE.accounts = WORLD.getJSON(ACCOUNTS);
  }
}

class State {
  players = new Set<string>();
  npcs: Record<string, types.NpcState> = {};
  accounts: Record<string, types.AccountState> = {};
  isInitialSync = true;
  isSynced = false;
  needsPush = false;

  async sync() {
    const state = await ReadState.request();
    if (state === undefined) {
      // failed to get state
      console.warn('Unable to query server for state.');
      mc.system.runTimeout(() => this.sync(), 5 * 60 * 20);
    } else {
      await this.addPlayers(state.players ?? [], false);
      await this.addNpcs(state.npcs ?? [], false);
      await this.addAccounts(state.accounts ?? []);
      this.isSynced = true;
      console.info('State synced from Hub Server');
    }
    if (this.isSynced && this.needsPush && !this.isInitialSync) {
      return await this.save();
    }
    this.isInitialSync = false;
    return;
  }

  async save() {
    if (!this.isSynced) {
      this.needsPush = true;
      return false;
    }
    WORLD.setJSON(NPCS, Object.values(this.npcs));
    WORLD.setJSON(ACCOUNTS, Object.values(this.accounts));
    this.needsPush = false;
    return true;
  }

  getPlayers() {
    return [...this.players];
  }

  async addPlayers(players: string[], autosave = true) {
    let mutated = false;
    for (const p of players) {
      this.players.add(p);
      mutated = true;
    }
    if (mutated && autosave) return await this.save();
    if (mutated) this.needsPush = true;
    return false;
  }

  getNpcs() {
    return Object.values(this.npcs);
  }

  async addNpcs(npcs: types.NpcState[], autosave = true) {
    let mutated = false;
    for (const npc of npcs ?? []) {
      if (this.npcs[npc.id] === undefined) {
        mutated = true;
        this.npcs[npc.id] = npc;
      }
    }
    if (mutated && autosave) return await this.save();
    if (mutated) this.needsPush = true;
    return false;
  }

  async rmNpc(npcId: string, autosave = true) {
    delete this.npcs[npcId];
    if (autosave) return await this.save();
    this.needsPush = true;
    return;
  }

  async addAccounts(accounts: types.AccountState[]) {
    for (const acct of accounts ?? []) {
      const live = this.accounts[acct.id];
      if (live === undefined) {
        this.accounts[acct.id] = acct;
      } else {
        live.ammount += acct.ammount;
      }
    }
  }
}
