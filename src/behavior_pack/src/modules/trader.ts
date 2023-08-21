import mc, { ItemStack } from "@minecraft/server";

import { showErrorMessage, forms, showDialogMessage, strip } from '../lib.js';
import { TradeItem, TradeOffer, TraderArgs } from '../types/packTypes.js';
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

async function Trader(d: Discussion, args: Args) {
  const targs = args as TraderArgs;
  const inventory = getInventory(d.player);
  const qts = tradeQuantities(inventory, targs.trades);
  const browsing = targs._browsing === true;
  
  if (!browsing && Math.min(...qts) === 0) {
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
    let trade = targs.trades[i] as TradeOffer;
    buttons.push({text: tradeText(trade), action: async () => {
      await d.action(
        browsing ? TraderBrowse.name : TraderOffer.name,
        trade, { _traderArgs: targs, _browsing: browsing });
    }});
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
  
  forms.ActionForm(
    d.player, browsing ? 'View a Trade' : 'Make a Trade', `\n${msg}\n`, buttons
  );
}

async function TraderOffer(d: Discussion, args: Args) {
  const offer = args as TradeOffer;
  const inventory = getInventory(d.player);
  const trade = getValidTrade(inventory, offer);
  if (trade === undefined) {
    return d.action(Trader.name, offer._traderArgs as Args);
  }

  const get = offer.gives.map(
    item => `- ${item.item} (${item.qty})`
  ).join('\n');

  const cost = trade.inventory.map(
    item => `- ${item.item} (${item.cost} / ${item.qty})`
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

async function TraderBrowse(d: Discussion, args: Args) {
  const offer = args as TradeOffer;
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
}

function performTrade(player: mc.Player, offer: TradeOffer, op: InventoryOperation, all: boolean) {
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
    container.addItem(new ItemStack(item, qty));
  }
}

function tradeQuantities(inventory: InventoryMap, trades: TradeOffer[]) {
  const qts: number[] = [];
  for (let offer=0; offer<trades.length; offer++) {
    const trade = trades[offer] as TradeOffer;
    qts.push(tradeQuantitiesForOffer(inventory, trade)
      .map(q=>q.maxTrades).reduce((a, b)=>a+b, 0));
  }
  return qts;
}

function getValidTrade(inventory: InventoryMap, offer: TradeOffer) {
  for (const trade of tradeQuantitiesForOffer(inventory, offer)) {
    if (trade.maxTrades > 0) return trade;
  }
}

function tradeQuantitiesForOffer(inventory: InventoryMap, trade: TradeOffer) {
  const operations: InventoryOperation[] = [];
  for (let option=0; option<trade.accepts.length; option++) {
    const qts: number[] = [];
    const ops = [];
    for (const item of trade.accepts[option] as TradeItem[]) {
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

function tradeText(offer: TradeOffer) {
  if (offer.title !== undefined) return offer.title;
  const first = offer.gives[0];
  const qty = first.qty ?? 1;
  return `${first.item}${
    qty > 1 ? ` (${qty})` : ''
  }${
    offer.gives.length > 1 ? ' ...' : ''
  }`;
}
