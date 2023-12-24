/**
 * Text.ts - Interface for Minecraft actionbar text display
 */

import * as mc from '@minecraft/server';
import {StartupEvent} from '../lib';

StartupEvent.addListener(onTick);

export interface ActionBarText {
  id: string;
  text?: string;
  targets?: string[];
  expires?: number;
  priority?: number;
}

export function addActionBarText(text: ActionBarText) {
  if (text.text === undefined) {
    delete texts[text.id];
  } else {
    texts[text.id] = text;
  }
}

export function displayTitle(
  player: mc.Player,
  title: string,
  subtitle?: string,
  fadein = 0.5,
  stay = 3.5,
  fadeOut = 1,
) {
  player.runCommand(
    `titleraw @s times ${fadein / 20} ${stay / 20} ${fadeOut / 20}`,
  );
  if (subtitle !== undefined) {
    player.runCommand(
      `titleraw @s subtitle {"rawtext": [ { "text": ${subtitle} } ] }`,
    );
  }
  player.runCommand(`titleraw @s title {"rawtext": [ { "text": ${title} } ] }`);
}

const texts: Record<string, ActionBarText> = {};
const DEFAULT_PRIORITY = 50;

function onTick() {
  mc.system.runTimeout(onTick, 2);
  const now = new Date().getTime();
  for (const player of mc.world.getAllPlayers()) {
    const active: [string, number][] = [];
    for (const text of Array.from(Object.values(texts))) {
      if (text.expires !== undefined && text.expires < now) {
        delete texts[text.id];
        continue;
      }
      if (text.targets === undefined || text.targets.includes(player.name)) {
        active.push([text.text!, text.priority ?? DEFAULT_PRIORITY]);
      }
    }
    const final: string[] = [];
    for (const text of active.sort((a, b) => a[1] - b[1])) {
      final.push(text[0]);
    }
    player.runCommand(
      `titleraw @s actionbar {"rawtext": [ { "text": ${JSON.stringify(
        final.join('§r\n'),
      )} } ] }`,
    );
  }
}
