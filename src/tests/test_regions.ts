import test from 'ava';
import {IntervalTreeWrapper} from '../lib/region_lib.js';

test('multiple', t => {
  /** x-z over x */
  let tree = new IntervalTreeWrapper([
    {
      regionIndex: 1,
      pos1: {x: 0, y: 0, z: 0},
      pos2: {x: 10, y: 0, z: 10},
    },
    {
      regionIndex: 2,
      pos1: {x: 20, y: 0, z: 0},
      pos2: {x: 30, y: 0, z: 10},
    },
    {
      regionIndex: 3,
      pos1: {x: 40, y: 0, z: 0},
      pos2: {x: 50, y: 0, z: 10},
    },
  ]);
  t.deepEqual(tree.find({x: 5, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 10, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 15, y: 0, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 25, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 35, y: 0, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 45, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 55, y: 0, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 50, y: 0, z: 5}).length, 1);

  /** x-z over z */
  tree = new IntervalTreeWrapper([
    {
      regionIndex: 1,
      pos1: {x: 0, y: 0, z: 0},
      pos2: {x: 10, y: 0, z: 10},
    },
    {
      regionIndex: 2,
      pos1: {x: 0, y: 0, z: 20},
      pos2: {x: 10, y: 0, z: 30},
    },
    {
      regionIndex: 3,
      pos1: {x: 0, y: 0, z: 40},
      pos2: {x: 10, y: 0, z: 50},
    },
  ]);
  t.deepEqual(tree.find({x: 5, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 0, z: 15}).length, 0);
  t.deepEqual(tree.find({x: 5, y: 0, z: 25}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 0, z: 35}).length, 0);
  t.deepEqual(tree.find({x: 5, y: 0, z: 45}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 0, z: 55}).length, 0);

  /** x-y over y */
  tree = new IntervalTreeWrapper([
    {
      regionIndex: 1,
      pos1: {x: 0, y: 0, z: 0},
      pos2: {x: 10, y: 10, z: 0},
    },
    {
      regionIndex: 2,
      pos1: {x: 0, y: 20, z: 0},
      pos2: {x: 10, y: 30, z: 0},
    },
    {
      regionIndex: 3,
      pos1: {x: 0, y: 40, z: 0},
      pos2: {x: 10, y: 50, z: 0},
    },
  ]);
  t.deepEqual(tree.find({x: 5, y: 15, z: 0}).length, 0);
  t.deepEqual(tree.find({x: 5, y: 25, z: 0}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 35, z: 0}).length, 0);
  t.deepEqual(tree.find({x: 5, y: 45, z: 0}).length, 1);
  t.deepEqual(tree.find({x: 5, y: 55, z: 0}).length, 0);
});

test('incremental', t => {
  const tree = new IntervalTreeWrapper();
  tree.push({
    regionIndex: 1,
    pos1: {x: 0, y: 0, z: 0},
    pos2: {x: 10, y: 0, z: 10},
  });
  tree.push({
    regionIndex: 2,
    pos1: {x: 20, y: 0, z: 0},
    pos2: {x: 30, y: 0, z: 10},
  });
  tree.push({
    regionIndex: 3,
    pos1: {x: 40, y: 0, z: 0},
    pos2: {x: 50, y: 0, z: 10},
  });
  t.deepEqual(tree.find({x: 5, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 15, y: 0, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 25, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 35, y: 0, z: 5}).length, 0);
  t.deepEqual(tree.find({x: 45, y: 0, z: 5}).length, 1);
  t.deepEqual(tree.find({x: 55, y: 0, z: 5}).length, 0);
});
