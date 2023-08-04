import * as mc from "@minecraft/server";
import { variables } from "@minecraft/server-admin";
import * as mcnet from "@minecraft/server-net";
import * as ui from "@minecraft/server-ui";

import { DELAY } from "./constants.js";

export const HOST = variables.get('host');

export const PLAYERS = new Set<string>();
export const ALL_PLAYERS = new Set<string>();

export async function request<T=unknown>(
      endpoint: string, body?: string|object, headers?: Record<string, string>) {
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const req = new mcnet.HttpRequest(HOST + endpoint);

  if (body !== undefined) req.setBody(body);
  if (headers !== undefined) {
    const headerObjs: mcnet.HttpHeader[] = [];
    for (const [k, v] of Object.entries(headers)) {
      headerObjs.push(new mcnet.HttpHeader(k, v));
    }
    req.setHeaders(headerObjs);
  }
  req.setTimeout(0.5);

  const res = await mcnet.http.request(req);
  if (res.status != 200) {  // 2147954429 on error?
    return;
  }
  return JSON.parse(res.body) as T;
}

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


export async function getFormResponse<U>(player: mc.Player, form: {show: (player: mc.Player) => Promise<U>}) {
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
    const i = tag.indexOf(':');
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
