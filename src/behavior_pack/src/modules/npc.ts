
import * as mc from "@minecraft/server";

import { Args, NormalizedActor, NpcState, PositionTuple } from "../types/packTypes.js";
import { defineActions, Discussion } from "./discussion.js";
import { StartupEvent, STATE, timeout, TagMap, showErrorMessage } from '../lib.js';
import { NpcInitiated } from "../lib/runtimeState.js";
import { script } from "../script.js";

import * as formLib from '../lib/form.js';
import { DummyTagMap } from "../lib.js";

StartupEvent.addListener(syncNpcs);

defineActions({ CreateNpc, ManageNpcs, ResyncNpcs });

interface NpcForm { [key: string]: formLib.ModalFormWidget }
export const FormFields: Record<string, NpcForm> = {};

const dimensions = [
  mc.world.getDimension('overworld'),
  mc.world.getDimension('nether'),
  mc.world.getDimension('the_end'),
];

/** Ensures that the script has been applied to a bot */
async function syncNpcs() {
  mc.system.runTimeout(syncNpcs, 20 * 3);
  for (const dim of dimensions) {
    for (const entity of dim.getEntities({'families': ['hub_npc']})) {
      const tags = new TagMap(entity);
      const npcid = tags.getTag('npcid');
      if (npcid === undefined) {
        console.error('Unable to find npcid');
        continue;
      }
      if (NpcInitiated.has(npcid)) continue;
      NpcInitiated.add(npcid);
      const actorId = tags.get('actor');
      if (actorId === undefined) {
        console.error('Unable to find actor tag for npc: ', npcid);
        continue;
      }
      const actor = script.actors[actorId];
      if (actor === undefined) {
        console.error('Unable to find actor definition: ', actorId);
        continue;
      }
      const results: Record<string, mc.CommandResult|null> = {};
      results['dialogue'] = await dim.runCommandAsync(
        `dialogue change @e[tag="${npcid}"] ${actor.scene as string}`);
      await timeout(1);
      if (actor.scale !== undefined) {
        results['scale'] = await dim.runCommandAsync(
          `event entity @e[tag="${npcid}"] hub:npc_scale_${actor.scale}`);
        await timeout(1);
      }
      if (actor.skin !== undefined) {
        results['skin'] = await dim.runCommandAsync(
          `event entity @e[tag="${npcid}"] hub:npc_skin_${actor.skin}`);
        await timeout(1);
      }

      console.info(`Synced NPC ${npcid}: ${
        Object.entries(results).map(([k, v]) => `${k}: ${v?.successCount}`).join(', ')
      }`);
    }
  }
}

interface TickingAreaHandle {
  id: string,
  dimension: mc.Dimension,
}
async function createTickingArea(loc: PositionTuple, radius=1): Promise<TickingAreaHandle> {
  const id = `hub__${new Date().getTime()}`;
  const dimension = mc.world.getDimension(loc[0]);
  await dimension.runCommandAsync(
    `tickingarea add circle ${loc.slice(1).join(' ')} ${radius} ${id}`);
  await timeout(10);
  return {id, dimension};
}

async function removeTickingArea(handle: TickingAreaHandle) {
  await handle.dimension.runCommandAsync(`tickingarea remove  ${handle.id}`);
  await timeout(10);
}

async function loadEntities(loc: PositionTuple, filter: mc.EntityQueryOptions,
                            callback: (entities: mc.Entity[]) => void|Promise<void>) {
  const tickingArea = await createTickingArea(loc);
  try {
    const dimension = mc.world.getDimension(loc[0]);
    await callback(dimension.getEntities(filter));
  } finally {
    await removeTickingArea(tickingArea);
  }
}

async function loadNpc(loc: PositionTuple, id: string,
                        callback: (entity: mc.Entity) => void|Promise<void>) {
  let loaded = false;
  await loadEntities(loc,  {families: ['hub_npc'], tags: [id]}, async entities => {
    if (entities.length === 0) {
      return console.error('Received no entities for id: ', id);
    }
    if (entities.length > 1) {
      return console.error('Received multiple entities for id: ', id);
    }
    loaded = true;
    await callback(entities[0] as mc.Entity);
  });
  return loaded;
}

async function ResyncNpcs(d: Discussion) {
  NpcInitiated.clear();
}

/** New Bot  */
async function CreateNpc(d: Discussion) {
  const players = ['', ...STATE.getPlayers()];
  players.sort();

  const { results: res } = await formLib.ModalForm(d.player, 'Build-a-Bot', {
    role: formLib.dropdown(Object.keys(script.actors)),
    owner: formLib.dropdown(players),
    description: formLib.textbox('Optional'),
    x: formLib.textbox('', {defaultValue: d.player.location.x.toFixed()}),
    y: formLib.textbox('', {defaultValue: d.player.location.y.toFixed()}),
    z: formLib.textbox('', {defaultValue: d.player.location.z.toFixed()}),
  });
  if (res === undefined) return;

  const npc = d.player.dimension.spawnEntity('hub:npc', {
    x: Number(res.x.get()),
    y: Number(res.y.get()),
    z: Number(res.z.get()),
  });
  await timeout(5);

  const npcid = DummyTagMap.buildTag('npcid', String(new Date().getTime()));
  npc.addTag(npcid);
  npc.addTag(DummyTagMap.buildTag('actor', res.role.get()));
  npc.nameTag = script.actors[res.role.get()]!.name;
  STATE.addNpcs([{
    id: npcid,
    description: res.description.get(),
    owner: res.owner.get(),
    location: [npc.dimension.id, npc.location.x, npc.location.y, npc.location.z],
    role: res.role.get(),
  }]);
}

