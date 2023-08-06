
import { world, system } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { Args, BotState, BotType } from "./types/packTypes.js";
import { Discussion } from "./dialogue/discussion.js";
import { getFormResponse, StartupEvent, STATE, timeout, strip } from './lib.js';
import { ID_TAG, SEP, TAG_PREFIX } from "./lib/constants.js";
import { BotInitiated, BotIsOnline } from "./lib/runtimeState.js";
import { script } from "./dialogue/script.js";

StartupEvent.addListener(updateBots);

Object.assign(Discussion.actions, { TeleBotTravel, CreateBot, UpdateBot });

async function updateBots() {
  system.runTimeout(updateBots, 20 * 30);
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

      for (const actor of script.actors) {
        if (actor.name === bot.name || (actor.tag !== undefined && entity.hasTag(actor.tag))) {
          console.info('Initiated bot:', bot.id, JSON.stringify(actor));
          BotInitiated.add(bot.id);
          await dimension.runCommandAsync(
            `dialogue change @e[tag="${bot.id}"] ${TAG_PREFIX}_${actor.scene}`);
        }
      }

    } catch(e: unknown) {
      console.error(e);
    } finally {
      await unloadBot(bot);
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
    return await getFormResponse(d.player, popup);
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
  const type = types[typeId];
  const id_tag = `${ ID_TAG }${ SEP }${ new Date().getTime() }`;

  const bot = d.player.dimension.spawnEntity('minecraft:npc', d.player.location);
  await timeout(20);
  bot.addTag(id_tag);
  bot.addTag(`${TAG_PREFIX}_BotType${SEP}${type}`)
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
export async function UpdateBot(d: Discussion, args: Args) {
  const bots: BotState[] = [];

  const form = new ui.ActionFormData().title('Bot Selection');
  for (const bot of STATE.getBots()) {
    if (args.admin === true || (bot.owner === d.player.name)) {
      bots.push(bot);
      form.button(bot.name);
    }
  }
  if (bots.length === 0) {
    form.body('No bots found! :-(').button('Okay');
    return await getFormResponse(d.player, form);
  }
  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  const bot = bots[res.selection] as BotState;
  let [x, y, z] = bot.offset ?? [0, 0, 0]
  
  const editForm = new ui.ModalFormData()
    .title('Edit Bot')
    .textField('Name', 'Display Name', bot.name)
    .toggle('Summon', false)
    .slider('X Offset', -5, 5, 1, x)
    .slider('Y Offset', -5, 5, 1, y)
    .slider('Z Offset', -5, 5, 1, z);

  const players = ['No Change', '', ...STATE.getPlayers()];
  if (args.admin === true) editForm.dropdown('Owner', players);

  const editRes = await getFormResponse(d.player, editForm);
  if (editRes.formValues === undefined) return;
  let [newName, summon, xOff, yOff, zOff] = editRes.formValues as [
    string, boolean, number, number, number];
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
        return getFormResponse(d.player, new ui.MessageFormData()
          .title('Error').body('Bot name already taken!').button1('Oops.'));
      }
    }
  }
  bot.offset = [xOff, yOff, zOff];
  const entity = await loadBot(bot);
  let unloaded = false;
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
    if (!unloaded) await unloadBot(bot);
  }
}
