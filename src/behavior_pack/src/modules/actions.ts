/**
 * Actions - Programmed dialogue acitons
 */
import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import * as lib from "../lib.js";
import * as types from '../types/packTypes.js';
import { defineActions, Discussion } from "./discussion.js";
import { Events } from "../lib.js";

defineActions({
  Time, InventoryInspect, BlocksBroken, BlocksPlaced, Teleport,
  Menu, Give });

async function Menu(d: Discussion, args: types.Args) {
  const menu = args as unknown as types.MenuDetails;
  const form = new ui.ActionFormData().title(menu.title);
  if (menu.body !== undefined) form.body(menu.body);
  const btnActions: types.SuperButton[] = [];
  for (const btn of menu.buttons) {
    if (btn.require_tag !== undefined && !d.player.hasTag(btn.require_tag)) continue;
    form.button(btn.text);
    btnActions.push(btn);
  }
  const res = await lib.getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  const action = btnActions[res.selection];
  if (action === undefined) return;
  d.handleTransition(action);
}

async function Time(d: Discussion) {
  let cnt = d.get('timeActions', 0) + 1;
  d.set('timeActions', cnt);
  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(lib.strip(`
      The current time is ${new Date().toString()}.

      You have asked me ${cnt} times.
      ---
    `))
    .button('And now?')
  const resp = await lib.getFormResponse(d.player, form);
  if (resp.selection === 0) {
    Time(d);
  }
}

async function InventoryInspect(d: Discussion) {
  const component = d.player.getComponent('minecraft:inventory') as mc.EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const test = new mc.ItemStack('minecraft:red_mushroom_block', 1);

  const items: string[] = [];
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    if (item === undefined) {
      JSON.stringify({index: i, type: undefined});
      continue;
    }
    const enchantments = item.getComponent('minecraft:enchantments') as mc.ItemEnchantsComponent|undefined;
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
  await lib.getFormResponse(d.player, new ui.ActionFormData()
    .title('Inventory Inspector')
    .body(lib.strip(items.join('\n\n')))
    .button('Thanks!'));
}

/** 
 * (Op function) Displays a menu of teleport targets (players/npc's) and teleports the
 * player to the selected target.
*/
async function Teleport(d: Discussion, args: types.Args) {
  const targets = [];
  const form = new ui.ActionFormData().title('Teleport to:');
  for (const p of mc.world.getAllPlayers()) {
    targets.push(`"${p.name}"`);
    form.button(`Player: ${p.name}`);
  }

  // for (const npc of lib.STATE.getNpcs()) {
  //   targets.push(`@e[tag="${npc.id}"]`);
  //   form.button(`NPC: ${npc.name}}`)
  // }

  const res = await lib.getFormResponse(d.player, form);
  if (res.selection === undefined) return;
  await d.player.dimension.runCommand(`teleport "${d.player.name}" ${targets[res.selection]}`)
}

async function Give(d: Discussion, args: types.Args) {
  const giveArgs = args as unknown as types.GiveArgs;
  const stack = new mc.ItemStack(giveArgs.item, giveArgs.qty ?? 1);
  let enchants = stack.getComponent("minecraft:enchantments") as mc.ItemEnchantsComponent;
  if (giveArgs.lore !== undefined) stack.setLore(giveArgs.lore);
  if (giveArgs.name !== undefined) stack.nameTag = giveArgs.name;
  const entity = d.player.dimension.spawnItem(stack, d.player.location);
  for (const [enchantment, level] of Object.entries(giveArgs.enchantments ?? {})) {
    enchants.enchantments.addEnchantment(
      new mc.Enchantment(enchantment, level));
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
      lib.padToWidth((row.object ?? 'error').replace('minecraft:', '') + ': ', 146, '.') +
      lib.padToWidth(' ' + String(row.qty), 48, '.', true));
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
    action: 'BlocksBroken',
    title: 'Blocks Broken',
  };
  await showBlockStats(d, query);
}

async function BlocksPlaced(d: Discussion, args: types.Args) {
  const query: StatsQuery = {
    field: types.Actions.placeBlock,
    sort: (args.sort ?? 'object') as 'object'|'qty',
    action: 'BlocksPlaced',
    title: 'Blocks Placed',
  };
  await showBlockStats(d, query);
}

async function showBlockStats(d: Discussion, args: StatsQuery) {
  const label: Record<string, string> = { object: 'block', qty: 'count' };
  const res = await Events.request({
    select: ['object', 'qty'],
    where: {
      entity: d.player.name,
      action: String(args.field),
    },
    order: [args.sort],
  });
  
  const form = new ui.ActionFormData()
    .title(args.title)
    .body(getLines(res.events).join('\n') + '\n')
    .button(`Sorted by ${label[args.sort]}`);
  const resp = await lib.getFormResponse(d.player, form);
  if (resp.selection === 0) {
    args.sort = args.sort == 'object' ? 'qty' : 'object';
    await showBlockStats(d, args);
  }
}
