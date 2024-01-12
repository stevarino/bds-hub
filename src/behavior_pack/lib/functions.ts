import * as mc from '@minecraft/server';
import * as ui from '@minecraft/server-ui';

import * as types from '../types/packTypes.js';

export function padToWidth(
  str: string,
  pixels: number,
  char = ' ',
  padLeft = false,
) {
  // source: very inaccurate squinting....
  const charWidth: Record<string, number> = {
    i: 2,
    k: 4,
    l: 3,
    t: 4,
    '.': 2,
    ',': 2,
  };
  const defaultWidth = 6;
  let total = 0;
  for (const c of str) {
    total += charWidth[c] ?? defaultWidth;
  }
  const delta = charWidth[char] ?? defaultWidth;
  while (total + delta <= pixels) {
    total += delta;
    str = padLeft ? char + str : str + char;
  }
  return str;
}

export async function timeout(ticks: number = 10) {
  return await new Promise<void>(res => {
    mc.system.runTimeout(res, ticks);
  });
}

export async function getFormResponse<U = unknown>(
  player: mc.Player,
  form: {show: (player: mc.Player) => Promise<U>},
) {
  await timeout();
  return await form.show(player);
}

export async function showDialogMessage(
  player: mc.Player,
  title: string,
  message: string,
  buttons?: string[],
) {
  if (buttons === undefined) buttons = ['Okay'];
  const form = new ui.ActionFormData().title(title).body(message);
  for (const btn of buttons) form.button(btn);
  return (await getFormResponse(player, form)).selection;
}

export async function showErrorMessage(
  player: mc.Player,
  message: string,
  title?: string,
) {
  console.error(`${player.name}: ${message}`);
  await showDialogMessage(player, title ?? 'Error', 'ERROR:\n\n' + message);
}

export function strip(s: string) {
  return s
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .replace(/^[ \t]+/m, '');
}

export function positionToVec3(loc: types.PositionTuple) {
  return {x: loc[1], y: loc[2], z: loc[3]};
}

export function distance(a: mc.Vector3, b: mc.Vector3) {
  const deltas = [a.x - b.x, a.y - b.y, a.z - b.z].map(n => n * n);
  return Math.sqrt(deltas.reduce((l, r) => l + r));
}

export function showErrorTraceback(error: unknown) {
  console.error(error);
  if ((error as Error).stack !== undefined) {
    console.error((error as Error).stack);
  }
}
