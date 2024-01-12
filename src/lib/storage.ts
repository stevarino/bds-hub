/**
 * storage.ts - dynamic property interfaces for permanent storage
 *
 * See PropertyMap for a general Map interface for dynamic properties.
 *
 * Also includes a file-browser type menu system for adjustment.
 **/

import * as mc from '@minecraft/server';
import * as forms from './form.js';
import {Discussion, defineActions} from '../bedrock_studio/modules/discussion.js';
import {showErrorMessage} from './lib.js';
import {DataMap} from './data_map.js';

defineActions({BrowseDirectories});

mc.world.afterEvents.playerSpawn.subscribe(e => {
  const map = getPlayerMap(e.player);
  map.setJSON('record', {
    name: e.player.name,
    login: new Date().getTime(),
  } as PlayerRecord);
});

interface PlayerRecord {
  name: string;
  login: number;
}

type PropertyValue = boolean | number | string | mc.Vector3 | undefined;

class PropertyMap implements Map<string, PropertyValue> {
  prefixSlash: string;
  constructor(
    public target: mc.Entity | mc.World,
    public prefix: string = '',
    public parent?: PropertyMap,
  ) {
    if (this.prefix !== '' && this.prefix.endsWith('/')) {
      throw Error('Prefix must not end in a "/"');
    }
    this.prefixSlash = `${this.prefix}/`;
  }

  _addPrefix(key: string) {
    return this.prefixSlash + key;
  }

  _removePrefix(key: string) {
    if (!key.startsWith(this.prefixSlash)) {
      throw Error(`Prefix ("${this.prefix}") not found on key: "${key}"`);
    }
    return key.slice(this.prefixSlash.length);
  }

  getMap(key: string) {
    return new PropertyMap(this.target, this.prefixSlash + key);
  }

  set(key: string, value: PropertyValue): this {
    return this.rawSet(this._addPrefix(key), value);
  }

  rawSet(key: string, value: PropertyValue): this {
    this.target.setDynamicProperty(key, value);
    return this;
  }

  get(key: string): PropertyValue {
    return this.rawGet(this._addPrefix(key));
  }

  rawGet(key: string): PropertyValue {
    return this.target.getDynamicProperty(key);
  }

  setJSON(key: string, value: unknown) {
    this.set(key, JSON.stringify(value));
  }

  getJSON(key: string) {
    const value = this.get(key);
    if (value === undefined) return undefined;
    return JSON.parse(value as string);
  }

  delete(key: string): boolean {
    if (this.get(key) === undefined) return false;
    this.set(key, undefined);
    return true;
  }

  *keys(): IterableIterator<string> {
    yield* this.list();
  }

  forEach(
    callbackfn: (
      value: PropertyValue,
      key: string,
      map: Map<string, PropertyValue>,
    ) => void,
  ): void {
    for (const [key, val] of this.entries()) {
      callbackfn(val, key, this);
    }
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  *rawKeys() {
    for (const id of this.target.getDynamicPropertyIds()) {
      if (id.startsWith(this.prefixSlash)) yield id;
    }
  }

  *list(test?: string | RegExp) {
    for (let id of this.rawKeys()) {
      id = this._removePrefix(id);
      if (test === undefined) {
        yield id;
      } else if (typeof test === 'string' && id.startsWith(test)) {
        yield id;
      } else if (test instanceof RegExp && test.test(id)) {
        yield id;
      }
    }
  }

  get size(): number {
    return Array.from(this.rawKeys()).length;
  }

  *entries(): IterableIterator<[string, PropertyValue]> {
    for (const item in this.rawKeys()) {
      yield [this._removePrefix(item), this.rawGet(item)];
    }
  }

  *values(): IterableIterator<PropertyValue> {
    for (const [, val] of this.entries()) {
      yield val;
    }
  }

  get [Symbol.toStringTag](): string {
    return this.toString();
  }

  *[Symbol.iterator](): IterableIterator<[string, PropertyValue]> {
    yield* this.entries();
  }

  toString() {
    return Object.fromEntries(this.entries()).toString();
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }
}

export class Collection<T extends {id: string}> {
  collection: {[id: string]: T}

  constructor(public key: string) {
    this.collection = WORLD.getJSON(`collections/${this.key}`) ?? {}
  }

