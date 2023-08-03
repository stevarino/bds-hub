/**
 * Actions - Programmed dialogue acitons
 */
import { system, EntityInventoryComponent, ItemStack } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

import { padToWidth, request } from "./lib.js";
import * as types from '../types/packTypes.js';
import { Discussion } from "./discussion.js";
import { strip } from "../functions.js";
import { DELAY } from "./constants.js";

Object.assign(Discussion.actions, {
  DBSH_Time, Trader, Trader2, DBSH_Broken, DBSH_Placed,
});

async function DBSH_Time(d: Discussion) {
  let cnt = d.get('timeActions', 0) + 1;
  d.set('timeActions', cnt);
  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      The current time is ${new Date().toString()}.

      You have asked me ${cnt} times.

      ${d.player.getComponents().map(c => c.typeId).join('\n')}
      ---
    `))
    .button('And now?')
    .button('Back.');
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
    if (resp.selection === 0) {
      DBSH_Time(d);
    } else if (resp.selection === 1) {
      d.back();
    }
  }, DELAY);
}

async function Trader(d: Discussion, args: types.Args) {
  // if (!Array.isArray(args.types)) {
  //   return console.error(`Missing types for Trade: ${JSON.stringify(args)}`);
  // }

  const component = d.player.getComponent('minecraft:inventory') as EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(`
      containerType: ${component.containerType}
      invenorySize: ${component.inventorySize}
      private: ${component.private}
      restrictToOwner: ${component.restrictToOwner}

      emptySlotsCount: ${component.container.emptySlotsCount}
      size: ${component.container.size}
    `))
    .button('Get items?')
    .button('Back.');
    system.runTimeout(async () => {
      const resp = await form.show(d.player);
      if (resp.selection === 0) {
        d.navigate({action: 'Trader2'})
      } else if (resp.selection === 1) {
        d.back();
      }
    }, DELAY);
}


async function Trader2(d: Discussion, args: types.Args) {
  const component = d.player.getComponent('minecraft:inventory') as EntityInventoryComponent|undefined;
  if (component === undefined) {
    return console.error('Failed to fetch inventory!?!');
  }

  const test = new ItemStack('minecraft:red_mushroom_block', 1);

  const items: string[] = [];
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    items.push(`${i}: ${item?.typeId} (${item?.nameTag}) ${item?.amount} ${JSON.stringify(item?.getTags())} ${
      item?.getComponents().map(c => c.typeId).join(';')
    }  {${
      //@ts-ignore
      item?.isStackableWith(test)}}`);
  }

  const form = new ui.ActionFormData()
    .title('Time o\'clock!')
    .body(strip(items.join('\n\n')))
    .button('Get items?')
    .button('Back.');
    system.runTimeout(async () => {
      const resp = await form.show(d.player);
      if (resp.selection === 0) {
        d.navigate({action: 'Trader2'})
      } else if (resp.selection === 1) {
        d.back();
      }
    }, DELAY);  
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

async function DBSH_Broken(d: Discussion, args: types.Args) {
  const query: StatsQuery = {
    field: types.Actions.breakBlock,
    sort: (args.sort ?? 'object') as 'object'|'qty',
    action: 'DBSH_Broken',
    title: 'Blocks Broken',
  };
  showBlockStats(d, query);
}

async function DBSH_Placed(d: Discussion, args: types.Args) {
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
  system.runTimeout(async () => {
    const resp = await form.show(d.player);
    if (resp.selection === 0) {
      args.sort = args.sort == 'object' ? 'qty' : 'object';
      d.navigate({ action: 'DBSH_Broken', args });
    }
  }, DELAY);
}