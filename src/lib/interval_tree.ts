/**
 * Interval Tree for efficiently finding if a player is in a given region.
 *
 * Mutations should be very rare and queries will be very common so rebuild it
 * on edit to ensure its balanced (no mutation support).
 */

export type RangeLookup<T> = (node: T) => [min: number, max: number];

export class IntervalTree<T> {
  dimension: string;
  leftBranch: IntervalTree<T> | null = null;
  rightBranch: IntervalTree<T> | null = null;
  nextTree: IntervalTree<T> | null = null;
  all_nodes: T[] = [];
  nodes: T[] = [];
  median?: number;
  min?: number;
  max?: number;

  constructor(
    public accessors: Record<string, RangeLookup<T>>,
    nodes: T[],
  ) {
    if (Object.keys(accessors).length === 0) {
      throw Error('At least one accessor function is required.');
    }
    this.dimension = Object.keys(accessors)[0];
    this.push(...nodes);
  }

  size() {
    return this.all_nodes.length;
  }

  push(...nodes: T[]) {
    if (nodes.length === 0) return;
    this.all_nodes.push(...nodes);
    this.build();
  }

  build() {
    const accessor = this.accessors[this.dimension];

    const pts: [edge: number, index: number][] = [];
    for (let i = 0; i < this.all_nodes.length; i++) {
      const node = this.all_nodes[i]!;
      const [l, r] = accessor(node);
      pts.push([l, i], [r, i]);
    }

    pts.sort();
    this.median = pts[Math.ceil(pts.length / 2)]![0];
    this.min = pts[0]![0];
    this.max = pts[pts.length - 1]![0];

    this.nodes = [];
    const rNodes: T[] = [];
    const lNodes: T[] = [];

    for (const node of this.all_nodes) {
      const [l, r] = accessor(node);
      if (r < this.median) {
        lNodes.push(node);
      } else if (l > this.median) {
        rNodes.push(node);
      } else {
        this.nodes.push(node);
      }
    }

    const nextDimension: Array<[string, RangeLookup<T>]> = [];
    for (const [k, v] of Object.entries(this.accessors)) {
      if (k === this.dimension) continue;
      nextDimension.push([k, v]);
    }

    if (lNodes.length > 0) {
      this.leftBranch = new IntervalTree(this.accessors, lNodes);
    }
    if (rNodes.length > 0) {
      this.rightBranch = new IntervalTree(this.accessors, rNodes);
    }
    if (nextDimension.length > 0) {
      this.nextTree = new IntervalTree(
        Object.fromEntries(nextDimension),
        this.nodes,
      );
    }
  }

  lookup(vec: number[]): T[] {
    if (vec.length === 0) return [];
    if (this.median === undefined) return [];
    const value = vec[0]!;
    const nodes: T[] = [];
    if (value < this.median) {
      if (this.min! <= value) {
        if (vec.length === 1) {
          nodes.push(...this.nodes);
        } else {
          nodes.push(...(this.nextTree?.lookup(vec.slice(1)) ?? []));
        }
      }
      nodes.push(...(this.leftBranch?.lookup(vec) ?? []));
    } else {
      if (this.max! >= value) {
        if (vec.length === 1) {
          nodes.push(...this.nodes);
        } else {
          nodes.push(...(this.nextTree?.lookup(vec.slice(1)) ?? []));
        }
      }
      nodes.push(...(this.rightBranch?.lookup(vec) ?? []));
    }

    const final: T[] = [];
    // console.log('nodes: ', this.dimension, nodes.length);
    for (const node of nodes) {
      const [l, r] = this.accessors[this.dimension](node);
      if (l <= value && r >= value) {
        final.push(node);
      }
    }
    // console.log('final: ', this.dimension, final.length);
    return final;
  }

  remove(node: T, comparator: (a: T, b: T) => boolean) {
    const nodes: T[] = [];
    for (const other of this.all_nodes) {
      if (!comparator(node, other)) nodes.push(other);
    }
    this.all_nodes = nodes;
    this.build();
  }

  toJSON(): Record<string, unknown> {
    return {
      nodes: this.nodes,
      next: this.nextTree?.toJSON(),
      left: this.leftBranch?.toJSON(),
      right: this.rightBranch?.toJSON(),
    };
  }

  toString() {
    return JSON.stringify(this.toJSON, undefined, 2);
  }
}
