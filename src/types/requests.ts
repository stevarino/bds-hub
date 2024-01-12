import {
  EventRequest,
  EventResponse,
  IDQuery,
  Location,
  LocationGet,
  LocGetAllRes,
  LocListReq,
  LocListRes,
  ServerStatus,
  ServerSuccess,
  Update,
  UpdateResponse,
  WorldState,
} from './common';

import * as events from '../lib/events.js';

export type Callback<T = unknown, U = unknown> = (req: T) => U | Promise<U>;

export interface EndpointTransaction {
  id: number
  endpoint: string
  payload?: string
}

class Context {
  listener:
    | ((endpoint: string, req: string | object | undefined) => Promise<unknown>)
    | undefined = undefined;
  routers: {[endpoint: string]: Endpoint} = {};
}

class Endpoint<Req = unknown, Res = unknown> {
  listener: Callback<Req, Res> | undefined = undefined;
  constructor(
    public ctx: Context,
    public endpoint: string,
  ) {
    this.ctx.routers[this.endpoint] = this as Endpoint<unknown, unknown>;
  }

  addListener(callback: Callback<Req, Res>) {
    this.listener = callback;
  }

  async request(req: Req): Promise<Res> {
    if (this.listener !== undefined) {
      return await this.listener(req);
    } else if (this.ctx.listener !== undefined) {
      return (await this.ctx.listener(
        this.endpoint,
        req as object | undefined,
      )) as Res;
    }
    throw new Error(`Missing listener: ${this.endpoint}`);
  }
}

class NilEndpoint<Res = unknown> extends Endpoint<undefined, Res> {
  async request(): Promise<Res> {
    return super.request(undefined);
  }
}

export const Ctx = new Context();

export function Get(endpoint: string) {
  return Ctx.routers[endpoint];
}

export const Status = new NilEndpoint<ServerStatus>(Ctx, '/status');
export const CheckIn = new Endpoint<Update, UpdateResponse>(Ctx, '/update');
export const Events = new Endpoint<EventRequest, EventResponse>(Ctx, '/events');
export const ReadState = new NilEndpoint<WorldState>(Ctx, '/read_state');
export const WriteState = new Endpoint<WorldState, ServerSuccess>(
  Ctx,
  '/write_state',
);
export const LocList = new Endpoint<LocListReq, LocListRes>(
  Ctx,
  '/location/list',
);
export const LocGetAll = new NilEndpoint<LocGetAllRes>(
  Ctx,
  '/location/list_all',
);
export const LocNew = new Endpoint<Location, ServerSuccess>(
  Ctx,
  '/location/new',
);
export const LocGet = new Endpoint<IDQuery, LocationGet>(Ctx, '/location/get');
export const LocUpdate = new Endpoint<Location, ServerSuccess>(
  Ctx,
  '/location/update',
);
export const LocDel = new Endpoint<IDQuery, ServerSuccess>(
  Ctx,
  '/location/delete',
);
