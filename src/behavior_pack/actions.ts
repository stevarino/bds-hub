/**
 * Actions - Programmed dialogue acitons
 */
import { Enchantment, EntityInventoryComponent, ItemEnchantsComponent, ItemStack, world } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { getEntityTags, getFormResponse, padToWidth, request } from "./lib.js";
import * as types from '../types/packTypes.js';
import { Discussion } from "./discussion.js";
import { strip } from "../functions.js";
import { DIMENSION, ID_TAG, TELEBOT_TAG } from "./constants.js";

Object.assign(Discussion.actions, {
  Time, InventoryInspect, BlocksBroken, BlocksPlaced, Menu, Teleport, Give
});

async function Menu(d: Discussion, menu: types.MenuDetails) {
  console.log(`OP: ${d.player.name} ${d.player.isOp()}`);
  const form = new ui.ActionFormData().title(menu.title);
  if (menu.body !== undefined) form.body(menu.body);
  const btnActions: types.SuperButton[] = [];
  for (const btn of menu.buttons) {
    if (btn.requireOp === true && !d.player.isOp()) continue;
    form.button(btn.text);
    btnActions.push(btn);
  }
  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  const action = btnActions[res.selection]
  if (action === undefined) return;
  d.navigate(action);
}

async function Time(d: Discussion) {
  let cnt = d.get('timeActions', 0) + 1;
  d.set('timeActions', cnt);
  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      The current time is ${new Date().toString()}.

      You have asked me ${cnt} times.
      ---
    `))
    .button('And now?')
    .button('Back.');
  const resp = await getFormResponse(d.player, form);
  if (resp.selection === 0) {
    Time(d);
  } else if (resp.selection === 1) {
    d.back();
  }
}

async function InventoryInspect(d: Discussion) {
  const component = d.player.getComponent('minecraft:inventory') as EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const test = new ItemStack('minecraft:red_mushroom_block', 1);

  const items: string[] = [];
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    if (item === undefined) {
      JSON.stringify({index: i, type: undefined});
      continue;
    }
    const enchantments = item.getComponent('minecraft:enchantments') as ItemEnchantsComponent|undefined;
    const enchantmentList: {[key: string]: number} = {};
    if (enchantments !== undefined) {
      for (const e of enchantments.enchantments) {
        enchantmentList[e.type.id] = e.level;
      }
    }
    items.push(JSON.stringify({
      index: i,
      type: item.typeId,
      nameTag: item?.nameTag,
      amount: item?.amount,
      tags: item?.getTags(),
      components: item?.getComponents().map(c => c.typeId),
      stackableTest: item?.isStackableWith(test),
      enchantments: enchantmentList,
    }, undefined, 2));
  }
  await getFormResponse(d.player, new ui.ActionFormData()
    .title('Inventory Inspector')
    .body(strip(items.join('\n\n')))
    .button('Thanks!'));
}

/** 
 * (Op function) Displays a menu of teleport targets (players/npc's) and teleports the
 * player to the selected target.
*/
async function Teleport(d: Discussion, args: types.Args) {
  const targets = [];
  const form = new ui.ActionFormData().title('Teleport to:');
  for (const p of world.getAllPlayers()) {
    targets.push(`"${p.name}"`);
    form.button(`Player: ${p.name}`);
  }

  for (const dimension of Object.values(DIMENSION)) {
    const dim = world.getDimension(dimension);
    for (const bot of dim.getEntities({type: 'minecraft:npc', tags: [TELEBOT_TAG]})) {
      const tags = getEntityTags(bot);
      if (tags[ID_TAG] !== undefined) {
        targets.push(`@e[tag="${tags[ID_TAG][0]}"]`);
        form.button(`Bot: ${bot.nameTag}`);
      }
    }
  }

  const res = await getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  d.player.dimension.runCommand(`teleport "${d.player.name}" ${targets[res.selection]}`)
}

async function Give(d: Discussion, args: types.GiveArgs) {
  const stack = new ItemStack(args.item, args.qty ?? 1);
  if (args.lore !== undefined) stack.setLore(args.lore);
  if (args.nameTag !== undefined) stack.nameTag = args.nameTag;
  const entity = d.player.dimension.spawnItem(stack, d.player.location);
  for (const tag of args.tags ?? []) {
    entity.addTag(tag);
  }
  for (const [enchantment, level] of Object.entries(args.enchantments ?? {})) {
    new Enchantment(enchantment, level)
  }
}


/***************************************************************
 * Block place/break stats
 **************************************************************/
type StatsQuery = {field: number, sort: 'object'|'qty', action: string, title: string};

function getLines(result?: Partial<types.Event>[]) {
  const lines: string[] = [];
  let total = 0;

  function justify(row: {object?: string, qty?: number}) {
    return (
      padToWidth((row.object ?? 'error').replace('minecraft:', '') + ': ', 146, '.') +
      padToWidth(' ' + String(row.qty), 48, '.', true));
  }

  for (const row of result ?? []) {
    total += row.qty ?? 0;
    lines.push(justify(row));
  }
  lines.unshift(justify({object: 'Total', qty: total}));
  return lines;
}

async function BlocksBroken(d: Discussion, args: types.Args) {
  const query: StatsQuery = {
    field: types.Actions.breakBlock,
    sort: (args.sort ?? 'object') as 'object'|'qty',
    action: 'DBSH_Broken',
    title: 'Blocks Broken',
  };
  showBlockStats(d, query);
}

async function BlocksPlaced(d: Discussion, args: types.Args) {
  const query: StatsQuery = {
    field: types.Actions.placeBlock,
    sort: (args.sort ?? 'object') as 'object'|'qty',
    action: 'DBSH_Placed',
    title: 'Blocks Placed',
  };
  showBlockStats(d, query);
}

async function showBlockStats(d: Discussion, args: StatsQuery) {
  const label: Record<string, string> = { object: 'block', qty: 'count' };
  const query: types.EventRequest = {
    select: ['object', 'qty'],
    where: {
      entity: d.player.name,
      action: String(args.field),
    },
    order: [args.sort],
  };
  const res = await request<types.Event[]>('/events', query);
  const form = new ui.ActionFormData()
    .title(args.title)
    .body(getLines(res).join('\n') + '\n')
    .button(`Sorted by ${label[args.sort]}`);
  const resp = await getFormResponse(d.player, form);
  if (resp.selection === 0) {
    args.sort = args.sort == 'object' ? 'qty' : 'object';
    showBlockStats(d, args);
  }
}
