import * as http from 'node:http';
import {ConfigFile, Obj, Dialogue, Requests} from '../types.js';
import {DBHandle, openDatabase} from './database.js';
import {DiscordClient} from './discord.js';
import {WorldState} from '../types/common.js';

export async function getServer(config: ConfigFile) {
  const db = await openDatabase(config.databaseFilename ?? 'bds_hub.db');
  return new Server(db, config);
}

const defaultWeather = Dialogue.Constants[Dialogue.Constants.weatherClear];

class Server {
  server: http.Server;
  db: DBHandle;
  config: ConfigFile;
  discord: DiscordClient;
  /** Time of last update for a given player (name -> ts) */
  playerCache: Obj<number> = {};
  /** Last observed location of player (name -> json-str) */
  posCache: Obj<string> = {};
  /** Up-to-date info about the current server state */
  status: Dialogue.ServerStatus = {};

  worldState?: WorldState;

  constructor(db: DBHandle, config: ConfigFile) {
    this.db = db;
    this.config = config;

    this.discord = new DiscordClient(this.config);

    this.registerHandlers();

    this.server = http.createServer(async (req, res) => {
      const url = new URL(req.url ?? '', 'http://example.com');
      req.on('close', () => {
        console.info(
          `${res.statusCode} ${req.method} ${req.url} ${
            req.headers['content-length'] ?? ''
          }`,
        );
      });
      try {
        const handler = Requests.Get(url.pathname);
        if (handler !== undefined) {
          let body = undefined;
          if (req.method === 'POST') {
            body = await this.readBody(req);
          }
          const response = await handler.request(body);
          if (response === undefined && !res.closed) {
            res.statusCode = 500;
            res.end('Server Error');
            return;
          }
          res.setHeader('Content-Type', 'text/plain');
          res.end(JSON.stringify(response));
        } else {
          res.statusCode = 404;
          res.end('Not found.');
        }
      } catch (e) {
        res.statusCode = 500;
        res.end('error - see logs');
        const error = e as Error;
        console.error(error);
        if (error.stack !== undefined) console.error(error.stack);
      }
    });
  }

  start() {
    let port = this.config.port ?? 8888;
    if (typeof port === 'string') port = parseInt(port);
    console.info('Listening on ', port);
    this.server.listen(port);
    this.discord.start().catch(r => console.error(r));
  }

  async readBody<T = unknown>(req: http.IncomingMessage) {
    return await new Promise<T | undefined>(resolve => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body) as T);
        } catch (e) {
          resolve(undefined);
        }
      });
    });
  }

  registerHandlers() {
    Requests.Status.addListener(() => this.status);

    Requests.CheckIn.addListener(async req => {
      const response: Dialogue.UpdateResponse = {
        messages: [...this.discord.inbound],
      };
      this.discord.inbound.length = 0;
      if (req !== undefined) await this.processPayload(req);
      return response;
    });

    Requests.Events.addListener(async req => {
      return {events: (await this.db.queryEvents(req)) ?? []};
    });

    Requests.ReadState.addListener(async () => {
      if (this.worldState === undefined) {
        this.worldState = JSON.parse(
          (await this.db.getKey('WorldState')) ?? '{}',
        );
      }
      return this.worldState as WorldState;
    });

    Requests.WriteState.addListener(async req => {
      if (req === undefined) return {success: false};
      this.worldState = req;
      await this.db.setKey('WorldState', JSON.stringify(this.worldState));
      return {success: true};
    });

    Requests.LocList.addListener(async req => {
      let owner = req?.owner;
      if (owner === '*') owner = undefined;
      return {locations: await this.db.listLocations(owner, req.publicOnly)};
    });

    Requests.LocGetAll.addListener(async () => {
      return {locations: await this.db.getAllLocations()};
    });

    Requests.LocNew.addListener(async req => {
      if (req === undefined) return {success: false};
      const pk = await this.db.createLocation(req);
      const success = (pk ?? 0) > 0;
      return {success, pk};
    });

    Requests.LocGet.addListener(async req => {
      return {location: await this.db.getLocation(req.id)};
    });

    Requests.LocUpdate.addListener(async req => {
      if (req === undefined) return {success: false};
      const success = (await this.db.updateLocation(req)) === 1;
      return {success};
    });

    Requests.LocDel.addListener(async req => {
      const success = (await this.db.deleteLocation(req.id)) === 1;
      return {success: success};
    });
  }

  async processPayload(payload: Dialogue.Update) {
    const now = new Date().getTime();
    const weather = Dialogue.Constants[payload.weather] ?? defaultWeather;
    this.status.time = payload.time;
    this.status.weather = weather.replace('weather', '');
    const online: string[] = [];
    for (const [name, update] of Object.entries(payload.players)) {
      if (update.pos !== undefined) {
        online.push(name);
        const pos = JSON.stringify(update.pos);
        if (this.posCache[name] !== pos) {
          const updatedAt = now - (this.playerCache[name] ?? 0);
          if (updatedAt > 60_000) {
            this.playerCache[name] = now;
            await this.db.addPosition(now, name, update.pos);
          }
        }
      }
      for (const event of update.events) {
        await this.db.addEvent(name, event);
      }
    }
    for (const msg of payload.messages) {
      this.discord.sendMessage(msg);
    }
    this.status.online = online;
  }
}
