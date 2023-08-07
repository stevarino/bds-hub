

import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import * as types from '../types/packTypes.js';
import { DELAY, ID, SEP } from "./constants.js";

export function padToWidth(str: string, pixels: number, char: string = ' ', padLeft: boolean=false) {
  // source: very inaccurate squinting....
  const orig = str;
  const charWidth: Record<string, number> = {
    'i': 2,
    'k': 4,
    'l': 3,
    't': 4,
    '.': 2,
    ',': 2,
  }
  const defaultWidth = 6;
  let total = 0;
  for (const c of str) {
    total += charWidth[c] ?? defaultWidth;
  }
  let i = 0;
  const delta = charWidth[char] ?? defaultWidth;
  while (total + delta <= pixels) {
    total += delta;
    str = padLeft ? char + str : str + char;
    i += 1;
  }
  return str;
}

export async function timeout(ticks: number) {
  return await new Promise<void>(res => {
    mc.system.runTimeout(res, ticks);
  });
}

export async function getFormResponse<U=unknown>(player: mc.Player, form: {show: (player: mc.Player) => Promise<U>}) {
  await timeout(DELAY);
  return await form.show(player);
}

export async function showErrorMessage(player: mc.Player, message: string, title?: string) {
  getFormResponse(player, new ui.MessageFormData().title(title ?? 'Error').body(
    'ERROR:\n\n' + message).button1('Okay'));
}

/** Returns a namespace => tags[] listing for an entity */
export function getEntityTags(entity: mc.Entity) {
  const tags: {[namespace: string]: [string, ...string[]]} = {}
  for (const tag of entity.getTags()) {
    const i = tag.indexOf(SEP);
    if (i === -1) continue;
    const ns = tag.slice(0, i);
    if (tags[ns] === undefined) {
      tags[ns] = [tag.slice(i+1, 0)];
    } else {
      tags[ns]?.push(tag.slice(i+1, 0));
    }
  }
  return tags;
}

export function strip(s: string) {
  return s.replace(/^\s+/, '').replace(/\s+$/, '').replace(/^[ \t]+/m, '');
}

export function positionToVec3(loc: types.PositionTuple) {
  return {x: loc[1], y: loc[2], z: loc[3]};
}

export function distance(a: mc.Vector3, b: mc.Vector3) {
  let deltas = [a.x-b.x, a.y-b.y, a.z-b.z].map(n => n*n);
  return Math.sqrt(deltas.reduce((l, r) => l+r));
}

export class Tag {
  map = new Map<string, Tag>();
  constructor(
    public parent?: Tag,
    public path?: string,
    public parts: string[] = []
  ) {
  }

  add(path: string) {
    if (!this.map.has(path)) {
      this.map.set(path, new Tag(this, path, [...this.parts, path]));
    }
    return this.map.get(path) as Tag;
  }

  keys() {
    return Array.from(this.map.keys());
  }

  values() {
    return Array.from(this.map.values());
  }

  has(path: string) {
    return this.map.has(path);
  }

  get(path: string) {
    if (!this.map.has(path)) throw new Error(`Invalid tag: ${JSON.stringify(this.parts)} : ${path}`);
    return this.map.get(path) as Tag;
  }

  id() {
    if (this.parts.length === 0) throw new Error('No tag at root');
    return ID(this.parts[0] as string, ...this.parts.slice(1))
  }
}

const ID_PREFIX = ID('');
export function parseIds(e: mc.Entity) {
  const tagMap = new Tag();
  for (const t of e.getTags()) {
    if (!t.startsWith(ID_PREFIX)) continue;
    let tm = tagMap;
    for (const part of t.split(SEP).slice(1)) {
      if (part.length === 0) continue;
      tm = tm.add(part);
    }
  }
  return tagMap;
}