/**
 * region_lib - Minecraft specific wrappings for the Interval Tree data structure
 */

import {Vector3} from './common.js';
import {RangeLookup, IntervalTree} from './interval_tree.js';

interface BaseRegion {
  pos1: Vector3;
  pos2: Vector3;
}

export type NamedRegion = {
  name: string;
} & BaseRegion;

export type Region = {
  source?: string;
  id?: number;
  name?: string;

  children?: Region[];
} & BaseRegion;

export type RegionNode = Omit<Region, 'children'> & {
  regionIndex: number;
  children?: RegionNode[];
  subtree?: IntervalTreeWrapper;
};

export class IntervalTreeWrapper {
  static accessors: Record<string, RangeLookup<RegionNode>> = {
    // tree lookups are by x, z, y
    x: n => [n.pos1.x, n.pos2.x],
    z: n => [n.pos1.z, n.pos2.z],
    y: n => [n.pos1.y, n.pos2.y],
  };
  tree: IntervalTree<RegionNode>;

  constructor(regions: RegionNode[] = []) {
    this.tree = new IntervalTree<RegionNode>(
      IntervalTreeWrapper.accessors,
      regions,
    );
  }

  size() {
    return this.tree.size();
  }

  push(...regions: RegionNode[]) {
    this.tree.push(...regions);
  }

  find(loc: Vector3) {
    // tree lookups are by x, z, y
    return this.tree.lookup([loc.x, loc.z, loc.y]);
  }

  remove(region: RegionNode) {
    this.tree.remove(region, (a, b) => a.regionIndex === b.regionIndex);
  }

  toString() {
    return this.tree.toString();
  }
}

/**
 * Given a region and a line segment, returns a vector3 if the line segment
 * intersects the region. Returns undefined if not.
 *
 * https://stackoverflow.com/a/3235902/4001895 */
export function getRegionIntersection<T extends BaseRegion>(
  region: T,
  p1: Vector3,
  p2: Vector3,
): Vector3 | undefined {
  /** bottom nw corner */
  const c1 = region.pos1;
  // top se corner
  const c2 = region.pos2;

  if (p2.x < c1.x && p1.x < c1.x) return undefined;
  if (p2.x > c2.x && p1.x > c2.x) return undefined;
  if (p2.y < c1.y && p1.y < c1.y) return undefined;
  if (p2.y > c2.y && p1.y > c2.y) return undefined;
  if (p2.z < c1.z && p1.z < c1.z) return undefined;
  if (p2.z > c2.z && p1.z > c2.z) return undefined;
  if (
    p1.x > c1.x &&
    p1.x < c2.x &&
    p1.y > c1.y &&
    p1.y < c2.y &&
    p1.z > c1.z &&
    p1.z < c2.z
  )
    return p1;

  let pt: Vector3 | undefined;
  pt =
    getIntersection(p1.x - c1.x, p2.x - c1.x, p1, p2) ??
    getIntersection(p1.x - c2.x, p2.x - c2.x, p1, p2);
  if (inBoxYZ(pt, c1, c2)) return pt;
  pt =
    getIntersection(p1.y - c1.y, p2.y - c1.y, p1, p2) ??
    getIntersection(p1.y - c2.y, p2.y - c2.y, p1, p2);
  if (inBoxXZ(pt, c1, c2)) return pt;
  pt =
    getIntersection(p1.z - c1.z, p2.z - c1.z, p1, p2) ??
    getIntersection(p1.z - c2.z, p2.z - c2.z, p1, p2);
  if (inBoxXY(pt, c1, c2)) return pt;
  return undefined;
}

/** https://stackoverflow.com/a/3235902/4001895 */
function getIntersection(
  d1: number,
  d2: number,
  p1: Vector3,
  p2: Vector3,
): Vector3 | undefined {
  if (d1 * d2 >= 0) return undefined;
  if (d1 === d2) return undefined;
  return {
    x: p1.x + (p2.x - p1.x) * ((-1 * d1) / (d2 - d1)),
    y: p1.x + (p2.y - p1.y) * ((-1 * d1) / (d2 - d1)),
    z: p1.z + (p2.z - p1.z) * ((-1 * d1) / (d2 - d1)),
  };
}

/** https://stackoverflow.com/a/3235902/4001895 */
function inBoxYZ(pt: Vector3 | undefined, c1: Vector3, c2: Vector3) {
  if (pt === undefined) return false;
  return pt.z > c1.z && pt.z < c2.z && pt.y > c1.y && pt.y < c2.y;
}

/** https://stackoverflow.com/a/3235902/4001895 */
function inBoxXZ(pt: Vector3 | undefined, c1: Vector3, c2: Vector3) {
  if (pt === undefined) return false;
  return pt.z > c1.z && pt.z < c2.z && pt.x > c1.x && pt.x < c2.x;
}

/** https://stackoverflow.com/a/3235902/4001895 */
function inBoxXY(pt: Vector3 | undefined, c1: Vector3, c2: Vector3) {
  if (pt === undefined) return false;
  return pt.x > c1.x && pt.x < c2.x && pt.y > c1.y && pt.y < c2.y;
}
