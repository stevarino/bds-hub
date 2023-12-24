import * as mc from "@minecraft/server";

import { StartupEvent } from '../lib.js';
import * as settings from './settings.js';
import * as text from './text.js';

StartupEvent.addListener(onTick);

const showItemDurability = settings.DefaultBitSettings.ItemDurabilityShown;
settings.registerSetting({
  id: showItemDurability,
  name: 'showItemDurability',
  defaultValue: false
});

function onTick() {
  mc.system.runTimeout(onTick, 5);
  for (const player of mc.world.getAllPlayers()) {
    text.addActionBarText({
      id: `durability:${player.name}`,
      text: getPlayerText(player),
      targets: [player.name],
      priority: 10,
    })
  }
}

function getPlayerText(player: mc.Player) {
  if (settings.getPlayerBit(player, showItemDurability) === true) {
    const equipment = player.getComponent(
      mc.EntityComponentTypes.Equippable
    ) as mc.EntityEquippableComponent|undefined;
    if (equipment === undefined) {
      console.error('Unable to get player equipment');
      return;
    }
    const item = equipment.getEquipment(mc.EquipmentSlot.Mainhand);
    if (item === undefined) return;
    const durability = item.getComponent('minecraft:durability') as mc.ItemDurabilityComponent|undefined;
    if (durability === undefined) return;
    const name = item.nameTag ?? deSnakify(item.typeId);
    const current = durability.maxDurability - durability.damage;
    return `${name}: ${current} / ${durability.maxDurability}`;
  }
}

function deSnakify(text: string) {
  const out: string[] = [];
  const parts = text.replace('minecraft:', '').split('_');
  for (const part of parts) {
    out.push(part.slice(0,1).toUpperCase(), part.slice(1), ' ');
  }
  return out.slice(0, -1).join('');
}