  /** Write collection to world dynamic properties */
  save() {
    WORLD.setJSON(`collections/${this.key}`, this.collection);
  }

  /** Add (or overwrite) item[s] */
  add(...items: T[]) {
    for (const item of items) {
      this.collection[item.id] = item;
    }
    this.save();
  }

  /** Update an item */
  set(...items: (Partial<T> & {id: string})[]) {
    for (const item of items) {
      const record = this.collection[item.id] as {[key: string]: unknown};
      if (record === undefined) continue;
      for (const [key, val] of Object.entries(item)) {
        if (key === 'id') continue;
        record[key] = val;
      }
    }
  }

  /** Delete the item from the collection */
  rm(...ids: string[]) {
    for (const id of ids) {
      delete this.collection[id];
    }
    this.save();
  }

  get(id: string): T|undefined {
    return this.collection[id];
  }

  getAll(): T[] {
    return Object.values(this.collection);
  }
}

export function getEntityMap(entity: mc.Entity) {
  return new PropertyMap(entity);
}

export function getPlayerMap(player: mc.Player) {
  return new PropertyMap(player, `players/${escapePath(player.id)}`);
}

export const WORLD = new PropertyMap(mc.world);

const escapePatterns: [string, string][] = [
  ['@', '@@'],
  ['/', '@s'],
];

/** Escape a path element, ensuring its safe to be used */
function escapePath(id: string) {
  for (const [from, to] of escapePatterns) {
    id = id.replaceAll(from, to);
  }
  return id;
}

/** Return path to its unescaped varient */
function unescapePath(id: string) {
  for (let i = escapePatterns.length - 1; i--; i >= 0) {
    const [from, to] = escapePatterns[i]!;
    id = id.replaceAll(to, from);
  }
  return id;
}

/**
 * Returns a mapping stored in the world under entities/{id} namesapce
 *
 * WARNING: Do not store random or dynamic entities using this.
 **/
export function getWorldEntityMap(entityId: string) {
  return WORLD.getMap(`entities/${escapePath(entityId)}`);
}

/** Returns a mapping stored in the world under the players/ namespace */
export function getWorldPlayerMap(playerId: string) {
  return WORLD.getMap(`players/${escapePath(playerId)}`);
}

export function getPlayerDataMap(player: mc.Player) {
  return DataMap.from(
    getPlayerMap(player).getMap('data') as Map<string, undefined>,
  );
}

export function getWorldPlayerDataMap(playerId: string) {
  return DataMap.from(
    WORLD.getMap(`players/${escapePath(playerId)}/data`) as Map<
      string,
      undefined
    >,
  );
}

/** Returns a set of all player-ids as seen on the server */
export function* getPlayerIds() {
  for (const playerId in WORLD.getMap('players').keys()) {
    if (playerId.includes('/')) continue;
    yield unescapePath(playerId);
  }
}

export function getPlayerRecords() {
  const names = new Map<string, PlayerRecord>();
  for (const id in getPlayerIds()) {
    names.set(id, WORLD.getJSON(`players/${escapePath(id)}`) as PlayerRecord);
  }
  return names;
}

function setProperty(
  target: mc.Entity | mc.World,
  name: string,
  value: PropertyValue,
) {
  target.setDynamicProperty(name, value);
}

function getProperty(target: mc.Entity | mc.World, name: string) {
  return target.getDynamicProperty(name);
}

function browseProperties(target: mc.Entity | mc.World, path?: string) {
  path = path ?? '';
  const folder = path === '' ? '' : path + '/';
  const results = {
    bytes: target.getDynamicPropertyTotalByteCount(),
    directories: new Set<string>(),
    records: [] as string[],
  };
  for (const id of target.getDynamicPropertyIds()) {
    if (!id.startsWith(folder)) continue;
    const name = id.slice(folder.length);
    if (name.includes('/')) {
      results.directories.add(name.split('/')[0]!);
    } else {
      results.records.push(name);
    }
  }
  return results;
}

async function BrowseDirectories(
  d: Discussion,
  target?: mc.Player | mc.World,
  path?: string[],
) {
  if (target === undefined) {
    const buttons: forms.ActionButton[] = [
      {
        text: 'World',
        action: async () => await BrowseDirectories(d, mc.world, []),
      },
    ];
    for (const p of mc.world.getAllPlayers()) {
      buttons.push({
        text: `${p.name} - ${p.id}`,
        action: async () => await BrowseDirectories(d, undefined, []),
      });
    }
    return await forms.ActionForm(d.player, 'Select Source', '', buttons);
  }
  const res = browseProperties(target, path?.join('/'));
  const buttons: forms.ActionButton[] = [];
  for (const dir of res.directories) {
    buttons.push({
      text: dir + '/',
      action: async () => await BrowseDirectories(d, target, [...path!, dir]),
    });
  }
  for (const record of res.records) {
    buttons.push({
      text: record,
      action: async () => await ShowRecord(d, target, [...path!, record]),
    });
  }
}

function getBrowserTitle(target: mc.Player | mc.World) {
  const byteUnits = ['', 'k', 'M', 'G'];
  const bytes = target.getDynamicPropertyTotalByteCount();
  let i = 0;
  while (bytes > 1024 && i < 2) {
    bytes / 1024;
    i += 1;
  }
  const siBytes = `${bytes.toFixed(1)} ${byteUnits[i]}B`;

  if (target instanceof mc.World) {
    return `World (${siBytes})`;
  } else {
    return `${target.name} (${siBytes})`;
  }
}

const minDate = new Date(2023, 10, 27).getTime();
const maxDate = new Date().getTime() + 365 * 24 * 3600 * 1000;

async function ShowRecord(
  d: Discussion,
  target: mc.Player | mc.World,
  path: string[],
) {
  const name = path.join('/');
  const value = getProperty(target, name);
  if (value === undefined) {
    return await BrowseDirectories(d, target, path.slice(0, -1));
  }
  const lines: string[] = [];
  const t = typeof value;
  lines.push();
  lines.push(`${name} (${t}${t === 'string' ? ` (${t.length} chars)` : ''})`);
  let stringValue = '';
  if (typeof value === 'string') {
    let success = false;
    if (value.startsWith('{')) {
      try {
        stringValue = JSON.stringify(JSON.parse(value), undefined, 2);
        success = true;
      } catch (e) {
        console.error(e);
      }
    }
    if (!success && value.length > 50) {
      stringValue = `Value: ${value.slice(45)}[...]`;
    }
  } else {
    stringValue = `Value: ${value}`;
  }
  lines.push(`${stringValue}`);
  if (typeof value === 'number' && value > minDate && value < maxDate) {
    lines.push(`(${new Date(value).toLocaleString()})`);
    1;
  }
  lines.push();
  await forms.ActionForm(d.player, getBrowserTitle(target), lines.join('\n'), [
    {
      text: 'Edit',
      action: async () => await EditRecord(d, target, path, value!),
    },
    {
      text: 'Back',
      action: async () => await BrowseDirectories(d, target, path.slice(0, -1)),
    },
  ]);
}

const serialize: {[key: string]: (value: PropertyValue) => string} = {
  string: v => v as string,
  number: v => String(v),
  boolean: v => String(v),
  object: v => JSON.stringify(v),
};

const deserialize: {[key: string]: (res: string) => PropertyValue} = {
  string: v => v as string,
  number: v => Number(v),
  boolean: v => Boolean(v),
  object: v => JSON.parse(v) as mc.Vector3,
};

async function EditRecord(
  d: Discussion,
  target: mc.Player | mc.World,
  path: string[],
  value: PropertyValue,
) {
  const name = path.join('/');
  let str = serialize[typeof value]!(value);

  while (true) {
    const {results} = await forms.ModalForm(d.player, `Editing ${name}`, {
      value: forms.textbox('', {defaultValue: str}),
      delete: forms.toggle({defaultValue: false}),
    });
    if (results === undefined) return;
    if (results.delete.get()) {
      setProperty(target, name, undefined);
      return await BrowseDirectories(d, target, path.slice(0, -1));
    }
    str = results.value.get();
    try {
      setProperty(
        target,
        name,
        deserialize[typeof value]!(results.value.get()),
      );
      break;
    } catch (e) {
      await showErrorMessage(
        d.player,
        `Error saving message, possibly bad format:\n\n${e}`,
      );
    }
  }
}
