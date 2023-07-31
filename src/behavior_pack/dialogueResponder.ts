import { system, world, Entity, Player } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { dialogueMap } from './dialogueMap.js';
import * as C from './constants.js';

function poll() {
  system.runTimeout(poll, 5);
  for (const p of world.getAllPlayers()) {
    if (p.hasTag(C.TAG_PENDING)) {
      p.removeTag(C.TAG_PENDING);
      const tags = [];
      for (const t of p.getTags()) {
        if (t.startsWith(C.TAG_PREFIX)) {
          tags.push(t);
          p.removeTag(t);
        }
      }
      if (tags.length === 1) return replyToTag(p, tags[0]);

      // if != 1, something broke, let the player try again
      console.warn(`Unexpected fonnd tag result: ${JSON.stringify(tags)}`);
    }
  }
}

function replyToTag(p: Player, tag: string) {
  const response = dialogueMap[tag];
  if (response === undefined) {
    console.warn('Failed to find response: ', tag);
  }

  if (response.action !== undefined) {
    respondAction(p, response.action);
  } else if (response.command !== undefined) {
    respondCommand(p, response.command)
  } else if (response.scene !== undefined) {
    respondScene(p, response.scene);
  }
}

async function respondCommand(p: Player, command: string) {
  command = command.replace(/\b@p\b/, p.name);
  const res = await p.dimension.runCommandAsync(command);
  if (res.successCount === 0) {
    console.warn(`Possibly failed to execute command? ${command}`);
  }
}

async function respondScene(p: Player, scene: string) {
  const command = `/exeute at @s as ${p.name} dialogue open @e[type=NPC,c=1] @s ${scene}`
  respondCommand(p, command);
}

async function respondAction(p: Player, action: string) {
  const actionFunc = actions[action];
  if (actionFunc === undefined) {
    return console.warn(`Missing action: ${action}`);
  }
  actionFunc(p);
}

const actions: {[action: string]: (p: Player) => Promise<void>} = {
  DBSH_Time: async (p: Player) => {
    const form = new ui.ActionFormData()
      .title('Time o\'clock!')
      .body(`The current time is ${new Date().toString()}`)
      .button('And now?');
    const resp = await form.show(p);
    if (resp.selection === 1) {
      actions.DBSH_Time(p);
    }
  }
}