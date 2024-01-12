import * as mc from '@minecraft/server';
import {Discussion, defineActions} from './discussion.js';
import * as formlib from '../../lib/form.js';
import {getPlayerDataMap} from '../../lib/storage.js';

defineActions({SettingsMenu});
export interface Setting {
  id: number;
  name: string;
  displayName?: string;
  defaultValue: boolean;
}
const settings: Setting[] = [];
const settingIds = new Set<number>();

export enum DefaultBitSettings {
  LocationShown,
  ItemDurabilityShown,
}

export function registerSetting(setting: Setting) {
  if (settingIds.has(setting.id)) {
    throw new Error(`Duplicate setting ID registered: ${setting.id}`);
  }
  settingIds.add(setting.id);
  settings.push(setting);
}

/**
 * Set and get bits (booleans)
 *
 * Bits are useful for things like achievements or checkpoints - things
 * that once they go true will never go false, and we only care about true
 * values.
 *
 * Default Bits are actually a pair of bits, a value and an isset flag.
 * This allows for distinguishing between whether a bit was set to
 * false or just never set in the first place.
 */

export function getPlayerFlag(player: mc.Player, index: number) {
  return getPlayerDataMap(player).getFlag(index);
}

export function setPlayerFlag(
  player: mc.Player,
  index: number,
  value: boolean,
) {
  return getPlayerDataMap(player).setFlag(index, value);
}

export function getPlayerBit(
  player: mc.Player,
  index: DefaultBitSettings,
  defaultValue?: boolean,
) {
  return getPlayerDataMap(player).getBit(index, defaultValue);
}

export function setPlayerBit(
  player: mc.Player,
  index: DefaultBitSettings,
  value: boolean,
) {
  return getPlayerDataMap(player).setBit(index, value);
}

async function SettingsMenu(d: Discussion) {
  const map = getPlayerDataMap(d.player);
  const sorted = Array.from(settings).sort((a, b) => a.id - b.id);
  const form: {[label: string]: formlib.ModalFormWidget<boolean, boolean>} = {};
  for (const setting of sorted) {
    form[String(setting.id)] = formlib.toggle({
      defaultValue: map.getBit(setting.id) ?? setting.defaultValue,
      displayName: setting.displayName ?? formlib.formatName(setting.name),
    });
  }
  const {results} = await d.modalForm('Settings', form);
  if (results === undefined) return;

  const bits: [number, boolean][] = [];
  for (const [key, val] of Object.entries(results)) {
    bits.push([Number(key), val.get()]);
  }
  map.setBits(bits);
}
