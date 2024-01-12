/**
 * Routes requests through an event processor instead of http.
 */

import * as mc from '@minecraft/server';

import * as reqTypes from '../types/requests.js';
import * as constants from '../lib/constants.js';


export function install() {
  const handler = new TransactionHandler();
  reqTypes.Ctx.listener = async (endpoint, req) => handler.request(endpoint, req);
}


export class TransactionHandler {
  id = 0;
  resolvers: ((value: object | PromiseLike<object | undefined> | undefined) => void)[] = [];

  constructor() { 
    mc.system.afterEvents.scriptEventReceive.subscribe(e => {
      if (e.id === 'hub:response') this.respond(e);
    }, {namespaces: ['hub']});
  }

  respond(e: mc.ScriptEventCommandMessageAfterEvent) {
    const res = JSON.parse(e.message) as reqTypes.EndpointTransaction;
    const resolve = this.resolvers[res.id];
    if (resolve === undefined) {
      console.error(`[${res.endpoint}] Unable to locate promise.`);
      return;
    }
    delete this.resolvers[res.id];
    let obj = undefined;
    if (res.payload !== undefined) {
      try {
        obj = JSON.parse(res.payload)
      } catch (err) {
        console.error(`[${res.endpoint}] Unable to decode JSON: ${err}`);
        return;
      }
    }
    resolve(obj);
  }

  async request(endpoint: string, payload: string | object | undefined) {
    this.id += 1;
    const id = this.id;
    const req: reqTypes.EndpointTransaction = {id, endpoint};
    if (payload !== undefined) {
      if (typeof payload === 'string') {
        req.payload = payload;
      } else {
        req.payload = JSON.stringify(payload);
      }
    }
    const p = new Promise<object | undefined>(res => {
      mc.world.getDimension(constants.DIMENSION.OVERWORLD).runCommand(
        `scriptevent hub:request ${JSON.stringify(req)}`
      );
      this.resolvers[id] = res;
    });
    return await p;
  }
}