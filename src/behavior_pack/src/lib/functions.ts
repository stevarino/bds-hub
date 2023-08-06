

import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { DELAY, SEP } from "./constants.js";

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
