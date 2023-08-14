import { join } from 'node:path';

import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

import { Dialogue, Obj } from '../types.js';
import { root } from '../scripts/lib.js';
import { Event, EventField, EventRequest } from '../behavior_pack/src/types/packTypes.js';


type StringLookup = {id: number, value: string};

export async function openDatabase(filename: string) {
  const db = await open({ filename, driver: sqlite3.Database });
  await db.migrate({migrationsPath: join(root, 'dist', 'server', 'migrations')});

  // cache all the things
  const strings: StringLookup[] = await db.all(
    'SELECT id, value FROM Strings');
  
  return new DBHandle(db, strings);
}

export class DBHandle {
  db: Database;

  cache = new Map<number, string>();
  revCache = new Map<string, number>();

  constructor(db: Database, strings?: StringLookup[]) {
    this.db = db;
    for (const {id, value} of strings ?? []) {
      this.cache.set(id, value);
      this.revCache.set(value, id);
    }
  }
  
  /** Add a colon to each key */
  formatParams<T = Obj<string>|Obj<number>>(params: T): T {
    return Object.fromEntries(
      Object.entries(params as object).map(
        ([k, v]) => [k.startsWith(':') ? k : ':' + k, v]
      )
    ) as T;
  }

  /** Given a set of strings, returns the corresponding id number (or 0 on undefined) */
  async stringsToIds(strings: Obj<string|undefined>) {
    const lookups: Obj<string> = {};
    const values: string[] = []
    const result: Obj<number> = {};
  
    for (const [key, str] of Object.entries(strings)) {
      // 0 is used as null as null does not void UNIQUE constraints
      result[key] = 0;
      if (str !== undefined) {
        const lookup = this.revCache.get(str);
        if (lookup === undefined) {
          lookups[str] = key;
          values.push(str);
        } else {
          result[key] = lookup
        }
      }
    }

    if (values.length == 0) return result;
    let query = `INSERT OR IGNORE INTO Strings(value) VALUES ${
      values.map(() => '(?)').join(', ')
    };`
    await this.db.run(query, values);
    query = `SELECT id, value FROM "Strings" WHERE ${values.map(v => 'value = ?').join(' OR ')};`
    const rows = await this.db.all<{id: number, value: string}[]>(query, values);
    for (const {id, value} of rows) {
      this.cache.set(id, value);
      this.revCache.set(value, id);
      result[lookups[value] as string] = id;
    }

    return result;
  }
  
  async addEvent(entity: string, event: Dialogue.PlayerEvent) {
    const params = await this.stringsToIds({
      entity, object: event.object, extra: event.extra
    });
    params.action = event.action;
    params.qty = event.qty ?? 1;
    await this.db.run(`
      INSERT INTO Events (entity, action, object, extra, qty)
      VALUES (:entity, :action, :object, :extra, :qty)
      ON CONFLICT DO UPDATE SET qty = qty + :qty;
    `, this.formatParams(params));
  }
  
  async addPosition(ts: number, player: string, position: Dialogue.PositionTuple) {
    const [dimension, x, y, z] = position;
    const params = await this.stringsToIds({player, dimension});
    Object.assign(params, {x, y, z, ts});
    this.db.run(`
      INSERT INTO Positions (ts, player, x, y, z, dimension)
      VALUES (:ts, :player, :x, :y, :z, :dimension);
    `,  this.formatParams(params));
  }
  
  async queryEvents(query?: EventRequest) {
    const where: string[] = [];
    const params: number[] = [];
    const numFields = ['action', 'qty'];

    for (const [key, value] of Object.entries(query?.where ?? {})) {
      if (!/^[a-z]+$/.test(key)) continue;
      where.push(`AND ${key} = ?`)
      const isNum = numFields.includes(key);
      params.push(isNum ? Number(value) : (this.revCache.get(value as string) ?? 0));
    }
    const qry = `SELECT entity, action, object, extra, qty FROM Events WHERE 1 = 1 ${
      where.join(' ')};`;
    const values: Record<string, number>[] = await this.db.all(qry, params);
    const results: Partial<Event>[] = [];
    for (const value of values) {
      const record: Partial<Event> = {};
      results.push(record);
      for (const [k, v] of Object.entries(value)) {
        if (k === 'action') {
          record.action = Dialogue.Actions[v];
        } else if (k === 'qty') {
          record.qty = v;
        } else {
          record[k as Exclude<EventField,"qty"|"action">] = this.cache.get(v);
        }
      }
      
      for (const r of Object.keys(record) as EventField[]) {
        if (query?.select !== undefined && !query.select.includes(r)) {
          delete(record[r])
        }
      }
    }
    results.sort((a, b) => {
      for (let f of (query?.order ?? []) as string[]) {
        let rev = 1;
        if (f.startsWith('-')) {
          rev = -1;
          f = f.slice(1);
        }
        if ((a[f as EventField] ?? '') < (b[f as EventField] ?? '')) return -1 * rev;
        if ((a[f as EventField] ?? '') > (b[f as EventField] ?? '')) return 1 * rev;
      }
      return 0;
    });

    return results;
  }

  async setKey(key: string, value: string) {
    await this.db.run(`
      INSERT INTO KeyValue (key, value)
      VALUES (:key, :value)
      ON CONFLICT DO UPDATE SET value = :value;
    `, this.formatParams({ key, value }));
  }

  async getKey(key: string) {
    const result = await this.db.get<{value: string}>(
      'SELECT value FROM KeyValue WHERE key = :key;', this.formatParams({key}
    ));
    return result?.value;
  }
}
