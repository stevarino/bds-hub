
import { world, system, Entity } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { Args, BotState, BotType } from "./types/packTypes.js";
import { defineActions, Discussion } from "./dialogue/discussion.js";
import { getFormResponse, StartupEvent, STATE, timeout, strip } from './lib.js';
import { ID, TAG_PREFIX } from "./lib/constants.js";
import { ActorBotMap, BotInitiated, BotIsOnline } from "./lib/runtimeState.js";
import { script } from "./dialogue/script.js";

StartupEvent.addListener(syncBots);

defineActions({ TeleBotTravel, CreateBot, ManageBots, ResyncBots });

/** Ensures that the script has been applied to a bot */
async function syncBots() {
  system.runTimeout(syncBots, 20 * 10);
  for (const bot of STATE.getBots()) {
    const dimension = world.getDimension(bot.location[0]);
    const entity = await loadBot(bot);
    try {
      if (entity === undefined) {
        BotIsOnline[bot.id] = false;
        continue;
      }
      BotIsOnline[bot.id] = true;
      if (BotInitiated.has(bot.id)) {
        continue;
      }

      if (bot.tags === undefined) {
        bot.tags = entity.getTags();
      } else {
        syncBotTags(bot, entity)
      }
      let actorHash: string|undefined = undefined;
      for (const actor of script.actors) {
        if (actor.name === bot.name || (actor.tag !== undefined && entity.hasTag(actor.tag))) {
          BotInitiated.add(bot.id);
          const result = await dimension.runCommandAsync(
            `dialogue change @e[tag="${bot.id}"] ${ID('SCENE', actor.scene)}`);
          actorHash = actor._hash;
          console.info(`Initiated bot: ${bot.id} (${result.successCount}): ${JSON.stringify(actor)}`);
        }
      }
      if (actorHash !== undefined) { 
        if (ActorBotMap[actorHash] === undefined) {
          ActorBotMap[actorHash] = [];
        }
        ActorBotMap[actorHash]?.push(bot.id);
      }

    } catch(e: unknown) {
      console.error(e);
    } finally {
      await unloadBot(bot);
    }
  }
}

function syncBotTags(bot: BotState, entity: Entity) {
  const intent = new Set(bot.tags);
  const live = new Set(entity.getTags());
  for (const tag of live) {
    if (!intent.has(tag)) {
      entity.removeTag(tag);
    }
  }
  for (const tag of intent) {
    if (!live.has(tag)) {
      entity.addTag(tag);
    }
  }
}

async function loadBot(bot: BotState) {
  const dimension = world.getDimension(bot.location[0]);
  await dimension.runCommandAsync(
    `tickingarea add circle ${bot.location.slice(1).join(' ')} 1 ${TAG_PREFIX}_LOAD_${bot.id}`);
  await timeout(10);
  const bots = dimension.getEntities({type: 'minecraft:npc', tags: [bot.id]});
  return bots[0];
}

async function unloadBot(bot: BotState) {
  const dimension = world.getDimension(bot.location[0]);
  await dimension.runCommandAsync(`tickingarea remove "bot_loader"`);
  await timeout(10);
}

async function ResyncBots(d: Discussion) {
  BotInitiated.clear();
}

/** Shows user a list of TeleBots to select from for teleporting */
async function TeleBotTravel(d: Discussion) {
  const form = new ui.ActionFormData().title('Choose a Destination');
  const bots = [];
  for (const bot of STATE.getBots()) {
    if (bot.type === BotType.TeleBot) {
      form.button(`${bot.name}${ BotIsOnline[bot.id] ? '' : ' (§ooffline§r)'}`);
      bots.push(bot);
    }
  }
  if (bots.length === 0) {
    const popup = new ui.MessageFormData()
      .title('BOT 404 NOT FOUND')
      .body('Oh no! Could not load any telebots...')
      .button1('Okay :-(');
    await getFormResponse(d.player, popup);
    return;
  }
  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  TeleportUserToBot(d, bots[res.selection] as BotState);
}

async function TeleportUserToBot(d: Discussion, bot: BotState) {
  if (bot === undefined) return;
  await loadBot(bot);
  const [x,y,z] = bot.offset ?? [0,0,0];
  await d.handleTransition({
    sequence: [
      { command: `execute at @e[tag="${bot.id}"] run teleport "${d.player.name}" ~${x} ~${y} ~${z}` },
      { wait: 5 },
      { sound: 'beacon.power', pitch: 2 },
    ]
  })
  await unloadBot(bot);
}

