import * as http from 'node:http';
import { ConfigFile, Obj, Dialogue } from '../types.js';
import { DBHandle, openDatabase } from './database.js';
import { DiscordClient } from './discord.js';
import { EventRequest, WorldState } from '../behavior_pack/src/types/packTypes.js';

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

    this.server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '', 'http://example.com');
      req.on('close', () => {
        console.info(`${res.statusCode} ${req.method} ${req.url} ${
          req.headers['content-length'] ?? ''}`);
      });
      switch(url.pathname) {
        case '/update': return this.processUpdate(req, res);
        case '/status': return this.showStatus(req, res);
        case '/events': return this.findEvents(req, res);
        case '/read_state': return this.getWorldState(req, res);
        case '/write_state': return this.setWorldState(req, res);
      }
      res.statusCode = 404;
      res.write('Not found.');
      res.end();
    });

  }

  start() {
    let port = this.config.port ?? 8888;
    if (typeof port === 'string') port = parseInt(port);
    console.info('Listening on ', port)
    this.server.listen(port)
    this.discord.start();
  }

  async readBody<T=unknown>(req: http.IncomingMessage) {
    return await new Promise<T|undefined>(resolve => {
      let body = '';
      req.on('data', (chunk) => {
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

  async processUpdate(req: http.IncomingMessage, res: http.ServerResponse) {
    let response: Dialogue.UpdateResponse = {
      messages: [...this.discord.inbound],
    }
    this.discord.inbound.length = 0;
    
    const jsonResponse = JSON.stringify(response);
    const body = await this.readBody<Dialogue.Update>(req);
    res.setHeader('Content-Type', 'text/plain');
    res.write(jsonResponse);
    res.end();
    if (body !== undefined) {
      this.processPayload(body);
    }
  }

  processPayload(payload: Dialogue.Update) {
    const now = new Date().getTime();
    const weather = Dialogue.Constants[payload.weather] ?? defaultWeather;
    this.status.time = payload.time;
    this.status.weather = weather.replace('weather', '');
    const online: string[] = [];
    for (const [name, update] of Object.entries(payload.entities)) {
      if (update.pos !== undefined) {
        online.push(name);
        const pos = JSON.stringify(update.pos);
        if (this.posCache[name] !== pos) {
          const updatedAt = now - (this.playerCache[name] ?? 0);
          if (updatedAt > 60_000) {
            this.playerCache[name] = now;
            this.db.addPosition(now, name, update.pos);
          }
        }
      }
      for (const event of update.events) {
        this.db.addEvent(name, event)
      }
    }
    for (const msg of payload.messages) {
      this.discord.sendMessage(msg);
    }
    this.status.online = online;
  }

  showStatus(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this.status));
  }

  async findEvents(req: http.IncomingMessage, res: http.ServerResponse) {
    const query = await this.readBody<EventRequest>(req);
    const response = JSON.stringify((await this.db.queryEvents(query)) ?? []);
    res.setHeader('Content-Type', 'text/plain');
    res.end(response);
  }

  async getWorldState(req: http.IncomingMessage, res: http.ServerResponse) {
    if (this.worldState === undefined) {
      this.worldState = JSON.parse((await this.db.getKey('WorldState')) ?? '{}');
    }
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(this.worldState));
  }

  async setWorldState(req: http.IncomingMessage, res: http.ServerResponse) {
    this.worldState = await this.readBody<WorldState>(req);
    res.setHeader('Content-Type', 'text/plain');
    if (this.worldState === undefined) {
      return res.end(JSON.stringify({'response': 'fail'}));
    }
    await this.db.setKey('WorldState', JSON.stringify(this.worldState));
    res.end(JSON.stringify({'response': 'okay'}));
  }
}