/** A menu for selecting bots for editing */
export async function ManageNpcs(d: Discussion, args: Args): Promise<void> {
  const isAdmin = args.admin === true;

  const buttons: formLib.ActionButton[] = [];  
  if (isAdmin) buttons.push({
    text: ' [ Create New NPC ] ', 
    action: async () => await CreateNpc(d)
  });

  for (const bot of STATE.getNpcs()) {
    let actor = script.actors[bot.role];
    if (actor === undefined) actor = {
      id: 'Unknown',
      name: 'Unknown',
      scene: '',
      roles: [],
    }
    if (isAdmin || (bot.owner === d.player.name)) {
      buttons.push({
        text: `${actor.name}: ${bot.role}${
          bot.description === '' ? '' : ` (${bot.description})`}`,
        action: async () => await editBot(d, isAdmin, bot),
      });
    }
  }
  let body = '';
  if (buttons.length === 0) {
    body = 'No bots found! :-(';
    buttons.push({text: 'Okay', action: () => {}});
  }
  await formLib.ActionForm(d.player, 'NPC Selection', '', buttons);
}

async function editBot(d: Discussion, isAdmin: boolean, npc: NpcState) {
  const actor = script.actors[npc.role] as NormalizedActor|undefined;
  if (actor === undefined) {
    return showErrorMessage(d.player, `Error finding npc role: "${npc.role}" not found`);
  }

  const form = {
    role: formLib.dropdown(Object.keys(script.actors), {show: isAdmin, defaultValue: npc.role}),
    description: formLib.textbox('Optional', {defaultValue: npc.description}),
    summon: formLib.toggle({defaultValue: false}),
    delete: formLib.toggle({defaultValue: false, show: isAdmin}),
    resync: formLib.toggle({defaultValue: false, show: isAdmin}),
    owner: formLib.dropdown(['', ...STATE.getPlayers()], {defaultValue: npc.owner, show: isAdmin})
  }
  const additional: NpcForm = {};
  for (const role of actor.roles) {
    const fields = FormFields[role];
    if (fields === undefined) continue;
    const npcSettings = (npc.extra ?? {})[role] ?? {};
    for (const [key, widget] of Object.entries(fields)) {
      widget.options.defaultValue = npcSettings[key] ?? widget.options.defaultValue;
      additional[`${role}:${key}`] = widget;
    }
  }

  const { results } = await formLib.ModalForm(d.player, 'Edit Bot', Object.assign(form, additional));
  if (results === undefined) return;

  if (isAdmin) {
    if (results.delete.get()) {
      STATE.rmNpc(npc.id);
      const success = await loadNpc(npc.location, npc.id, entity => {
        entity.kill();
      });
      if (!success) showErrorMessage(d.player, 'Failed to kill bot.');
    }
    if (results.resync.get()) {
      NpcInitiated.delete(npc.id);
    }
    
    npc.owner = results.owner.get()
  }
  if (results.role.isSet() && results.role.get() !== npc.role) {
    const actor = script.actors[results.role.get()]!;
    npc.role = actor.id;
  }
  npc.description = results.description.get();

  // handle extended settings
  for (const [key, result] of Object.entries(results)) {
    const index = key.indexOf(':');
    if (index === -1) continue;
    const role = key.slice(0, index);
    const setting = key.slice(index + 1);
    let extra = npc.extra;
    if (extra === undefined) {
      extra = {};
      npc.extra = extra;
    }
    let roleSetting = extra[role];
    if (roleSetting === undefined) {
      roleSetting = {};
      extra[role] = roleSetting;
    }
    roleSetting[setting] = result.value;
  }

  if (results.summon.get()) {
    let commandResult: mc.CommandResult = {successCount: 0};
    const loaded = await loadNpc(npc.location, npc.id, async (entity) => {
      commandResult = await entity.dimension.runCommandAsync(
        `tp @e[tag="${npc.id}"] "${d.player.name}"`);
    })
    if (!loaded || commandResult.successCount !== 1) {
      await showErrorMessage(d.player, `Unable to summon bot: ${
        loaded ? 'Failed to execute command' : 'Failed to load ticking area'}: (${loaded} / ${commandResult.successCount}`);
    }
    npc.location = [d.player.dimension.id, d.player.location.x, d.player.location.y, d.player.location.z];
  }
  STATE.addNpcs([npc])
  NpcInitiated.delete(npc.id);
}
