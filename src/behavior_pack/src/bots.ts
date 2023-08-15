
import { world, system, Entity } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { Args, BotState, BotType } from "./types/packTypes.js";
import { defineActions, Discussion } from "./dialogue/discussion.js";
import { getFormResponse, StartupEvent, STATE, timeout, strip } from './lib.js';
import { BOT_ID_PREFIX, BOT_TYPE_PREFIX, ID, TAG_PREFIX } from "./lib/constants.js";
import { ActorBotMap, BotInitiated, BotIsOnline } from "./lib/runtimeState.js";
import { script } from "./script.js";

import * as formLib from './lib/form.js';

StartupEvent.addListener(syncBots);

defineActions({ TeleBotTravel, CreateBot, ManageBots, ResyncBots });

const unsyncedBots = new Set<string>();

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
      } else if (!unsyncedBots.has(bot.id)) {
        unsyncedBots.add(bot.id);
        console.warn('Missing script for bot: ', bot.id)
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

  const { results: res } = await formLib.show(d.player, 'Build-a-Bot', {
    name: formLib.textbox('Display Name'),
    tags: formLib.textbox('Space Seperated'),
    owner: formLib.dropdown(players),
    type: formLib.dropdown(types),
  });
  if (res === undefined) return;
  
  const id_tag = BOT_ID_PREFIX + String(new Date().getTime());

  const bot = d.player.dimension.spawnEntity('minecraft:npc', d.player.location);
  await timeout(20);
  bot.addTag(id_tag);
  bot.addTag(BOT_TYPE_PREFIX + res.type.get());
  for (const tag of res.tags.get().split(' ')) {
    if (tag !== '') {
      bot.addTag(tag);
    }
  }
  let name = res.name.get();
  if (name === '') {
    let i = 0;
    const names = STATE.getBots().map(s => s.name);
    while (name === '' || names.includes(name)) {
      i += 1;
      name = `Untitled Bot(${i})`;
    }
  }
  await timeout(20);
  STATE.addBots([{
    id: id_tag,
    name: name,
    owner: res.owner.get(),
    location: [bot.dimension.id, bot.location.x, bot.location.y, bot.location.z],
    type: res.type.get() as BotType,
  }]);
}

/** A menu for selecting bots for editing */
export async function ManageBots(d: Discussion, args: Args): Promise<void> {
  const bots: BotState[] = [];
  const isAdmin = args.admin === true;

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
  editBot(d, isAdmin, bots[selection] as BotState);
}

async function editBot(d: Discussion, isAdmin: boolean, bot: BotState) {
  let [x, y, z] = bot.offset ?? [0, 0, 0]

  const {results: form} = await formLib.show(d.player, 'Edit Bot', {
    name: formLib.textbox('Display Name', {defaultValue: bot.name}),
    summon: formLib.toggle({defaultValue: false}),
    x: formLib.slider(-5, 5, {displayName: 'X Offset', defaultValue: x}),
    y: formLib.slider(-5, 5, {displayName: 'Y Offset', defaultValue: y}),
    z: formLib.slider(-5, 5, {displayName: 'Z Offset', defaultValue: z}),
    tags: formLib.textbox('Space Separated', {
      defaultValue: (bot.tags ?? []).join(' '),
      show: isAdmin,
    }),
    delete: formLib.toggle({defaultValue: false, show: isAdmin}),
    resync: formLib.toggle({defaultValue: false, show: isAdmin}),
    owner: formLib.dropdown(['', ...STATE.getPlayers()], {defaultValue: bot.owner, show: isAdmin})
  });

  if (form === undefined) return;

  const entity = await loadBot(bot);
  let unloaded = false;
  try {
    if (isAdmin) {
      if (form.delete.get()) {
        STATE.rmBot(bot.id);
        const entity = await loadBot(bot);
        try {
          entity?.kill()
          return;
        } finally {
          unloadBot(bot);
        }
      }
      if (form.tags.get() !== '') {
        bot.tags = form.tags.get().split(' ');
        if (entity !== undefined) {
          syncBotTags(bot, entity);
        }
      }
      if (form.resync.get()) {
        BotInitiated.delete(bot.id);
      }
      
      bot.owner = form.owner.get()
    }
    if (form.name.get() !== bot.name) {
      let newName = strip(form.name.get());
      for (const b of STATE.getBots()) {
        if (b.id !== bot.id && b.name === newName) {
          getFormResponse(d.player, new ui.MessageFormData()
            .title('Error').body('Bot name already taken!').button1('Oops.'));
          return;
        }
      }
    }
    bot.offset = [form.x.get(), form.y.get(), form.z.get()];
    if (entity !== undefined) {
      bot.name = strip(form.name.get());
      if (form.summon.get()) {
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