/** New Bot  */
async function CreateBot(d: Discussion) {
  const players = ['', ...STATE.getPlayers()];
  const types = Array.from(Object.keys(BotType));
  players.sort();
  const form = new ui.ModalFormData()
    .title('Create a TeleBot')
    .textField('Name', 'Display Name')
    .textField('Tags', 'Space Seperated')
    .dropdown('Owner', players)
    .dropdown('Type', types);

  const res = await getFormResponse(d.player, form);
  if (res.formValues === undefined) return;
  let [name, tags, ownerId, typeId] = res.formValues as [string, string, number, number];
  const owner = players[ownerId] as string;
  const type = types[typeId] as string;
  const id_tag = ID('BOT', 'ID', String(new Date().getTime()));

  const bot = d.player.dimension.spawnEntity('minecraft:npc', d.player.location);
  await timeout(20);
  bot.addTag(id_tag);
  bot.addTag(ID('BOT', 'TYPE', type))
  for (const tag of tags.split(' ')) {
    bot.addTag(tag);
  }
  STATE.addBots([{
    id: id_tag,
    name: name,
    owner: owner,
    location: [bot.dimension.id, bot.location.x, bot.location.y, bot.location.z],
    type: type as BotType,
  }]);
}

/** A menu for selecting bots for editing */
export async function ManageBots(d: Discussion, args: Args): Promise<void> {
  const bots: BotState[] = [];

  const form = new ui.ActionFormData().title('Bot Selection');
  if (args.admin === true) form.button(' [ Create New Bot ]');

  for (const bot of STATE.getBots()) {
    if (args.admin === true || (bot.owner === d.player.name)) {
      bots.push(bot);
      form.button(bot.name);
    }
  }
  if (bots.length === 0) {
    form.body('No bots found! :-(').button('Okay');
    await getFormResponse(d.player, form);
    return;
  }
  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  let selection = res.selection;
  if (args.admin === true) {
    selection = selection - 1;
  }
  if (selection === -1) {
    await CreateBot(d);
    return;
  }
  const bot = bots[selection] as BotState;
  let [x, y, z] = bot.offset ?? [0, 0, 0]
  
  const editForm = new ui.ModalFormData().title('Edit Bot')
    .textField('Name', 'Display Name', bot.name)
    .toggle('Summon', false)
    .slider('X Offset', -5, 5, 1, x)
    .slider('Y Offset', -5, 5, 1, y)
    .slider('Z Offset', -5, 5, 1, z);

  if (args.admin === true) {
    editForm.textField('Tags', 'Space Separated', (bot.tags ?? []).join(' '));
    editForm.toggle('Delete', false);
    editForm.toggle('Resync', false);
  }
  const players = ['No Change', '', ...STATE.getPlayers()];
  if (args.admin === true) editForm.dropdown('Owner', players);

  const editRes = await getFormResponse(d.player, editForm);
  if (editRes.formValues === undefined) return;
  let newName = editRes.formValues.shift() as string;
  let summon = editRes.formValues.shift() as boolean;
  let xOff = editRes.formValues.shift() as number;
  let yOff = editRes.formValues.shift() as number;
  let zOff = editRes.formValues.shift() as number;
  const entity = await loadBot(bot);
  let unloaded = false;
  try {
    if (args.admin) {
      let tags = editRes.formValues.shift() as string;
      let del = editRes.formValues.shift() as boolean;
      let resync = editRes.formValues.shift() as boolean;
      if (del) {
        STATE.rmBot(bot.id);
        const entity = await loadBot(bot);
        try {
          entity?.kill()
          return;
        } finally {
          unloadBot(bot);
        }
      }
      if (tags !== '') {
        bot.tags = tags.split(' ');
        if (entity !== undefined) {
          syncBotTags(bot, entity);
        }
      }
      if (resync) {
        BotInitiated.delete(bot.id);
      }
    }
    if (args.admin === true) {
      const owner = editRes.formValues[editRes.formValues.length - 1] as number;
      if (owner > 0) {
        bot.owner = players[owner];
      }
    }
    if (newName !== bot.name) {
      newName = strip(newName);
      for (const b of STATE.getBots()) {
        if (b.id !== bot.id && b.name === newName) {
          getFormResponse(d.player, new ui.MessageFormData()
            .title('Error').body('Bot name already taken!').button1('Oops.'));
          return;
        }
      }
    }
    bot.offset = [xOff, yOff, zOff];
    if (entity !== undefined) {
      entity.nameTag = newName;
      bot.name = newName;
      if (summon) {
        await loadBot(bot);
        const result = await entity.dimension.runCommandAsync(
          `tp @e[tag="${bot.id}"] "${d.player.name}"`);
        await unloadBot(bot);
        unloaded = true;
        bot.location = [entity.dimension.id, entity.location.x, entity.location.y, entity.location.z];
      }
      STATE.save();
    }
  } finally {
    if (!unloaded) await unloadBot(bot);
  }
}
