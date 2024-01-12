import * as mc from '@minecraft/server';
import {StartupEvent} from '../lib.js';
import {DefaultMap} from '../../lib/default_map.js';
import {EventEmitter} from '../lib/events.js';
import {
  IntervalTreeWrapper,
  Region,
  RegionNode,
  getRegionIntersection,
} from '../../lib/region_lib.js';
export {RegionNode, getRegionIntersection};

const MAX_Y = 999;
const MIN_Y = -999;

export type RegionOpen = Omit<Region, 'pos1' | 'pos2'> & {
  pos1: {x: number; y?: number; z: number};
  pos2: {x: number; y?: number; z: number};
};

export interface OnRegionChangeEvent {
  player: mc.Player;
  source?: string;
  index?: number;
  id?: string;
  region: RegionNode;
}

const TREE = new IntervalTreeWrapper();
let REGION_INDEX = 0;
const REGIONS = new Map<number, RegionNode>();
const PLAYER_REGIONS = new DefaultMap(() => new Set<number>());

StartupEvent.addListener(onTick);

const emitter = new EventEmitter<OnRegionChangeEvent>();
export const onEnter = emitter.getHandler('onEnter');
export const onExit = emitter.getHandler('onLeave');

function setDiff<T>(a: Set<T>, b: Set<T>) {
  // https://stackoverflow.com/a/36504668/4001895
  return [...a].filter(x => !b.has(x));
}

function onTick() {
  mc.system.runTimeout(onTick, 5);
  for (const player of mc.world.getAllPlayers()) {
    const prevRegionIds = PLAYER_REGIONS.get(player.id);

    const regionIds = new Set<number>();
    for (const region of TREE.find(player.location)) {
      regionIds.add(region.regionIndex);
    }

    // console.log(
    //   'REGIONS: ',
    //   JSON.stringify(prevRegionIds),
    //   JSON.stringify([...setDiff(regionIds, prevRegionIds)]),
    // );
    for (const newRegionId of setDiff(regionIds, prevRegionIds)) {
      const newRegion = REGIONS.get(newRegionId)!;
      console.log('entered: ', newRegionId, JSON.stringify(newRegion));
      onEnter.emit({
        source: newRegion.source,
        id: newRegion.name,
        index: newRegion.id,
        player,
        region: newRegion,
      });
    }
    for (const regionId of setDiff(prevRegionIds, regionIds)) {
      const region = REGIONS.get(regionId)!;
      console.log('left: ', JSON.stringify(region));
      onExit.emit({
        source: region.source,
        id: region.name,
        index: region.id,
        player,
        region: region,
      });
    }
    PLAYER_REGIONS.set(player.id, regionIds);
  }
}

function createRegion(loc: Region): RegionNode {
  const reg: RegionNode = Object.assign({}, loc, {
    regionIndex: REGION_INDEX,
    children: undefined,
    subtree: undefined,
  });
  REGION_INDEX += 1;
  REGIONS.set(reg.regionIndex, reg);
  if ((loc.children?.length ?? 0) > 0) {
    reg.children = [];
    for (const child of loc.children!) {
      reg.children.push(createRegion(child));
    }
    reg.subtree = new IntervalTreeWrapper(reg.children);
  }
  return reg;
}

function normalizeRegion<T extends Region | RegionOpen>(region: T): Region {
  const {x, y, z} = region.pos1;
  if (region.pos2.x < x) {
    region.pos1.x = region.pos2.x;
    region.pos2.x = x;
  }
  if (region.pos2.z < z) {
    region.pos1.z = region.pos2.z;
    region.pos2.z = z;
  }
  if (y === undefined) {
    region.pos1.y = MIN_Y;
    region.pos2.y = MAX_Y;
  } else if (region.pos2.y! < y) {
    region.pos1.y = region.pos2.y;
    region.pos2.y = y;
  }
  return region as Region;
}

export function registerRegion(region: RegionOpen) {
  const registeredRegion = createRegion(normalizeRegion(region));
  console.log('registered: ', JSON.stringify(registeredRegion));
  TREE.push(registeredRegion);
  return registeredRegion;
}

export function removeRegion(region: RegionNode) {
  TREE.remove(region);
}
