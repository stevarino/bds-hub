
import * as mc from "@minecraft/server";
import * as types from '../types/packTypes.js'
import { ReadState, WriteState } from "./network.js";

export let STATE: State;
export async function setup() {
  STATE = new State();
  await STATE.sync();
}

class State {
  players = new Set<string>();
  npcs: Record<string, types.NpcState> = {};
  accounts: Record<string, types.AccountState> = {};
  initialSync = true;
  isSynced = false;
  needsPush = false;

  async sync() {
    const state = await ReadState.request();
    if (state === undefined) {
      // failed to get state
      console.warn('Unable to query server for state.');
      mc.system.runTimeout(() => this.sync(), 5 * 60 * 20);
    } else {
      this.addPlayers(state.players ?? [], false);
      this.addNpcs(state.npcs ?? [], false);
      this.addAccounts(state.accounts ?? [], false);
      this.isSynced = true;
      console.info('State synced with Hub Server');
    }

    if (this.isSynced && this.needsPush && !this.initialSync) {
      return await this.save();
    }
    this.initialSync = false;
  }

  async save() {
    if (!this.isSynced) {
      this.needsPush = true;
      return false;
    }
    const state: types.WorldState = {
      players: [...this.players],
      npcs: Array.from(Object.values(this.npcs)),
      accounts: Array.from(Object.values(this.accounts)),
    }
    await WriteState.request(state);
    this.needsPush = false;
    return true;
  }

  getPlayers() {
    return [...this.players]
  }
  
  async addPlayers(players: string[], autosave=true) {
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
    return Array.from(Object.values(this.npcs));
  }

  async addNpcs(npcs: types.NpcState[], autosave=true) {
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

  async rmNpc(npcId: string, autosave=true) {
    delete this.npcs[npcId];
    if (autosave) return await this.save();
    this.needsPush = true;
  }

  async addAccounts(accounts: types.AccountState[], autosave=true) {
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