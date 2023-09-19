import * as mc from "@minecraft/server";
import { DataMap, GlobalMap, TagMap } from "../lib/tag_map.js";
import { script } from '../script.js';

export const globalMap = new DataMap(new GlobalMap(mc.world))

const players: Record<string, DataMap> = {};

export function getPlayerMap(player: mc.Player) {
  let map = players[player.name];
  if (map === undefined) {
    map = getEntityMap(player);
    players[player.name] = map;
  }
  return map;
}

export function getEntityMap(entity: mc.Entity) {
  return new DataMap(new TagMap(entity));
}
