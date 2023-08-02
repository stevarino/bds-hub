import * as http from 'node:http';
import { ConfigFile, Constants, O, ServerStatus, Update, UpdateResponse } from '../types.js';
import { DBHandle, openDatabase } from './database.js';
import { DiscordClient } from './discord.js';
import { EventRequest } from '../types/packTypes.js';

export async function getServer(config: ConfigFile) {
  const db = await openDatabase(config.databaseFilename ?? 'bds_hub.db');
  return new Server(db, config);
}

class Server {
  server: http.Server;
  db: DBHandle;
  config: ConfigFile;
  discord: DiscordClient;
  /** Time of last update for a given player (name -> ts) */
  playerCache: O<number> = {};
  /** Last observed location of player (name -> json-str) */
  posCache: O<string> = {};
  /** Up-to-date info about the current server state */
  status: ServerStatus = {};

  constructor(db: DBHandle, config: ConfigFile) {
    this.db = db;
    this.config = config;

    this.discord = new DiscordClient(this.config);

    this.server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '', 'http://example.com');
      switch(url.pathname) {
        case '/update': return this.processUpdate(req, res);
        case '/status': return this.showStatus(req, res);
        case '/events': return this.findEvents(req, res);
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
    return await new Promise<T>(resolve => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        resolve(JSON.parse(body) as T);
      });
    });
  }

  async processUpdate(req: http.IncomingMessage, res: http.ServerResponse) {
    let response: UpdateResponse = {
      messages: this.discord.inbound,
    }
    this.discord.inbound.length = 0;
    
    const jsonResponse = JSON.stringify(response);
    const body = await this.readBody<Update>(req);
    res.setHeader('Content-Type', 'text/plain');
    res.write(jsonResponse);
    res.end();
    this.processPayload(body);
  }

  processPayload(payload: Update) {
    const now = new Date().getTime();
    const weather = Constants[payload.weather] ?? Constants[Constants.weatherClear];
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
    res.write(JSON.stringify(this.status));
    res.end();
  }

  async findEvents(req: http.IncomingMessage, res: http.ServerResponse) {
    const query = await this.readBody<EventRequest>(req);
    const response = JSON.stringify(await this.db.queryEvents(query));
    res.setHeader('Content-Type', 'text/plain');
    res.write(response);
    res.end();
  }
}
