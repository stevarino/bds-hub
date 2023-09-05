import mc, { ItemStack } from "@minecraft/server";

import { showErrorMessage, forms, showDialogMessage, strip } from '../lib.js';
import { TradeArray, TradeItem, TradeOffer, TraderArgs } from '../types/packTypes.js';
import { actionCallback, defineActions, Discussion, Args } from './discussion';

defineActions({ Trader, TraderOffer, TraderBrowse });

class InventoryMap extends Map<string, InventoryProps> {};
interface InventoryProps {
  total: number,
  slots: [slot: number, amount: number][]
};

type InventoryOperation = {
  maxTrades: number,
  inventory: {
    item: string,
    qty: number,
    cost: number,
    maxTrades: number,
    slots: number[],
  }[]
}

type AtLeastOneItem = [TradeItem, ...TradeItem[]];
type NormalizedTradeOffer = Omit<TradeOffer, "gives"|"accepts"> & {
  gives: AtLeastOneItem,
  accepts: AtLeastOneItem[],
}

type NormalizedTradeArgs = Omit<TraderArgs, "trades"> & {
  trades: NormalizedTradeOffer[]
}

function normalizeTradeOffer(args: unknown): NormalizedTradeOffer {
  const offer = args as TradeOffer;
  if (typeof offer.gives === 'string') {
    offer.gives = [{item: offer.gives}];
  } else {
    offer.gives = (offer.gives).map(item => {
      return typeof item === 'string' ? { item } : item
    }) as TradeArray;
  }
  
  if (typeof offer.accepts === 'string') {
    offer.accepts = [[{item: offer.accepts}]];
  } else {
    for (let i=0; i<offer.accepts.length; i++) {
      for (let j=0; j<offer.accepts[i]!.length; j++) {
        const item = offer.accepts[i]![j]!;
        if (typeof item === 'string') {
          offer.accepts[i]![j] = { item }
        }
      }
    }
  }
  return offer as NormalizedTradeOffer;
}

function normalizeTradeArgs(args: unknown): NormalizedTradeArgs {
  const targs = args as TraderArgs;
  for (const offer of targs.trades) {
    normalizeTradeOffer(offer);
  }
  return args as NormalizedTradeArgs;
}

async function Trader(d: Discussion, args: Args) {
  const targs = normalizeTradeArgs(args);
  targs
  const inventory = getInventory(d.player);
  const qts = tradeQuantities(inventory, targs.trades);
  const browsing = targs._browsing === true;
  
  if (!browsing && Math.max(...qts) === 0) {
    const option = await showDialogMessage(d.player, 'No Trades Available',
      targs.noTrade ?? 'Sorry but I do not have anything to trade with you.',
      ['Okay', 'Browse Anyway'],
    )
    if (option === 1) {
      await d.action(Trader.name, targs, {_browsing: true});
    }
    return;
  }

  const buttons: forms.ActionButton[] = [];
  for (let i=0; i<targs.trades.length; i++) {
    if (!browsing && qts[i] === 0) continue;
    let trade = targs.trades[i]!;
    buttons.push({
      text: tradeText(trade), 
      action: async () => {
        await d.action(
          browsing ? TraderBrowse.name : TraderOffer.name,
          trade, { _traderArgs: targs, _browsing: browsing });
      },
      icon: trade.icon,
    });
  }
  if (!browsing) {
    buttons.push({
      text: 'Show All Trades',
      action: actionCallback(d, Trader.name, targs, {_browsing: true}),
    });
  }

  let msg = targs.greeting ?? 'Here is what I am willing to trade:';
  if (browsing) {
    msg = targs.browseGreeting ?? 'This is what I can offer:';
  }
  
  await forms.ActionForm(
    d.player, browsing ? 'View a Trade' : 'Make a Trade', `\n${msg}\n`, buttons
  );
}

async function TraderOffer(d: Discussion, args: Args) {
  const offer = normalizeTradeOffer(args);
  const inventory = getInventory(d.player);
  const trade = getValidTrade(inventory, offer);
  if (trade === undefined) {
    return d.action(Trader.name, offer._traderArgs as Args);
  }

  const get = offer.gives.map(
    item => `- ${itemString(item.item)} (${item.qty ?? 1})`
  ).join('\n');

  const cost = trade.inventory.map(
    item => `- ${itemString(item.item)} (${item.cost ?? 1} / ${item.qty ?? 1})`
  ).join('\n');

  const text = strip(`
    You Receive:
  
    ${get}

    I Receive:

    ${cost}
  `);

  const buttons: forms.ActionButton[] = [
    {text: 'Trade', action: async () => {
      performTrade(d.player, offer, trade, false);
      await d.action(TraderOffer.name, args);
    }},
  ];
  if ((trade.maxTrades) > 1) buttons.push({
    text: `Trade All (${trade.maxTrades})`, action: async () => {
      performTrade(d.player, offer, trade, true);
      await d.action(TraderOffer.name, args);
    }
  });
  buttons.push({
    text: 'Back', action: async () => {
      await d.action(Trader.name, offer._traderArgs as Args)
    }
  });
  await forms.ActionForm(d.player, 'Trade', text, buttons);
}

