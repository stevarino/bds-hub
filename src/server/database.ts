import { join } from 'node:path';

import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

import LRU from './lru.js';
import { Actions, EntityEvent, PositionTuple, O } from '../types.js';
import { root } from '../lib.js';


export async function openDatabase(filename: string) {
  const db = await open({ filename, driver: sqlite3.Database });
  await db.migrate({migrationsPath: join(root, 'dist', 'server', 'migrations')});
  return new DBHandle(db);
}

export class DBHandle {
  db: Database;
  cache = new LRU<number>(10000);

  constructor(db: Database) {
    this.db = db;
  }
  
  /** Add a colon to each key */
  formatParams<T = O<string>|O<number>>(params: T): T {
    return Object.fromEntries(
      Object.entries(params as object).map(
        ([k, v]) => [k.startsWith(':') ? k : ':' + k, v]
      )
    ) as T;
  }

  /** Given a set of strings, returns the corresponding id number (or 0 on undefined) */
  async stringsToIds(strings: O<string|undefined>) {
    const lookups: O<string> = {};
    const values: string[] = []
    const result: O<number> = {};
  
    for (const [key, str] of Object.entries(strings)) {
      // 0 is used as null as null does not void UNIQUE constraints
      result[key] = 0;
      if (str !== undefined) {
        const lookup = this.cache.get(str);
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
    for (const row of rows) {
      this.cache.set(row.value, row.id);
      result[lookups[row.value] as string] = row.id;
    }

    return result;
  }
  
  async addEvent(entity: string, event: EntityEvent) {
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
  
  async addPosition(ts: number, player: string, position: PositionTuple) {
    const [dimension, x, y, z] = position;
    const params = await this.stringsToIds({player, dimension});
    Object.assign(params, {x, y, z, ts});
    this.db.run(`
      INSERT INTO Positions (ts, player, x, y, z, dimension)
      VALUES (:ts, :player, :x, :y, :z, :dimension);
    `,  this.formatParams(params));
  }
  
  async queryEvents() {
    const strings = await this.db.all<{id: number, value: string}[]>(
      'SELECT id, value FROM Strings');
    const lookup = Object.fromEntries(strings.map(r => [r.id, r.value]));
    const values = await this.db.all(
      'SELECT entity, action, object, extra, qty FROM Events');
    const results = [];
    for (const value of values) {
      results.push({
        entity: lookup[value.entity],
        action: Actions[value.action],
        object: lookup[value.object],
        extra: lookup[value.extra],
        qty: value.qty,
      });
    }
    return results;
  }
}
