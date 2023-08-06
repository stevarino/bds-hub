
import * as mc from "@minecraft/server";
import * as types from '../types/packTypes.js'
import { request } from "./network.js";

export let STATE: State;
export async function setup() {
  STATE = new State();
  await STATE.sync();
}

class State {
  players = new Set<string>();
  bots: Record<string, types.BotState> = {};
  accounts: Record<string, types.AccountState> = {};
  initialSync = true;
  isSynced = false;
  needsPush = false;

  async sync() {
    const state = await request<types.WorldState>('/read_state');
    if (state === undefined) {
      // failed to get state
      console.warn('Unable to query server for state.');
      mc.system.runTimeout(() => this.sync(), 5 * 60 * 20);
    } else {
      this.addPlayers(state.players ?? [], false);
      this.addBots(state.bots ?? [], false);
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
      bots: Array.from(Object.values(this.bots)),
      accounts: Array.from(Object.values(this.accounts)),
    }
    await request('/write_state', state);
    this.needsPush = false;
    return true;
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

  async addBots(bots: types.BotState[], autosave=true) {
    let mutated = false;
    for (const bot of bots ?? []) {
      if (this.bots[bot.id] === undefined) {
        mutated = true;
        this.bots[bot.id] = bot;
      }
    }
    if (mutated && autosave) return await this.save();
    if (mutated) this.needsPush = true;
    return false;
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

  getPlayers() {
    return [...this.players]
  }

  getBots() {
    return Array.from(Object.values(this.bots));
  }
}