/** Normalize ItemID strings */
function itemString(itemId: string) {
  itemId = itemId.replace('minecraft:', '');
  return itemId.split('_').map(
    s => s.slice(0,1).toUpperCase() + s.slice(1)
  ).join(' ')
}

async function TraderBrowse(d: Discussion, args: Args) {
  const offer = normalizeTradeOffer(args);
  const inventory = getInventory(d.player);
  const trade = getValidTrade(inventory, offer);

  const get = offer.gives.map(
    item => `- ${item.item} (${item.qty})`
  ).join('\n');

  const costs: string[] = [];
  for (const accept of offer.accepts) {
    costs.push(accept.map(
      item => `- ${item.item} (${item.qty})`
    ).join('\n'));
  }
  const cost = costs.join('\n\n--- OR ----\n\n');
  const text = strip(`
    You Receive:
  
    ${get}

    I Receive:

    ${cost}
  `);

  const buttons: forms.ActionButton[] = [{
    text: 'Back',
    action: actionCallback(d, Trader.name, offer._traderArgs as Args),
  }];
  if (trade !== undefined) {
    buttons.push({
      text: 'Purchase',
      action: actionCallback(d, TraderOffer.name, offer, {
        _traderArgs: Object.assign({}, offer._traderArgs, {_browsing: false})
      }),
    })
  }
  await forms.ActionForm(d.player, 'Browsing', text, buttons);
}

function performTrade(player: mc.Player, offer: NormalizedTradeOffer, op: InventoryOperation, all: boolean) {
  const container = (player.getComponent('minecraft:inventory') as mc.EntityInventoryComponent).container;
  let mutations: [slot: number, qty: number][] = [];
  for (const item of op.inventory) {
    let need = item.cost * (all ? op.maxTrades : 1);
    for (const slot of item.slots) {
      if (need === 0) break;
      const stack = container.getSlot(slot);
      if (stack?.typeId !== item.item) {
        return showErrorMessage(player, `Unable to complete trade. Invalid inventory item: ${JSON.stringify({
          received: stack?.typeId, expteced: item.item, slot})}`)
      }
      const take = Math.min(stack.amount, need);
      mutations.push([slot, take]);
      need = need - take;
    }
    if (need !== 0) {
      return showErrorMessage(player, `Unable to complete trade. Missing items: ${JSON.stringify({
        expteced: item.item, need, mutations})}`)
    }
  }

  for (const [slot, qty] of mutations) {
    const s = container.getSlot(slot);
    if (s.amount === qty) {
      s.setItem();
    } else {
      s.amount = s.amount - qty;
    }
  }

  for (const {item, qty} of offer.gives) {
    container.addItem(new ItemStack(item, (qty ?? 1) * (all ? op.maxTrades : 1)));
  }
}

/** Given an array of trade offers, returns an array of number of trades for
 * the corresponding offers */
function tradeQuantities(inventory: InventoryMap, trades: NormalizedTradeOffer[]): number[] {
  const qts: number[] = [];
  for (let offer=0; offer<trades.length; offer++) {
    const trade = trades[offer]!;
    const quants = tradeQuantitiesForOffer(inventory, trade);
    qts.push(quants.map(q=>q.maxTrades).reduce((a, b)=>a+b, 0));
  }
  return qts;
}

/** Get the first valid trade (valid = at least 1 trade possible) */
function getValidTrade(inventory: InventoryMap, offer: NormalizedTradeOffer) {
  for (const trade of tradeQuantitiesForOffer(inventory, offer)) {
    if (trade.maxTrades > 0) return trade;
  }
}

function tradeQuantitiesForOffer(inventory: InventoryMap, offer: NormalizedTradeOffer) {
  const operations: InventoryOperation[] = [];
  for (const items of offer.accepts) {
    const qts: number[] = [];
    const ops = [];
    for (const item of items) {
      const has = inventory.get(item.item)?.total ?? 0;
      const wants = item.qty ?? 1;
      const qty = Math.floor(has/wants);
      qts.push(qty);
      ops.push({
        item: item.item,
        qty: has,
        cost: wants,
        maxTrades: qty,
        slots: inventory.get(item.item)?.slots?.map(s => s[0]) ?? []
      })
      if (qty === 0) break;
    }
    operations.push({
      maxTrades: Math.min(...ops.map(op => op.maxTrades)),
      inventory: ops,
    });
  }
  return operations;
}

function getInventory(player: mc.Player) {
  const inventory = new InventoryMap();

  const component = player.getComponent('minecraft:inventory') as mc.EntityInventoryComponent;
  for (let i=0; i<component.inventorySize; i++) {
    const item = component.container.getItem(i);
    if (item?.typeId === undefined) continue;
    let invItem = inventory.get(item.typeId);
    if (invItem === undefined) {
      invItem = {total: 0, slots: []};
      inventory.set(item.typeId, invItem);
    }
    invItem.total += item.amount;
    invItem.slots.push([i, item.amount]);
  }
  return inventory;
}

function tradeText(offer: NormalizedTradeOffer) {
  if (offer.title !== undefined) return offer.title;
  const first = offer.gives[0];
  const qty = first.qty ?? 1;
  return `${itemString(first.item)}${
    qty > 1 ? ` (${qty})` : ''
  }${
    offer.gives.length > 1 ? ' ...' : ''
  }`;
}
